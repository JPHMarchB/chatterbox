import {JSX} from "react";

function ExplorePost() : JSX.Element {
    return (
        <>
            <img className='image-full' src='/profile-placeholder.jpg' alt='Post'/>
        </>
    )
}

export function Explore() : JSX.Element {
    return (
        <>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1'>
                <ExplorePost/>
                <ExplorePost/>
                <ExplorePost/>
                <ExplorePost/>
                <ExplorePost/>
                <ExplorePost/>
                <ExplorePost/>
                <ExplorePost/>
            </div>
        </>
    )
}
