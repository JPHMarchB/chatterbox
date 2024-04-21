'use client'

import {useRouter} from "next/navigation";
import {fetchSignOut} from "@/utils/http/profile.http";

export function SignOutButton() {

    const router = useRouter()

    const handleSignOut = async () => {
        const result = await fetchSignOut()
        if (result.status === 200) {
            router.refresh()
            router.push('/sign-in')
        }
    }

    return (
        <>
            <label className='sr-only' htmlFor='sign-out'>Button to sign out</label>
            <button onClick={handleSignOut} name='sign-out' id='sign-out' className='hover:bg-red-600 rounded-xl mt-1 lg:mt-5 lg:flex lg:justify-center lg:items-center gap-3'>Logout
                <img src='/box-arrow-right.svg' alt='Logout'/>
            </button>
        </>
    )
}