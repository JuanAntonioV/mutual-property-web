import { useEffect, useRef, useState } from 'react';
import { BiUpArrowAlt } from 'react-icons/bi';

export default function ScrollToTopNav() {
	const btnRef = useRef(null);
	const [show, setShow] = useState(false);

	// hide button when scroll to top
	useEffect(() => {
		const handleScroll = () => {
			if (window.scrollY > 100) {
				setShow(true);
			} else {
				setShow(false);
			}
		};

		window.addEventListener('scroll', handleScroll);

		return () => window.removeEventListener('scroll', handleScroll);
	}, []);

	const scrollToTop = () => {
		window.scrollTo({
			top: 0,
			behavior: 'smooth',
		});
	};

	return (
		<button
			className="fixed z-50 flex items-center justify-center w-12 h-12 text-white rounded-full shadow-lg bg-primary bottom-5 right-5"
			onClick={scrollToTop}
			ref={btnRef}
			style={{
				opacity: show ? '1' : '0',
				visibility: show ? 'visible' : 'hidden',
				transition: 'all 0.2s ease-in-out',
			}}
		>
			<BiUpArrowAlt size={30} />
		</button>
	);
}
