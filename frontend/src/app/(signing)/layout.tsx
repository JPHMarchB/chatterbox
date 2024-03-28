import type { Metadata } from 'next'
import '../globals.css'


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
        <body className="bg-[url('/sign-up-back.jpg')] bg-cover bg-center">
        {children}
        </body>
        </html>
    )
}