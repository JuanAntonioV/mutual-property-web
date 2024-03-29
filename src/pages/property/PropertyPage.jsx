import MainContainer from '@/components/containers/MainContainer';
import PropertyHeroSection from '@/components/sections/PropertyHeroSection';
import PropertyFilter from '@/components/filters/PropertyFilter';
import NewPropertyCard from '@/components/cards/NewPropertyCard';

import { useSearchParams } from 'react-router-dom';
import {
	useInfiniteQuery,
	useQuery,
	useQueryClient,
} from '@tanstack/react-query';
import { getAllProductsApi } from '../../api/product-api';
import { useContext, useEffect, useMemo, useState } from 'react';
import PropertyCard from '../../components/cards/PropertyCard';
import { SyncLoader } from 'react-spinners';
import useStore from '../../hooks/useStore';
import AuthContext from '../../contexts/AuthProvider';
import { getAllCategoriesApi } from '../../api/category-api';
import ScrollToTopNav from '@/components/navigations/ScrollToTopNav';
import MainPaginate from '@/components/pagination/MainPaginate';
import { isMobile } from 'react-device-detect';

export default function PropertyPage() {
	// const router = useRouter();
	// const pathname = usePathname();
	const [searchParams] = useSearchParams();
	const category = searchParams.get('category');
	const type = searchParams.get('type');
	const [selectedCategory, setSelectedCategory] = useState(null);
	const [selectedSubCategory, setSelectedSubCategory] = useState(null);
	const [orderBy, setOrderBy] = useState('created_at');
	const [search, setSearch] = useState('');
	const [count, setCount] = useState(0);
	const [priceFilter, setPriceFilter] = useState({
		from: null,
		to: null,
	});
	const [page, setPage] = useState(1);
	const [pageSlice, setPageSlice] = useState(1);

	const { category: categoryData } = useStore();

	// useEffect(() => {
	//     if (pathname === '/property')
	//         router.push('/property?category=disewa&type=rumah');
	// }, [pathname, router]);
	const { auth } = useContext(AuthContext);

	useQuery(['categories'], getAllCategoriesApi, {
		select: res => res.results,
	});

	useEffect(() => {
		const selected = categoryData?.find(item => item.slug === category);

		if (category) {
			setSelectedCategory(selected);
		}
	}, [category, categoryData]);

	useEffect(() => {
		const selected = selectedCategory?.sub_categories?.find(
			item => item.slug === type
		);

		if (type) {
			setSelectedSubCategory(selected);
		}
	}, [type, selectedCategory]);

	useEffect(() => {
		if (selectedCategory?.id === 3) {
			if (isMobile) {
				setCount(9);
			} else {
				setCount(48);
			}
		} else {
			if (isMobile) {
				setCount(12);
			} else {
				setCount(48);
			}
		}
	}, [selectedCategory]);

	// const {
	// 	data: propertyData,
	// 	isLoading: isPropertyDataLoading,
	// 	fetchNextPage,
	// 	isFetchingNextPage,
	// 	hasNextPage,
	// } = useInfiniteQuery(
	// 	[
	// 		'allProperty',
	// 		selectedCategory?.id,
	// 		selectedSubCategory?.id,
	// 		orderBy,
	// 		search,
	// 		auth?.user,
	// 		count,
	// 		priceFilter,
	// 	],
	// 	({ pageParam }) =>
	// 		getAllProductsApi({
	// 			pageParam,
	// 			category: selectedCategory?.id,
	// 			subCategory: selectedSubCategory?.id,
	// 			orderBy: orderBy,
	// 			search: search,
	// 			userId: auth?.user?.id,
	// 			count: count,
	// 			from: priceFilter?.from,
	// 			to: priceFilter?.to,
	// 		}),
	// 	{
	// 		cacheTime: 0,
	// 		getNextPageParam: (lastPage, pages) => {
	// 			if (pages.length < lastPage.results.last_page) {
	// 				return pages.length + 1;
	// 			} else {
	// 				return undefined;
	// 			}
	// 		},
	// 	}
	// );

	const queryClient = useQueryClient();

	const {
		data: propertyData,
		isLoading: isPropertyDataLoading,
		isPreviousData,
	} = useQuery(
		[
			'allProperty',
			selectedCategory?.id,
			selectedSubCategory?.id,
			orderBy,
			search,
			auth?.user,
			count,
			priceFilter,
			page,
		],
		() =>
			getAllProductsApi({
				pageParam: page,
				category: selectedCategory?.id,
				subCategory: selectedSubCategory?.id,
				orderBy: orderBy,
				search: search,
				userId: auth?.user?.id,
				count: count,
				from: priceFilter?.from,
				to: priceFilter?.to,
			}),
		{
			keepPreviousData: true,
			staleTime: 5000,
			select: res => res.results,
		}
	);

	useEffect(() => {
		if (!isPreviousData && propertyData?.next_page_url) {
			queryClient.prefetchQuery(
				[
					'allProperty',
					selectedCategory?.id,
					selectedSubCategory?.id,
					orderBy,
					search,
					auth?.user,
					count,
					priceFilter,
					page + 1,
				],
				() =>
					getAllProductsApi({
						pageParam: page + 1,
						category: selectedCategory?.id,
						subCategory: selectedSubCategory?.id,
						orderBy: orderBy,
						search: search,
						userId: auth?.user?.id,
						count: count,
						from: priceFilter?.from,
						to: priceFilter?.to,
					})
			);
		}
	}, [propertyData, isPreviousData, page, queryClient]);

	useEffect(() => {
		setPage(1);
	}, [selectedCategory, selectedSubCategory, orderBy, search, priceFilter]);

	const handleSetPriceFilter = price => {
		setPriceFilter(price);
	};

	// useInfiniteScroll({ action: fetchNextPage, hasNextPage });

	return (
		<>
			<header className="relative pt-40 pb-64 lg:pb-6 lg:pt-10 bg-bgSoft">
				<PropertyHeroSection type={type} category={category} />

				<div className="absolute left-0 right-0 z-10 px-4 -translate-y-1/2 lg:px-0 top-full">
					<PropertyFilter
						category={selectedCategory}
						selectedSubCategory={selectedSubCategory}
						setSelectedSubCategory={setSelectedSubCategory}
						setOrderBy={setOrderBy}
						setSearch={setSearch}
						setPrice={handleSetPriceFilter}
					/>
				</div>
			</header>

			<main className="mb-40 mt-72 lg:mt-0">
				{isPropertyDataLoading ? (
					<div className="flex flex-col items-center justify-center w-full gap-6 h-96">
						<SyncLoader color="#2563EB" />
						<p className="font-medium text-gray-400">Memuat...</p>
					</div>
				) : !isPropertyDataLoading &&
				  //   propertyData?.pages[0]?.results?.length === 0 ? (
				  propertyData?.length === 0 ? (
					<div className="flex flex-col items-center justify-center w-full gap-6 h-96">
						<p className="font-medium text-gray-400">
							Tidak ada properti yang ditemukan
						</p>
					</div>
				) : !isPropertyDataLoading &&
				  //   propertyData?.pages[0]?.results?.data?.length > 0 ? (
				  propertyData?.data?.length > 0 ? (
					<>
						<MainContainer
							className={`grid grid-cols-1 mt-40 mb-20 md:grid-cols-2 place-items-center gap-y-8 ${
								category !== 'baru'
									? 'lg:grid-cols-3 2xl:grid-cols-4'
									: 'xl:grid-cols-3 lg:grid-cols-2'
							}`}
						>
							{category !== 'baru' ? (
								<>
									{/* {propertyData?.pages?.map(page =>
										page?.results?.data?.map((item, index) => (
											<PropertyCard key={index} data={item} />
										))
									)} */}
									{propertyData?.data?.map((item, index) => (
										<PropertyCard key={index} data={item} />
									))}
								</>
							) : (
								<>
									{propertyData?.data?.map((item, index) => (
										<NewPropertyCard key={index} data={item} />
									))}
								</>
							)}
						</MainContainer>

						{/* {isFetchingNextPage && (
							<div className="flex flex-col items-center justify-center w-full gap-6 py-10">
								<SyncLoader color="#2563EB" />
								<p className="font-medium text-gray-400">Memuat...</p>
							</div>
						)} */}

						<MainPaginate
							isLoading={isPropertyDataLoading}
							maxPageSlice={5}
							setPage={setPage}
							pageSlice={pageSlice}
							setPageSlice={setPageSlice}
							data={propertyData}
						/>
					</>
				) : null}
			</main>

			<ScrollToTopNav />
		</>
	);
}
