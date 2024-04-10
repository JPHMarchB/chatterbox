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
            <div className='mason-style'>
                {posts.map((post:Post) => (
                    <div className='mason-style-support'>
                        <ExplorePost post={post} key={post.postId}/>
                    </div>
                ))}
            </div>
        </>
    )
}
