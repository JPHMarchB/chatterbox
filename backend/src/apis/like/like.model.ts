import { z } from 'zod'
import {sql} from "../../utils/database.utils";

/**
 * The shape of a like object
 * @property likeProfileId {string} the primary key
 * @property likePostId {string} the foreign key
 * @property likeDateTime {Date} the date and time the like was posted
 */
export const LikeSchema = z.object({
    // throw error for like profile id if wrong
    likeProfileId: z.string({required_error: 'please provide a valid likeProfileId'})
        .uuid({message: 'please provide a valid uuid for likeProfileId'}),
    // throw error for like post id if wrong
    likePostId: z.string({required_error: 'please provide a valid likePostId'})
        .uuid({message: 'please provide a valid uuid for likePostId'}),
    // throw error for like date time if wrong
    likeDateTime: z.coerce.date({required_error: 'please provide a valid likeDatetime or null'})
        .nullable()
})


//Shape of a like object
export type Like = z.infer<typeof LikeSchema>

/**
 * inserts a like into the like table and returns a message
 * @param like to be inserted
 * @returns 'Like successfully posted'
 */
export async function insertLike(like:Like):Promise<string> {

    //deconstruct like object
    const {likeProfileId, likePostId} = like

    //insert like into like table
    await sql`INSERT INTO "like" (like_profile_id, like_post_id, like_date_time) VALUES (${likeProfileId}, ${likePostId}, now())`

    //return a message to the user indicating success
    return  'Successful Like!'

}

/**
 * selects a like from the like table by likeId and returns the like
 * @param like to be selected by likeId
 * @returns the like that was selected
 * @returns null if no like was found
 */
export async function selectLikeByLikeId(like:Like): Promise<Like | null> {

    // deconstruct the like object
    const {likeProfileId, likePostId} = like

    // select the like from the like table by likeId
    const rowList = <Like[]>
        await sql`SELECT like_profile_id, 
       "like".like_post_id, like_date_time
        FROM "like"
        WHERE like_profile_id = ${likeProfileId}
        AND "like".like_post_id = ${likePostId}`

    // parse the result into an array of likes
    const result = LikeSchema.array().max(1).parse(rowList)

    // return the like that was selected
    return result.length === 0 ? null : result[0]

}

/**
 * deletes a like from the like table and returns a message
 * @param like to be deleted
 * @returns 'Like successfully deleted'
 */
export async function deleteLike(like: Like): Promise<string> {

    // deconstruct the like object
    const {likeProfileId, likePostId} = like

    // delete the like from the like table
    await sql`DELETE
              FROM "like"
              WHERE like_profile_id = ${likeProfileId}
                AND "like".like_post_id = ${likePostId}`

    // return a message to the user indicating success
    return 'Like removed'
}

/**
 * selects likes from the like table by likePostId and returns the likes
 * @returns the likes that were selected
 * @param likePostId
 */

export async function selectLikesByLikePostId(likePostId: string): Promise<Like[]> {

    // select the likes from the like table by likeThreadId
    const rowList = <Like[]>await sql
        `SELECT like_profile_id, 
        like_post_id, 
        like_date_time
        FROM "like"
        WHERE like_post_id = ${likePostId}`

    // parse the result into an array of likes and return it
    return LikeSchema.array().parse(rowList)
}

/**
 * selects likes from the like table by likeProfileId and returns the likes
 * @param likeProfileId to be selected by likeProfileId
 * @returns the likes that were selected
 */
export async function selectLikesByLikeProfileId(likeProfileId: string): Promise<Like[]> {

    // select the likes from the like table by likeProfileId
    const rowList = <Like[]>
        await sql`SELECT like_profile_id, 
        like_post_id, 
        like_date_time
        FROM "like"
        WHERE like_profile_id = ${likeProfileId}`

    // parse the result into an array of likes and return it
    return LikeSchema.array().parse(rowList)
}