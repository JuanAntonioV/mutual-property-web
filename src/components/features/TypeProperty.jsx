import PropertyTypeCard from '../cards/PropertyTypeCard';

export default function TypeProperty({ data }) {
	return (
		<div className="p-4">
			<header>
				<h3 className="text-lg font-semibold">
					Tipe Unit ({data?.product?.length})
				</h3>
			</header>

			{data?.product?.length > 0 ? (
				<main className="mt-6 space-y-6">
					{data?.product?.map((item, index) => (
						<PropertyTypeCard key={index} data={item} />
					))}
				</main>
			) : (
				<main className="mt-6 space-y-6">
					<p className="text-center">Tidak ada tipe unit</p>
				</main>
			)}
		</div>
	);
}
