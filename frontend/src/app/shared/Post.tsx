import {JSX} from "react";
import {Post} from "@/utils/models/post.model";
import {Profile} from "@/utils/models/profile.model";
import {fetchProfileByProfileId} from "@/utils/http/profile.http";
import {LikeForm} from "@/app/shared/LikeForm";
import {getSession} from "@/utils/fetchSession";
import {fetchLikesByPostId} from "@/utils/http/like.http";

type Props = {
    post : Post,
    profile: Profile
}

export async function SinglePost(props:Props) : Promise<JSX.Element> {
    const session = await getSession()
    const {post} = props
    const profile = await fetchProfileByProfileId(post.postProfileId)
    const likes = await fetchLikesByPostId(post.postId)

    return (
        <>
            <div className='pt-4'>

                <a href={`/post-page/${post.postId}`}>
                    {/* Post Image */}
                    <img className='rounded-t-xl image-full' src={post.postImageUrl} alt='Post image'/>
                </a>

                    {/* Interaction bar container */}
                    <div className='flex justify-between items-center border-2 rounded-b-xl bg-black p-1'>

                        {/* Poster info */}
                        <a href={`/profile/${post.postProfileId}`}>
                        <div className='flex gap-2 items-center pt-2 text-sm'>
                            {profile.profileImageUrl &&
                                <img className='rounded-full w-8 h-8' src={profile.profileImageUrl}
                                     alt='User post profile image'/>}
                            <p>{profile.profileName}</p>
                        </div>
                        </a>

                        {/* Like and comment*/}
                        <div className='flex gap-2 me-2 mt-2'>
                            <a href={`/post-page/${post.postId}`}><img className='mb-1' src='/chat-quote.svg' alt='comment button'/></a>
                            <LikeForm session={session} post={post} likes={likes}/>
                        </div>
                    </div>
            </div>
        </>
)
}