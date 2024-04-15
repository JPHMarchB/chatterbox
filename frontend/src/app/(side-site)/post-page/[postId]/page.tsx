'use server'

import {fetchPostByPostId} from "@/utils/http/post.http";
import {FullPost} from "@/app/(side-site)/post-page/FullPost";

// Function to take postId and display unique post when a post is clicked
export default async function postPage ({params} : {params :  {postId : string}}) {

    // Give function postId as 'params' to pass it through the function
    const {postId} = params
    const post = await fetchPostByPostId(postId)

    // Return it as JSX defined in PostFull.tsx
    return (
        <>
            <div>
                <FullPost post={post} key={post.postId}/>
            </div>
        </>
    )
}
