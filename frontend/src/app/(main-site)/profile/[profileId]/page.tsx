'use server'

import {Follow} from "@/utils/models/follow.model";
import {FollowDisplay} from "@/app/(main-site)/profile/[profileId]/FollowDisplay";
import {fetchProfileByProfileId} from "@/utils/http/profile.http";

export default async function followUser ({params}: { params: {profileId: string, follows: Follow[], following: Follow[]}}){
    const {profileId} = params
    const profile =  await fetchProfileByProfileId(profileId)

    return (
        <>
            <div>
                <FollowDisplay  profile={profile}/>
            </div>
        </>
    )
}
