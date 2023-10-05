import { BiSearch } from 'react-icons/bi';

export default function HomePageStat({ value, detail, onClick }) {
	return (
		<div
			className={`flex items-center gap-3 md:gap-6 w-full ${
				onClick ? 'cursor-pointer  duration-200 rounded-md group relative' : ''
			}`}
			onClick={onClick}
		>
			<span className="h-14 md:h-16 w-[3px] rounded-full bg-primary/50"></span>

			<div className="text-left md:space-y-1">
				<span className="text-2xl font-bold xl:text-3xl text-primary">
					{value ?? '20K+'}+
				</span>
				<p className="text-sm font-medium text-secondary md:text-base">
					{detail ?? 'Detail'}
				</p>
			</div>

			{onClick && (
				<div className="absolute right-0 p-2 transition-opacity duration-200 bg-white rounded-full shadow-md sm:right-4 flexCenter group-hover:bg-primary md:text-[20] top-0 sm:top-auto">
					<BiSearch className="duration-200 group-hover:text-white text-primary" />
				</div>
			)}
		</div>
	);
}
