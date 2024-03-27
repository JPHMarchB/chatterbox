import {JSX} from "react";

export function BottomNav() : JSX.Element {
    return (
            <section className='absolute bottom-0 right-0 left-0'>
                <div className="flex justify-around items-center backdrop-blur-3xl border-t-2 border-white p-5 bg-white/10 z-50">
                    <img src='/houses.svg' alt='Home page'/>
                    <img src='/eyeglasses.svg' alt='Explore content'/>
                    <img src='/patch-plus.svg' alt='New post'/>
                    <img src='/stars.svg' alt='Popular'/>
                    <img className='rounded-full border-2 border-black' src='/profile-placeholder.jpg' width='40' height='40' alt='Profile Image'/>
                </div>
            </section>
    )
}