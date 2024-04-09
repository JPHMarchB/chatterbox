import {JSX} from "react";
import {Post} from "@/utils/models/post.model";
import {fetchAllPosts} from "@/utils/http/post.http";

type Props = {
    post : Post
}

function ExplorePost(props: Props) : JSX.Element {
    const {post} = props

    return (
        <>
            <img className='image-full' src={post.postImageUrl} alt='Post'/>
        </>
    )
}

export async function Explore() : Promise<JSX.Element> {
    const posts = await fetchAllPosts()
    return (
        <>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1'>
                {posts.map((post:Post) => <ExplorePost post={post}/>)}
            </div>
        </>
    )
}
