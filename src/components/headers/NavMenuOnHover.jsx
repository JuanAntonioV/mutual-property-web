import { Link } from 'react-router-dom';
import MainContainer from '../containers/MainContainer';

export default function NavMenuOnHover({ data, isHover, onHover, onUnhover }) {
	return (
		<div
			className={`absolute w-screen h-80 bg-white shadow transition-all duration-200`}
			onMouseEnter={onHover}
			onMouseLeave={onUnhover}
			style={
				isHover && data?.section?.length > 0
					? {
							top: '100%',
							visibility: 'visible',
							opacity: 1,
							animation: 'fadeIn 0.2s ease-in-out',
					  }
					: {
							top: '100%',
							visibility: 'hidden',
							opacity: 0,
							animation: 'fadeOut 0.2s ease-in-out',
					  }
			}
		>
			<MainContainer className="grid w-full h-full grid-cols-2 px-32 place-content-center gap-10 relative text-black">
				{data?.section.map((item, index) => (
					<div className={'h-full'} key={index}>
						<header className={'space-y-2 border-b border-borderPrimary pb-6'}>
							{item.icon}
							<h1 className="font-medium text-lg">{item.title}</h1>
						</header>

						<main className={'flex items-center flex-wrap gap-4 py-4'}>
							<ul
								className={
									'grid grid-cols-4 grid-rows-2 last:grid-cols-3 last:grid-rows-3 gap-y-4'
								}
							>
								{item?.pathList.map((menu, index) => (
									<li key={index}>
										<Link to={menu.link}>{menu.title}</Link>
									</li>
								))}
							</ul>
						</main>
					</div>
				))}
			</MainContainer>
		</div>
	);
}
