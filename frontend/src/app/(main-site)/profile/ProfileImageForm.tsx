"use client"

import {Formik, FormikHelpers, FormikProps} from "formik";
import {Profile} from "@/utils/models/profile.model";
import {Session} from "@/utils/fetchSession";
import {useRouter} from "next/navigation";
import React, {useState} from "react";
import {useDropzone} from "react-dropzone";


type ProfileImageFormProp = {
    session : Session
    profile: Profile
}

export function ProfileImageForm(props: ProfileImageFormProp) {
    const { session, profile } = props
    const router = useRouter()
    const initialValues : Profile = {
        profileId: profile.profileId,
        profileAbout: profile.profileAbout,
        profileImageUrl: profile.profileImageUrl,
        profileName: profile.profileName,
    }

    if(!session) {
        router.push('/')
    }

    const handleSubmit = (values: Profile, actions: FormikHelpers<Profile>)=> {
        const {setStatus, resetForm, setErrors} = actions

        // @ts-ignore
        if ((values.profileImageUrl instanceof FormData)) {
            setErrors({profileImageUrl: "You must upload a valid image."})
        }
        fetch("/apis/image/",{
            method: "POST",
            headers: {
                "authorization": `${session.authorization}`
            },
            body: values.profileImageUrl
        })
            .then(response => response.json())
            .then(data => {
                if(data.status !== 200) {
                    setStatus({type: "alert alert-danger"})
                }
                values.profileImageUrl = data.message
                submitImage(values)
            })

        function submitImage (values: Profile) {
                const authorization = session.authorization
                fetch(`/apis/profile/${profile.profileId}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        authorization
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
                {ProfileImageFormContent}
            </Formik>

        </>
    )
}

export function ProfileImageFormContent(props: FormikProps<Profile>) {


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
                            fieldValue: "profileImageUrl",
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
                    formikProps.values.profileImageUrl &&
                    <>
                        <div className="bg-transparent m-0">
                            {selectedImage !== null && <img height={200} width={200} alt="new profile image" src={selectedImage}/>}
                        </div>

                    </>
                }
                <div {...getRootProps()}
                     className="px-2 py-5 flex flex-fill bg-white justify-center align-items-center border rounded-lg font-semibold text-black">
                    <input
                        aria-label="profile image file drag and drop area"
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
                            <span className='hover:cursor-pointer'>Update Profile Image Here</span>
                    }
                </div>
                {/*<FormDebugger{...props}/>*/}
            </>
        )
    }
}
