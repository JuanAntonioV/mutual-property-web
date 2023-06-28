import { FiShare } from 'react-icons/fi';
import DeveloperInfo from '../../components/features/DeveloperInfo';
import PropertyImage from '../../components/features/PropertyImage';
import PropertyPriceList from '../../components/features/PropertyPriceList';
import PropertyProjectDetail from '../../components/features/PropertyProjectDetail';
import PropertySidePlan from '../../components/features/PropertySidePlan';
import TypeProperty from '../../components/features/TypeProperty';
import { BsMap } from 'react-icons/bs';
import { formatPrice } from '../../utils/formaters';
import { useQuery } from '@tanstack/react-query';
import { getProjectDetailApi } from '../../api/project-api';
import { useParams } from 'react-router-dom';
import ScreenLoading from '../../components/handlers/ScreenLoading';
import MainContainer from '../../components/containers/MainContainer';
import NotFoundPage from '../notFound/NotFoundPage';

export default function ProjectDetailPage() {
	const { slug } = useParams();

	const { data, isLoading, isError } = useQuery(
		['projectDetails', slug],
		() => getProjectDetailApi({ slug }),
		{
			staleTime: 1000 * 60 * 5,
			refetchOnWindowFocus: false,
			enabled: !!slug,
			select: res => res.results,
		}
	);

	const handleViewMap = () => {
		// push to map page but in new tab
		const url = `${data?.map_url}`;
		window.open(url, '_blank');
	};

	const handleShare = () => {
		// copy current url to clipboard and share it to whatsapp
		const url = `${window.location.href}`;
		navigator.clipboard.writeText(url);

		const message = `Cek properti ${data?.name} di ${data?.address} 
		Dimulai Dari harga ${formatPrice(data?.started_price)} dapat dilihat di ${url}`;
		const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
		window.open(whatsappUrl, '_blank');
	};

	if (isLoading) return <ScreenLoading />;

	if (isError) return <NotFoundPage />;

	return (
		<MainContainer className="mt-[130px] pb-20">
			<header className="flex flex-col py-10 gap-y-6 md:flex-row md:flexBetween">
				<div className="w-full space-y-2 md:space-y-1">
					<h1 className="text-2xl font-bold">{data?.name}</h1>
					<h2 className="text-2xl font-bold text-primary">
						Dimulai Dari Rp {formatPrice(data?.started_price)}
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

					<PropertyProjectDetail data={data} />
					<PropertyPriceList data={data} />
					<PropertySidePlan data={data} />
				</div>

				<div className="col-span-1 space-y-8 md:sticky md:top-36 h-fit">
					<DeveloperInfo data={data} />
					<TypeProperty data={data} />
				</div>
			</main>
		</MainContainer>
	);
}
