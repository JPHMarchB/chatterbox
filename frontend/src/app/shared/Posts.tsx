import {JSX} from "react";
import {SinglePost} from "@/app/shared/Post";
import {fetchAllPosts} from "@/utils/http/post.http";
import {Post} from "@/utils/models/post.model";
import {fetchProfileByProfileId} from "@/utils/http/profile.http";
import {Profile} from "@/utils/models/profile.model";

export async function Posts() : Promise<JSX.Element> {
    const {posts, profile} = await getData()
    return (
        <>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 p-1 md:px-10 lg:px-12'>
                {posts.map((post: Post) => <SinglePost profile={profile[post.postProfileId]} post={post} key={post.postId}/>)}
            </div>
        </>
    )
}

async function getData(): Promise<{profile:{[profileId: string ]: Profile} , posts: Post[]}> {
    const posts = await fetchAllPosts()

    let profile : {[profileId: string ]: Profile} = {}

    for(let post of posts) {
        profile[post.postProfileId] = await fetchProfileByProfileId(post.postProfileId)
    }
    return {profile, posts}
}