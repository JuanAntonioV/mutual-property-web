import React from 'react';
import { Link } from 'react-router-dom';
import { useState } from 'react';

import {
	MdOutlineKeyboardArrowDown,
	MdOutlineKeyboardArrowUp,
} from 'react-icons/md';

export default function NavMenuItem({ item, closeNavbar }) {
	const [openMenu, setOpenMenu] = useState(false);

	const navLinkClicked = () => {
		closeNavbar();
		setOpenMenu(!openMenu);
	};

	return (
		<>
			{item.section.length > 0 ? (
				<button
					className="w-full px-8 py-5 flexBetween"
					onClick={() => setOpenMenu(!openMenu)}
				>
					<span className="text-sm font-medium md:text-base">{item.title}</span>
					{openMenu ? (
						<MdOutlineKeyboardArrowDown size={32} />
					) : (
						<MdOutlineKeyboardArrowUp size={32} />
					)}
				</button>
			) : (
				<Link
					to={item.link}
					className="w-full px-8 py-5 flexBetween"
					onClick={navLinkClicked}
				>
					<span className="text-sm font-medium md:text-base">{item.title}</span>
				</Link>
			)}

			{openMenu ? (
				item.section.length > 1 ? (
					item.section.map((menu, i) => (
						<React.Fragment key={i}>
							{menu.title !== item.title && (
								<p className="py-5 font-medium px-9">{menu.title}</p>
							)}

							<ul className="px-12 bg-gray-100">
								{menu.pathList.map((item, i) => (
									<>
										{item.action ? (
											<li key={i}>
												<button
													className="block py-5 text-sm text-medium md:text-base"
													onClick={item.action}
												>
													{item.title}
												</button>
											</li>
										) : (
											<li key={i}>
												<Link
													to={item.link}
													className="block py-5 text-sm text-medium md:text-base"
													onClick={navLinkClicked}
												>
													{item.title}
												</Link>
											</li>
										)}
									</>
								))}
							</ul>
						</React.Fragment>
					))
				) : (
					<ul className="px-8 bg-gray-100">
						{item?.section[0]?.pathList.map((item, i) => (
							<li key={i}>
								<Link
									to={item.link}
									className="block px-4 py-5 text-sm text-medium md:text-base"
									onClick={navLinkClicked}
								>
									{item.title}
								</Link>
							</li>
						))}
					</ul>
				)
			) : null}
		</>
	);
}
