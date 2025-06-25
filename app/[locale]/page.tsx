"use client";

import Image from "next/image";
import Link from "next/link";
import { CircleNav } from "@/components/circle-nav";
import { MainCarousel } from "@/components/main-carousel";
import { NewsGrid } from "@/components/news-grid";
import { Header } from "@/components/header";
import { Navigation } from "@/components/navigation";
import { SpecialOffersCarousel } from "@/components/special-offers-carousel";
import { ArticlesSection } from "@/components/articles-section";
import { TestimonialsSlider } from "@/components/testimonials-slider";
import { useEffect, useState, Suspense } from "react";
import useHttp from "@/hooks/useHttp";
import { API_ENDPOINTS } from "@/constants/apiEnds";
import { useTranslations } from "next-intl";
import { useDispatch, useSelector } from "react-redux";
import { setGeneralData } from "@/store/generalData";
import dynamic from "next/dynamic";

// Dynamic imports for better code splitting
const DynamicNewsGrid = dynamic(
	() => import("@/components/news-grid").then((mod) => mod.NewsGrid),
	{
		loading: () => (
			<div className="animate-pulse h-96 rounded-lg" />
		),
	},
);

export default function Home() {
	const dispatch = useDispatch();
	const t = useTranslations("home");
	const [categories, setCategories] = useState<any[]>([]);
	const [carouselItems, setCarouselItems] = useState<any[]>([]);
	const [advertisementItems, setAdvertisementItems] = useState<any[]>([]);
	const { sendRequests: fetchCategories, isLoading } = useHttp();
	const { sendRequests: fetchCarousel, isLoading: isCarouselLoading } =
		useHttp();
	const { sendRequests: fetchGeneralData } = useHttp();
	const generalData = useSelector(
		(state: any) => state.generalData.generalData,
	);
	const [newArrivalBooks, setNewArrivalBooks] = useState<any[]>([]);
	const [popularBooks, setPopularBooks] = useState<any[]>([]);
	const [comingSoonBooks, setComingSoonBooks] = useState<any[]>([]);
	const [bestSellingBooks, setBestSellingBooks] = useState<any[]>([]); 
	const { sendRequests: fetchBooks, isLoading: isBooksLoading } = useHttp();

	useEffect(() => {
		fetchCategories(
			{
				url_info: {
					url: API_ENDPOINTS.CATEGORIES + "?is_featured=true",
				},
			},
			(res: any) => {
				setCategories(res);
				console.log(res);
			},
		);
	}, []);

	useEffect(() => {
		fetchCarousel(
			{
				url_info: {
					url: API_ENDPOINTS.HOME_CAROUSEL,
				},
			},
			(res: any) => {
				setCarouselItems(res.filter((item: any) => !item.is_advertise));
				setAdvertisementItems(
					res.filter((item: any) => item.is_advertise),
				);
				console.log(res);
			},
		);
	}, []);

	useEffect(() => {
		fetchBooks(
			{
				url_info: {
					url: API_ENDPOINTS.BOOKS + "?pagination=false&is_featured=true",
				},
			},
			(res: any) => {
				setPopularBooks(res.popular);
				setNewArrivalBooks(res.new_arrival);
				setComingSoonBooks(res.comming_soon);
				setBestSellingBooks(res.best_seller)
			},
		);
	}, []);

	useEffect(() => {
		fetchBooks(
			{
				url_info: {
					url: API_ENDPOINTS.GENERAL_DATA,
				},
			},
			(res: any) => {
				dispatch(setGeneralData(res))
			},
		);
	}, []);

	return (
		<main className="min-h-screen bg-gradient-to-b from-white to-gray-50">
			<Header />
			<Navigation />

			<section className="bg-gray-50 py-4">
				<div className="container mx-auto px-4">
					<div className="flex flex-wrap items-center justify-center gap-5 md:gap-8">
						{isLoading ? (
							Array.from({ length: 6 }).map((_, idx) => (
								<div
									key={idx}
									className="flex flex-col items-center animate-pulse">
									<div className="mb-3 h-20 w-20 rounded-full bg-gray-200" />
									<div className="h-4 w-16 rounded bg-gray-200" />
								</div>
							))
						) : (
							<>
								{categories.map((category) => (
									<CircleNav
										key={category.slug}
										title={category.name}
										title_bn={category.name_bn}
										imageUrl={category.image_url}
										className="transform hover:scale-105 transition-transform duration-300"
									/>
								))}
								{categories?.length > 0 && (
									<CircleNav
										title="More View"
										title_bn="আরও দেখুন"
										imageUrl="/menu.png"
										className="bg-brand-100 transform hover:scale-105 transition-transform duration-300"
									/>
								)}
							</>
						)}
					</div>
				</div>
			</section>

			<section className="py-4 lg:py-6 bg-gray-50">
				<div className="container mx-auto px-4 sm:px-6 lg:px-8">
					<div className="grid gap-6 lg:gap-8 md:grid-cols-3">
						{/* Main Carousel Section */}
						<div className="md:col-span-2">
							
								<Suspense
									fallback={
										<div className="animate-pulse h-full w-full bg-gray-200 rounded-2xl" />
									}>
									<MainCarousel
										carouselItems={carouselItems}
										isLoading={isCarouselLoading}
									/>
								</Suspense>
						</div>

						{/* Advertisement Sidebar */}
						<div className="space-y-4 xs:space-y-5 sm:space-y-6 h-[250px] xs:h-[300px] sm:h-[400px] md:h-[450px] lg:h-[400px] xl:h-[400px] overflow-hidden">
							{advertisementItems.map(
								(item: any, index: number) => (
									<div
										key={item.id || index} // Prefer unique id over index
										className="group relative rounded-2xl shadow-md transition-all duration-300 hover:shadow-lg overflow-hidden h-[115px] xs:h-[140px] sm:h-[180px] md:h-[210px] lg:h-[230px] xl:h-[260px]"
										role="region"
										aria-label={`Advertisement ${index + 1}`}>
										<Image
											src={item.image_url}
											alt={item.alt_text || `Advertisement ${index + 1}`} // Provide fallback alt text
											fill // Use fill for responsive images
											sizes="(max-width: 480px) 100vw, 
												(max-width: 640px) 90vw,
												(max-width: 768px) 50vw,
												(max-width: 1024px) 40vw,
												33vw" // Optimized responsive sizes
											className="object-cover transition-transform duration-300 group-hover:scale-105 rounded-2xl"
											loading={index > 2 ? "lazy" : "eager"} // Eager load first few images
											priority={index <= 2} // Prioritize initial images
										/>
										<div 
											className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
										/>
									</div>
								),
							)}
						</div>
					</div>
				</div>
			</section>

			{newArrivalBooks?.length > 0 && (
				<section className="py-6 bg-gradient-to-r from-white to-gray-50">
					<div className="container mx-auto px-4">
						<div className="mb-8 flex items-center justify-between">
							<h2 className="text-2xl font-bold text-gray-900 relative after:content-[''] after:absolute after:-bottom-2 after:left-0 after:w-1/3 after:h-1 after:bg-brand-600 after:rounded-full">
								{t("new_books")}
							</h2>
							<Link
								href="/books/new"
								className="text-sm font-medium text-brand-600 hover:text-brand-700 transition-colors hover:underline">
								{t("all_books")} →
							</Link>
						</div>
						<DynamicNewsGrid
							book_type="new_arrival"
							books={newArrivalBooks}
						/>
					</div>
				</section>
			)}

			{popularBooks?.length > 0 && (
				<section className="py-12">
					<div className="container mx-auto px-4">
						<div className="mb-8 flex items-center justify-between">
							<h2 className="text-2xl font-bold text-gray-900 relative after:content-[''] after:absolute after:-bottom-2 after:left-0 after:w-1/3 after:h-1 after:bg-brand-600 after:rounded-full">
								{t("popular_books")}
							</h2>
							<Link
								href="/books/new"
								className="text-sm font-medium text-brand-600 hover:text-brand-700 transition-colors hover:underline">
								{t("all_books")} →
							</Link>
						</div>
						<DynamicNewsGrid
							book_type="popular"
							books={popularBooks}
						/>
					</div>
				</section>
			)}

			<section className="py-12 bg-gradient-to-r from-gray-50 to-white">
				<div className="container mx-auto px-4">
					<Suspense
						fallback={
							<div className="animate-pulse h-48 bg-gray-100 rounded-xl" />
						}>
						<SpecialOffersCarousel />
					</Suspense>
				</div>
			</section>

			{bestSellingBooks?.length > 0 && (
				<section className="py-12">
					<div className="container mx-auto px-4">
						<div className="mb-8 flex items-center justify-between">
							<h2 className="text-2xl font-bold text-gray-900 relative after:content-[''] after:absolute after:-bottom-2 after:left-0 after:w-1/3 after:h-1 after:bg-brand-600 after:rounded-full">
								{t("best_selling")}
							</h2>
							<Link
								href="/books/new"
								className="text-sm font-medium text-brand-600 hover:text-brand-700 transition-colors hover:underline">
								{t("all_books")} →
							</Link>
						</div>
						<DynamicNewsGrid
							book_type="best_selling"
							books={bestSellingBooks}
						/>
					</div>
				</section>
			)}

			{comingSoonBooks?.length > 0 && (
				<section className="py-12">
					<div className="container mx-auto px-4">
						<div className="mb-8 flex items-center justify-between">
							<h2 className="text-2xl font-bold text-gray-900 relative after:content-[''] after:absolute after:-bottom-2 after:left-0 after:w-1/3 after:h-1 after:bg-brand-600 after:rounded-full">
								{t("coming_soon")}
							</h2>
							<Link
								href="/books/new"
								className="text-sm font-medium text-brand-600 hover:text-brand-700 transition-colors hover:underline">
								{t("all_books")} →
							</Link>
						</div>
						<DynamicNewsGrid
							book_type="coming_soon"
							books={comingSoonBooks}
						/>
					</div>
				</section>
			)}

			<section className="py-12 bg-gradient-to-r from-white to-gray-50">
				<div className="container mx-auto px-4">
					<Suspense
						fallback={
							<div className="animate-pulse h-96 bg-gray-100 rounded-xl" />
						}>
						<ArticlesSection
							generalData={generalData?.articles_section}
						/>
					</Suspense>
				</div>
			</section>

			<Suspense
				fallback={<div className="animate-pulse h-64 bg-gray-100" />}>
				<TestimonialsSlider />
			</Suspense>
		</main>
	);
}
