'use server'

import {Profile} from "@/utils/models/profile.model";
import {FollowForm} from "@/app/(main-site)/profile/[profileId]/FollowForm";
import {getSession} from "@/utils/fetchSession";
import {fetchFollowByFollowFollowingProfileId, fetchFollowByFollowProfileId} from "@/utils/http/follow.http";
import {fetchPostByProfileId} from "@/utils/http/post.http";
import {Post} from "@/utils/models/post.model";
import {SinglePost} from "@/app/shared/Post";

type Props = {
    profile: Profile
}

export async function FollowDisplay(props: Props)  {
    const { profile} = props
    const following = await fetchFollowByFollowProfileId(profile.profileId)
    const session = await getSession()
    const follows = await fetchFollowByFollowFollowingProfileId(profile.profileId)
    const posts = await fetchPostByProfileId(profile.profileId)

    return(
        <>
            <main className='bg-[#222] p-5'>

                {/* Profile info */}
                <section className='*:pt-2 pb-20'>

                    {/* Profile image */}
                    <div className='grid md:flex items-center justify-center md:justify-start gap-8 md:gap-16'>
                        {profile.profileImageUrl &&
                            <img className='rounded-full w-64 h-64' src={profile.profileImageUrl} alt='profile image'/>}

                        <div className='flex text-center text-white gap-8 text-base md:text-2xl'>
                            <p>{posts.length}<br/>Posts</p>
                            <p>{follows.length}<br/>Followers</p>
                            <p>{following.length}<br/>Following</p>
                        </div>
                    </div>

                    <div className='*:pt-6'>
                        <h2 className='text-white text-4xl'>@{profile.profileName}</h2>
                        <p>{profile.profileAbout}</p>
                    </div>
                    <FollowForm session={session} profile={profile} follows={follows}/>
                </section>


                <div>
                    <h2 className='text-white text-2xl'>Posts</h2>

                    <div className='md:mason-style'>
                        {posts.map((post: Post) => (
                            <div className='mason-style-support'>
                                <SinglePost profile={profile} post={post} key={post.postId}/>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
        </>
    )
}