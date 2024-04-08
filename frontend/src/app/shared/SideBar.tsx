import {JSX} from "react";
import {SignOutButton} from "@/app/shared/SignOutForm";

export function SideBar() : JSX.Element {
    return (
        <nav className='sticky left-0 top-[5.14rem] z-50'>
        <section className='hidden lg:block float-left px-16 py-8 text-center bg-black border-e me-5'>

            {/* Profile info */}
            <div className='*:py-1'>
                <div className='flex justify-center items-center'>
                    <a href='/profile'><img className='w-28 h-28 rounded-full border-4 border-white' src='/profile-placeholder.jpg' alt='Profile'/></a>
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
            <div className='grid *:py-4 pt-9 text-white'>
                <a href='/' className='hover:bg-gray-900 rounded-xl'>Feed</a>
                <a href='/explore' className='hover:bg-gray-900 rounded-xl'>Explore</a>
                <a href='/direct-message' className='hover:bg-gray-900 rounded-xl'>Direct Message</a>
                <a href='/' className='hover:bg-gray-900 rounded-xl'>Settings</a>
                <SignOutButton/>
            </div>
        </section>
        </nav>
    )
}