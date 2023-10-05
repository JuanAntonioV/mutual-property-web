import { Link } from 'react-router-dom';
import MainContainer from '../containers/MainContainer';

export default function NavMenuOnHover({ data, isHover, onHover, onUnhover }) {
	return (
		<div
			className={`w-screen h-80 bg-white shadow transition-all duration-200 z-20 absolute hidden lg:block`}
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
			<MainContainer className="relative grid w-full h-full grid-cols-2 gap-10 px-32 text-black place-content-center">
				{data?.section.map((item, index) => (
					<div className={'h-full'} key={index}>
						<header className={'space-y-2 border-b border-borderPrimary pb-6'}>
							{item.icon}
							<h1 className="text-lg font-medium">{item.title}</h1>
						</header>

						<main className={'flex items-center flex-wrap gap-4 py-4'}>
							<ul
								className={
									'grid grid-flow-col grid-rows-2 last:grid-rows-3 gap-y-4 lg:gap-x-8 xl:gap-x-16'
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
