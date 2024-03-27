import {JSX} from "react";
import {Posts} from "@/app/shared/Posts";

export default function Home() : JSX.Element {
    return (
        <>
            <section className='bg-gray-800'>
                <Posts/>
            </section>
        </>
    )
}