import { Link, useSearchParams } from 'react-router-dom';

import MainContainer from '@/components/containers/MainContainer';

export default function NotFoundPage() {
	const [searchParams] = useSearchParams();
	const marketingRef = searchParams.get('ref');

	return (
		<MainContainer className="mt-[100px]">
			<div className="h-[calc(100vh-100px)] flexCenterCol space-y-10">
				<main className="space-y-4 text-center">
					<h1 className="font-extrabold text-gray-500 text-9xl">404</h1>
					<p className="text-2xl font-semibold md:text-3xl">
						{/* eslint-disable-next-line react/no-unescaped-entities */}
						Sorry, we couldn't find this page.
					</p>
					<p className="text-center mx-auto w-[400px]">
						But dont worry, you can find plenty of other things on our homepage.
					</p>
				</main>

				<Link
					rel="noopener noreferrer"
					to={`/${marketingRef ? `?ref=${marketingRef}` : ''}`}
					className="btnPrimary w-fit"
				>
					Back to homepage
				</Link>
			</div>
		</MainContainer>
	);
}
