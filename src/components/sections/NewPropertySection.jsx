import PropertyCard from '../cards/PropertyCard';
import MainContainer from '../containers/MainContainer';
import SectionContainer from '../containers/SectionContainer';
import SectionTitle from '../titles/SectionTitle';

export default function NewPropertySection() {
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
				<MainContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 place-items-center gap-y-8">
					<PropertyCard />
					<PropertyCard />
					<PropertyCard />
					<PropertyCard />
					<PropertyCard />
					<PropertyCard />
					<PropertyCard />
					<PropertyCard />
				</MainContainer>
			</main>
		</SectionContainer>
	);
}
