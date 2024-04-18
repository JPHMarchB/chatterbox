'use client'

import React from 'react';
import {useRouter} from 'next/navigation';
import {Session} from '@/utils/fetchSession';
import {Post} from '@/utils/models/post.model';
import {cookies} from "next/headers";
import {revalidateTag} from "next/cache";

type PostFormProps = {
    session: Session
}

export async function PostingForm(props: PostFormProps) {

    // const posts = await getLikeData()
    const router = useRouter();

    const {session} = props;

    if(session === undefined) {
        return <></>
    }

    const initialValues = {
        postId: '',
        postProfileId: session?.profile.profileId ?? null,
        postContent: '',
        postDatetime: null,
        postImageUrl: ''
    };

    async function handlePost(values: Post) {
        const response = await fetch(`${process.env.PUBLIC_API_URL}/apis/post`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                authorization: session.authorization
            },
            body: JSON.stringify({
                postId: values.postId,
                postProfileId: session?.profile.profileId,
                postContent: values.postContent,
                postDatetime: null,
                postImageUrl: values.postImageUrl,
            }),
        });
        revalidateTag(`post-${values.postId}`)
        return response.json()
    }

    return (
        <>
            <form onSubmit={handlePost} className={"flex flex-col gap-4 p-4 bg-[#000]"}>
                <input className="input input-bordered w-full text-white rounded-xl"
                       type="text"
                       name="postImageUrl"
                       id="postImageUrl"
                       placeholder='Image'
                />

                <textarea
                    className={"textarea h-16 resize-none p-2 text-sm text-white bg-[#111] border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent"}
                    id="content"
                    name="postContent"
                    placeholder="Type your post here..."
                    required
                />
                <button type="submit"
                        className="px-6 py-2 text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded-md">Submit
                    Post
                </button>
            </form>
            {/*<FormDebugger {...props}/>*/}

        </>
    );
}

// function PostFormContent(props: any) {
//     const {
//         values,
//         handleChange,
//         handleBlur,
//         status,
//         handleSubmit,
//     } = props;
//
//     return (
//         <>
//             <form onSubmit={handleSubmit} className={"flex flex-col gap-4 p-4 bg-[#000]"}>
//                 <input onBlur={handleBlur}
//                        onChange={handleChange}
//                        value={values.postImageUrl}
//                        className="input input-bordered w-full text-white rounded-xl"
//                        type="text"
//                        name="postImageUrl"
//                        id="postImageUrl"
//                        placeholder='Image'
//                 />
//                 <DisplayStatus status={status}/>
//
//                 <textarea
//                     className={"textarea h-16 resize-none p-2 text-sm text-white bg-[#111] border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent"}
//                     id="content"
//                     name="postContent"
//                     value={values.postContent}
//                     onChange={handleChange}
//                     onBlur={handleBlur}
//                     placeholder="Type your post here..."
//                     required
//                 />
//                 <button type="submit"
//                         className="px-6 py-2 text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded-md">Submit
//                     Post
//                 </button>
//                 <DisplayStatus status={status}/>
//             </form>
//             {/*<FormDebugger {...props}/>*/}
//         </>
//     );
// }

