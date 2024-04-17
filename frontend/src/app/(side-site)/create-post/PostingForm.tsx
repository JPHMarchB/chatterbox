'use client'

import React from 'react';
import {Formik, FormikHelpers} from 'formik';
import {useRouter} from 'next/navigation';
import {Session} from '@/utils/fetchSession';
import {Post} from '@/utils/models/post.model';
import {PostSchema} from '@/utils/models/post.model';
import {DisplayStatus} from '@/components/displayStatus';
import {toFormikValidationSchema} from 'zod-formik-adapter';

type PostFormProps = {
    session: Session | undefined
    post: Post
}

export async function PostingForm(props: PostFormProps) {

    // const posts = await getLikeData()
    const router = useRouter();

    const {session, post} = props;

    if(session === undefined) {
        return <></>
    }

    const {authorization} = session;

    const initialValues = {
        postId: '',
        postProfileId: session?.profile.profileId ?? null,
        postContent: '',
        postDatetime: null,
        postImageUrl: ''
    };

    const handleSubmit = (values: Post, actions: FormikHelpers<any>) => {
        const {setStatus, resetForm} = actions;
        fetch('/apis/post', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "authorization": `${authorization}`
            },
            body: JSON.stringify(values)
        }).then(response => response.json()).then(json => {
            if (json.status === 200) {
                resetForm();
                router.refresh();
            }
            setStatus({type: json.type, message: json.message});
        });
    };

    return (
        <>
            <Formik initialValues={initialValues}
                    onSubmit={handleSubmit}
                    validationSchema={toFormikValidationSchema(PostSchema)}>
                {PostFormContent}
            </Formik>

        </>
    );
}

function PostFormContent(props: any) {
    const {
        values,
        handleChange,
        handleBlur,
        status,
        handleSubmit,
    } = props;

    return (
        <>
            <form onSubmit={handleSubmit} className={"flex flex-col gap-4 p-4 bg-[#000]"}>
                <textarea className={"textarea h-16 resize-none p-2 text-sm text-white bg-[#111] border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent"}
                          id="content"
                          name="postContent"
                          value={values.postContent}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          placeholder="Type your post here..."
                          required
                />
                <button type="submit" className="px-6 py-2 text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded-md">Submit Post</button>
                <DisplayStatus status={status}/>
            </form>
            {/*<FormDebugger {...props}/>*/}
        </>
    );
}

