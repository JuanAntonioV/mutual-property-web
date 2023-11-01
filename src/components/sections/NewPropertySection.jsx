import { useQuery } from '@tanstack/react-query';
import PropertyCard from '../cards/PropertyCard';
import MainContainer from '../containers/MainContainer';
import SectionContainer from '../containers/SectionContainer';
import SectionTitle from '../titles/SectionTitle';
import { getNewestProductsApi } from '../../api/product-api';
import { SyncLoader } from 'react-spinners';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { isMobile } from 'react-device-detect';
import { useEffect, useState } from 'react';
import NewPropertyCard from '../cards/NewPropertyCard';

export default function NewPropertySection() {
	const navigate = useNavigate();
	const [count, setCount] = useState(0);

	const [searchParams] = useSearchParams();
	const marketingRef = searchParams.get('ref');

	useEffect(() => {
		if (isMobile) {
			setCount(4);
		} else {
			setCount(6);
		}
	}, [isMobile]);

	const { data: newProperty, isLoading: isNewPropertyLoading } = useQuery(
		['newestProperties', count],
		() =>
			getNewestProductsApi({
				count: count,
			}),
		{
			select: data => data.results,
			refetchOnWindowFocus: false,
		}
	);

	const handleViewAllNavigate = () => {
		navigate(
			`/property?category=baru&type=rumah${
				marketingRef ? `&ref=${marketingRef}` : ''
			}`
		);
	};

	if (!isNewPropertyLoading && newProperty?.length === 0) return null;

	return (
		<SectionContainer>
			<MainContainer>
				<header>
					<SectionTitle
						title={'Properti Baru Buat Kamu'}
						description={'Cek properti terbaru kami serta informasi lengkapnya'}
						label={'Baru'}
					/>
				</header>
			</MainContainer>

			<main className="bg-gradient-to-b from-white via-indigo-50 via-50% to-white">
				{isNewPropertyLoading ? (
					<div className="flex flex-col items-center justify-center w-full gap-6 h-96">
						<SyncLoader color="#2563EB" />
						<p className="font-medium text-gray-400">Memuat...</p>
					</div>
				) : (
					<MainContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 place-items-center gap-y-8">
						{newProperty?.map((property, index) => (
							<NewPropertyCard key={index} data={property} />
						))}
					</MainContainer>
				)}
			</main>

			{!isNewPropertyLoading && (
				<footer className="mt-14">
					<MainContainer className="flex justify-center">
						<button
							className="px-20 outline-none btnSecondary w-fit"
							onClick={handleViewAllNavigate}
						>
							Selengkapnya
						</button>
					</MainContainer>
				</footer>
			)}
		</SectionContainer>
	);
}
