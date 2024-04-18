'use client'

import {PostSchema} from "@/utils/models/post.model";
import {z} from "zod";
import {Formik, FormikHelpers} from "formik";
import {DisplayError} from "@/components/displayError";
import {toFormikValidationSchema} from "zod-formik-adapter";
import {Session} from "@/utils/fetchSession";
import React from "react";
import {useRouter} from "next/navigation";

type PostFormProps = {
    session : Session|undefined
}
export function PostingForm(props : PostFormProps) {
    const router = useRouter()
    const {session} = props
    if(session === undefined) {return <></>}

    const {profile, authorization} = session
    const initialValues = {
        postContent: "",
        postImageUrl: ""
    };

    const formSchema = PostSchema.pick({postContent: true, postImageUrl: true})
    type  Values = z.infer<typeof formSchema>

    const handleSubmit = (values: Values, actions: FormikHelpers<any>) => {
        const post = {
            postProfileId: profile.profileId,
            postId: null,
            postContent: values.postContent,
            postDatetime: null,
            postImageUrl: values.postImageUrl
        }
        const {setStatus, resetForm} = actions
        fetch('/apis/post', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "authorization": `${authorization}`
            },
            body: JSON.stringify(post)
        }).then(response => response.json()).then(json => {
            if (json.status === 200) {
                resetForm()
                router.refresh()
                router.push('/')
            }
            setStatus({type: json.type, message: json.message})
        })
    };

    return (
        <>
            <div className="col-span-full p-0 h-[100vh]">
                <h2 className="animation-color-change duration-75 text-3x p-4 font-bold">✨Hello {profile.profileName}! What is going on today?✨</h2>
                <Formik initialValues={initialValues}
                        onSubmit={handleSubmit}
                        validationSchema={toFormikValidationSchema(formSchema)}>
                    {PostFormContent}
                </Formik>
            </div>
        </>
    )
}

function PostFormContent(props: any) {

    const {
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
    } = props;


    return (
        <>
            <form className="flex flex-col gap-4 p-4 bg-[#000]" onSubmit={handleSubmit}>
                <div className="form-control min-width-50 ">
                    <label className="text-sm pb-3 sr-only" htmlFor="postImageUrl">Post image Goes Here</label>
                    <input
                        value={values.postImageUrl}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        className="input input-bordered w-full text-white rounded-xl"
                        name="postImageUrl"
                        id="postImageUrl"
                        placeholder='Post Image Url...'
                    >
                    </input>
                </div>
                <DisplayError errors={errors} touched={touched} field={"postImageUrl"}/>

                <div className="form-control min-width-50 ">
                    <label className="text-sm pb-3 sr-only" htmlFor="postContent">Post Content Goes Here</label>
                    <textarea
                        value={values.postContent}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        className="textarea p-2 text-white border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent"
                        name="postContent"
                        id="postContent"
                        cols={30}
                        rows={3}
                        placeholder='Post Description...'
                    >
					</textarea>
                </div>
                <DisplayError errors={errors} touched={touched} field={"postContent"}/>

                <div className="form-control">
                    <button type="submit" className="px-6 py-2 text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded-md">
                        Post
                    </button>
                </div>
            </form>
        </>
    )
}
