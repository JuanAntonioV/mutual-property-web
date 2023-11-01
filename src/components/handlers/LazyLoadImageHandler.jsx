import { Suspense } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import ImagePlaceholder from '@/assets/img/image-error-placeholder.jpg';

export default function LazyLoadImageHandler({
	src,
	wrapperClassName = 'w-full h-full',
	className = 'w-full h-full',
	skeletonHeight = 270,
	...rest
}) {
	const handleImageError = e => {
		e.target.src = ImagePlaceholder;
	};

	return (
		<Suspense
			fallback={
				<div
					className={`${wrapperClassName} bg-gray-200 animate-pulse w-full h-full`}
				/>
			}
		>
			<LazyLoadImage
				src={src}
				onError={handleImageError}
				effect="blur"
				className={className}
				wrapperClassName={wrapperClassName}
				{...rest}
			/>
		</Suspense>
	);
}
