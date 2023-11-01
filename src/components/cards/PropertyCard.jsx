import { useNavigate, useSearchParams } from 'react-router-dom';

import { IoDocumentTextOutline, IoLocationSharp } from 'react-icons/io5';
import { MdOutlineKingBed } from 'react-icons/md';
import { TbStairs } from 'react-icons/tb';
import { BiBath } from 'react-icons/bi';

import ImageCardCarousel from '../carousel/ImageCardCarousel';
import CardLiker from './CardLiker';

import { formatPrice, textDotsFormat } from '@/utils/formaters';
import { dateFormater } from '../../utils/formaters';
import _ from 'lodash';

export default function PropertyCard({ data, isNewest }) {
	const navigate = useNavigate();
	const [searchParams] = useSearchParams();
	const marketingRef = searchParams.get('ref');

	const hadleCardClicked = () => {
		if (isNewest) {
			if (_.isEmpty(data?.project)) {
				navigate(
					`/property/${data?.slug}${marketingRef ? `?ref=${marketingRef}` : ''}`
				);
			} else {
				navigate(
					`/projects/${data?.project[0]?.slug}${
						marketingRef ? `?ref=${marketingRef}` : ''
					}`
				);
			}
		} else {
			navigate(
				`/property/${data?.slug}${marketingRef ? `?ref=${marketingRef}` : ''}`
			);
		}
	};

	return (
		<div
			className="w-full md:w-[340px] lg:w-[330px] bg-white shadow-md rounded-lg overflow-hidden"
			onClick={hadleCardClicked}
		>
			<ImageCardCarousel image={data?.images} height={230} />

			<main className="p-5 border-b cursor-pointer border-borderPrimary">
				<div>
					<span className="px-2 py-1 text-sm font-medium rounded-md bg-bgWarningBadge text-textWarningBadge">
						{data?.sub_category?.name}
					</span>

					<h4 className="mt-4 text-base font-semibold text-primary">
						Rp {formatPrice(String(data?.price) || '0')}
					</h4>
				</div>
				<div>
					<h3 className="hidden mt-2 font-bold md:block">
						{textDotsFormat(data?.title, 25)}
					</h3>
					<h3 className="block mt-2 font-bold md:hidden">
						{textDotsFormat(data?.title, 50)}
					</h3>
				</div>

				<div className="flex mt-2 item-center gap-x-1">
					<IoLocationSharp size={18} color="#1f2937" />
					<span className="hidden mb-0 mt-0.5 text-sm leading-none md:block">
						{textDotsFormat(data?.address, 30)}
					</span>
					<span className="block mb-0 text-sm mt-0.5 leading-none md:hidden">
						{textDotsFormat(data?.address, 37)}
					</span>
				</div>

				<div className="mt-4 flexBetween">
					<div className="flex item-center gap-x-1">
						<MdOutlineKingBed size={18} color="#00092980" />
						<span className="mb-0 text-sm leading-none text-secondarySoftTrans">
							{data?.detail?.bedroom} beds
						</span>
					</div>
					<div className="flex item-center gap-x-1">
						<BiBath size={18} color="#00092980" />
						<span className="mb-0 text-sm leading-none text-secondarySoftTrans">
							{data?.detail?.bathroom} baths
						</span>
					</div>
					<div className="flex item-center gap-x-1">
						<TbStairs size={18} color="#00092980" />
						<span className="mb-0 text-sm leading-none text-secondarySoftTrans">
							{data?.detail?.floor} floor
						</span>
					</div>
					<div className="flex item-center gap-x-1">
						<IoDocumentTextOutline size={18} color="#00092980" />
						<span className="mb-0 text-sm leading-none text-secondarySoftTrans">
							{data?.detail?.certificate}
						</span>
					</div>
				</div>
			</main>

			<footer className="px-5 pt-3 pb-5 flexBetween">
				<span className={'text-xs text-secondarySoftTrans'}>
					#{data?.id} • Diposting {dateFormater(data?.created_at, 'short')}
				</span>

				<CardLiker
					propertyId={data?.id}
					isFavorite={parseInt(data?.favorite)}
				/>
			</footer>
		</div>
	);
}
