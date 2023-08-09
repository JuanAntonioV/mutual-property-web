import { useQuery } from '@tanstack/react-query';
import { getListingProductsApi } from '../../api/product-api';
import PropertyCard from '../cards/PropertyCard';
import MainContainer from '../containers/MainContainer';
import SectionContainer from '../containers/SectionContainer';
import SectionTitle from '../titles/SectionTitle';
import { SyncLoader } from 'react-spinners';
import { useNavigate } from 'react-router-dom';
import { isMobile } from 'react-device-detect';
import { useEffect, useState } from 'react';

export default function ListingPropertySection() {
	const navigate = useNavigate();
	const [count, setCount] = useState(0);

	useEffect(() => {
		if (isMobile) {
			setCount(4);
		} else {
			setCount(8);
		}
	}, [isMobile]);

	const { data: listingProperty, isLoading: isListingPropertyLoading } =
		useQuery(
			['listingProperty', count],
			() =>
				getListingProductsApi({
					count: count,
				}),
			{
				select: data => data.results,
				refetchOnWindowFocus: false,
			}
		);

	const handleViewAllNavigate = () => {
		navigate('/property?category=disewa&type=rumah');
	};

	if (!isListingPropertyLoading && listingProperty?.length === 0) return null;

	return (
		<SectionContainer className="mt-20">
			<MainContainer>
				<header>
					<SectionTitle
						title={'Properti Seken Buat Kamu '}
						description={
							'Cek listingan terbaru kami serta informasi selengkapnya'
						}
					/>
				</header>
			</MainContainer>

			<main>
				{isListingPropertyLoading ? (
					<div className="flex flex-col items-center justify-center w-full gap-6 h-96">
						<SyncLoader color="#2563EB" />
						<p className="font-medium text-gray-400">Memuat...</p>
					</div>
				) : (
					<MainContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 place-items-center gap-y-8">
						{listingProperty?.map((property, index) => (
							<PropertyCard key={index} data={property} />
						))}
					</MainContainer>
				)}
			</main>

			{!isListingPropertyLoading && (
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
