import type { Metadata } from 'next'
import './globals.css'
import {Navigation} from "@/app/shared/Navigation";
import {BottomNav} from "@/app/shared/BottomNav";


export const metadata: Metadata = {
    title: 'Chatterbox',
    description: 'description goes here',
}

type RootLayoutProps = {
    children: React.ReactNode
}

export default function RootLayout(props : RootLayoutProps) {
    const { children } = props
    return (
        <html  lang="en" suppressHydrationWarning>
        <body>
        <Navigation/>
        {children}
        <BottomNav/>
        </body>
        </html>
    )
}