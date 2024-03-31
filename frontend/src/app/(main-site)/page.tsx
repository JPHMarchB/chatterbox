import {JSX} from "react";
import {Posts} from "@/app/shared/Posts";
import {Stories} from "@/app/shared/Stories";

export default function Home() : JSX.Element {
    return (
        <>
            <main className='bg-[#222] p-5 lg:p-0 pt-5'>
                <Stories/>

                <h1 className='text-xl text-white pt-9'>Feed</h1>
                <Posts/>
            </main>
        </>
    )
}