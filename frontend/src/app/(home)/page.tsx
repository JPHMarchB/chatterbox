import {JSX} from "react";
import {Posts} from "@/app/shared/Posts";
import {Stories} from "@/app/shared/Stories";

export default function Home() : JSX.Element {
    return (
        <>
            <section className='bg-gray-800 p-5 lg:p-0 pt-5'>
                <Stories/>
                <Posts/>
            </section>
        </>
    )
}