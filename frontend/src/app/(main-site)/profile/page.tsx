import {JSX} from "react";
import {Posts} from "@/app/shared/Posts";

export default function YourProfile() : JSX.Element {
    return (
        <>
            <main className='bg-[#222] p-5 md:p-10'>

                {/* Profile info */}
                <section className='grid md:flex items-center gap-16 justify-center'>

                    {/* Profile image */}
                    <div>
                        <img className='rounded-full w-64 h-64' src='/profile-placeholder.jpg' alt='profile image'/>
                    </div>

                    {/* Change profile info */}
                    <div>
                        <h2 className='text-white text-4xl'>@jmflup_you</h2>
                        <form className='grid *:rounded-lg'>
                            <label className='text-white' htmlFor='username'>Username</label>
                            <input className='text-black' type='text' id='username' name='username'/>

                            <label className='text-white' htmlFor='bio'>Bio</label>
                            <textarea className='text-black' cols={33} id='bio' name='bio'/>
                        </form>
                    </div>
                </section>

                {/* Liked Posts */}
                <section className='pt-40'>
                    <h2 className='text-white text-4xl'>Liked Posts</h2>
                    <Posts/>
                </section>

            </main>
        </>
    )
}