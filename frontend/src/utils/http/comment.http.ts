import { Comment, CommentSchema } from "../models/comment.model";

export async function fetchCommentsByPostId(postId : string) : Promise<Comment[]> {
    const {data} = await fetch(
        `${process.env.PUBLIC_API_URL}/apis/comment/commentPostId/${postId}`, {
            next:{
                tags: [`comment-${postId}`]
            }}).then((response: Response) => {
        if(!response.ok) {
            throw new Error('Error commenting')
        } else {
            return response.json()
        }
    })
    return CommentSchema.array().parse(data)
}
