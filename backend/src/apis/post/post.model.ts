import {z} from 'zod'
import {sql} from "../../utils/database.utils";

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


/**
 * The shape of a post in the post table in the database
 * @property postId {string} the primary key
 * @property postProfileId {string} the post's profile
 * @property postContent {string} the post's content
 * @property postDatetime {Date} the post's datetime
 * @property postImageUrl {string} the post's image url
 */
export type Post = z.infer<typeof PostSchema>

/**
 * posts a post in the post table in the database and returns a message that says 'Post successfully posted'
 * @param post
 * @returns 'Post successfully posted'
 */
export async function insertPost(post: Post): Promise<string> {

    // deconstruct the post object
    const {postProfileId, postContent, postImageUrl} = post

    // insert the post into the post table
    await sql`INSERT INTO post (post_id, 
                  post_profile_id, 
                  post_content, 
                  post_datetime, 
                  post_image_url)
              VALUES (gen_random_uuid(), ${postProfileId}, ${postContent}, NOW(), ${postImageUrl})`

    // return a message that says 'Post successfully posted'
    return 'Post successfully posted'
}

/**
 * deletes a post from the post table and returns a message
 * @returns 'Post successfully deleted'
 * @param postId
 */
export async function deletePostByPostId(postId: string): Promise<string> {
    // delete the post from the post table in the database by postId
    await sql`DELETE
              FROM post
              WHERE post_id = ${postId}`

    // return a message that says 'Post successfully deleted'
    return 'Post successfully deleted'
}

/**
 * gets all posts from the posts table in the database and returns them to the user in the response
 * @returns {Promise<Post[]>}
 * @throws {Error} an error if the query fails for some reason or if there are no posts in the database
 */
export async function selectAllPosts(): Promise<Post[]> {
    // get all posts from the post table in the database and return them
    const rowList = <Post[]>
        await sql`SELECT post_id,
                         post_profile_id,
                         post_content,
                         post_datetime,
                         post_image_url
                  FROM post
                  ORDER BY post_datetime DESC`

    // parse the posts from the database into an array of Post objects
    return PostSchema.array().parse(rowList)
}

/**
 * get the post from the post table in the database by postId and return it
 * @param postId {string} the post's id to search for in the post table
 * @returns <Post|null> the post that has the postId or null if no post is found
 */
export async function selectPostByPostId(postId : string): Promise<Post | null> {
    // get the post from the post table in the database by postId
    const rowList = <Post[]>
        await sql`SELECT post_id,
                         post_profile_id,
                         post_content,
                         post_datetime,
                         post_image_url
                  FROM post
                  WHERE post_id = ${postId}`

    // parse the post from the database into a post object
    const result = PostSchema.array().max(1).parse(rowList)
    
    // return the post or null if no post is found
    return result.length === 0 ? null : result[0]
}

/**
 * gets all posts from the post table in the database by profileName and returns them
 * @param profileName {string} the post's profile name to search for in the post table
 * @returns <Post[]> the posts that have the profileName
 */
export async function selectPostsByProfileName(profileName: string): Promise<Post[]> {
    // get all posts from the post table in the database by profileName and return them
    const rowList = <Post[]>await sql`SELECT post_id,
                                      post_profile_id,
                                      post_content,
                                      post_datetime,
                                      post_image_url
                               FROM post JOIN profile ON post.post_profile_id = profile.profile_id
                               WHERE profile.profile_name = ${profileName}`

    // parse the posts from the database into an array of Post objects
    return PostSchema.array().parse(rowList)
}

/**
 * get the post from the post table in the database by postProfileId and return it
 * @param postProfileId {string} the post's profile to search for in the post table
 * @returns <Post|null> the post that has the postProfileId or null if no post is found
 */
export async function selectPostByPostProfileId(postProfileId: string): Promise<Post[]> {
    // get all posts from the post table in the database by postProfileId and return them
    const rowList = <Post[]>await sql`SELECT post_id,
                                      post_profile_id,
                                      post_content,
                                      post_datetime,
                                      post_image_url
                               FROM post
                               WHERE post_profile_id = ${postProfileId}`

    // parse the posts from the database into an array of Post objects
    return PostSchema.array().parse(rowList)
}

/**
 * get the post from the post table in the database by postDatetime and return it
 * @param postDatetime {Date} the post's date to search for in the post table
 * @returns <Post|null> the post that has the postDatetime or null if no post is found
 */
export async function selectPostByPostDatetime(postDatetime : string): Promise<Post | null> {
    const futureDate = new Date(postDatetime)
    futureDate.setMinutes(futureDate.getMinutes() + 1)
    
    // get the post from the post table in the database by postDatetime
    const rowList = <Post[]>
        await sql`SELECT post_id,
                         post_profile_id,
                         post_content,
                         post_datetime,
                         post_image_url
                  FROM post
                  WHERE post_datetime BETWEEN ${postDatetime} AND ${futureDate}`

    // parse the post from the database into a post object
    const result = PostSchema.array().max(1).parse(rowList)
    
    // return the post or null if no post is found
    return result.length === 0 ? null : result[0]
}

/**
 * selects the next page of posts from the post table in the database and returns them to the user in the response
 * @param page {number} the page number to get the next page of posts
 * @returns <Post[]> the next page of posts
 */
export async function selectPageOfPosts(page: number): Promise<Post[]> {
    // get all posts from the post table in the database and return them
    const rowList = <Post[]>
        await sql`SELECT post_id,
                         post_profile_id,
                         post_content,
                         post_datetime,
                         post_image_url
                  FROM post
                  ORDER BY post_datetime DESC
                  LIMIT 10 OFFSET ${(page - 1) * 10}`
    return PostSchema.array().parse(rowList)
}
