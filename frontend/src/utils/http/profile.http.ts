'use server'

import {Profile, ProfileSchema} from "@/utils/models/profile.model";
import {cookies} from "next/headers";
import {revalidatePath} from "next/cache";

export async function fetchProfileByProfileId(profileId: string) : Promise<Profile> {
    const {data} = await fetch(`${process.env.PUBLIC_API_URL}/apis/profile/${profileId}`, {next: {tags: [`profile-${profileId}`]}}).then(response => {
        if(!response.ok) {
            throw new Error(`error fetching profile with the profile id of ${profileId}`)
        } else {
            return response.json()
        }
    })

    return ProfileSchema.parse(data)
}

export async function fetchSignOut() {
    try {
        const sid = cookies().get('connect.sid')?.value ?? ""
        const response = await fetch(`${process.env.PUBLIC_API_URL}/apis/sign-out`, {
            method: 'GET',
            headers: {
                Cookie: `connect.sid=${sid}`
            }})
        const json = await response?.json()
        if (json?.status === 200) {
            const cookieStore = cookies()
            cookieStore.delete("jwt-token")
            cookieStore.delete("connect.sid")
            revalidatePath("/", "layout")
        }
        return json

    } catch (error) {
        console.error('Error signing out:', error)
    }
}
