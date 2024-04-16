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
            <section className="bg-[#000] p-5">

                <div className='border-b-2 border-[#111] pb-5'>

                    {/* Profile Image */}
                    <a href={`/profile/${comment.commentProfileId}`}>
                        {profile.profileImageUrl && <img className='w-10 h-10 image-full rounded-full' src= {profile.profileImageUrl} alt='user profile image'/>}
                    </a>

                    <div>
                        {/* Username */}
                        <h2 className='text-white text-lg break-fix'>@{profile.profileName}</h2>

                        {/* Comment Content */}
                        <p className='text-gray-300 leading-4 break-fix'>{comment.commentContent}</p>
                    </div>

                </div>
            </section>
        </>
    )
}