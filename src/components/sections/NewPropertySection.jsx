import { useQuery } from '@tanstack/react-query';
import PropertyCard from '../cards/PropertyCard';
import MainContainer from '../containers/MainContainer';
import SectionContainer from '../containers/SectionContainer';
import SectionTitle from '../titles/SectionTitle';
import { getNewestProductsApi } from '../../api/product-api';
import { SyncLoader } from 'react-spinners';

export default function NewPropertySection() {
	const { data: newProperty, isLoading: isNewPropertyLoading } = useQuery(
		['newestProperties'],
		getNewestProductsApi,
		{
			select: data => data.results,
		}
	);

	if (!isNewPropertyLoading && newProperty.length === 0) return null;

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

			<main className="bg-gradient-to-b from-white via-indigo-50 via-80% to-white">
				{isNewPropertyLoading ? (
					<div className="flex flex-col items-center justify-center w-full gap-6 h-96">
						<SyncLoader color="#2563EB" />
						<p className="font-medium text-gray-400">Memuat...</p>
					</div>
				) : (
					<MainContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 place-items-center gap-y-8">
						{newProperty?.map((property, index) => (
							<PropertyCard key={index} data={property} />
						))}
					</MainContainer>
				)}
			</main>
		</SectionContainer>
	);
}
