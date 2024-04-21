'use server'

import {Post, PostSchema} from "@/utils/models/post.model";

export async function fetchAllPosts() : Promise<Post[]> {
    const {data} = await fetch(
        `${process.env.PUBLIC_API_URL}/apis/post`)
        .then((response: Response) => {
        if(!response.ok) {
            throw new Error('Error getting all posts')
        } else {
            return response.json()
        }
    })
    return PostSchema.array().parse(data)
}

export async function fetchPostByPostId(postId: string) : Promise<Post> {
    const {data} = await fetch(`${process.env.PUBLIC_API_URL}/apis/post/${postId}`)
        .then((response: Response) => {
        if(!response.ok) {
            throw new Error('Error fetching post')
        } else {
            return response.json()
        }
    })

    return PostSchema.parse(data)
}

export async function fetchPostByProfileId(postProfileId: string) : Promise<Post[]> {
    const {data} = await fetch(
        `${process.env.PUBLIC_API_URL}/apis/post/postProfileId/${postProfileId}`, {
            next:{
                tags: [`post-${postProfileId}`]
            }}).then((response: Response) => {
        if(!response.ok) {
            throw new Error('Error getting postsProfileId')
        } else {
            return response.json()
        }
    })
    return PostSchema.array().parse(data)
}
