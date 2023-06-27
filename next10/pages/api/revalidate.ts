// https://<your-site.com>/api/revalidate?secret=<token>
// http://localhost:3000/api/revalidate?path=/&secret=6b0b7fe36dfd4bfdf767407423cca9b1

import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    console.log('Run revalidate.');
    if (req.query.secret !== process.env.MY_SECRET_TOKEN) {
        return res.status(401).json({ message: 'Invalid token.' });
    }

    const path = req.query.path as string;

    await res.revalidate(path);

    return res.json({ revalidated: true });
}

