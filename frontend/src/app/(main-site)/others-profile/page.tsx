import {JSX} from "react";

export default function OthersProfile() : JSX.Element {
    return (
        <>
            <main className='bg-[#222] p-5 md:p-20'>

                {/* Profile info */}
                <section className='*:pt-2'>

                    {/* Profile image */}
                    <div className='grid md:flex items-center justify-center md:justify-start gap-8 md:gap-16'>
                        <img className='rounded-full w-64 h-64' src='/profile-placeholder.jpg' alt='profile image'/>
                        <div className='flex text-center text-white gap-8 text-base md:text-2xl'>
                            <p>6<br/>Posts</p>
                            <p>119<br/>Followers</p>
                            <p>122<br/>Following</p>
                        </div>
                    </div>
                    <div className='*:pt-6'>
                        <h2 className='text-white text-4xl'>@jmflup_you</h2>
                        <p>Hello there! I'm a passionate explorer who loves to discover new cultures and cuisines. When I'm
                        not traveling, you can find me buried in a good book or working on my latest DIY project. I
                        believe in lifelong learning and am always eager to pick up a new skill or hobby. Join me on my
                        journey as I share snippets of my adventures and everyday life. Let's inspire each other!
                        </p>
                    </div>
                </section>
            </main>
        </>
    )
}