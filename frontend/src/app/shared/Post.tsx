import {JSX} from "react";
import {Post} from "@/utils/models/post.model";
import {Profile} from "@/utils/models/profile.model";

type Props = {
    post : Post,
    profile: Profile
}

export function SinglePost(props:Props) : JSX.Element {
    const { post, profile} = props
    return (
        <>
            <div className='pt-4'>

                {/* Post Image */}
                <img className='rounded-t-xl image-full' src={post.postImageUrl} alt='Post image'/>

                {/* Interaction bar container */}
                <div className='flex justify-between items-center border-2 rounded-b-xl bg-black p-1'>

                    {/* Poster info */}
                    <div className='flex gap-2 items-center pt-2 text-sm'>
                        {profile.profileImageUrl && <img className='rounded-full w-8 h-8' src={profile.profileImageUrl} alt='User post profile image'/>}
                        <p>{profile.profileName}</p>
                    </div>

                    {/* Like and comment*/}
                    <div className='flex gap-2 me-2 mt-2'>
                        <img className='mb-1' src='/chat-quote.svg' alt='comment button'/>
                        <button><img src='/heart.svg' alt='Like button'/></button>
                    </div>
                </div>
            </div>
        </>
    )
}