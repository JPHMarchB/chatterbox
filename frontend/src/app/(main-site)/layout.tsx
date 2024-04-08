import type { Metadata } from 'next'
import '../globals.css'
import {Navigation} from "@/app/shared/Navigation";
import {SideBar} from "@/app/shared/SideBar";
import React from "react";
import {getSession, Session} from "@/utils/fetchSession";
import {Profile} from "@/utils/models/profile.model";


export const metadata: Metadata = {
    title: 'Chatterbox',
    description: 'description goes here',
}

type RootLayoutProps = {
    children: React.ReactNode,
    session: Session,
    profile: Profile
}

export default function RootLayout(props : RootLayoutProps) {
    const { children, session, profile } = props
    return (
        <html  lang="en" suppressHydrationWarning>
        <body className='bg-black'>
        <Navigation/>
        <SideBar session={session} profile={profile}/>
        {children}
        </body>
        </html>
    )
}