import MainContainer from '@/components/containers/MainContainer';
import PropertyHeroSection from '@/components/sections/PropertyHeroSection';
import PropertyCard from '@/components/cards/PropertyCard';
import PropertyFilter from '@/components/filters/PropertyFilter';
import NewPropertyCard from '@/components/cards/NewPropertyCard';

import { MdKeyboardArrowRight } from 'react-icons/md';
import { useSearchParams } from 'react-router-dom';
import { useEffect } from 'react';

export default function PropertyPage() {
	// const router = useRouter();
	// const pathname = usePathname();
	const [searchParams] = useSearchParams();
	const category = searchParams.get('category');
	const type = searchParams.get('type');

	const maxPage = 50;

	// useEffect(() => {
	//     if (pathname === '/property')
	//         router.push('/property?category=disewa&type=rumah');
	// }, [pathname, router]);

	return (
		<>
			<header className="relative pt-40 pb-64 lg:pb-6 lg:pt-10 bg-bgSoft">
				<PropertyHeroSection type={type} category={category} />

				<div className="absolute left-0 right-0 z-10 px-4 -translate-y-1/2 lg:px-0 top-full">
					<PropertyFilter />
				</div>
			</header>

			<main className="mb-40 mt-60 lg:mt-0">
				<MainContainer
					className={`grid grid-cols-1 mt-40 mb-20 md:grid-cols-2 place-items-center gap-y-8 ${
						category !== 'baru'
							? 'lg:grid-cols-3 2xl:grid-cols-4'
							: 'xl:grid-cols-3 lg:grid-cols-2'
					}`}
				>
					{category !== 'baru' ? (
						<>
							<PropertyCard />
							<PropertyCard />
							<PropertyCard />
							<PropertyCard />
							<PropertyCard />
							<PropertyCard />
							<PropertyCard />
							<PropertyCard />
							<PropertyCard />
							<PropertyCard />
							<PropertyCard />
							<PropertyCard />
						</>
					) : (
						<>
							<NewPropertyCard />
							<NewPropertyCard />
							<NewPropertyCard />
							<NewPropertyCard />
							<NewPropertyCard />
						</>
					)}
				</MainContainer>

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
			</main>
		</>
	);
}
