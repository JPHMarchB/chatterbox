import {JSX} from "react";


export function DM() : JSX.Element {
    return (
        <>
            <div className='flex items-center gap-8 p-5'>
                <img className='rounded-full w-12 h-12' src='/profile-placeholder.jpg' alt='User direct message'/>
                <h2>jmflup_you</h2>
            </div>
        </>
    )
}

export function DMs() : JSX.Element {
    return (
        <>
            <div className=''>
                <DM/>
                <DM/>
                <DM/>
                <DM/>
                <DM/>
                <DM/>
            </div>
        </>
    )
}