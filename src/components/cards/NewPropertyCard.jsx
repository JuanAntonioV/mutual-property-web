import { textDotsFormat } from '@/utils/formaters';

import { IoLocationSharp } from 'react-icons/io5';

import ImageCardCarousel from '../carousel/ImageCardCarousel';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { dateFormater, formatPrice } from '../../utils/formaters';
import CardLiker from './CardLiker';

export default function NewPropertyCard({ data, small }) {
	const navigate = useNavigate();
	const [searchParams] = useSearchParams();
	const marketingRef = searchParams.get('ref');

	const hadleCardClicked = () => {
		navigate(
			`/projects/${data?.slug}${marketingRef ? `?ref=${marketingRef}` : ''}`
		);
	};

	return (
		<div
			className={`w-full bg-white h-[530px] shadow-md rounded-lg overflow-hidden relative ${
				small ? ' md:w-[330px]' : 'md:w-[420px]'
			}`}
			onClick={hadleCardClicked}
		>
			<ImageCardCarousel image={data?.images} height={small ? '230' : '280'} />

			<main className="p-5 cursor-pointer">
				<h3 className="md:text-lg">
					<strong>{data?.name}</strong> | by {data?.developer_name}
				</h3>

				<div className="pt-4 mt-4 space-y-1 border-t border-borderPrimary">
					<h1 className="text-lg font-semibold ">
						Harga Mulai Rp {formatPrice(data?.started_price)}
					</h1>

					<div className="flex mt-2 item-center gap-x-1">
						<IoLocationSharp size={18} color="#1f2937" className="mt-[3px]" />

						<span className="block text-sm md:hidden md:text-base">
							{textDotsFormat(data?.address, small ? 26 : 36)}
						</span>
						<span className="hidden text-sm md:block md:text-base">
							{textDotsFormat(data?.address, small ? 28 : 38)}
						</span>
					</div>

					{/* <p className="text-sm text-secondary sm:text-base">
						{data?.total_product_types} tipe unit | {data?.detail?.total_unit}{' '}
						Jumlah Unit
					</p> */}
				</div>
			</main>

			<footer className="absolute bottom-0 w-full px-5 pt-2 pb-5 cursor-pointer flexBetween">
				<span className={'text-xs text-secondarySoftTrans'}>
					#{data?.id} • Diposting {dateFormater(data?.created_at)}
				</span>

				<CardLiker projectId={data?.id} isFavorite={parseInt(data?.favorite)} />
			</footer>
		</div>
	);
}
