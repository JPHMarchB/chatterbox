import {JSX} from "react";
import {SinglePost} from "@/app/shared/Post";
import {fetchAllPosts} from "@/utils/http/post.http";
import {Post} from "@/utils/models/post.model";
import {Profile} from "@/utils/models/profile.model";

type Props = {
    profile: Profile
}

export async function Posts(props : Props) : Promise<JSX.Element> {
    const {profile} = props
    const posts = await fetchAllPosts()
    return (
        <>
            <div className='md:mason-style'>
                {posts.map((post: Post) => (
                    <div className='mason-style-support'>
                        <SinglePost profile={profile} post={post} key={post.postId}/>
                    </div>
                ))}
            </div>

        </>
    )
}
