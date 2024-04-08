import {cookies} from "next/headers";

export async function POST(request: Request) {

    const data = await request.json();

    const responseFromServer = await fetch(`${process.env.PUBLIC_API_URL}/apis/sign-in`, {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    // Clone the response to manipulate or read it multiple times
    const response = responseFromServer.clone();

    const authorization = response.headers.get("authorization")

    if (authorization) {
        const cookieStore = cookies()
        cookieStore.set("jwt-token", authorization, {path: "/", maxAge:86_400_000})

    }

    // Check if the sign-up was successful
    if (!response.ok) {
        return new Response(JSON.stringify({message: "Please check your email to activate your account."}), {
            status: 200,
            headers: {
                "Content-Type": "application/json",
            },
        });
    } else {
        return response;
    }
}
