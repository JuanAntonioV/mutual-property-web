import Logo from '@/assets/brand/logo.svg';
// import LogoWhite from '@/assets/brand/logo-white.svg';
import LogoWhitePng from '@/assets/brand/logo-white.png';
import { Link, useSearchParams } from 'react-router-dom';

export default function BrandLogo({ white = false, className = '', ...props }) {
	const [searchParams] = useSearchParams();
	const marketingRef = searchParams.get('ref');

	return (
		<Link
			to={`/${marketingRef ? `?ref=${marketingRef}` : ''}`}
			className="flexCenter w-fit"
		>
			<div className={`flexCenter ${className}`}>
				<img src={white ? LogoWhitePng : Logo} alt="Logo" {...props} />
			</div>
		</Link>
	);
}
