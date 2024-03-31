import {JSX} from "react";
import {DMs} from "@/app/(side-site)/direct-message/DMs";

export default function DirectMessage() : JSX.Element {
    return (
        <>
            {/* Header */}
            <section className='flex items-center gap-8 p-5 border-b'>
                <a href='/'><img className='hover:scale-105 mb-2' src='/houses.svg' alt='home button'/></a>
                <h1 className='text-xl text-white pb-3'>@jmflup_you</h1>
            </section>

            {/* Body */}
            <section>
                <DMs/>
            </section>
        </>
    )
}