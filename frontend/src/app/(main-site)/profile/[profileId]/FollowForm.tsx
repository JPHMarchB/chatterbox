'use client'

import React, {useState} from 'react';
import { Session } from '@/utils/fetchSession';
import {useRouter} from "next/navigation";
import {Profile} from "@/utils/models/profile.model";
import {Follow} from "@/utils/models/follow.model";
import {fetchFollowToggle} from "@/utils/http/follow.http";

type FollowFormProps = {
    session: Session | undefined;
    profile: Profile
    follows: Follow[]
};

export function FollowForm(props: FollowFormProps) {
    const { session, profile, follows} = props
    const router = useRouter()
    const [isFollowed, setIsFollowed] = useState( follows.filter(follow => follow.followProfileId === session?.profile.profileId).length === 1)

    if (!session) {
        return (
            <>
                <div className='grid pt-5 max-w-full md:w-96 lg:w-96'>
                    <label className='sr-only' htmlFor='follow'>
                        follow button
                    </label>
                    {/* follow profile */}
                    <button id={'follow'} name={"follow"} onClick={() => router.push("/sign-in-page")} className="btn btn-active bg-[#04bfad] text-white hover:bg-[#8181e6] border-[#04bfad] hover:border-[#8181e6]">Follow +</button>
                </div>
            </>
        )
    }

    return (
        <>
            <div className='grid pt-5 max-w-full md:w-96 lg:w-96'>
                <label className='sr-only' htmlFor='follow'>
                    follow button
                </label>
                {/* follow profile */}
                {isFollowed ? <button id={'follow'} name={"follow"} onClick={async () => {
                        const json = await fetchFollowToggle(profile.profileId, session)
                        if (json.status === 200) {
                            setIsFollowed(false)
                            router.refresh()
                        }
                    }}
                                      className="btn btn-active bg-[#04bfad] text-white border-[#04bfad] hover:bg-[#04bfad] hover:border-[#04bfad] hover:scale-95">Followed</button> :

                    <button id={'follow'} name={"follow"} onClick={async () => {
                        const json = await fetchFollowToggle(profile.profileId, session)
                        if (json.status === 200) {
                            setIsFollowed(true)
                            router.refresh()
                        }
                    }}
                            className="btn btn-active bg-[#8181e6] text-white border-[#8181e6] hover:bg-[#8181e6] hover:border-[#8181e6] hover:scale-105">Follow +</button>}
            </div>
        </>
    )
}
