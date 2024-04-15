'use client'

import React, {useState} from 'react';
import { Session } from '@/utils/fetchSession';
import { Post } from '@/utils/models/post.model';
import {toggleLike} from "@/utils/http/like.http";
import {useRouter} from "next/navigation";
import {Like} from "@/utils/models/like.model";

type LikeFormProps = {
    session: Session | undefined;
    post: Post;
    likes: Like[]
};

export function LikeForm(props: LikeFormProps) {
    const { session, post, likes } = props
    const router = useRouter()
    const [isliked, setIsLiked] = useState( likes.filter(like => like.likeProfileId === session?.profile.profileId).length === 1)

    if (!session) {
        return (
            <>
                <label className='sr-only' htmlFor='like'>
                    button to like & to dislike posts
                </label>
                <button onClick={() => router.push('/sign-in-page')} id='like' name='like'>
                    <img src='/heart.svg' alt='like button' />
                </button>
            </>
        )
    }

    const handleLike = async () => {
        try {
            const json = await toggleLike(post.postId, session)

            if (json.status === 200) {
                setIsLiked(!isliked)
            }
        } catch (error) {
            console.error('Error toggling like:', error)
        }
    }

    return (
        <>
            <label className='sr-only' htmlFor='like'>
                button to like & to dislike posts
            </label>
            <button onClick={handleLike} id='like' name='like'>
                <img src={isliked ? '/heart-fill.svg' : '/heart.svg'} alt='Like button' />
            </button>
        </>
    )
}
