import {JSX} from "react";

export function Navigation() : JSX.Element {
    return (
        <>
            <div className="flex justify-between items-center backdrop-blur-3xl bg-white/20 border-b p-5 z-50">
                <img alt="Logo" width="77" height="77" src="https://1000logos.net/wp-content/uploads/2017/02/Instagram-Logo.png"/>

                <div className="flex gap-8 pe-5">
                    <img className='mt-1' src='/heart.svg' alt='notificatiions'/>
                    <img src='/chat-dots.svg' alt='Messages'/>
                </div>
            </div>
        </>
    )
}