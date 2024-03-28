import {JSX} from "react";

export default function SignUp() : JSX.Element {
    return (
        <section className='flex justify-center items-center h-[100vh]'>
            {/*<img className='hidden lg:flex h-[100vh]' src='/sign-up.jpg' alt='Sign up page image'/>*/}

            <div className='border-2 text-center rounded-xl bg-black/70 p-20'>
                <h1 className='text-4xl text-white italic font-bold'>ChatterBox</h1>
                <form className='*:mt-5 mt-10'>
                    <input className='text-black rounded-xl block' type='email' id='email' name='email'
                           placeholder='Email'/>
                    <input className='text-black rounded-xl block' type='password' id='password' name='password'
                           placeholder='Password'/>

                    <div className='*:me-5 text-white *:rounded-xl'>
                        <button className='hover:scale-110 bg-blue-500 p-2 mt-10 w-full' type='submit'>Sign Up</button>
                    </div>
                </form>
                <p className='text-white mt-10 text-sm'>Don't have an account? <a
                    className='text-blue-400 hover:underline' href='/sign-up'>Sign Up!</a></p>
                <a className='text-blue-400 hover:underline' href='/sign-up'>Forgot Password?</a>
            </div>
        </section>
    )
}
