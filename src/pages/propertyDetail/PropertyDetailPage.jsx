import { useLocation, useParams, useSearchParams } from 'react-router-dom';

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
import { useQuery } from '@tanstack/react-query';
import { getProductDetailApi } from '../../api/product-api';
import ScreenLoading from '../../components/handlers/ScreenLoading';
import { formatPrice } from '../../utils/formaters';
import { useEffect, useMemo, useState } from 'react';

export default function PropertyDetailPage() {
	const [isProjectProduct, setIsProjectProduct] = useState(false);
	const [isProjectUnit, setIsProjectUnit] = useState(false);

	const { slug } = useParams();

	const { data, isLoading, isError } = useQuery(
		['propertyDetails', slug],
		() => getProductDetailApi({ slug }),
		{
			staleTime: 1000 * 60 * 5,
			enabled: !!slug,
			select: res => res.results,
		}
	);

	useEffect(() => {
		if (data?.categories_id == 3) {
			setIsProjectProduct(true);
		}

		setIsProjectUnit(data?.is_project_unit);
	}, [data]);

	const handleViewMap = () => {
		// push to map page but in new tab
		const url = `${data?.map_url}`;
		window.open(url, '_blank');
	};

	const handleShare = () => {
		// copy current url to clipboard and share it to whatsapp
		const url = `${window.location.href}`;
		navigator.clipboard.writeText(url);

		const message = `Cek properti ${data?.title} di ${data?.address} 
		seharga ${formatPrice(data?.price)} dapat dilihat di ${url}`;
		const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
		window.open(whatsappUrl, '_blank');
	};

	const [searchParams] = useSearchParams();
	const isRef = searchParams.get('ref');
	const isRefMarketingRef = useMemo(() => {
		return isRef ? true : false;
	}, [isRef]);

	if (isLoading) return <ScreenLoading />;

	if (isError) return <NotFoundPage />;

	return (
		<MainContainer className="mt-[130px] pb-20">
			<header className="flex flex-col py-10 gap-y-6 md:flex-row md:flexBetween">
				<div className="w-full space-y-2 md:space-y-1">
					<h1 className="text-2xl font-bold">{data?.title}</h1>
					<h2 className="text-2xl font-bold text-primary">
						Rp {formatPrice(data?.price)}
					</h2>
					<p className="text-sm text-secondary md:text-base">{data?.address}</p>
				</div>

				<div className="w-full gap-4 md:flexEnd flexCenter">
					<button
						className="w-full gap-3 px-6 py-2 text-sm btnSecondary flexCenter md:w-fit md:text-base"
						onClick={handleViewMap}
					>
						<BsMap size={18} />
						<span className="text-primary">Lihat peta</span>
					</button>
					<button
						className="w-full gap-3 px-6 py-2 text-sm btnSecondary flexCenter md:w-fit md:text-base"
						onClick={handleShare}
					>
						<FiShare size={18} />
						<span className="text-primary">Share</span>
					</button>
				</div>
			</header>

			<main className="grid grid-cols-1 gap-y-8 lg:gap-x-8 lg:grid-cols-3">
				<div className="col-span-2 space-y-8">
					<PropertyImage images={data?.images} />

					{!isProjectProduct && isProjectUnit ? (
						<>
							<PropertyDetail data={data} />
						</>
					) : !isProjectProduct && !isProjectUnit ? (
						<>
							<PropertyDetail data={data} />
						</>
					) : (
						<>
							{!isProjectUnit ? (
								<>
									<PropertyProjectDetail data={data} />
									<PropertyPriceList data={data} />
									<PropertySidePlan data={data} />
								</>
							) : (
								<>
									<PropertyDetail data={data} />
								</>
							)}
						</>
					)}
				</div>

				<div className="col-span-1 space-y-8 md:sticky md:top-36 h-fit">
					{!isProjectProduct ? (
						<>
							{!isRefMarketingRef && <MarketingInfo data={data} />}
							<SimulationKpr />
						</>
					) : (
						<>
							{!isProjectUnit ? (
								<>
									{!isRefMarketingRef && <DeveloperInfo data={data} />}
									<TypeProperty data={data} />
								</>
							) : (
								<>
									<PropertyFloorPlan data={data} />
									<SimulationKpr data={data} />
								</>
							)}
						</>
					)}
				</div>
			</main>
		</MainContainer>
	);
}
