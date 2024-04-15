'use server'

import {Post} from "@/utils/models/post.model";
import {fetchPostByPostId} from "@/utils/http/post.http";
import {FullPost} from "@/app/(side-site)/post-page/FullPost";
import {Like} from "@/utils/models/like.model";
import {fetchLikesByPostId} from "@/utils/http/like.http";
import {fetchCommentsByPostId} from "@/utils/http/comment.http";
import {Comment} from "@/utils/models/comment.model";

// Function to take postId and display unique post when a post is clicked
export default async function postPage ({params} : {params :  {postId : string}}) {

    // Give function postId as 'params' to pass it through the function
    const {postId} = params

    // Get the postId's data
    const {post,likes, comments} =  await getData(postId)

    // Return it as JSX defined in PostFull.tsx
    return (
        <>
            <div>
                <FullPost post={post} key={post.postId} likes={likes} comments={comments} />
            </div>
        </>
    )
}

// Create function to pull an post by postId
async function getData(postId:string): Promise<{likes:Like[], comments:Comment[], post: Post}>  {
    const post = await fetchPostByPostId(postId)

    const  likes = await fetchLikesByPostId(post.postId)
    const  comments = await fetchCommentsByPostId(post.postId)

    return {likes, comments, post}
}
