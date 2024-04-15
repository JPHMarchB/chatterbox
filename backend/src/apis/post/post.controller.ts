import {Request, Response} from 'express'
import {Status} from "../../utils/interfaces/Status";
import {
    Post,
    insertPost,
    deletePostByPostId,
    selectAllPosts,
    selectPostByPostDatetime,
    selectPostByPostId,
    selectPostByPostProfileId,
    selectPageOfPosts,
    selectPostsByProfileName
} from "./post.model";
import {zodErrorResponse} from "../../utils/response.utils";
import {z} from "zod";
import {PostSchema} from "./post.model";
import {PublicProfile, PublicProfileSchema} from "../profile/profile.model";

/**
 * Posts a new post to the database and returns a status. If successful, the status will contain the message "Post created successfully." If unsuccessful, the status will contain the message "Error creating post. Try again.".
 * @param request body must contain a postText, postAuthor, and postImage
 * @param response will contain a status object with a message and data if successful or a status with an error message and null data if unsuccessful
 */
export async function postPostController(request: Request, response: Response): Promise<Response | undefined> {
    try {

        // validate the incoming request with the post schema
        const validationResult = PostSchema.safeParse(request.body)

        // if the validation fails, return a response to the client
        if (!validationResult.success) {
            return zodErrorResponse(response, validationResult.error)
        }

        // if the validation succeeds, continue on with postPostController logic below this line

        // get the post content from the request body
        const {postContent, postImageUrl} = validationResult.data

        // get the profile from the session
        const profile: PublicProfile = request.session.profile as PublicProfile

        // set the post profile id to the profile id from the session
        const postProfileId: string = profile.profileId as string

        // create a new post object with the postProfileId, postContent, postImageUrl
        const post: Post = {
            postId: null,
            postProfileId,
            postContent,
            postDatetime: null,
            postImageUrl
        }

        // insert the post into the database and store the result in a variable called result
        const result = await insertPost(post)

        // return the response with the status code 200, a message, and the result as data
        const status: Status = {status: 200, message: result, data: null}
        return response.json(status)

        // if there is an error, return the response with the status code 500, an error message, and null data
    } catch (error) {
        return response.json({status: 500, message: 'Error creating post. Try again.', data: null})
    }
}

/**
 * deletes a post from the database by post id and returns a status to the user in the response
 * @param request from the client to the server to delete a post by post id from the database
 * @param response from the server to the client with a status of 200 or an error message
 */
export async function deletePostByPostIdController (request: Request, response: Response): Promise<Response<Status>> {
    try {

        // validate the incoming request postId with the uuid schema
        const validationResult = z.string()
            .uuid({message: 'please provide a valid postId here'})
            .safeParse(request.params.postId)

        // if the validation fails, return a response to the client
        if (!validationResult.success) {
            return zodErrorResponse(response, validationResult.error)
        }

        // get the profile from the session
        const profile: PublicProfile = request.session.profile as PublicProfile

        // set the post profile id to the profile id from the session
        const postProfileId: string = profile.profileId as string

        // get the post id from the request parameters
        const postId = validationResult.data

        // get the post from the database by post id
        const post = await selectPostByPostId(postId)

        // if the post profile id does not match the post profile id from the session, return a response to the client
        if(post?.postProfileId !== postProfileId) {
            return response.json({
                status: 403,
                message: 'you are not allowed to delete this post',
                data: null
            })
        }

        // delete the post from the database by post id
        const result = await deletePostByPostId(postId)

        // return the response with the status code 200, a message, and the post as data
        return response.json({status: 200, message: result, data: null})

        // if there is an error, return the response with the status code 500, an error message, and null data
    } catch (error) {
        return response.json({
            status: 500,
            message: '',
            data: []
        })
    }
}

/**
 * gets all posts from the database and returns them to the user in the response
 * @param request from the client to the server to get all posts
 * @param response from the server to the client with all posts or an error message
 */
export async function getAllPosts (request: Request, response: Response): Promise<Response<Status>> {
    try {

        // get the posts from the database and store it in a variable called data
        const data = await selectAllPosts()

        // return the response with the status code 200, a message, and the posts as data
        const status: Status = {status: 200, message: null, data}
        return response.json(status)

        // if there is an error, return the response with the status code 500, an error message, and null data
    } catch (error) {
        console.error(error)
        return response.json({
            status: 500,
            message: 'Error getting posts. Try again.',
            data: []
        })
    }
}

/**
 * gets a post from the database by post id and returns it to the user in the response
 * @param request from the client to the server to get a post by post id from
 * @param response from the server to the client with a post by post id or an error message
 */
