import { Comment, CommentSchema } from "../models/comment.model";

export async function postComment(commentData: {commentPostId: string; commentContent: string; commentProfileId: string}): Promise<Comment> {
    const response = await fetch(`${process.env.PUBLIC_API_URL}/apis/comment/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(commentData)
    }).then((response: Response) => {
        if (!response.ok) {
            throw new Error('Error posting comment')
        } else {
            return response.json()
        }
    });
    return CommentSchema.parse(response.data);
}

export async function fetchCommentsByPostId(commentPostId: string): Promise<Comment[]> {
    const {data} = await fetch(`${process.env.PUBLIC_API_URL}/apis/comment/commentPostId/${commentPostId}`, {
        next:{
            tags: [`comment-${commentPostId}`]
        }}).then((response: Response) => {
        if(!response.ok) {
            throw new Error('Error getting comments')
        } else {
            return response.json()
        }
    })
    return CommentSchema.array().parse(data)
}
