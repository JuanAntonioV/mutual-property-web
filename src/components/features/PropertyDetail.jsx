import MainBadge from '../badges/MainBadge';
import CollapseWrapper from '../wrappers/CollapseWrapper';

export default function PropertyDetail({ data }) {
	return (
		<CollapseWrapper title={'Detail Property'}>
			<div className="grid grid-cols-2 gap-8 px-8">
				<div className="space-y-1">
					<header>
						<h2 className="text-lg font-semibold">Ukuran Tanah</h2>
					</header>
					<main>
						<p className="font-medium text-secondary">
							{data?.detail?.soil_area}
						</p>
					</main>
				</div>
				<div className="space-y-1">
					<header>
						<h2 className="text-lg font-semibold">Luas Tanah</h2>
					</header>
					<main>
						<p className="font-medium text-secondary">
							{data?.detail?.land_area} &#13217;
						</p>
					</main>
				</div>
				<div className="space-y-1">
					<header>
						<h2 className="text-lg font-semibold">Ukuran Bangunan</h2>
					</header>
					<main>
						<p className="font-medium text-secondary">
							{data?.detail?.building_size}
						</p>
					</main>
				</div>
				<div className="space-y-1">
					<header>
						<h2 className="text-lg font-semibold">Luas Bangunan</h2>
					</header>
					<main>
						<p className="font-medium text-secondary">
							{data?.detail?.building_area} &#13217;
						</p>
					</main>
				</div>
				<div className="space-y-1">
					<header>
						<h2 className="text-lg font-semibold">Jumlah Lantai</h2>
					</header>
					<main>
						<p className="font-medium text-secondary">
							{data?.detail?.floor > 0 ? data?.detail?.floor : 1} Lantai
						</p>
					</main>
				</div>
				<div className="space-y-1">
					<header>
						<h2 className="text-lg font-semibold">Jumlah Kamar Tidur</h2>
					</header>
					<main>
						<p className="font-medium text-secondary">
							{data?.detail?.bedroom > 0 ? data?.detail?.bedroom : '-'}
						</p>
					</main>
				</div>
				<div className="space-y-1">
					<header>
						<h2 className="text-lg font-semibold">Jumlah Kamar Mandi</h2>
					</header>
					<main>
						<p className="font-medium text-secondary">
							{data?.detail?.bathroom > 0 ? data?.detail?.bathroom : '-'}
						</p>
					</main>
				</div>
				<div className="space-y-1">
					<header>
						<h2 className="text-lg font-semibold">Carport</h2>
					</header>
					<main>
						<p className="font-medium text-secondary">
							{data?.detail?.garage > 0 ? data?.detail?.garage : '-'}
						</p>
					</main>
				</div>
				<div className="space-y-1">
					<header>
						<h2 className="text-lg font-semibold">Kondisi Bangunan</h2>
					</header>
					<main>
						<p className="font-medium text-secondary">
							{data?.detail?.building_condition}
						</p>
					</main>
				</div>
				<div className="space-y-1">
					<header>
						<h2 className="text-lg font-semibold">Meteran Listrik</h2>
					</header>
					<main>
						<p className="font-medium text-secondary">
							{data?.detail?.electricity_capacity} watt
						</p>
					</main>
				</div>
				<div className="space-y-1">
					<header>
						<h2 className="text-lg font-semibold">Hadap</h2>
					</header>
					<main>
						<p className="font-medium text-secondary">
							{data?.detail?.building_direction}
						</p>
					</main>
				</div>
				<div className="space-y-1">
					<header>
						<h2 className="text-lg font-semibold">Sertifikat</h2>
					</header>
					<main>
						<p className="font-medium text-secondary">
							{data?.detail?.certificate}
						</p>
					</main>
				</div>
			</div>

			{data?.facility && (
				<div className="px-8 pb-4 mt-10 space-y-2">
					<header>
						<h2 className="text-lg font-semibold">Sudah Termasuk</h2>
					</header>

					<main className="flex flex-wrap items-center gap-4">
						{data?.facility?.map((item, i) => (
							<MainBadge value={item?.facility} key={i} />
						))}
					</main>
				</div>
			)}
		</CollapseWrapper>
	);
}
