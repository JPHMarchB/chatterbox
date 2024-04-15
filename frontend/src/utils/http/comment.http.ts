import { Comment, CommentSchema } from "../models/comment.model";
import {cookies} from "next/headers";
import {Session} from "@/utils/fetchSession";
import {revalidateTag} from "next/cache";

export async function postComment(comment: Comment, session: Session): Promise<Comment> {
    const sid = cookies().get('connect.sid')?.value ?? ""
    const response = await fetch(`${process.env.PUBLIC_API_URL}/apis/comment/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'authorization': session.authorization,
            Cookie: `connect.sid=${sid}`
        },
        body: JSON.stringify({
            commentId: comment.commentId,
            commentPostId: comment.commentPostId,
            commentProfileId: session.profile.profileId,
            commentContent: comment.commentContent,
            commentDatetime: null
        }),
    })
        .then((response: Response) => {
            if (!response.ok) {
                throw new Error('Error posting comment')
            } else {
                revalidateTag(`comment-${comment.commentId}`)
                return response.json()
            }
        });
    return CommentSchema.parse(response.data);
}

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
