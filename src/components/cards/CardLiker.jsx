'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useContext, useEffect, useState } from 'react';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { toast } from 'react-toastify';
import {
	addProjectToFavorites,
	addPropertyToFavorites,
} from '../../api/favorite-api';
import { MoonLoader } from 'react-spinners';
import AuthContext from '../../contexts/AuthProvider';

export default function CardLiker({ propertyId, projectId, isFavorite }) {
	const [like, setLike] = useState(false);

	const { auth } = useContext(AuthContext);

	const qc = useQueryClient();

	useEffect(() => {
		setLike(isFavorite);
		return () => setLike(false);
	}, [isFavorite]);

	const {
		mutate: addToPropertyFavorite,
		isLoading: isAddToPropertyFavoriteLoading,
	} = useMutation(payload => addPropertyToFavorites(payload), {
		onSuccess: res => {
			qc.invalidateQueries('allProperty');
			toast.success(res?.message);
		},
		onError: err => {
			toast.error('Gagal menambahkan ke favorit');
		},
	});

	const {
		mutate: addToProjectFavorite,
		isLoading: isAddToProjectFavoriteLoading,
	} = useMutation(payload => addProjectToFavorites(payload), {
		onSuccess: res => {
			qc.invalidateQueries('allProperty');
			toast.success(res?.message);
		},
		onError: err => {
			toast.error('Gagal menambahkan ke favorit');
		},
	});

	const handleLikeClicked = e => {
		e.stopPropagation();

		if (!!auth.user) {
			if (propertyId) {
				setLike(!like);
				addToPropertyFavorite({
					id: propertyId,
					token: auth.token,
				});
			} else if (projectId) {
				setLike(!like);
				addToProjectFavorite({
					id: projectId,
					token: auth.token,
				});
			}
		} else {
			toast.error('Anda harus login terlebih dahulu');
		}
	};

	return (
		<button
			className="flexCenter"
			onClick={handleLikeClicked}
			disabled={isAddToPropertyFavoriteLoading || isAddToProjectFavoriteLoading}
		>
			{isAddToPropertyFavoriteLoading || isAddToProjectFavoriteLoading ? (
				<MoonLoader size={20} color="#213D77" />
			) : like ? (
				<AiFillHeart size={38} color="#EB4335" />
			) : (
				!like && <AiOutlineHeart size={38} color="#00092980" />
			)}
		</button>
	);
}
