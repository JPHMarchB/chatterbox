import {JSX} from "react";
import {getSession} from "@/utils/fetchSession";
import {fetchProfileByProfileId} from "@/utils/http/profile.http";
import {ProfileAboutForm} from "@/app/(main-site)/profile/ProfileAboutForm";
import {ProfileImageForm} from "@/app/(main-site)/profile/ProfileImageForm";

export default async function YourProfile() : Promise<JSX.Element> {
    const session = await getSession()
    if (!session) {return (<><p>Nothing</p></>)}
    const profile = await fetchProfileByProfileId(session.profile.profileId)

    return (
        <>
            <main className='bg-[#222] p-5 md:p-10'>

                {/* Profile info */}
                <section className='grid md:flex items-center gap-16 justify-center'>

                    {/* Profile image */}
                    <div>
                        {profile.profileImageUrl && <img className='rounded-full w-64 h-64' src={profile.profileImageUrl} alt='profile image'/>}
                    </div>

                    {/* Change profile info */}
                    <div>
                        <h2 className='text-white text-4xl'>@{profile.profileName}</h2>
                        <ProfileAboutForm session={session} profile={profile}/>
                        <ProfileImageForm session={session} profile={profile}/>
                        <p>{profile.profileAbout}</p>
                    </div>
                </section>

                {/* Liked Posts */}
                <section className='pt-40'>
                    <h2 className='text-white text-4xl'>Liked Posts</h2>
                </section>

            </main>
        </>
    )
}