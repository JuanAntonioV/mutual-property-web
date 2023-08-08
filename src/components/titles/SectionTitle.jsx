export default function SectionTitle({
	title,
	titleColor = 'text-black',
	label,
	description,
	labelColor = 'bg-bgNegative',
	center,
}) {
	return (
		<div
			className={`py-10 space-y-2 lg:space-y-0 ${
				center ? 'flexCenterCol text-center' : ''
			}`}
		>
			<div className="flex items-center gap-x-4">
				<h2 className={`text-xl font-bold md:text-2xl ${titleColor}`}>
					{title}
				</h2>

				{label ? (
					<span
						className={`text-sm font-bold py-1 px-3 text-white rounded-full ${labelColor}`}
					>
						{label}
					</span>
				) : null}
			</div>
			<p className="mt-1 text-sm md:text-lg text-medium text-secondary">
				{description}
			</p>
		</div>
	);
}
