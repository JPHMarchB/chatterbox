'use server'

import {Follow, FollowSchema} from "@/utils/models/follow.model";
import {cookies} from "next/headers";
import {revalidateTag} from "next/cache";
import {Session} from "@/utils/fetchSession";

export async function fetchFollowByFollowProfileId(followProfileId : string) : Promise<Follow[]> {
    const {data} = await fetch(`${process.env.PUBLIC_API_URL}/apis/follow/followProfileId/${followProfileId}`).then(response => {
        if(!response.ok) {
            throw new Error(`Error loading page`)
        } else {
            return response.json()
        }
    })
    return FollowSchema.array().parse(data)
}

export async function fetchFollowByFollowFollowingProfileId(followFollowingProfileId : string) : Promise<Follow[]> {
    const {data} = await fetch(`${process.env.PUBLIC_API_URL}/apis/follow/followFollowingProfileId/${followFollowingProfileId}`).then(response => {
        if(!response.ok) {
            throw new Error(``)
        } else {
            return response.json()
        }
    })
    return FollowSchema.array().parse(data)
}

export async function fetchFollowToggle(profileId: string , session: Session)  {
    const sid = cookies().get('connect.sid')?.value ?? ""
    const response = await fetch(`${process.env.PUBLIC_API_URL}/apis/follow/toggle`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'authorization': session.authorization,
            Cookie: `connect.sid=${sid}`
        },
        body: JSON.stringify({
            followProfileId: session.profile.profileId,
            followFollowingProfileId: profileId,
            followDate: null
        }),
    });
    revalidateTag(`follow-${profileId}`)
    return response.json()
}

