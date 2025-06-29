import bcrypt from 'bcrypt';
import prisma from '../../../utils/prisma';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { email, password, name } = body;

        if (!email || !password || !name) {
            return new NextResponse('Missing Info', { status: 400 })
        }
        const hashedPassword = await bcrypt.hash(password, 12);
        const user = await prisma.user.create({
            data: {
                email, name, hashedPassword
            }
        });
        return NextResponse.json(user);
    } catch (err) {
         console.log(err);
         return new NextResponse('Internal Server Error', { status: 500 });
    }
}