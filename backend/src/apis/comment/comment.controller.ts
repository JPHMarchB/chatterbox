import { Request, Response } from 'express';
import {
    insertComment,
    selectCommentsByPostId,
    selectCommentsByProfileId,
    deleteComment, selectCommentByCommentId, selectAllComments
} from './comment.model';
import { CommentSchema } from "./comment.model";
import { Status } from '../../utils/interfaces/Status';
import { zodErrorResponse } from '../../utils/response.utils';
import {z} from "zod";
import {PublicProfile} from "../profile/profile.model";

/**
 * gets all comments from the database and returns them to the user in the response
 * @param request from the client to the server to get all comments
 * @param response from the server to the client with all comments or an error message
 */
export async function getAllComments (request: Request, response: Response): Promise<Response<Status>> {
    try {

        // get the comments from the database and store it in a variable called data
        const data = await selectAllComments()

        // return the response with the status code 200, a message, and the comments as data
        const status: Status = {status: 200, message: null, data}
        return response.json(status)

        // if there is an error, return the response with the status code 500, an error message, and null data
    } catch (error) {
        console.error(error)
        return response.json({
            status: 500,
            message: error,
            data: []
        })
    }
}

/**
 * Handles POST request to insert a new comment into the database.
 * @param request - body must contain commentPostId, commentProfileId, and commentContent
 * @param response - will contain a status object with a message and null data if successful,
 * or a status with an error message and null data if unsuccessful
 */
export async function postCommentController(request: Request, response: Response): Promise<Response | undefined> {
    try {
        // Validate the incoming request with the comment schema
        const validationResult = CommentSchema.safeParse(request.body);

        // If the validation fails, return a response to the client
        if (!validationResult.success) {
            return zodErrorResponse(response, validationResult.error);
        }

        // Deconstruct Comment id from validation result
        const {commentPostId, commentContent} = validationResult.data;

        // Deconstruct Profile from session
        const profile = request.session.profile as PublicProfile

        // Deconstruct profileId from profile
        const commentProfileId = profile.profileId as string

        // Create a new comment object (excluding fields like commentId and commentDateTime that are set by the database)
        const comment = {
            commentPostId,
            commentProfileId,
            commentContent,
            commentId:null,
            commentDateTime:null,
        };

        // create a status object
        const status: Status = {
            status: 200,
            message: '',
            data: null
        }

        // Insert the comment into the database
        status.message = await insertComment(comment);

        // Return the response with status code 200 and the success message
        return response.json(status);

    } catch (error: any) {
        if (error.code === "23503") {
            return response.status(400).json({
                status: 400,
                message: "The provided post ID does not exist.",
                data: null
            });
        }
        return response.status(500).json({
            status: 500,
            message: error.message,
            data: null
        });
    }
}

/**
 * Handles GET request for comments associated with a post.
 */
export async function getCommentsByPostIdController(request: Request, response: Response): Promise<Response> {
    try {
        // validate the incoming request commentId with the uuid schema
        const validationResult = z.string()
            .uuid({message: 'please provide a valid postId'})
            .safeParse(request.params.commentPostId)

        // if the validation fails, return a response to the client
        if (!validationResult.success) {
            return zodErrorResponse(response, validationResult.error)
        }

        // get the comment id from the request parameters
        const commentPostId = validationResult.data

        // get the comment from the database by comment id and store it in a variable called data
        const data = await selectCommentsByPostId(commentPostId)

        // return the status and the likes associated with the thread
        return response.json({ status: 200, message: null, data: data });

        // if an error occurs, return the error to the user
    } catch (error: any) {
        return response.json({ status: 500, message: "it doesnt work idiot", data: [] });
    }
}

/**
 * Handles GET request for comments associated with a profile.
 */
export async function getCommentsByProfileIdController(request: Request, response: Response): Promise<Response> {
    try {
        // validate the incoming request profileId with the uuid schema
        const validationResult = z.string()
            .uuid({ message: 'Please provide a valid profileId' })
            .safeParse(request.params.profileId); // Make sure the parameter name matches your route parameter

        // if the validation fails, return a response to the client
        if (!validationResult.success) {
            return zodErrorResponse(response, validationResult.error);
        }

        // get the profile id from the request parameters
        const profileId = validationResult.data;

        // get the comments from the database by profile id and store them in a variable called data
        const data = await selectCommentsByProfileId(profileId);

        // return the status and the comments associated with the profile
        return response.json({ status: 200, message: null, data: data });

        // return any errors to the user
    } catch (error: any) {
        return response.json({
            status: 500,
            message: error.message,
            data: [] });
    }
}

/**
 * Handles DELETE request to delete a comment by its ID.
 */
export async function deleteCommentController(request: Request, response: Response): Promise<Response> {
    try {
        // Validate the incoming request commentId with the uuid schema
        const validationResult = z.string()
            .uuid({ message: 'Please provide a valid commentId' })
            .safeParse(request.params.commentId); // Ensure the parameter name matches your route parameter

        // If the validation fails, return a response to the client
        if (!validationResult.success) {
            return zodErrorResponse(response, validationResult.error);
        }

        // Get the comment id from the request parameters
        const commentId = validationResult.data;

        // Attempt to delete the comment from the database
        const message = await deleteComment(commentId);

        // If deletion is successful, return a success response
        return response.json({ status: 200, message: message, data: null });
    } catch (error: any) {
        return response.json({ status: 500, message: error.message, data: [] });
    }
}

export async function  getCommentByCommentIdController(request: Request, response: Response): Promise<Response<Status>> {
    try {
        // validate the incoming request commentId with the uuid schema
        const validationResult = z.string()
            .uuid({message: 'please provide a valid commentId'})
            .safeParse(request.params.commentId)

        // if the validation fails, return a response to the client
        if (!validationResult.success) {
            return zodErrorResponse(response, validationResult.error)
        }

        // get the comment id from the request parameters
        const commentId = validationResult.data

        // get the comment from the database by comment id and store it in a variable called data
        const data = await selectCommentByCommentId(commentId)

        // return the response with the status code 200, a message, and the post as data
        return response.json({ status: 200, message: null,data });

    } catch (error: any) {
        return response.json({
            status: 500,
            message: error.message,
            data: []
        });
    }
}
