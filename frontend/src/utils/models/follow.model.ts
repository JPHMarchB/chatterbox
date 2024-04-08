import {z} from 'zod'

export const FollowSchema = z.object({
    followProfileId: z.string({required_error: 'please provide a valid followProfileId'})
        .uuid({message: 'please provide a valid uuid for followProfileId'}),

    followFollowingProfileId: z.string({required_error: 'please provide a valid followFollowingId'})
        .uuid({message: 'please provide a valid uuid for followFollowingId'}),

    followDate: z.coerce.date({required_error: 'please provide a valid followDate or null'})
        .nullable(),
})

export type Follow = z.infer<typeof FollowSchema>
