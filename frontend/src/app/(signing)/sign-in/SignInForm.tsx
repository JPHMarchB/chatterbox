"use client";

import {Formik, FormikHelpers, FormikProps} from "formik";
import {toFormikValidationSchema} from "zod-formik-adapter";
import {DisplayError} from "@/components/displayError";
import {DisplayStatus} from "@/components/displayStatus";
import {SignIn, SignInSchema} from "@/utils/models/profile.model";
import {useRouter} from "next/navigation";

export function SignInForm() {

    const router = useRouter()
    const initialValues : {profileId: string|null, profileEmail: string; profilePassword: string } = {
        profileId:null,
        profileEmail: '',
        profilePassword: ''
    }

    const handleSubmit = (values: SignIn, actions: FormikHelpers<SignIn>) => {
        const {setStatus, resetForm} = actions
        fetch('/api/sign-in', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(values)
        }).then(response => response.json()).then(json => {
            let type = 'alert alert-danger'
            if(json.status === 200) {
                type = 'alert alert-success'
                resetForm()
                router.push('/')
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
                validationSchema={toFormikValidationSchema(SignInSchema)}
            >
                {SignInFormContent}
            </Formik>

        </>
    )
}


function SignInFormContent(props: FormikProps<SignIn>) {

    const {
        status,
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
    } = props;

    return(
        <>
            <form onSubmit={handleSubmit} className={"py-2 "}>
                <div className="pb-2">
                    <label className="text-lg text-black" htmlFor="profileEmail">Email</label>
                    <input
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.profileEmail}
                        className="input input-bordered w-full text-white"
                        type="text"
                        name="profileEmail"
                        id="profileEmail"
                    />
                    <DisplayError errors={errors} touched={touched} field={"profileEmail"} />
                </div>
                <div>
                    <label className={"text-lg text-black"} htmlFor="password">Password</label>
                    <input
                        className="input input-bordered w-full text-white"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.profilePassword}
                        type="password"
                        name="profilePassword"
                        id="password"
                    />
                    <DisplayError errors={errors} touched={touched} field={"profilePassword"} />
                </div>
                <div className="py-2 flex gap-2">
                    <button className='btn btn-success bg-blue-500 text-white' type="submit" >Sign In</button>

                </div>
                <DisplayStatus status={status}/>
            </form>
        </>
    )
}