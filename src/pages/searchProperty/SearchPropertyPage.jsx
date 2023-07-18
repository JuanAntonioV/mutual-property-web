import { useQuery } from '@tanstack/react-query';
import { getAllProductsApi } from '../../api/product-api';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import PropertyCard from '../../components/cards/PropertyCard';
import { SyncLoader } from 'react-spinners';
import MainContainer from '../../components/containers/MainContainer';
import MainPaginate from '../../components/pagination/MainPaginate';

export default function SearchPropertyPage() {
	const [searchParams] = useSearchParams();
	const [page, setPage] = useState(1);
	const [pageSlice, setPageSlice] = useState([]);
	const [search, setSearch] = useState('');

	useEffect(() => {
		const keyword = searchParams.get('keyword');

		if (keyword) {
			setSearch(keyword);
		}
	}, [searchParams]);

	const { data: propertyData, isLoading: isPropertyDataLoading } = useQuery(
		['allProperty', page, search],
		() =>
			getAllProductsApi({
				page: page,
				search: search,
			}),
		{
			select: data => data.results,
		}
	);

	return (
		<>
			<MainContainer>
				<div className="mt-40">
					<p className="text-2xl font-semibold text-gray-800">
						Hasil pencarian untuk "{search}"
					</p>
				</div>
			</MainContainer>

			<main className="mt-10 mb-40 lg:mt-0">
				{isPropertyDataLoading ? (
					<MainContainer>
						<div className="flex flex-col items-center justify-center w-full gap-6 h-96">
							<SyncLoader color="#2563EB" />
							<p className="font-medium text-gray-400">Memuat...</p>
						</div>
					</MainContainer>
				) : !isPropertyDataLoading && propertyData?.length === 0 ? (
					<MainContainer>
						<div className="flex flex-col items-center justify-center w-full gap-6 h-96">
							<p className="font-medium text-gray-400">
								Tidak ada property yang ditemukan
							</p>
						</div>
					</MainContainer>
				) : (
					<>
						<MainContainer
							className={`grid grid-cols-1 mt-20 mb-20 md:grid-cols-2 place-items-center gap-y-8 lg:grid-cols-3 2xl:grid-cols-4`}
						>
							{propertyData?.data?.map((property, index) => (
								<PropertyCard key={index} data={property} />
							))}
						</MainContainer>

						<MainPaginate
							page={page}
							setPage={setPage}
							pageSlice={pageSlice}
							setPageSlice={setPageSlice}
							data={propertyData}
						/>
					</>
				)}
			</main>
		</>
	);
}
