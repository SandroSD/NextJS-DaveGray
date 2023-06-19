import getUser from "@/lib/getUser";
import getUserPosts from "@/lib/getUserPosts";
import { Suspense } from "react";
import UserPosts from "./components/UserPosts";
import type { Metadata } from "next";
import getAllUsers from "@/lib/getAllUsers";

import { notFound } from 'next/navigation';

type Params = {
    params: {
        userId: string;
    }
}

// Dynamic metadata
export async function generateMetadata({ params: { userId } }: Params): Promise<Metadata> {
    const userData: Promise<User> = getUser(userId);
    const user: User = await userData;

    if(!user?.name) {
        return {
            title: "User not found",
        }
    }

    return {
        title: user.name,
        description: `This is the page of ${user.name}`
    }
}

export default async function UserPage({ params: { userId } }: Params) {
    const userData: Promise<User> = getUser(userId); // requests will be deduplicated (will not fetch twice)
    const userPostsData: Promise<Post[]> = getUserPosts(userId);

    // one approach:  const [ user, userPosts ] = await Promise.all([ userData, userPostsData ]);

    const user = await userData;

    if(!user?.name) notFound();

    return (
        <>
            <h2>{user.name}</h2>
            <br />
            {/* one approach <UserPosts posts={userPosts} />*/}
            <Suspense fallback={<h2>Loading...</h2>}>
                <UserPosts promise={userPostsData} />
            </Suspense>
        </>
    )
}
// with this function nextjs will know what the possible parameteres are and it can pre render it.
// this will be SSG not SSR.
export async function generateStaticParams() {
    const usersData: Promise<User[]> = getAllUsers();
    const users = await usersData;

    return users.map(user => ({
        userId: user.id.toString()
    }));
}