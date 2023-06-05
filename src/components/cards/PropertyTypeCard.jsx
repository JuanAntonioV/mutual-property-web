import PropertyImage from '@/assets/img/house.jpg';
import { Link } from 'react-router-dom';

export default function PropertyTypeCard() {
	return (
		<div className="gap-6 flexBetween">
			<div className="overflow-hidden bg-gray-200 h-52 w-60 rounded-xl">
				<img
					src={PropertyImage}
					alt="Property Image"
					className="object-cover w-full h-full"
				/>
			</div>

			<div className="space-y-1 w-52">
				<header className="pb-4 space-y-1 md:space-y-0">
					<h4 className="text-lg font-semibold">Tipe 80</h4>
					<p className="text-sm text-secondary md:text-base">
						Jumlah Unit : 30
					</p>
					<p className="text-lg font-semibold md:text-xl text-primary">
						Rp.878.000.000
					</p>
				</header>

				<footer className="pt-4 border-t border-borderPrimary">
					<Link
						to={'/property/rumah-disewa-baru-2023?category=baru&type=tipe-39'}
						className="w-full gap-2 px-4 py-2 btnSecondary flexCenter"
					>
						<span className="text-sm text-primary">Lihat Detail</span>
					</Link>
				</footer>
			</div>
		</div>
	);
}
