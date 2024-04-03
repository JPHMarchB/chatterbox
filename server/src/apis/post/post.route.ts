import {Router} from "express";
import {
    getAllPosts,
    postPostController,
    deletePostByPostIdController,
    getPostByPostDatetimeController,
    getPostByPostIdController,
    getPageOfPostsController,
    getPostByPostProfileIdController,
    getPostsByProfileNameController
} from "./post.controller";
import {isLoggedInController} from "../../utils/controllers/isLoggedIn.controller";

const basePath = '/apis/post'

const router: Router = Router()

router.route('/')
    .post(postPostController)
    .get(getAllPosts)

router.route('/page/:page')
    .get(getPageOfPostsController)

router.route('/:postId')
    .get(getPostByPostIdController)
    .delete(isLoggedInController, deletePostByPostIdController)

router.route('/postProfileId/:postProfileId')
    .get(getPostByPostProfileIdController)

router.route('/profileName/:profileName')
    .get(getPostsByProfileNameController)

router.route('/postDatetime/:postDatetime')
    .get(getPostByPostDatetimeController)

export const postRoute = { basePath, router }