export async function getPostByPostIdController (request: Request, response: Response): Promise<Response<Status>> {
    try {

        // validate the incoming request postId with the uuid schema
        const validationResult = z.string()
            .uuid({message: 'please provide a valid postId'})
            .safeParse(request.params.postId)

        // if the validation fails, return a response to the client
        if (!validationResult.success) {
            return zodErrorResponse(response, validationResult.error)
        }

        // get the post id from the request parameters
        const postId = validationResult.data

        // get the post from the database by post id and store it in a variable called data
        const data = await selectPostByPostId(postId)

        // return the response with the status code 200, a message, and the post as data
        return response.json({status: 200, message: null, data})

        // if there is an error, return the response with the status code 500, an error message, and null data
    } catch (error) {
        return response.json({
            status: 500,
            message: error,
            data: []
        })
    }
}

/**
 * gets all posts from the database by post profile id and returns them to the user in the response
 * @param request from the client to the server to get all posts by post profile id
 * @param response from the server to the client with all posts by post profile id or an error message
 */
export async function getPostsByProfileNameController (request: Request, response: Response): Promise<Response<Status>> {
    try {

        // validate the incoming request postProfileId with the uuid schema
        const validationResult = PublicProfileSchema
            .pick({profileName: true})
            .safeParse(request.params.profileName)

        // if the validation fails, return a response to the client
        if (!validationResult.success) {
            return zodErrorResponse(response, validationResult.error)
        }

        // get the post profile id from the request parameters
        const {profileName} = validationResult.data

        // get the posts from the database by post profile id and store it in a variable called data
        const data = await selectPostsByProfileName(profileName)

        // return the response with the status code 200, a message, and the posts as data
        return response.json({status: 200, message: null, data})

        // if there is an error, return the response with the status code 500, an error message, and null data
    } catch (error) {
        return response.json({
            status: 500,
            message: error,
            data: []
        })
    }
}

/**
 * gets a post from the database by post profile id and returns it to the user in the response
 * @param request from the client to the server to get a post by post profile id from
 * @param response from the server to the client with a post by post profile id or an error message
 */
export async function getPostByPostProfileIdController (request: Request, response: Response): Promise<Response<Status>> {
    try {

        // validate the incoming request postProfileId with the uuid schema
        const validationResult = z.string()
            .uuid({message: 'please provide a valid postProfileId here'})
            .safeParse(request.params.postProfileId)

        // if the validation fails, return a response to the client
        if (!validationResult.success) {
            return zodErrorResponse(response, validationResult.error)
        }

        // get the post id from the request parameters
        const postProfileId = validationResult.data

        // get the post from the database by post author and store it in a variable called data
        const data = await selectPostByPostProfileId(postProfileId)

        // return the response with the status code 200, a message, and the post as data
        return response.json({status: 200, message: null, data})

        // if there is an error, return the response with the status code 500, an error message, and null data
    } catch (error) {
        return response.json({
            status: 500,
            message: error,
            data: []
        })
    }
}

/**
 * gets a post from the database by post date and returns it to the user in the response
 * @param request from the client to the server to get a post by post date from
 * @param response from the server to the client with a post by post date or an error message
 */
export async function getPostByPostDatetimeController (request: Request, response: Response): Promise<Response<Status>> {
    try {
        // validate the incoming request postDatetime
        const validationResult = z.string()
            .safeParse(request.params.postDatetime)

        // if the validation fails, return a response to the client
        if (!validationResult.success) {
            return zodErrorResponse(response, validationResult.error)
        }

        // get the post date from the request parameters
        const postDatetime = validationResult.data

        // get the post from the database by post date and store it in a variable called data
        const data = await selectPostByPostDatetime(postDatetime)

        // return the response with the status code 200, a message, and the post as data
        return response.json({status: 200, message: null, data})

        // if there is an error, return the response with the status code 500, an error message, and null data
    } catch (error) {
        return response.json({
            status: 500,
            message: '',
            data: []
        })
    }
}

/**
 * get page and request number of most recent posts from the database and return them to the user in the response
 * @param request includes next page number
 * @param response from the server to the client with page of posts or an error message
 */
export async function getPageOfPostsController(request: Request, response: Response): Promise<Response<Status>> {
    try {
        // validate the incoming request page with the number schema
        const validationResult = z.number()
            .int({message: 'please provide a valid page number'})
            .safeParse(request.params.page)

        // if the validation fails, return a response to the client
        if (!validationResult.success) {
            return zodErrorResponse(response, validationResult.error)
        }

        // get the page number from the request parameters
        const page = validationResult.data

        // get the posts from the database by page number and store it in a variable called data
        const data = await selectPageOfPosts(Number(page))

        // return the response with the status code 200, a message, and the posts as data
        return response.json({status: 200, message: null, data})

        // if there is an error, return the response with the status code 500, an error message, and null data
    } catch (error) {
        return response.json({
            status: 500,
            message: '',
            data: []
        })
    }
}
