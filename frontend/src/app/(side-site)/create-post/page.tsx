import {JSX} from "react";
import {Explore} from "@/app/(main-site)/explore/Explore";
import {PostImageForm} from "@/app/(side-site)/create-post/PostImageForm";
import {PostingForm} from "@/app/(side-site)/create-post/PostingForm";
import {getSession} from "@/utils/fetchSession";

export default async function ExplorePage() : Promise<JSX.Element> {
    const session = await getSession()

    if (!session) {return (<></>)}


    return (
        <>
            <main className='bg-[#222] p-5'>
                {/*<PostingForm session={session} post={}/>*/}
                {/*<PostImageForm session={session} post={}/>*/}
            </main>
        </>
    )
}