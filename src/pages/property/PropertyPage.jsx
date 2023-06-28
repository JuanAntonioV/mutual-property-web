import MainContainer from '@/components/containers/MainContainer';
import PropertyHeroSection from '@/components/sections/PropertyHeroSection';
import PropertyFilter from '@/components/filters/PropertyFilter';
import NewPropertyCard from '@/components/cards/NewPropertyCard';

import { MdKeyboardArrowRight } from 'react-icons/md';
import { useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getAllProductsApi } from '../../api/product-api';
import { useEffect, useState } from 'react';
import PropertyCard from '../../components/cards/PropertyCard';
import { SyncLoader } from 'react-spinners';
import useStore from '../../hooks/useStore';
import MainPaginate from '../../components/pagination/MainPaginate';

export default function PropertyPage() {
	// const router = useRouter();
	// const pathname = usePathname();
	const [searchParams] = useSearchParams();
	const category = searchParams.get('category');
	const type = searchParams.get('type');
	const [page, setPage] = useState(1);
	const [pageSlice, setPageSlice] = useState([]);
	const [selectedCategory, setSelectedCategory] = useState(null);
	const [selectedSubCategory, setSelectedSubCategory] = useState(null);
	const [orderBy, setOrderBy] = useState('created_at');
	const [search, setSearch] = useState('');

	const { category: categoryData } = useStore();

	// useEffect(() => {
	//     if (pathname === '/property')
	//         router.push('/property?category=disewa&type=rumah');
	// }, [pathname, router]);

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

	const { data: propertyData, isLoading: isPropertyDataLoading } = useQuery(
		[
			'allProperty',
			page,
			selectedCategory?.id,
			selectedSubCategory?.id,
			orderBy,
			search,
		],
		() =>
			getAllProductsApi({
				page: page,
				category: selectedCategory?.id,
				subCategory: selectedSubCategory?.id,
				orderBy: orderBy,
				search: search,
			}),
		{
			select: data => data.results,
		}
	);

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
					/>
				</div>
			</header>

			<main className="mb-40 mt-60 lg:mt-0">
				{isPropertyDataLoading ? (
					<div className="flex flex-col items-center justify-center w-full gap-6 h-96">
						<SyncLoader color="#2563EB" />
						<p className="font-medium text-gray-400">Memuat...</p>
					</div>
				) : !isPropertyDataLoading && propertyData?.length === 0 ? (
					<div className="flex flex-col items-center justify-center w-full gap-6 h-96">
						<p className="font-medium text-gray-400">
							Tidak ada property yang ditemukan
						</p>
					</div>
				) : (
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
									{propertyData?.data?.map((property, index) => (
										<PropertyCard key={index} data={property} />
									))}
								</>
							) : (
								<>
									{propertyData?.data?.map((property, index) => (
										<NewPropertyCard key={index} data={property} />
									))}
								</>
							)}
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
