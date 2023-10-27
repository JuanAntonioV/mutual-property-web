import { BiImage } from 'react-icons/bi';

export default function PropertyImage({ images }) {
	console.log(images?.length);
	return (
		<div className="grid grid-cols-4 xl:grid-cols-3 grid-rows-2 h-[400px] gap-5 relative">
			<div className="w-full h-full col-span-4 row-span-1 overflow-hidden rounded-xl xl:col-span-2 xl:row-span-2">
				<a href={images[0]?.path} data-fancybox="gallery">
					<img
						src={images[0]?.path}
						alt={images[0]?.alt}
						className="object-cover w-full h-full"
					/>
				</a>
			</div>
			<div className="w-full h-full col-span-2 row-span-1 overflow-hidden rounded-xl xl:col-span-1 xl:row-span-1">
				<a href={images[1]?.path} data-fancybox="gallery">
					<img
						src={images[1]?.path}
						alt={images[1]?.alt}
						className="object-cover w-full h-full"
					/>
				</a>
			</div>
			<div className="w-full h-full col-span-2 row-span-1 overflow-hidden rounded-xl xl:col-span-1 xl:row-span-1">
				<a href={images[2]?.path} data-fancybox="gallery">
					<img
						src={images[2]?.path}
						alt={images[2]?.alt}
						className="object-cover w-full h-full"
					/>
				</a>
			</div>

			<a
				type="button"
				href={images[0]?.path}
				data-fancybox="gallery"
				className="absolute gap-2 px-5 py-3 bg-white shadow-lg hover:bg-white btnPrimary flexCenter bottom-4 right-4 w-fit"
			>
				<BiImage size={22} color="#213D77" className="hidden md:block" />
				<span className="text-sm font-medium text-primary md:text-base">
					Lihat semua
				</span>
			</a>

			{images
				?.map((image, i) => (
					<a
						href={image?.path}
						data-fancybox="gallery"
						key={i}
						className="hidden"
					>
						<img
							key={i}
							src={image?.path}
							alt={image?.alt}
							className="hidden object-cover w-full h-full"
						/>
					</a>
				))
				.slice(4, images?.length)}
		</div>
	);
}
