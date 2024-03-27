import {JSX} from "react";

export function Story() : JSX.Element {
    return (
        <>
            <div className="z-50">
                <img className='w-28 h-28 rounded-full border-2 border-black' src='/profile-placeholder.jpg' alt='Profile Image'/>
            </div>
        </>
    )
}