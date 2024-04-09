import {z} from "zod";

export const PostSchema = z.object({
    postId: z.string({
        required_error: 'please provide a valid postId or null'})
        .uuid({message: 'please provide a valid uuid for postId UUID'})
        .nullable(),

    postProfileId: z.string({
        required_error: 'please provide a valid postProfileId or null'})
        .uuid({message: 'please provide a valid uuid for postProfileId UUID'}),

    postContent: z.string({
        required_error: 'please provide a valid postContent or null'})
        .max(255, {message: 'please provide a valid postContent (max 255 characters)'}),

    postDatetime: z.coerce.date({
        required_error: 'please provide a valid postDatetime'})
        .nullable(),

    postImageUrl: z.string({
        required_error: 'please provide a valid postImageUrl'})
        .trim()
        .url({message: 'please provide a valid URL for post image url'})
        .max(255, {message: 'please provide a valid postImageUrl (max 255 characters)'}),
})

export type Post = z.infer<typeof PostSchema>