import {JSX} from "react";
import {Post} from "@/utils/models/post.model";
import {fetchProfileByProfileId} from "@/utils/http/profile.http";
import {LikeForm} from "@/app/shared/LikeForm";
import {getSession} from "@/utils/fetchSession";
import {fetchLikesByPostId} from "@/utils/http/like.http";
import {CommentsDisplay} from "@/app/(side-site)/post-page/CommentsDisplay";
import {fetchCommentsByPostId} from "@/utils/http/comment.http";

type Props = {
    post: Post
}

export async function FullPost(props:Props) : Promise<JSX.Element> {
    const session = await getSession()
    const {post} = props
    const profile = await fetchProfileByProfileId(post.postProfileId)
    const likes = await fetchLikesByPostId(post.postId)
    const comments = await fetchCommentsByPostId(post.postId)

    return (
        <>
            <main className='bg-[#222] backdrop-blur flex justify-center'>
                <div>
                    <section className='p-3 bg-black'>
                        <a href="../"><img className='hover:btn-ghost rounded-lg p-1' src='/arrow-left.svg' alt='Back button'/></a>
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
                        <LikeForm session={session} post={post} likes={likes}/>
                        <p>{likes.length}</p>

                        <img className='mb-1' src='/chat-quote.svg' alt='comment'/>
                        <p>{comments.length}</p>
                    </section>

                    <section className='bg-[#111111] p-5'>
                        <div>
                            <h3 className='text-white text-xl'>{profile.profileName}</h3>
                            <p>{post.postContent}</p>
                        </div>

                    </section>

                    <div>
                        <CommentsDisplay comments={comments} post={post} session={session}/>
                    </div>
                </div>
            </main>
        </>
    )
}