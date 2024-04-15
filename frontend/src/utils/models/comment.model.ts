import { z } from 'zod'

export const CommentSchema = z.object({
    commentId: z.string({
        required_error:"Please provide a valid commentId"})
        .uuid({message:"Please provide a valid uuid for commentId"})
        .nullable(),

    commentProfileId: z.string({
        required_error: 'please provide a valid commentProfileId'})
        .uuid({message: 'please provide a valid uuid for commentProfileId'}),

    commentPostId: z.string({
        required_error: 'please provide a valid commentPostId'})
        .uuid({message: 'please provide a valid uuid for commentPostId'})
        .nullable(),

    commentContent: z.string({
        required_error: 'please provide valid content for the comment'})
        .min(1, {message: 'comment content cannot be empty'})
        .max(512, {message: 'Max amount of characters reached.'}),

    commentDatetime: z.coerce.date({
        required_error: 'please provide a valid commentDatetime or null'})
        .nullable()

})

export type Comment = z.infer<typeof CommentSchema>