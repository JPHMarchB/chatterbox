import {JSX} from "react";
import {SignUpForm} from "@/app/(signing)/sign-up/SignUpForm";

export default function SignUp() : JSX.Element {
    return (
        <main className='flex justify-center items-center h-[100vh]'>
            <SignUpForm/>
        </main>
    )
}