import Marquee from 'react-fast-marquee';

export default function HotNewsTicker({ item }) {
	return (
		<div className="fixed top-[96px] left-0 right-0 bg-white border-b border-borderPrimary">
			<div className="absolute z-10 h-full px-6 font-bold bg-blue-200 text-primary flexCenter">
				Hot News
			</div>

			<Marquee className="m-0">
				{item?.map((item, index) => (
					<div
						key={index}
						className={
							'px-8 py-3 whitespace-nowrap relative text-black text-sm'
						}
					>
						{/* <div className="absolute top-1/2 -translate-y-1/2 left-0 w-[1px] h-[24px] bg-borderPrimary"></div> */}
						{item.title}
					</div>
				))}
			</Marquee>
		</div>
	);
}
