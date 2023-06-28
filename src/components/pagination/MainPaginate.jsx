import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';

export default function MainPaginate({
	isLoading,
	page,
	setPage,
	maxPageSlice = 5,
	data,
	setPageSlice,
	pageSlice,
}) {
	const nextSlicePage = () => {
		setPageSlice(pageSlice + maxPageSlice);
		setPage(pageSlice + 1);
	};

	const prevSlicePage = () => {
		setPageSlice(pageSlice - maxPageSlice);
		setPage(pageSlice - maxPageSlice);
	};

	if (isLoading) return null;

	return (
		<>
			<div className="py-10 flexCenter">
				{pageSlice > maxPageSlice && (
					<button
						className="px-2.5 py-2 mx-1 text-white rounded-md bg-white border border-borderPrimary flexCenter"
						onClick={prevSlicePage}
					>
						<MdKeyboardArrowLeft size={24} color="#213D77" />
					</button>
				)}

				{[...Array(data?.last_page || 1)]
					.map((_, index) => (
						<button
							key={index}
							className={`w-8 h-8 px-4 py-2 mx-1 rounded-md border border-borderPrimary ${
								data?.current_page === index + 1
									? 'border-primary text-primary'
									: 'border-borderPrimary text-textSecondary'
							}`}
							onClick={() => setPage(index + 1)}
						>
							{index + 1}
						</button>
					))
					.slice(pageSlice - maxPageSlice, pageSlice)}

				{pageSlice < data?.last_page ||
					(page > 1 && (
						<button
							className="px-2.5 py-2 mx-1 text-white rounded-md bg-white border border-borderPrimary flexCenter"
							onClick={nextSlicePage}
						>
							<MdKeyboardArrowRight size={24} color="#213D77" />
						</button>
					))}
			</div>
		</>
	);
}
