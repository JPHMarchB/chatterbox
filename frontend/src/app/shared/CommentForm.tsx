'use client'

import React from 'react';
import {Formik, FormikHelpers} from 'formik';
import {useRouter} from 'next/navigation';
import {Session} from '@/utils/fetchSession';
import {Post} from '@/utils/models/post.model';
import {CommentSchema} from '@/utils/models/comment.model';
import {DisplayStatus} from '@/components/displayStatus';
import {toFormikValidationSchema} from 'zod-formik-adapter';
import {z} from 'zod';

type CommentFormProps = {
    session: Session | undefined
    post: Post
}

export async function CommentForm(props: CommentFormProps) {

    // const comments = await getLikeData()
    const router = useRouter();

    const {session, post} = props;

    if(session === undefined) {
        return <></>
    }

    const {authorization} = session;

    const initialValues = {
        commentId: null,
        commentPostId: post.postId,
        commentProfileId: session?.profile.profileId ?? null,
        commentContent: '',
        commentDateTime: null,
    };

    const formSchema = CommentSchema;
    type Values = z.infer<typeof formSchema>

    const handleSubmit = (values: Values, actions: FormikHelpers<any>) => {
        const {setStatus, resetForm} = actions;
        fetch('/apis/comment', {
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
                    validationSchema={toFormikValidationSchema(formSchema)}>
                {CommentFormContent}
            </Formik>

        </>
    );
}

function CommentFormContent(props: any) {
    const {
        values,
        handleChange,
        handleBlur,
        status,
        handleSubmit,
    } = props;

    return (
        <>
            <form onSubmit={handleSubmit} className={"flex flex-col gap-4 p-4 bg-[#344955]"}>
                <textarea className={"textarea h-32 resize-none p-2 text-sm text-black bg-gray-200 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"}
                          id="content"
                          name="commentContent"
                          value={values.commentContent}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          placeholder="Type your comment here..."
                          required
                />
                <button type="submit" className="px-6 py-2 text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded-md">Submit Comment</button>
                <DisplayStatus status={status}/>
            </form>
            {/*<FormDebugger {...props}/>*/}
        </>
    );
}

