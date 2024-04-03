import {Response, Request} from "express";
import {Status} from "../../utils/interfaces/Status";

/**
 * Handles the logic for signing out a user by destroying the session object and returning a response to the client indicating success
 * @param request
 * @param response
 */


export function signOutController (request : Request, response : Response): Response<Status> {
    // Establish the current session as a 'request'
    const { session } = request

    // Destroy the session in question
    session?.destroy(() => {})

    // Create a status to return the client
    const status: Status = { status: 200, message: 'You have signed out successfully!', data: null}

    // Return the status to client
    return response.json(status)
}
