import {JSX} from "react";
import {getSession} from "@/utils/fetchSession";
import {fetchProfileByProfileId} from "@/utils/http/profile.http";
import {ProfileAboutForm} from "@/app/(main-site)/profile/ProfileAboutForm";
import {ProfileImageForm} from "@/app/(main-site)/profile/ProfileImageForm";
import {Post} from "@/utils/models/post.model";
import {SinglePost} from "@/app/shared/Post";
import {fetchPostByProfileId} from "@/utils/http/post.http";

export default async function YourProfile() : Promise<JSX.Element> {
    const session = await getSession()
    if (!session) {return (<><p>Nothing</p></>)}
    const profile = await fetchProfileByProfileId(session.profile.profileId)
    const posts = await fetchPostByProfileId(profile.profileId)

    return (
        <>
            <main className='bg-[#222] md:p-10'>

                {/* Profile info */}
                <section className='grid md:flex items-center gap-16 justify-center'>

                    {/* Profile image */}
                    <div className='min-w-80 min-h-80 rounded-full bg-center bg-cover' style={{backgroundImage: `url(${profile.profileImageUrl})`}}>
                        {/*{profile.profileImageUrl && <img className='rounded-full image-full' src={profile.profileImageUrl} alt='profile image'/>}*/}
                    </div>

                    {/* Change profile info */}
                    <div>
                        <h2 className='text-white text-2xl lg:text-4xl'>@{profile.profileName}</h2>
                        <div className='md:flex items-center gap-2'>
                            <ProfileAboutForm session={session} profile={profile}/>
                            <ProfileImageForm session={session} profile={profile}/>
                        </div>
                        <p className='text-white text-lg border-t'>{profile.profileAbout}</p>
                    </div>
                </section>

                {/* Liked Posts */}
                <section className='pt-10'>
                    <h2 className='text-white text-2xl'>Posts</h2>

                    <div className='md:mason-style'>
                        {posts.map((post: Post) => (
                            <div className='mason-style-support'>
                                <SinglePost profile={profile} post={post} key={post.postId}/>
                            </div>
                        ))}
                    </div>
                </section>

            </main>
        </>
    )
}