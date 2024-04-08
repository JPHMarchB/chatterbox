import {JSX} from "react";
import {SignInForm} from "@/app/(signing)/sign-in/SignInForm";

export default function SignUp() : JSX.Element {
    return (
        <main className='flex justify-center items-center h-[100vh]'>
            <SignInForm/>
        </main>
    )
}
