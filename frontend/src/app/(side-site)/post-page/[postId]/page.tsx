import {JSX} from "react";
import {Profile} from "@/utils/models/profile.model";
import {fetchPostByPostId, fetchPostByProfileId} from "@/utils/http/post.http";
import {FullPost} from "@/app/(side-site)/post-page/FullPost";


export default async function PostPage({params} : {params :  {postId : string, profile: Profile}}) : Promise<JSX.Element> {
    const {postId, profile} = params
    const post = await fetchPostByPostId(postId)

    return (
        <>
            <FullPost post={post}/>
        </>
    )
}