import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { getAllProductsApi } from '../../api/product-api';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import PropertyCard from '../../components/cards/PropertyCard';
import { SyncLoader } from 'react-spinners';
import MainContainer from '../../components/containers/MainContainer';
import MainPaginate from '../../components/pagination/MainPaginate';
import useInfiniteScroll from '@/hooks/useInfiniteScroll';
import useStore from '@/hooks/useStore';

export default function SearchPropertyPage() {
	const [searchParams] = useSearchParams();
	const [search, setSearch] = useState('');
	const { auth } = useStore();

	useEffect(() => {
		const keyword = searchParams.get('keyword');

		if (keyword) {
			setSearch(keyword);
		}
	}, [searchParams]);

	const {
		data: propertyData,
		isLoading: isPropertyDataLoading,
		fetchNextPage,
		isFetchingNextPage,
		hasNextPage,
	} = useInfiniteQuery(
		['allProperty', search, auth?.user],
		({ pageParam }) =>
			getAllProductsApi({
				pageParam,
				search: search,
				userId: auth?.user?.id,
			}),
		{
			cacheTime: 0,
			getNextPageParam: (lastPage, pages) => {
				if (pages.length < lastPage.results.last_page) {
					return pages.length + 1;
				} else {
					return undefined;
				}
			},
		}
	);

	useEffect(() => {
		console.log(propertyData);
	}, [propertyData]);

	useInfiniteScroll({ action: fetchNextPage, hasNextPage });

	return (
		<>
			<MainContainer>
				<div className="mt-36">
					<p className="text-xl font-semibold text-gray-800">
						Hasil pencarian untuk "{search}"
					</p>
				</div>
			</MainContainer>

			<main className="mt-10 md:mb-40 lg:mt-0">
				{isPropertyDataLoading ? (
					<MainContainer>
						<div className="flex flex-col items-center justify-center w-full gap-6 h-96">
							<SyncLoader color="#2563EB" />
							<p className="font-medium text-gray-400">Memuat...</p>
						</div>
					</MainContainer>
				) : !isPropertyDataLoading &&
				  propertyData?.pages[0]?.results?.length === 0 ? (
					<MainContainer>
						<div className="flex flex-col items-center justify-center w-full h-[calc(100vh-485px)] gap-6">
							<p className="font-medium text-gray-400">
								Tidak ada properti yang ditemukan
							</p>
						</div>
					</MainContainer>
				) : !isPropertyDataLoading &&
				  propertyData?.pages[0]?.results?.data?.length > 0 ? (
					<>
						<MainContainer
							className={`grid grid-cols-1 mt-14 md:mt-20 mb-20 md:grid-cols-2 place-items-center gap-y-8 lg:grid-cols-3 2xl:grid-cols-4`}
						>
							{propertyData?.pages?.map(page =>
								page?.results?.data?.map((item, index) => (
									<PropertyCard key={index} data={item} />
								))
							)}
						</MainContainer>

						{isFetchingNextPage && (
							<div className="flex flex-col items-center justify-center w-full gap-6 py-10">
								<SyncLoader color="#2563EB" />
								<p className="font-medium text-gray-400">Memuat...</p>
							</div>
						)}
					</>
				) : null}
			</main>
		</>
	);
}
