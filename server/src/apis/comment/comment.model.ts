import { z } from 'zod';
import { sql } from "../../utils/database.utils";

export const CommentSchema = z.object({

    commentId: z.string({required_error:"Please provide a valid commentId"})
        .uuid({message:"Please provide a valid uuid for commentId"})
        .nullable(),

    commentProfileId: z.string({required_error:'Please provide a valid commentProfileId'})
        .uuid({message:'Please provide a valid uuid for commentProfileId'}),

    commentPostId: z.string({required_error:'Please provide a valid commentPostId'})
        .uuid({message:'Please provide a valid uuid for commentPostId'}),

    commentContent: z.string({required_error:'Please provide valid commentContent'})
        .max(512, {message: 'Max amount of characters surpassed'})
        .min(1, {message: 'please provide a'}),

    commentDateTime: z.coerce.date({required_error: 'please provide a valid commentDatetime or null'})
        .nullable(),
});


// Get comment schema
export type Comment = z.infer<typeof CommentSchema>

/**
 * Inserts a comment into the comment table in the database and returns a message that says 'Comment successfully posted'
 * @param comment The comment to be inserted
 * @returns 'Comment successfully posted'
 */
export async function insertComment(comment:Comment):Promise<string> {

    // deconstruct the comment object
    const {commentPostId, commentProfileId, commentContent } = comment;

    // insert the comment into the comment table
    await sql`INSERT INTO comment (
                  comment_id,comment_post_id, comment_profile_id, comment_content, comment_datetime)
              VALUES (gen_random_uuid(),${commentPostId},${commentProfileId}, ${commentContent}, NOW())`;

    // return a message that says 'Comment successfully posted'
    return 'Comment successfully posted';
}

/**
 * Selects a comment from the comment table by commentId and returns the comment
 * @param commentId to be selected
 * @returns the comment that was selected
 * @returns null if no comment was found
 */
export async function selectCommentByCommentId(commentId: string): Promise<Comment | null> {
    const rowList = await sql<Comment[]>`SELECT * FROM comment WHERE comment_id = ${commentId}`;

    const result = CommentSchema.array().max(1).parse(rowList);

    return result.length === 0 ? null : result[0];
}

/**
 * Deletes a comment from the comment table and returns a message
 * @param commentId to be deleted
 * @returns 'Comment successfully deleted'
 */
export async function deleteComment(commentId: string): Promise<string> {
    await sql`DELETE FROM comment WHERE comment_id = ${commentId}`;

    return 'Comment successfully deleted';
}

/**
 * Selects comments from the comment table by postId and returns the comments
 * @param postId to be used for selection
 * @returns the comments that were selected
 */
export async function selectCommentsByPostId(postId: string): Promise<Comment[]> {
    const rowList = await sql<Comment[]>`SELECT * FROM comment WHERE comment_post_id = ${postId}`;

    return CommentSchema.array().parse(rowList);
}

/**
 * Selects comments from the comment table by profileId and returns the comments
 * @param profileId to be used for selection
 * @returns the comments that were selected
 */
export async function selectCommentsByProfileId(profileId: string): Promise<Comment[]> {
    const rowList = await sql<Comment[]>`SELECT * FROM comment WHERE comment_profile_id = ${profileId}`;

    return CommentSchema.array().parse(rowList);
}
