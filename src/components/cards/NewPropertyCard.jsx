import { textDotsFormat } from '@/utils/formaters';

import { IoLocationSharp } from 'react-icons/io5';

import ImageCardCarousel from '../carousel/ImageCardCarousel';
import { useNavigate } from 'react-router-dom';
import { dateFormater, formatPrice } from '../../utils/formaters';
import CardLiker from './CardLiker';

export default function NewPropertyCard({ data, small }) {
	const navigate = useNavigate();

	const hadleCardClicked = () => {
		navigate(`/projects/${data?.slug}`);
	};

	return (
		<div
			className={`w-full bg-white shadow-md rounded-lg overflow-hidden ${
				small ? ' md:w-[330px]' : 'md:w-[420px]'
			}`}
			onClick={hadleCardClicked}
		>
			<ImageCardCarousel image={data?.images} height={small ? '230' : '280'} />

			<main className="p-5 cursor-pointer">
				<div className="flex item-center gap-x-2">
					<IoLocationSharp size={18} color="#00092980" />

					<span className="block text-sm leading-tight text-secondarySoftTrans md:hidden md:text-base">
						{textDotsFormat(data?.address, small ? 26 : 36)}
					</span>
					<span className="hidden text-sm leading-tight text-secondarySoftTrans md:block md:text-base">
						{textDotsFormat(data?.address, small ? 28 : 38)}
					</span>
				</div>

				<h3 className="mt-3 text-lg font-bold md:text-xl">
					{data?.name} | by {data?.developer_name}
				</h3>

				<div className="pt-4 mt-4 space-y-1 border-t border-borderPrimary">
					<h1 className="text-lg font-semibold">
						Dimulai dari Rp {formatPrice(data?.started_price)}
					</h1>

					<p className="text-sm text-secondary sm:text-base">
						{data?.total_product_types} tipe unit | {data?.detail?.total_unit}{' '}
						Jumlah Unit
					</p>
				</div>
			</main>

			<footer className="px-5 pt-2 pb-5 cursor-pointer flexBetween">
				<span className={'text-sm text-secondarySoftTrans'}>
					#{data?.id} • Diposting {dateFormater(data?.created_at)}
				</span>

				<CardLiker projectId={data?.id} isFavorite={parseInt(data?.favorite)} />
			</footer>
		</div>
	);
}
