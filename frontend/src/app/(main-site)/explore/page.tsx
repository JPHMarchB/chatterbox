import {JSX} from "react";
import {Explore} from "@/app/(main-site)/explore/Explore";

export default function ExplorePage() : JSX.Element {
    return (
        <>
            <main className='bg-[#222] p-5'>
                <h1 className='text-xl text-white pb-3'>Explore</h1>
                <Explore/>
            </main>
        </>
    )
}