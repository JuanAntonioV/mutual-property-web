import { BiSearch } from 'react-icons/bi';

export default function HomePageStat({ value, detail, onClick }) {
	return (
		<div
			className={`flex items-center gap-6 w-full ${
				onClick ? 'cursor-pointer  duration-200 rounded-md group relative' : ''
			}`}
			onClick={onClick}
		>
			<span className="h-14 md:h-16 w-[3px] rounded-full bg-primary/50"></span>

			<div className="md:space-y-1">
				<span className="text-2xl font-bold xl:text-3xl text-primary">
					{value ?? '20K+'}+
				</span>
				<p className="text-sm font-medium text-secondary md:text-base">
					{detail ?? 'Detail'}
				</p>
			</div>

			{onClick && (
				<div className="absolute p-2 transition-opacity duration-200 bg-white rounded-full shadow-md opacity-0 right-4 flexCenter group-hover:opacity-100">
					<BiSearch size={20} className="text-primary" />
				</div>
			)}
		</div>
	);
}
