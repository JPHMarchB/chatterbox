import {JSX} from "react";
import {PostingForm} from "@/app/(side-site)/create-post/PostingForm";
import {getSession} from "@/utils/fetchSession";

export default async function ExplorePage() : Promise<JSX.Element> {
    const session = await getSession()
    if (!session) {return (<></>)}


    return (
        <>
            <main className='bg-[#222] flex justify-center h-[100vh]'>
                <div className=''>
                    <section className='p-3 bg-black'>
                        <a href="../">
                            <img className='hover:btn-ghost rounded-lg p-1' src='/arrow-left.svg' alt='Back button'/>
                        </a>
                    </section>

                    <section className='bg-[#111111] border-t border-gray-800'>
                        <PostingForm session={session}/>
                    </section>
                </div>
            </main>
        </>
    )
}