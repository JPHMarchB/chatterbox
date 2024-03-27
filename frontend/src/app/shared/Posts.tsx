import {JSX} from "react";
import {Post} from "@/app/shared/Post";


export function Posts() : JSX.Element {
    return (
        <>
            <h1 className='text-xl p-5'>Feed</h1>
            <div className='grid grid-cols-3 p-5'>
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