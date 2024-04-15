import { Router } from 'express';
import { isLoggedInController } from "../../utils/controllers/isLoggedIn.controller";
import {
    postCommentController,
    getCommentsByPostIdController,
    getCommentsByProfileIdController,
    deleteCommentController,
    getCommentByCommentIdController, getAllComments
} from "./comment.controller";

// Declare a basePath for this router
const basePath = '/apis/comment';

// Instantiate a new router object
const router = Router();

// Route to post a new comment
router.route('/')
    .post(isLoggedInController, postCommentController)
    .get(getAllComments);

// Route to get comments by post ID
router.route('/commentPostId/:commentPostId')
    .get(getCommentsByPostIdController);

// Route to get comments by profile ID
router.route('/commentProfileId/:commentProfileId')
    .get(getCommentsByProfileIdController);

// Route to delete a comment by comment ID
// This assumes your deleteCommentController takes a commentId from request.params
router.route('/:commentId')
    .get(getCommentByCommentIdController)
    .delete(isLoggedInController, deleteCommentController);

// Export the router with the basePath and router object
export const commentRoute = { basePath, router };