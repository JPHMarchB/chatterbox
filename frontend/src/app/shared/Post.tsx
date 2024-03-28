import {JSX} from "react";


export function Post() : JSX.Element {
    return (
        <>
            <div className='pt-4'>

                {/* Post Image */}
                <img className='rounded-t-xl image-full' src='/profile-placeholder.jpg' alt='Post image'/>

                {/* Interaction bar container */}
                <div className='flex justify-between items-center border-2 rounded-b-xl bg-black p-1'>

                    {/* Poster info */}
                    <div className='flex gap-2 items-center pt-2 text-sm'>
                        <img className='rounded-full w-8 h-8' src='/profile-placeholder.jpg' alt='Post image'/>
                        <p>@jm_flupyou</p>
                    </div>

                    {/* Like and comment*/}
                    <div className='flex gap-2 me-2 mt-2'>
                        <img className='mb-1' src='/chat-quote.svg' alt='comment button'/>
                        <button><img src='/heart.svg' alt='Like button'/></button>
                    </div>
                </div>
            </div>
        </>
    )
}