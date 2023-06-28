import { useState } from 'react';

import { textDotsFormat } from '@/utils/formaters';

import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { IoLocationSharp } from 'react-icons/io5';

import HouseImage from '@/assets/img/house.jpg';
import ImageCardCarousel from '../carousel/ImageCardCarousel';
import { useNavigate } from 'react-router-dom';
import { dateFormater, formatPrice } from '../../utils/formaters';

export default function NewPropertyCard({ data }) {
	const [like, setLike] = useState(false);
	const navigate = useNavigate();

	const hadleCardClicked = () => {
		navigate(`/projects/${data?.slug}`);
	};

	const handleLikeClicked = e => {
		e.stopPropagation();
		setLike(!like);
	};

	return (
		<div
			className="w-full md:w-[420px] bg-white shadow-md rounded-lg overflow-hidden"
			onClick={hadleCardClicked}
		>
			<ImageCardCarousel image={data?.images} />

			<main className="p-5 cursor-pointer">
				<div className="flex item-center gap-x-2">
					<IoLocationSharp size={18} color="#00092980" />

					<span className="block text-sm leading-tight text-secondarySoftTrans md:hidden md:text-base">
						{textDotsFormat(data?.address, 36)}
					</span>
					<span className="hidden text-sm leading-tight text-secondarySoftTrans md:block md:text-base">
						{textDotsFormat(data?.address, 38)}
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

				<button className="flexCenter" onClick={handleLikeClicked}>
					{like ? (
						<AiFillHeart size={38} color="#EB4335" />
					) : (
						<AiOutlineHeart size={38} color="#00092980" />
					)}
				</button>
			</footer>
		</div>
	);
}
