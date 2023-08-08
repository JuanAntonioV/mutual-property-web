import { useEffect, useState } from 'react';

export default function useInfiniteScroll({action, hasNextPage}) {
	const [scroll, setScroll] = useState(0);

    	// make function to infinite scroll
	useEffect(() => {
		const onScroll = () => {
			const scrollCheck = window.scrollY < 100;
			if (scrollCheck !== scroll) {
				setScroll(scrollCheck);
			}
		};

		document.addEventListener('scroll', onScroll);
		
		return () => document.removeEventListener('scroll', onScroll);
	}, [scroll]);

	useEffect(() => {
		const loadMore = () => {
			if (window.innerHeight + document.documentElement.scrollTop + 1 > document.scrollingElement.scrollHeight) {
				action();
			}
		};
		window.addEventListener('scroll', loadMore);
		return () => window.removeEventListener('scroll', loadMore);
	}, [scroll, hasNextPage]);

	return {scroll};
}
