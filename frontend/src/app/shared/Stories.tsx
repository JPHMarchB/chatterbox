import {JSX} from "react";
import {Story} from "@/app/shared/Story";

export function Stories() : JSX.Element {
    return (
        <>
            <div className="flex gap-8 items-center border-b p-5 overflow-x-auto z-50">
                <div>
                    <img className='w-28 h-28 rounded-full border-2 border-black' src='/profile-placeholder.jpg'
                         alt='Profile Image'/>
                    <img className='relative bottom-6 right-2' src='/plus-circle.svg' alt='New story'/>
                </div>
                <Story/>
                <Story/>
                <Story/>
                <Story/>
            </div>
        </>
    )
}