import {JSX} from "react";
import {getSession, Session} from "@/utils/fetchSession";
import {fetchProfileByProfileId} from "@/utils/http/profile.http";
import {Profile} from "@/utils/models/profile.model";
import {permanentRedirect} from "next/navigation";
import {SignOutButton} from "@/app/shared/SignOutForm";

type Props = {
    session: Session | undefined,
    profile: Profile
}

async function MobileProfileDisplay(props : Props) : Promise<JSX.Element> {
    const {session} = props
    if (!session) {permanentRedirect(`/sign-in`)}

    const profile = await fetchProfileByProfileId(session.profile.profileId)

    return (
        <>
            <div className="dropdown dropdown-end lg:hidden">
                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                    <div className="w-10 rounded-full">
                        {profile.profileImageUrl && <img alt="Tailwind CSS Navbar component"
                              src={profile.profileImageUrl}/>}
                    </div>
                </div>
                <ul tabIndex={0}
                    className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52 text-white">
                    <li>
                        <a href='/profile' className="justify-between">
                            Profile
                        </a>
                    </li>
                    <li className='hover:bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg mt-1'>
                        <a href='/create-post'>
                            <button>
                                New Post
                            </button>
                        </a>
                    </li>
                    <li><SignOutButton/></li>
                </ul>
            </div>
        </>
    )
}

export async function Navigation(props: Props): Promise<JSX.Element> {
    const session = await getSession()
    const {profile} = props
    if (!session) {
        permanentRedirect(`/sign-in`)
    }

    return (
        <nav className='sticky top-0 border-b'>
            <div className="flex justify-between items-center backdrop-blur-3xl bg-black p-5 z-50">
                <h1 className='text-white font-bold text-lg italic'><a href='/'>ChatterBox</a></h1>

                {/* Right side nav content*/}
                <div className="flex items-center gap-1 lg:gap-8 pe-5">
                    <img className='mt-1' src='/bell.svg' alt='notificatiions'/>
                    {/*<a href='/direct-message'><img src='/chat-dots.svg' alt='Messages'/></a>*/}

                    <a href='/create-post'>
                        <button
                            className='hidden lg:flex gap-2 p-2 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg text-white'>
                            <img src='/plus-circle.svg' alt='Create new post'/>New Post
                        </button>
                    </a>

                    <MobileProfileDisplay session={session} profile={profile}/>
                </div>
            </div>
        </nav>
    )
}