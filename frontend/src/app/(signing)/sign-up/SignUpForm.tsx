"use client";

import {Formik, FormikHelpers, FormikProps} from "formik";
import {toFormikValidationSchema} from "zod-formik-adapter";
import {DisplayError} from "@/components/displayError";
import {DisplayStatus} from "@/components/displayStatus";
import {SignUp, SignUpSchema} from "@/utils/models/profile.model";
import {useRouter} from "next/navigation";

export function SignUpForm() {

    const initialValues : SignUp = {
        profileEmail: '',
        profilePassword: '',
        profileId: null,
        profileAbout: null,
        profileImageUrl: null,
        profileName: '',
        profilePasswordConfirm: ''
    }

    const handleSubmit = (values: SignUp, actions: FormikHelpers<SignUp>) => {
        const router = useRouter()

        const {setStatus, resetForm} = actions
        fetch('/apis/sign-up', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(values)})
            .then(response => response.json())
            .then(json => {
            let type = 'alert alert-danger'
            if(json.status === 200) {
                resetForm()
                router.push("/sign-in")
                type = 'alert alert-success'
            }
            setStatus({type, message: json.message})
        })
    }

    return(
        <>
            <Formik
                initialValues={initialValues}
                onSubmit={handleSubmit}
                validationSchema={toFormikValidationSchema(SignUpSchema)}>
                {SignUpFormContent}
            </Formik>
        </>
    )
}


function SignUpFormContent(props: FormikProps<SignUp>) {
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
                <div className='border-2 text-center rounded-xl bg-black/70 p-20'>
                    <h1 className='text-4xl text-white italic font-bold'>ChatterBox</h1>

                    <div className='*:mt-5'>
                        <input onBlur={handleBlur}
                               onChange={handleChange}
                               value={values.profileEmail}
                               className="input input-bordered w-full text-white rounded-xl"
                               type="text"
                               name="profileEmail"
                               id="profileEmail"
                               placeholder='Email'
                        />
                        <DisplayError errors={errors} touched={touched} field={"profileEmail"}/>

                        <input onBlur={handleBlur}
                               onChange={handleChange}
                               value={values.profileName}
                               className="input input-bordered w-full text-white rounded-xl"
                               type="text"
                               name="profileName"
                               id="profileName"
                               placeholder='Username'
                        />
                        <DisplayError errors={errors} touched={touched} field={"profileName"}/>

                        <input className="input input-bordered w-full text-white rounded-xl"
                               onBlur={handleBlur}
                               onChange={handleChange}
                               value={values.profilePassword}
                               type="password"
                               name="profilePassword"
                               id="password"
                               placeholder='Password'
                        />
                        <DisplayError errors={errors} touched={touched} field={"profilePassword"}/>

                        <input className="input input-bordered w-full text-white rounded-xl"
                               onBlur={handleBlur}
                               onChange={handleChange}
                               value={values.profilePasswordConfirm}
                               type="password"
                               name="profilePasswordConfirm"
                               id="password"
                               placeholder='Password Confirm'
                        />
                        <DisplayError errors={errors} touched={touched} field={"profilePassword"}/>

                        <div className='*:me-5 text-white *:rounded-xl'>
                            <button className='hover:scale-110 bg-blue-500 p-2 mt-10 w-full' type='submit'>Sign Up
                            </button>
                        </div>
                        <DisplayStatus status={status}/>

                    </div>

                    <p className='text-white mt-10 text-sm'>Already have an account? <a
                        className='text-blue-400 hover:underline' href='/sign-in'>Sign In!</a></p>
                </div>
            </form>

        </>
    )
}