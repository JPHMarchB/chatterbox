import {JSX} from "react";

export function Navigation() : JSX.Element {
    return (
        <nav className='sticky top-0 border-b'>
            <div className="flex justify-between items-center backdrop-blur-3xl bg-black p-5 z-50">
                <h1 className='text-white font-bold text-lg italic'><a href='/'>ChatterBox</a></h1>

                {/* Right side nav content*/}
                <div className="flex items-center gap-8 pe-5">
                    <img className='mt-1' src='/bell.svg' alt='notificatiions'/>
                    <a href='/chat'><img src='/chat-dots.svg' alt='Messages'/></a>
                    <button className='hidden lg:flex gap-2 p-2 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg text-white'>
                        <img src='/plus-circle.svg' alt='Create new post'/>New Post
                    </button>
                </div>
            </div>
        </nav>
    )
}