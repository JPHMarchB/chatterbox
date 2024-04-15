"use client"

import {Formik, FormikHelpers, FormikProps} from "formik";
import {toFormikValidationSchema} from "zod-formik-adapter";
import {DisplayError} from "@/components/displayError";
import {Profile, ProfileSchema} from "@/utils/models/profile.model";
import {Session} from "@/utils/fetchSession";
import {useRouter} from "next/navigation";

type ProfileAboutFormProp = {
    session : Session
    profile: Profile
}

export function ProfileAboutForm(props: ProfileAboutFormProp) {
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

    const handleSubmit = (values: Profile, actions: FormikHelpers<Profile>) => {
        const {resetForm, setStatus} = actions
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

    return(
        <>
            <Formik
                initialValues={initialValues}
                onSubmit={handleSubmit}
                validationSchema={toFormikValidationSchema(ProfileSchema)}
            >
                {ProfileAboutFormContent}
            </Formik>

        </>
    )
}


function ProfileAboutFormContent(props: FormikProps<Profile>) {

    const {
        status,
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        handleReset
    } = props;

    return(
        <>
            <form onSubmit={handleSubmit} className={"py-2"}>
                <div className="fl pb-2">
                    <label className="text-lg font-semibold text-black" htmlFor="profileName">Edit Name</label>
                    <input
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.profileName as string}
                        className="input input-bordered w-full max"
                        type="text"
                        name="profileName"
                        id="profileName"
                    />

                    <DisplayError errors={errors} touched={touched} field={"profileName"}/>
                </div>

                <div className="fl pb-2">
                    <label className="text-lg font-semibold text-black" htmlFor="profileAbout">About Me</label>
                    <input
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.profileAbout as string}
                        className="input input-bordered w-full max"
                        type="text"
                        name="profileAbout"
                        id="profileAbout"
                    />
                    {/* Save and cancel button*/}
                    <DisplayError errors={errors} touched={touched} field={"profileAbout"}/>
                </div>

                <div className='text-white *:px-5 *:py-2 pt-2.5'>
                    <button className='bg-blue-400 rounded-lg me-2' type={"submit"}>Save</button>
                    <button className='bg-red-400 rounded-lg' type={"reset"} onClick={handleReset}> Cancel</button>
                </div>
            </form>

            {/*<FormDebugger props={...props}/>*/}
        </>
    )
}