import {Router} from "express";
import {signOutController} from "./sign-out.controller";

// Declare a "base path" for this router to go to
const basePath = '/apis/sign-out'

// Create a router variable
const router = Router()

// Tell the router variable where to route to in this case getting the signOut function to sign out a user
router.route('/').get(signOutController)

// Export the router with the base path and router object
export const signOutRoute = { basePath, router }