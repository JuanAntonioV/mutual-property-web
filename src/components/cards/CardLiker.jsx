'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { toast } from 'react-toastify';
import { addPropertyToFavorites } from '../../api/favorite-api';
import { MoonLoader } from 'react-spinners';

export default function CardLiker({ propertyId }) {
	const [like, setLike] = useState(false);

	const qc = useQueryClient();

	const { mutate: addToFavorite, isLoading: isAddToFavoriteLoading } =
		useMutation(payload => addPropertyToFavorites(payload), {
			onSuccess: data => {
				qc.invalidateQueries('allProperty');
				toast.success(data?.results?.message);
				console.log(data);
			},
			onError: err => {
				toast.error('Gagal menambahkan ke favorit');
			},
		});

	const handleLikeClicked = e => {
		e.stopPropagation();
		setLike(!like);
		addToFavorite(propertyId);
	};
	return (
		<button
			className="flexCenter"
			onClick={handleLikeClicked}
			disabled={isAddToFavoriteLoading}
		>
			{isAddToFavoriteLoading ? (
				<MoonLoader size={20} color="#213D77" />
			) : like ? (
				<AiFillHeart size={38} color="#EB4335" />
			) : (
				!like && <AiOutlineHeart size={38} color="#00092980" />
			)}
		</button>
	);
}
