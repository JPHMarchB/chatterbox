import {Session} from "@/utils/fetchSession";
import {cookies} from "next/headers";
import {revalidateTag} from "next/cache";
import {Like, LikeSchema} from "@/utils/models/like.model";

export async function postPost(postId: string, postContent: string, postImageUrl: string, session: Session) {
    const sid = cookies().get('connect.sid')?.value ?? ""
    const response = await fetch(`${process.env.PUBLIC_API_URL}/apis/post`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'authorization': session.authorization,
            Cookie: `connect.sid=${sid}`
        },
        body: JSON.stringify({
            postId: postId,
            postProfileId: session.profile.profileId,
            postContent: postContent,
            postDatetime: null,
            postImageUrl: postImageUrl,
        }),
    });
    revalidateTag(`post-${postId}`)
    return response.json()
}

export async function fetchPostByPostId(postId : string) : Promise<Like[]> {
    const {data} = await fetch(
        `${process.env.PUBLIC_API_URL}/apis/post/${postId}`, {
            next:{
                tags: [`post-${postId}`]
            }}).then((response: Response) => {
        if(!response.ok) {
            throw new Error('Error getting postsId')
        } else {
            return response.json()
        }
    })
    return LikeSchema.array().parse(data)
}

export async function fetchPostByProfileId(postProfileId: string) : Promise<Like[]> {
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
    return LikeSchema.array().parse(data)
}

export async function fetchPostByName(postProfileName: string) : Promise<Like[]> {
    const {data} = await fetch(
        `${process.env.PUBLIC_API_URL}/apis/post/postProfileName/${postProfileName}`, {
            next:{
                tags: [`post-${postProfileName}`]
            }}).then((response: Response) => {
        if(!response.ok) {
            throw new Error('Error getting postsProfileName')
        } else {
            return response.json()
        }
    })
    return LikeSchema.array().parse(data)
}