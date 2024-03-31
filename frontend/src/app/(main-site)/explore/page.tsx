import {JSX} from "react";
import {Explore} from "@/app/(main-site)/explore/Explore";

export default function Home() : JSX.Element {
    return (
        <>
            <section className='bg-[#222] p-5'>
                <h1 className='text-xl text-white pb-3'>Explore</h1>
                <Explore/>
            </section>
        </>
    )
}