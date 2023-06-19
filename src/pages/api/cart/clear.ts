import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import { cookies } from "next/headers";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    if (req.method !== "POST") {
        res.status(405).end();
        return;
    }

    const cookie = cookies().get("SESSION");
    if (!cookie) {
        res.status(401).end();
        return;
    }

    const prisma = new PrismaClient();

    await prisma.session.update({
        where: { id: cookie.value },
        data: { cart: [] },
    });

    res.status(200).end();
}
