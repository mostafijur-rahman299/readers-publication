import { useState } from "react";

function useHttp() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [downloadProgress, setDownloadProgress] = useState(0);

  const sendRequests = async (requestConfig, applyData, applyError = () => {}) => {
    setIsLoading(true);
    setError(null);
    setDownloadProgress(0);

    try {
      const headers = requestConfig.headers ? { ...requestConfig.headers } : {};
      const access_token = localStorage.getItem("access_token");

      if (requestConfig.url_info?.is_auth_required && access_token && !headers.authorization) {
        headers["authorization"] = `Bearer ${access_token}`;
      }

      let url = requestConfig?.url_info?.url;
      console.log(requestConfig)

      // Handle query params
      if (requestConfig.params) {
        const query = new URLSearchParams(requestConfig.params).toString();
        url += `?${query}`;
      }

      const options = {
        method: requestConfig.method ? requestConfig.method.toUpperCase() : "GET",
        headers: {
          ...headers,
          "Content-Type": "application/json",
        },
      };

      if (options.method !== "GET" && requestConfig.data) {
        options.body = JSON.stringify(requestConfig.data);
      }

      const response = await fetch(url, options);

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData);
        applyError(errorData);
      }

      // Progress tracking works only with readable streams (e.g. file download)
      if (response.body && response.body.getReader) {
        const contentLength = response.headers.get("Content-Length");
        const total = contentLength ? parseInt(contentLength, 10) : null;
        const reader = response.body.getReader();
        let received = 0;
        const chunks = [];

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          if (value) {
            chunks.push(value);
            received += value.length;
            if (total) {
              const percent = Math.round((received / total) * 100);
              setDownloadProgress(percent);
            }
          }
        }

        const blob = new Blob(chunks);
        const text = await blob.text();
        const data = JSON.parse(text);
        applyData(data);
      } else {
        const data = await response.json();
        applyData(data);
      }

    } catch (err) {
      if (!error) {
        setError({
          non_field_errors: ["Something went wrong. Please try again later."],
        });
        applyError({
          non_field_errors: ["Something went wrong. Please try again later."],
        });
      }
    } finally {
      setIsLoading(false);
      setDownloadProgress(0);
    }
  };

  return {
    isLoading,
    error,
    sendRequests,
    downloadProgress,
  };
}

export default useHttp;
