import { useSearchParams } from 'react-router-dom';

import { BsMap } from 'react-icons/bs';
import { FiShare } from 'react-icons/fi';

import MainContainer from '@/components/containers/MainContainer';
import SimulationKpr from '@/components/features/SimulationKpr';
import MarketingInfo from '@/components/features/MarketingInfo';
import PropertyImage from '@/components/features/PropertyImage';
import PropertyDetail from '@/components/features/PropertyDetail';
import DeveloperInfo from '@/components/features/DeveloperInfo';
import TypeProperty from '@/components/features/TypeProperty';
import PropertyProjectDetail from '@/components/features/PropertyProjectDetail';
import PropertyPriceList from '@/components/features/PropertyPriceList';
import PropertySidePlan from '@/components/features/PropertySidePlan';
import PropertyFloorPlan from '@/components/features/PropertyFloorPlan';

export default function PropertyDetailPage() {
	const [searchParams] = useSearchParams();
	const category = searchParams.get('category');
	const type = searchParams.get('type');

	const isCategoryBaru = category === 'baru';
	const isTypeExist = type !== null;

	return (
		<MainContainer className="mt-[100px] pb-20">
			<header className="flex flex-col py-10 gap-y-6 md:flex-row md:flexBetween">
				<div className="space-y-2 md:space-y-1">
					<h1 className="text-2xl font-bold">Rumah Johor</h1>
					<h2 className="text-2xl font-bold text-primary">Rp.878.000.000</h2>
					<p className="text-sm text-secondary md:text-base">
						Jl. Bilal Ujung, Kel. Pulo Brayan Darat I, Kec. Medan Timur, Kota.
						Medan, Sumatera Utara, 20221
					</p>
				</div>

				<div className="w-full gap-4 md:flexEnd flexCenter">
					<button className="w-full gap-3 px-6 py-2 text-sm btnSecondary flexCenter md:w-fit md:text-base">
						<BsMap size={18} />
						<span className="text-primary">Lihat peta</span>
					</button>
					<button className="w-full gap-3 px-6 py-2 text-sm btnSecondary flexCenter md:w-fit md:text-base">
						<FiShare size={18} />
						<span className="text-primary">Share</span>
					</button>
				</div>
			</header>

			<main className="grid grid-cols-1 gap-y-8 lg:gap-x-8 lg:grid-cols-3">
				<div className="col-span-2 space-y-8">
					<PropertyImage />

					{!isCategoryBaru && isTypeExist ? (
						<>
							<PropertyDetail />
						</>
					) : !isCategoryBaru && !isTypeExist ? (
						<>
							<PropertyDetail />
						</>
					) : (
						<>
							{!isTypeExist ? (
								<>
									<PropertyProjectDetail />
									<PropertyPriceList />
									<PropertySidePlan />
								</>
							) : (
								<>
									<PropertyDetail />
								</>
							)}
						</>
					)}
				</div>

				<div className="col-span-1 space-y-8 md:sticky md:top-36 h-fit">
					{!isCategoryBaru ? (
						<>
							<MarketingInfo />
							<SimulationKpr />
						</>
					) : (
						<>
							{!isTypeExist ? (
								<>
									<DeveloperInfo />
									<TypeProperty />
								</>
							) : (
								<>
									<PropertyFloorPlan />
									<SimulationKpr />
								</>
							)}
						</>
					)}
				</div>
			</main>
		</MainContainer>
	);
}
