import { useState } from 'react';

import { textDotsFormat } from '@/utils/formaters';

import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { IoLocationSharp } from 'react-icons/io5';

import HouseImage from '@/assets/img/house.jpg';
import ImageCardCarousel from '../carousel/ImageCardCarousel';
import { useNavigate } from 'react-router-dom';

export default function NewPropertyCard() {
	const [like, setLike] = useState(false);
	const navigate = useNavigate();

	const hadleCardClicked = () => {
		navigate('/property/rumah-disewa-baru-2023?category=baru');
	};

	const handleLikeClicked = e => {
		e.stopPropagation();
		setLike(!like);
	};

	const imageList = [HouseImage, HouseImage, HouseImage, HouseImage];

	return (
		<div
			className="w-full md:w-[420px] bg-white shadow-md rounded-lg overflow-hidden"
			onClick={hadleCardClicked}
		>
			<ImageCardCarousel image={imageList} />

			<main className="p-5 cursor-pointer">
				<div className="flex item-center gap-x-2">
					<IoLocationSharp size={18} color="#00092980" />

					<span className="block mb-0 text-sm leading-tight text-secondarySoftTrans md:hidden md:text-base">
						{textDotsFormat(
							'Jl.Pelita VI, Kel. Sidorame, Kec.Medan Helvetia',
							36
						)}
					</span>
					<span className="hidden mb-0 text-sm leading-tight text-secondarySoftTrans md:block md:text-base">
						{textDotsFormat(
							'Jl.Pelita VI, Kel. Sidorame, Kec.Medan Helvetia',
							38
						)}
					</span>
				</div>

				<h3 className="mt-3 text-lg font-bold md:text-xl">
					Ampera Tomio | by 123 Property
				</h3>

				<div className="pt-4 mt-4 space-y-1 border-t border-borderPrimary">
					<h1 className="text-lg font-semibold">Dimulai dari Rp.900.000.000</h1>

					<p className="text-sm text-secondary sm:text-base">
						3 tipe unit | 13 Jumlah Unit
					</p>
				</div>
			</main>

			<footer className="px-5 pt-2 pb-5 cursor-pointer flexBetween">
				<span className={'text-sm text-secondarySoftTrans'}>
					#1 • Diposting 12 Agustus 2023
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
