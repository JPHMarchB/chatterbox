import {JSX} from "react";

export function SideBar() : JSX.Element {
    return (
        <nav className='sticky left-0 top-[5.14rem]'>
        <section className='hidden lg:block float-left px-16 py-8 text-center bg-black border-e'>

            {/* Profile info */}
            <div className='*:py-1'>
                <div className='flex justify-center items-center'>
                <img className='w-28 h-28 rounded-full border-4 border-white' src='/profile-placeholder.jpg' alt='Profile'/>
                </div>
                <h1 className='text-white text-xl'>@Joemflup_you</h1>

                {/* Profile stats */}
                <div className='flex gap-4'>
                    <p>6 <br/>Posts</p>
                    <p>119 <br/>Followers</p>
                    <p>122 <br/>Following</p>
                </div>
            </div>

            {/* Site Navigation */}
            <div className='*:py-4 pt-9 text-white'>
                <p className='hover:bg-gray-900 rounded-xl'>Feed</p>
                <p className='hover:bg-gray-900 rounded-xl'>Explore</p>
                <p className='hover:bg-gray-900 rounded-xl'>Direct Message</p>
                <p className='hover:bg-gray-900 rounded-xl'>Settings</p>
                <p className='hover:bg-red-600 rounded-xl mt-5 flex justify-center items-center gap-3'>
                    Logout<img src='/box-arrow-right.svg' alt='Logout'/>
                </p>
            </div>
        </section>
        </nav>
    )
}