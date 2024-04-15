import {Comment} from "@/utils/models/comment.model";
import {fetchProfileByProfileId} from "@/utils/http/profile.http";


type Props = {
    comment:Comment
}

export async function CommentDisplay(props:Props) {
    const {comment} = props
    const profile = await fetchProfileByProfileId(comment.commentProfileId)

    return (
        <>
            <section className="bg-gray-800 p-10">

                <div className='border-b-2 border-gray-500 pb-5'>

                {/* Profile Image */}
                    <a href={`../profile-page/${profile.profileId}`}>
                    {profile.profileImageUrl && <img className='w-12 h-12 image-full rounded-full' src= {profile.profileImageUrl}
                     alt='user profile image'/>}
                    </a>

                    <div>
                    {/* Username */}
                    <h2 className='text-white text-lg break-fix'>@{profile.profileName}</h2>

                    {/* Comment Content */}
                    <p className='text-gray-300 text-sm leading-4 break-fix'>{comment.commentContent}</p>
                    </div>

                </div>
            </section>
        </>
    )
}