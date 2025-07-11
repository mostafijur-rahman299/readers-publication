import { useTranslations } from "next-intl";
import { Button } from "./ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Pagination({
	totalPages,
	currentPage,
	onPageChange,
}: {
	totalPages: number;
	currentPage: number;
	onPageChange: (page: number) => void;
}) {
	const t = useTranslations("pagination");
	const getPageNumbers = () => {
		const pageNumbers = [];
		for (let i = 1; i <= totalPages; i++) {
			pageNumbers.push(i);
		}
		return pageNumbers;
	};

	const handlePageChange = (page: number) => {
		onPageChange(page);
	};

	return (
		<div className="flex justify-center mt-4">
			<nav
				className="flex items-center space-x-1"
				aria-label="Pagination">
				<Button
					variant="outline"
					size="sm"
					onClick={() =>
						handlePageChange(currentPage - 1)
					}
					disabled={currentPage === 1}
					className="flex items-center gap-1">
					<ChevronLeft className="h-4 w-4" />
					<span className="hidden sm:inline">{t("previous")}</span>
				</Button>

				<div className="flex items-center space-x-1">
					{getPageNumbers().map((page, idx) =>
						page === "..." ? (
							<span key={idx} className="px-2 py-1 text-gray-400">
								...
							</span>
						) : (
							<Button
								key={page}
								variant={
									page === currentPage
										? "default"
										: "outline"
								}
								size="sm"
								onClick={() => handlePageChange(page)}
								className="w-10 h-10 p-0"
								aria-current={
									page === currentPage
										? "page"
										: undefined
								}>
								{page}
							</Button>
						),
					)}
				</div>

				<Button
					variant="outline"
					size="sm"
					onClick={() =>
						handlePageChange(currentPage + 1)
					}
					disabled={
						currentPage === totalPages
					}
					className="flex items-center gap-1">
					<span className="hidden sm:inline">{t("next")}</span>
					<ChevronRight className="h-4 w-4" />
				</Button>
			</nav>
		</div>
	);
}
