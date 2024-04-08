'use client'

import {useRouter} from "next/navigation";
import {fetchSignOut} from "@/utils/http/profile.http";

export function SignOutButton() {

    const router = useRouter()

    const handleSignOut = async () => {
        const result = await fetchSignOut()
        if (result.status === 200) {
            router.refresh()
            router.push('/sign-in-page')

        }
    }

    return (
        <>
            <label className='sr-only' htmlFor='sign-out'>Button to sign out</label>
            <button onClick={handleSignOut} className='hover:bg-red-500 hover:text-white' id='sign-out' name='sign-out'>Sign Out</button>
        </>
    )
}