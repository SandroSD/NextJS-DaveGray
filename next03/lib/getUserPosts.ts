export default async function getUserPosts(userId: string) {
    // valid for SSR or SSG. show data and after 60 seconds it revalidates.
    //const response = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}, { cache: next: { revalidate: 60 } }`);
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`);

    if(!response.ok) throw new Error("Failed to fetch user's posts.");

    return response.json()
}