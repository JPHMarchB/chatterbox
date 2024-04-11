import {JSX} from "react";
import {Post} from "@/utils/models/post.model";
import {fetchProfileByProfileId} from "@/utils/http/profile.http";

type Props = {
    post: Post
}

export async function FullPost(props:Props) : Promise<JSX.Element> {
    const {post} = props
    const profile = await fetchProfileByProfileId(post.postProfileId)

    return (
        <>
            <main className='bg-[#222] backdrop-blur flex justify-center'>
                <div>
                    <section className='p-4 bg-black'>
                        <a href="../"><img src='/arrow-left.svg' alt='Back button'/></a>
                    </section>

                    <section className='bg-[#111111] border-t border-gray-800'>
                        <div className='flex items-center gap-4 p-4 text-white'>
                            {profile.profileImageUrl && <img className='rounded-full w-10 h-10' src={profile.profileImageUrl} alt='User profile image'/>}
                            <h2>{profile.profileName}</h2>
                        </div>
                    </section>

                    <section>
                        <img className='border-t-2' src={post.postImageUrl} alt='Post image'/>
                    </section>

                    <section className='flex items-center gap-4 bg-black p-5 border-y-2'>
                        <img src='/heart.svg' alt='like button'/>
                        <p>10</p>
                        <img className='mb-1' src='/chat-quote.svg' alt='comment'/>
                        <p>10</p>
                    </section>

                    <section className='bg-[#111111] p-5'>
                        <div>
                            <h3 className='text-white text-xl'>{profile.profileName}</h3>
                            <p>{post.postContent}</p>
                        </div>

                        <div>

                        </div>
                    </section>
                </div>
            </main>
        </>
    )
}