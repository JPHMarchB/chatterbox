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
            <main className='bg-[#222] h-[100vh] flex justify-center'>
                <div className='border-x-2'>
                    <section className='p-5 bg-black'>
                        <a href="../"><img src='/arrow-left.svg' alt='Back button'/></a>
                    </section>

                    <section>
                        <img className='border-y-2' src={post.postImageUrl} alt='Post image'/>
                    </section>

                    <section className='flex items-center bg-black p-5 border-2'>
                        <img src='/heart.svg' alt='like button'/>
                        <img src='/chat-quote.svg' alt='comment'/>
                    </section>
                </div>
            </main>
        </>
    )
}