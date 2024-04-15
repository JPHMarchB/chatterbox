import {fetchCommentsByPostId} from "@/utils/http/comment.http";
import {Comment} from "@/utils/models/comment.model";
import {Post} from "@/utils/models/post.model";
import {CommentDisplay} from "@/app/(side-site)/post-page/[postId]/CommentDisplay";
import {CommentForm} from "@/app/shared/CommentForm";
import {Session} from "@/utils/fetchSession";

type Props = {
    comments:Comment[]
    post:Post
    session: Session | undefined
}
export async function CommentsDisplay (props:Props) {
    const {post, session} = props
    const comments =  await getCommentData(post.postId)

    return (
        <>

            {/* Comment Display*/}
            <div className={"max-h-96 overflow-y-auto"}>
                <p>Hey listen</p>
                {comments.map(comment => (<CommentDisplay comment={comment} key = {comment.commentId}/>))}
            </div>

            <CommentForm session={session} post={post}/>

        </>
    )
}

async function getCommentData (postId: string) {

    return await fetchCommentsByPostId(postId)
}