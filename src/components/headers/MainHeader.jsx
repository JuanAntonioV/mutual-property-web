import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import NavMenuOnHover from './NavMenuOnHover';
import BrandLogo from '../brands/BrandLogo';
import MainContainer from '../containers/MainContainer';
import NavMenuMobile from './NavMenuMobile';

import { IoMdArrowDropdown } from 'react-icons/io';
import { BiBuildingHouse, BiMenu, BiSearch } from 'react-icons/bi';
import {
	MdConnectWithoutContact,
	MdOutlineRealEstateAgent,
	MdOutlineWarehouse,
} from 'react-icons/md';
import { HiOutlineUserGroup } from 'react-icons/hi';

export default function MainHeader() {
	const navigate = useNavigate();
	const [menuHover, setMenuHover] = useState(false);
	const [selectedMenu, setSelectedMenu] = useState(null);
	const [openMobileNavbar, setOpenMobileNavbar] = useState(false);

	const menuList = [
		{
			title: 'Dijual',
			link: '/property?category=dijual',
			section: [
				{
					title: 'Dijual',
					icon: <MdOutlineRealEstateAgent size={28} color={'#213D77'} />,
					pathList: [
						{
							title: 'Rumah',
							link: '/property?category=dijual&type=rumah',
						},
						{
							title: 'Ruko',
							link: '/property?category=dijual&type=ruko',
						},
						{
							title: 'Gudang / Pabrik',
							link: '/property?category=dijual&type=gudang-pabrik',
						},
						{
							title: 'Apartemen',
							link: '/property?category=dijual&type=apartemen',
						},
						{
							title: 'Komersial',
							link: '/property?category=dijual&type=komersial',
						},
					],
				},
			],
		},
		{
			title: 'Disewa',
			link: '/property?category=disewa',
			section: [
				{
					title: 'Disewa',
					icon: <MdOutlineWarehouse size={28} color={'#213D77'} />,
					pathList: [
						{
							title: 'Rumah',
							link: '/property?category=disewa&type=rumah',
						},
						{
							title: 'Ruko',
							link: '/property?category=disewa&type=ruko',
						},
						{
							title: 'Gudang / Pabrik',
							link: '/property?category=disewa&type=gudang-pabrik',
						},
						{
							title: 'Apartemen',
							link: '/property?category=disewa&type=apartemen',
						},
						{
							title: 'Komersial',
							link: '/property?category=disewa&type=komersial',
						},
					],
				},
			],
		},
		{
			title: 'Property Baru',
			link: '/property?category=baru',
			section: [
				{
					title: 'Property Baru',
					icon: <BiBuildingHouse size={28} color={'#213D77'} />,
					pathList: [
						{
							title: 'Rumah',
							link: '/property?category=baru&type=rumah',
						},
						{
							title: 'Ruko',
							link: '/property?category=baru&type=ruko',
						},
						{
							title: 'Gudang / Pabrik',
							link: '/property?category=baru&type=gudang-pabrik',
						},
						{
							title: 'Apartemen',
							link: '/property?category=baru&type=apartemen',
						},
						{
							title: 'Komersial',
							link: '/property?category=baru&type=komersial',
						},
					],
				},
			],
		},
		{
			title: 'KPR',
			link: '/kpr',
			section: [],
		},
		{
			title: 'Tentang Kami',
			link: '/tentang-kami',
			section: [
				{
					title: 'Tentang Kami',
					icon: <HiOutlineUserGroup size={28} color={'#213D77'} />,
					pathList: [
						{
							title: 'Visi Misi',
							link: '/tentang-kami',
						},
						{
							title: 'Para Pendiri',
							link: '/tentang-kami',
						},
						{
							title: 'Nilai - Nilai Perusahaan',
							link: '/tentang-kami',
						},
						{
							title: 'Perjalanan Kami',
							link: '/tentang-kami',
						},
						{
							title: 'Karir',
							link: '/tentang-kami',
						},
						{
							title: 'Youtube',
							link: '/tentang-kami',
						},
						{
							title: 'Tiktok',
							link: '/tentang-kami',
						},
						{
							title: 'Instagram',
							link: '/tentang-kami',
						},
					],
				},
				{
					title: 'Kontak',
					icon: <MdConnectWithoutContact size={28} color={'#213D77'} />,
					pathList: [
						{
							title: 'Hubungi Kami',
							link: '/tentang-kami',
						},
					],
				},
			],
		},
	];

	const onMouseHoverMenu = index => {
		setMenuHover(true);
		setSelectedMenu(menuList[index]);
	};

	useEffect(() => {
		openMobileNavbar
			? (document.body.style.overflow = 'hidden')
			: (document.body.style.overflow = 'auto');
	}, [openMobileNavbar]);

	return (
		<header className="relative z-30">
			<div className="fixed top-0 left-0 right-0 text-white bg-primary h-[100px]">
				<MainContainer className="relative h-full flexBetween">
					<div className="space-x-8 flexStart">
						<BrandLogo white width={150} />

						<nav className="hidden lg:block">
							<ul className="flex items-center gap-x-1 lg:gap-x-3 xl:gap-x-4">
								{menuList.map((menu, index) =>
									menu.section.length > 0 ? (
										<li
											className="h-[100px] space-x-2 cursor-pointer flexCenter"
											onMouseEnter={() => onMouseHoverMenu(index)}
											onMouseLeave={() => setMenuHover(false)}
											onClick={() => onMouseHoverMenu(index)}
											key={index}
										>
											<span className="font-medium">{menu.title}</span>
											<IoMdArrowDropdown />
										</li>
									) : (
										<Link
											to={menu.link}
											className="h-[100px] space-x-2 cursor-pointer flexCenter"
											key={index}
										>
											<span className="font-medium">{menu.title}</span>
										</Link>
									)
								)}
							</ul>
						</nav>
					</div>

					<div className="space-x-6 xl:space-x-8 flexEnd">
						<div className="relative hidden w-fit h-fit xl:block">
							<input
								type="text"
								placeholder="Cari Lokasi..."
								className="w-full py-3 pl-4 text-black rounded-full sm:w-48 xl:w-60 lg:pr-12 placeholder:text-sm focus:outline-none"
							/>

							<button className="absolute w-10 h-10 -translate-y-1/2 rounded-full top-1/2 right-1 flexCenter bg-primary">
								<BiSearch color="#fff" size={18} />
							</button>
						</div>

						<button
							className="hidden text-white border-white rounded-full btnSecondary lg:block"
							onClick={() => navigate('/login')}
						>
							Masuk
						</button>

						<button
							className="block flexCenter lg:hidden"
							onClick={() => setOpenMobileNavbar(true)}
						>
							<BiMenu color="#fff" size={36} />
						</button>
					</div>
				</MainContainer>

				<NavMenuOnHover
					data={selectedMenu}
					isHover={menuHover}
					onHover={() => setMenuHover(true)}
					onUnhover={() => setMenuHover(false)}
				/>
			</div>

			<NavMenuMobile
				menu={menuList}
				isOpen={openMobileNavbar}
				onClose={() => setOpenMobileNavbar(false)}
			/>
		</header>
	);
}
