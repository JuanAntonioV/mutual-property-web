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
							className={`w-10 h-10 px-4 py-2 mx-1 rounded-md border border-borderPrimary flexCenter ${
								data?.current_page === index + 1
									? 'border-primary bg-primary text-white'
									: 'border-borderPrimary text-textSecondary'
							}`}
							onClick={() => setPage(index + 1)}
						>
							{index + 1}
						</button>
					))
					.slice(
						pageSlice - maxPageSlice < 0 ? 0 : pageSlice - maxPageSlice,
						pageSlice < maxPageSlice ? maxPageSlice : pageSlice
					)}

				{pageSlice < data?.last_page && data?.last_page > maxPageSlice ? (
					<button
						className="px-2.5 py-2 mx-1 text-white rounded-md bg-white border border-borderPrimary flexCenter"
						onClick={nextSlicePage}
					>
						<MdKeyboardArrowRight size={24} color="#213D77" />
					</button>
				) : null}
			</div>
		</>
	);
}
