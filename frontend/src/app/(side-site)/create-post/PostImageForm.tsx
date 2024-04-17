"use client"

import {Formik, FormikHelpers, FormikProps} from "formik";
import {Post} from "@/utils/models/post.model";
import {Session} from "@/utils/fetchSession";
import {useRouter} from "next/navigation";
import React, {useState} from "react";
import {useDropzone} from "react-dropzone";


type PostImageFormProp = {
    session : Session
    post: Post
}

export function PostImageForm(props: PostImageFormProp) {
    const { session, post } = props
    const router = useRouter()


    const initialValues : Post = {
        postId: '',
        postProfileId: session?.profile.profileId ?? null,
        postContent: '',
        postDatetime: null,
        postImageUrl: ''
    }

    if(!session) {
        router.push('/sign-in')
    }

    const handleSubmit = (values: Post, actions: FormikHelpers<Post>)=> {
        const {setStatus, resetForm, setErrors} = actions

        // @ts-ignore
        if ((values.postImageUrl instanceof FormData)) {
            setErrors({postImageUrl: "You must upload a valid image."})
        }
        fetch("/apis/image/",{
            method: "POST",
            headers: {
                "authorization": `${session.authorization}`
            },
            body: values.postImageUrl
        })
            .then(response => response.json())
            .then(data => {
                if(data.status !== 200) {
                    setStatus({type: "alert alert-danger"})
                }
                values.postImageUrl = data.message
                submitImage(values)
            })

        function submitImage (values: Post) {
            const authorization = session.authorization
            fetch(`/apis/post/${post.postId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    'authorization': authorization
                },

                body: JSON.stringify(values)
            }).then(response => response.json()).then(json => {
                let type = 'alert alert-danger'
                if(json.status === 200) {
                    resetForm()
                    type = 'alert alert-success'
                    router.refresh()

                }
                setStatus({type, message: json.message})
            })
        }
    };

    return(
        <>
            <Formik
                initialValues={initialValues}
                onSubmit={handleSubmit}
            >
                {PostImageFormContent}
            </Formik>

        </>
    )
}

export function PostImageFormContent(props: FormikProps<Post>) {
    const [selectedImage, setSelectedImage] = useState(null)
    const {
        values,
        handleChange,
        handleBlur,
        handleSubmit,
        setFieldValue
    } = props

    return (
        <>
            <form onSubmit={handleSubmit}>
                <ImageDropZone
                    formikProps={
                        {
                            values,
                            handleChange,
                            handleBlur,
                            setFieldValue,
                            fieldValue: "postImageUrl",
                            setSelectedImage: setSelectedImage
                        }
                    }

                />
                <button type={"submit"} className="p-0.5 rounded-full bg-white">
                    <img src='/check2.svg' alt='upload new picture'/>
                </button>
            </form>
        </>
    )

    function ImageDropZone({formikProps}: any) {

        const onDrop = React.useCallback((acceptedFiles: any) => {

            const formData = new FormData()
            formData.append('image', acceptedFiles[0])

            const fileReader = new FileReader()
            fileReader.readAsDataURL(acceptedFiles[0])
            fileReader.addEventListener("load", () => {
                formikProps.setSelectedImage(fileReader.result)
            })

            formikProps.setFieldValue(formikProps.fieldValue, formData)

        }, [formikProps])
        const {getInputProps, isDragActive, getRootProps} = useDropzone({onDrop})

        return (
            <>
                <label className="text-neutral font-semibold"></label>
                {
                    formikProps.values.postImageUrl &&
                    <>
                        <div className="bg-transparent m-0">
                            {selectedImage !== null && <img height={200} width={200} alt="new post image" src={selectedImage}/>}
                        </div>

                    </>
                }
                <div {...getRootProps()}
                     className="px-2 py-5 flex flex-fill bg-white justify-center align-items-center border rounded-lg font-semibold text-black">
                    <input
                        aria-label="post image file drag and drop area"
                        aria-describedby="image drag drop area"
                        className="file-input"
                        accept="image/*"
                        type="file"
                        onChange={formikProps.handleChange}
                        onBlur={formikProps.handleBlur}
                        {...getInputProps()}
                    />
                    {
                        isDragActive ?
                            <span>Drop image here</span> :
                            <span className='hover:cursor-pointer'>Update Post Image Here</span>
                    }
                </div>
                {/*<FormDebugger{...props}/>*/}
            </>
        )
    }
}
