import { z } from 'zod'

/**
 * The shape of a like object
 * @property likeProfileId {string} the primary key
 * @property likeArticleId {string} the foreign key
 * @property likeDateTime {Date} the date and time the like was posted
 */

export const LikeSchema = z.object({
    likeProfileId: z.string({required_error: 'please provide a valid likeProfileId'})
        .uuid({message: 'please provide a valid uuid for likeProfileId'}),

    likeArticleId: z.string({required_error: 'please provide a valid likeArticleId'})
        .uuid({message: 'please provide a valid uuid for likeArticleId'}),

    likeDateTime: z.coerce.date({required_error: 'please provide a valid likeDatetime or null'})
        .nullable()
})

export type Like = z.infer<typeof LikeSchema>