import { useNavigate } from 'react-router-dom';

import { IoDocumentTextOutline, IoLocationSharp } from 'react-icons/io5';
import { MdOutlineKingBed } from 'react-icons/md';
import { TbStairs } from 'react-icons/tb';
import { BiBath } from 'react-icons/bi';

import HouseImage from '@/assets/img/house.jpg';

import ImageCardCarousel from '../carousel/ImageCardCarousel';
import CardLiker from './CardLiker';

import { textDotsFormat } from '@/utils/formaters';

export default function PropertyCard() {
	const navigate = useNavigate();

	const hadleCardClicked = () => {
		navigate('/property/rumah-disewa-baru-2023');
	};

	const imageList = [HouseImage, HouseImage, HouseImage, HouseImage];

	return (
		<div
			className="w-full md:w-[340px] lg:w-[330px] bg-white shadow-md rounded-lg overflow-hidden"
			onClick={hadleCardClicked}
		>
			<ImageCardCarousel image={imageList} height={230} />

			<main className="p-5 border-b cursor-pointer border-borderPrimary">
				<span className="px-2 py-1 text-sm font-medium rounded-md bg-bgWarningBadge text-textWarningBadge">
					Rumah
				</span>

				<h3 className="hidden mt-4 text-lg font-bold md:block">
					{textDotsFormat(
						'Dijual Rumah di Setia Budi Jakarta Selatan dan Kota Medan',
						50
					)}
				</h3>
				<h3 className="block mt-4 text-lg font-bold md:hidden">
					{textDotsFormat(
						'Dijual Rumah di Setia Budi Jakarta Selatan dan Kota Medan',
						80
					)}
				</h3>

				<div className="flex mt-3 item-center gap-x-2">
					<IoLocationSharp size={18} color="#00092980" />
					<span className="hidden mb-0 text-sm leading-none text-secondarySoftTrans md:block md:text-base">
						{textDotsFormat(
							'Jl.Pelita VI, Kel. Sidorame, Kec.Medan Helvetia',
							30
						)}
					</span>
					<span className="block mb-0 text-sm leading-none text-secondarySoftTrans md:hidden md:text-base">
						{textDotsFormat(
							'Jl.Pelita VI, Kel. Sidorame, Kec.Medan Helvetia',
							37
						)}
					</span>
				</div>

				<div className="mt-4 flexBetween">
					<div className="flex item-center gap-x-1">
						<MdOutlineKingBed size={18} color="#00092980" />
						<span className="mb-0 text-sm leading-none text-secondarySoftTrans">
							3 beds
						</span>
					</div>
					<div className="flex item-center gap-x-1">
						<BiBath size={18} color="#00092980" />
						<span className="mb-0 text-sm leading-none text-secondarySoftTrans">
							2 baths
						</span>
					</div>
					<div className="flex item-center gap-x-1">
						<TbStairs size={18} color="#00092980" />
						<span className="mb-0 text-sm leading-none text-secondarySoftTrans">
							1 floor
						</span>
					</div>
					<div className="flex item-center gap-x-1">
						<IoDocumentTextOutline size={18} color="#00092980" />
						<span className="mb-0 text-sm leading-none text-secondarySoftTrans">
							SHM
						</span>
					</div>
				</div>
			</main>

			<footer className="px-5 pt-3 pb-5 flexBetween">
				<span className={'text-sm text-secondarySoftTrans'}>
					#1 • Diposting 12 Agustus 2023
				</span>

				<CardLiker />
			</footer>
		</div>
	);
}
