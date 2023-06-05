import Logo from '@/assets/brand/logo.svg';
import LogoWhite from '@/assets/brand/logo-white.svg';
import { Link } from 'react-router-dom';

export default function BrandLogo({ white = false, className = '', ...props }) {
	return (
		<Link to="/" className="flexCenter w-fit">
			<div className={`flexCenter ${className}`}>
				<img src={white ? LogoWhite : Logo} alt="Logo" {...props} />
			</div>
		</Link>
	);
}
