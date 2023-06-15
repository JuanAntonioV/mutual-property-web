import { PulseLoader } from 'react-spinners';

export default function SideMenuSection({
	selectedTab,
	onChangeTab,
	logoutAction,
	isLogoutLoading,
}) {
	return (
		<div className="w-full bg-white border border-borderPrimary rounded-xl">
			<ul className="p-2 space-y-2">
				<li>
					<button
						className={`p-4 w-full text-left rounded-lg ${
							selectedTab === 'akun-saya' && 'bg-indigo-50'
						}`}
						onClick={() => onChangeTab('akun-saya')}
					>
						Akun Saya
					</button>
				</li>
				<li>
					<button
						className={`p-4 w-full text-left rounded-lg ${
							selectedTab === 'favorit' && 'bg-indigo-50'
						}`}
						onClick={() => onChangeTab('favorit')}
					>
						Favorit
					</button>
				</li>
			</ul>

			<div className="p-2 border-t rounded-lg border-borderPrimary">
				<button
					className={'p-4 w-full text-left'}
					onClick={logoutAction}
					disabled={isLogoutLoading}
				>
					{isLogoutLoading ? (
						<PulseLoader color="#213D77" size={14} />
					) : (
						'Keluar'
					)}
				</button>
			</div>
		</div>
	);
}
