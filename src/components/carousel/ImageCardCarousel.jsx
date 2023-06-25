import { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper';

import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';

export default function ImageCardCarousel({ image, height }) {
	const swiperRef = useRef();

	return (
		<header onClick={e => e.stopPropagation()} className="group">
			<div
				className={'bg-gray-200 rounded-t-lg overflow-hidden'}
				style={{
					height: height ? `${height}px` : '280px',
				}}
			>
				<Swiper
					modules={[Navigation]}
					onBeforeInit={swiper => {
						swiperRef.current = swiper;
					}}
				>
					{image.map((image, index) => (
						<SwiperSlide
							key={index}
							style={{
								height: height ? `${height}px` : '280px',
							}}
						>
							<img
								src={image?.path}
								alt={image?.alt}
								style={{
									height: 'inherit',
								}}
								className="object-cover w-full -z-10"
							/>
						</SwiperSlide>
					))}

					<div className="absolute z-10 invisible w-full px-4 transform -translate-y-1/2 group-hover:duration-200 top-1/2 flexBetween group-hover:visible">
						<button
							className="p-2 border rounded-full shadow-xl bg-primary bg-opacity-30 border-borderPrimary flexCenter"
							onClick={() => swiperRef.current?.slidePrev()}
						>
							<MdKeyboardArrowLeft size={32} color="#fff" />
						</button>
						<button
							className="p-2 border rounded-full shadow-xl bg-primary bg-opacity-30 border-borderPrimary flexCenter"
							onClick={() => swiperRef.current?.slideNext()}
						>
							<MdKeyboardArrowRight size={32} color="#fff" />
						</button>
					</div>
				</Swiper>
			</div>
		</header>
	);
}
