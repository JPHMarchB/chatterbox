import {JSX} from "react";


export function Post() : JSX.Element {
    return (
        <>
            <div className='w-64 h-64 p-5'>
                <img className='rounded-xl w-96 h-96' src='/profile-placeholder.jpg' alt='Post image'/>
                <div className='flex justify-between items-center'>
                    <img className='rounded-full w-12 h-12' src='/profile-placeholder.jpg' alt='Post image'/>
                    <p>@jm_flupyou</p>
                    <div className='flex gap-2'>
                        <img className='w-12 h-12' src='/profile-placeholder.jpg' alt='Post image'/>
                        <img className='w-12 h-12' src='/profile-placeholder.jpg' alt='Post image'/>
                    </div>
                </div>
            </div>
        </>
    )
}