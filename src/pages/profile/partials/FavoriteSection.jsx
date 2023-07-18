import PropertyCard from '@/components/cards/PropertyCard';
import { useContext, useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getAllUserFavorites } from '../../../api/favorite-api';
import AuthContext from '../../../contexts/AuthProvider';
import NewPropertyCard from '../../../components/cards/NewPropertyCard';
import { SyncLoader } from 'react-spinners';

export default function FavoriteSection() {
	const [selectedType, setSelectedType] = useState(1);

	const { auth } = useContext(AuthContext);

	const types = [
		{
			id: 1,
			name: 'Property',
		},
		{
			id: 2,
			name: 'Developer',
		},
	];

	const { data: userFavorite, isLoading: isUserFavoriteLoading } = useQuery(
		['userFavorite', selectedType],
		() => getAllUserFavorites({ type: selectedType }),
		{
			enabled: !!auth?.token,
			select: data => data.results,
		}
	);

	return (
		<div className="flex flex-col w-full gap-10">
			<div className="flexCenter">
				<div className="p-2 bg-white border rounded-xl">
					{types.map((type, i) => (
						<button
							key={i}
							className={`px-20 py-2 ${
								selectedType === type.id
									? 'text-white bg-primary rounded-xl'
									: ''
							}`}
							onClick={() => setSelectedType(type.id)}
						>
							{type.name}
						</button>
					))}
				</div>
			</div>

			{isUserFavoriteLoading ? (
				<div className="flex flex-col items-center justify-center w-full gap-6 h-96">
					<SyncLoader color="#2563EB" />
					<p className="font-medium text-gray-400">Memuat...</p>
				</div>
			) : !isUserFavoriteLoading && userFavorite?.length === 0 ? (
				<div className="flex flex-col items-center justify-center w-full gap-6 h-96">
					<p className="font-medium text-gray-400">
						Tidak ada favorite yang ditemukan
					</p>
				</div>
			) : (
				<>
					<div
						className={`grid grid-cols-1 mt-4 md:grid-cols-2 place-items-center gap-y-8 xl:grid-cols-3 lg:grid-cols-2`}
					>
						{selectedType === 1 ? (
							<>
								{userFavorite?.map((property, index) => (
									<PropertyCard key={index} data={property} small />
								))}
							</>
						) : (
							<>
								{userFavorite?.map((property, index) => (
									<NewPropertyCard key={index} data={property} small />
								))}
							</>
						)}
					</div>
				</>
			)}
		</div>
	);
}
