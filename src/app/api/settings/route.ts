import getCurrentUser from "@/actions/getCurrentUser";
import { NextResponse } from "next/server";
import prisma from '../../../utils/prisma';
export async function POST(req:Request){
    try{
        const currentUser=await getCurrentUser();
        const body=await req.json();
        const {name,image}=body;
        if(!currentUser){
            return new NextResponse("Unauthorized access",{status:401});
        }
        const updatedUser =await prisma.user.update({
            where:{
                id:currentUser.id
            },
            data:{
                image,
                name
            }
        });
        return NextResponse.json(updatedUser);
    }catch(err){
        console.log(err);
        return new NextResponse("Internal server error",{status:500});
    }
}