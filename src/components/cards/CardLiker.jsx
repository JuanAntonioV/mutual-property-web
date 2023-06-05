'use client';

import { useState } from 'react';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';

export default function CardLiker() {
    const [like, setLike] = useState(false);

    const handleLikeClicked = (e) => {
        e.stopPropagation();
        setLike(!like);
    };
    return (
        <button className='flexCenter' onClick={handleLikeClicked}>
            {like ? (
                <AiFillHeart size={38} color='#EB4335' />
            ) : (
                <AiOutlineHeart size={38} color='#00092980' />
            )}
        </button>
    );
}
