import {JSX} from "react";
import {Story} from "@/app/shared/Story";

export function Stories() : JSX.Element {
    return (
        <section className='pt-5'>
            <h1 className='text-xl text-white'>Stories</h1>
            <div className="flex gap-8 items-center p-5 overflow-x-auto z-20">
                <div>
                    <img className="w-28 h-28 rounded-full border-2 border-black bg-blue-500" src='/plus-circle.svg'
                         alt='Profile Image'/>
                    {/*<img className='relative bottom-6 right-2' src='/plus-circle.svg' alt='New story'/>*/}
                </div>
                <Story/>
                <Story/>
                <Story/>
                <Story/>
            </div>
        </section>
    )
}