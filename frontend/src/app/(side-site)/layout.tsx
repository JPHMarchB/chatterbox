import type { Metadata } from 'next'
import '../globals.css'
import React from "react";


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
        <body className="bg-black">
        {children}
        </body>
        </html>
    )
}