import { z } from 'zod'

/**
 * The shape of a comment object * @property commentProfileId {string} the primary key
 * @property commentArticleId {string} the foreign key
 * @property commentContent {string} the content of the comment
 * @property commentDateTime {Date} the date and time the comment was posted
 */
export const CommentSchema = z.object({
    commentId: z.string({required_error:"Please provide a valid commentId"})
        .uuid({message:"Please provide a valid uuid for commentId"})
        .nullable(),

    commentProfileId: z.string({required_error: 'please provide a valid commentProfileId'})
        .uuid({message: 'please provide a valid uuid for commentProfileId'}),


    commentArticleId: z.string({required_error: 'please provide a valid commentArticleId'})
        .uuid({message: 'please provide a valid uuid for commentArticleId'})
        .nullable(),

    commentContent: z.string({required_error: 'please provide valid content for the comment'})
        .min(1, {message: 'comment content cannot be empty'})
        .max(512, {message: 'Max amount of characters reached.'}),

    commentDateTime: z.coerce.date({required_error: 'please provide a valid commentDatetime or null'})
        .nullable()

})

export type Comment = z.infer<typeof CommentSchema>