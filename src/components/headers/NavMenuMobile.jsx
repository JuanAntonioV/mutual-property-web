import BrandLogo from '../brands/BrandLogo';
import NavMenuItem from './NavMenuItem';

import { IoMdClose } from 'react-icons/io';
import { useNavigate, useSearchParams } from 'react-router-dom';

export default function NavMenuMobile({ menu, isOpen, onClose }) {
	const navigate = useNavigate();

	const [searchParams] = useSearchParams();
	const marketingRef = searchParams.get('ref');

	const handleLoginClicked = () => {
		onClose();
		navigate(`/login${marketingRef ? `?ref=${marketingRef}` : ''}`);
	};

	return (
		<div
			className="fixed top-0 bottom-0 left-0 right-0 w-full h-full duration-200 bg-black/40"
			onClick={onClose}
			style={
				isOpen
					? {
							visibility: 'visible',
							opacity: 1,
					  }
					: {
							visibility: 'hidden',
							opacity: 0,
					  }
			}
		>
			<div
				className="w-3/4 h-screen overflow-y-auto duration-200 bg-white"
				onClick={e => e.stopPropagation()}
				style={
					isOpen
						? {
								position: 'relative',
								marginLeft: 'auto',
						  }
						: {
								position: 'absolute',
								left: '100%',
								top: 0,
								bottom: 0,
						  }
				}
			>
				<header className="px-8 pt-10 flexBetween">
					<BrandLogo width={140} />

					<button className="p-1 flexCenter" onClick={onClose}>
						<IoMdClose size={34} color="#213D77" />
					</button>
				</header>

				<main className="mb-6 mt-14">
					<ul className="space-y-2">
						{menu.map((item, i) => (
							<li key={i} className="border-b border-borderPrimary">
								<NavMenuItem item={item} closeNavbar={onClose} />
							</li>
						))}
					</ul>
				</main>

				<footer className="px-8 pt-2 pb-10">
					<button onClick={handleLoginClicked} className="btnPrimary">
						Masuk / Daftar
					</button>
				</footer>
			</div>
		</div>
	);
}
