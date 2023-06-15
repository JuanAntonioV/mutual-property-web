import { MdKeyboardArrowRight } from 'react-icons/md';
import PropertyCard from '@/components/cards/PropertyCard';

export default function FavoriteSection() {
	const maxPage = 50;

	return (
		<div className="flex flex-col w-full gap-10">
			<div className="w-full rounded-xl">
				<div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-y-8">
					{[...Array(6)].map((_, i) => (
						<div key={i} className="flexCenter">
							<PropertyCard key={i} />
						</div>
					))}
				</div>
			</div>

			<div className="flex justify-center">
				{Array.from({ length: maxPage }, (_, i) =>
					// show only 5 pages
					i < 4 ? (
						<button
							key={i}
							className={`px-4 py-2 mx-1 rounded-md border border-borderPrimary ${
								i === 0 ? 'bg-primary text-white' : 'bg-white text-primary'
							}`}
						>
							{i + 1}
						</button>
					) : null
				)}

				<button className="px-2.5 py-2 mx-1 text-white rounded-md bg-white border border-borderPrimary flexCenter">
					<MdKeyboardArrowRight size={24} color="#213D77" />
				</button>
			</div>
		</div>
	);
}
