import { BiImage } from 'react-icons/bi';

import HouseImage from '@assets/img/house.jpg';

export default function PropertyImage() {
	return (
		<div className="grid grid-cols-4 xl:grid-cols-3 grid-rows-2 h-[400px] gap-5 relative">
			<div className="w-full h-full col-span-4 row-span-1 overflow-hidden rounded-xl xl:col-span-2 xl:row-span-2">
				<img
					src={HouseImage}
					alt="House Image"
					className="w-full h-full object-cover"
				/>
			</div>
			<div className="w-full h-full col-span-2 row-span-1 overflow-hidden rounded-xl xl:col-span-1 xl:row-span-1">
				<img
					src={HouseImage}
					alt="House Image"
					className="w-full h-full object-cover"
				/>
			</div>
			<div className="w-full h-full col-span-2 row-span-1 overflow-hidden rounded-xl xl:col-span-1 xl:row-span-1">
				<img
					src={HouseImage}
					alt="House Image"
					className="w-full h-full object-cover"
				/>
			</div>

			<button className="absolute gap-2 px-5 py-3 bg-white shadow-lg hover:bg-white btnPrimary flexCenter bottom-4 right-4 w-fit">
				<BiImage size={22} color="#213D77" className="hidden md:block" />
				<span className="text-sm font-medium text-primary md:text-base">
					Lihat semua
				</span>
			</button>
		</div>
	);
}
