import { useEffect, useRef, useState } from "react";
import * as pdfjsLib from "pdfjs-dist";

pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

const PDFViewer = ({ pdfUrl }: { pdfUrl: string }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    let isMounted = true;
    let renderTask: pdfjsLib.PDFRenderTask | null = null;

    const loadPDF = async () => {
      setError(false);
      try {
        const loadingTask = pdfjsLib.getDocument(pdfUrl);
        const pdf = await loadingTask.promise;
        const page = await pdf.getPage(1);

        const canvas = canvasRef.current;
        if (!canvas) throw new Error("Canvas not found");
        const context = canvas.getContext("2d");
        if (!context) throw new Error("Canvas context not found");

        const devicePixelRatio = window.devicePixelRatio || 1;
        const viewport = page.getViewport({ scale: 1 });
        const scaledViewport = page.getViewport({ scale: devicePixelRatio });

        canvas.width = scaledViewport.width;
        canvas.height = scaledViewport.height;
        canvas.style.width = `${viewport.width}px`;
        canvas.style.height = `${viewport.height}px`;

        const renderContext = {
          canvasContext: context,
          viewport: scaledViewport,
        };

        renderTask = page.render(renderContext);
        await renderTask.promise;
      } catch (err) {
        console.error("Error rendering PDF:", err);
        if (isMounted) setError(true);
      }
    };

    if (pdfUrl) loadPDF();
    else setError(true);

    return () => {
      isMounted = false;
      if (renderTask) renderTask.cancel();
    };
  }, [pdfUrl]);

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-4">
        <p className="mb-2 text-red-600">Unable to preview PDF.</p>
        <a
          href={pdfUrl}
          download
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          Download PDF
        </a>
      </div>
    );
  }

  return <canvas ref={canvasRef} className="w-full h-auto" />;
};

export default PDFViewer;
