import {JSX} from "react";
import {Post} from "@/app/shared/Post";


export function Posts() : JSX.Element {
    return (
        <>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 p-1 md:px-10 lg:px-12'>
                <Post/>
                <Post/>
                <Post/>
                <Post/>
                <Post/>
                <Post/>
                <Post/>
                <Post/>
                <Post/>
                <Post/>
                <Post/>
            </div>
        </>
    )
}