import PropertyImage from '@/assets/img/house.jpg';
import { Link } from 'react-router-dom';
import { formatPrice, textDotsFormat } from '../../utils/formaters';

export default function PropertyTypeCard({ data }) {
	return (
		<div className="gap-6 flexBetween">
			<div className="overflow-hidden bg-gray-200 h-52 w-60 rounded-xl">
				<img
					src={data?.images[0].path}
					alt={data?.title}
					className="object-cover w-full h-full"
				/>
			</div>

			<div className="space-y-1 w-52">
				<header className="pb-4 space-y-1">
					<h4 className="text-lg font-semibold">
						{textDotsFormat(data?.title, 30)}
					</h4>
					<p className="text-sm text-secondary md:text-base">
						Jumlah Unit : {data?.total_unit ?? 0}
					</p>
					<p className="text-lg font-semibold md:text-xl text-primary">
						Rp {formatPrice(data?.price)}
					</p>
				</header>

				<footer className="pt-4 border-t border-borderPrimary">
					<Link
						to={`/property/${data?.slug}`}
						className="w-full gap-2 px-4 py-2 btnSecondary flexCenter"
					>
						<span className="text-sm text-primary">Lihat Detail</span>
					</Link>
				</footer>
			</div>
		</div>
	);
}
