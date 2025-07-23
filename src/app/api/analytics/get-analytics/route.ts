import { NextRequest, NextResponse } from "next/server";
import { getDashboardDataPerBranch } from "@/lib/dashboard";
import { getAuth } from "@clerk/nextjs/server";


export async function GET(req: NextRequest){
    try{
        const { userId } = getAuth(req);
        if(!userId){
            return NextResponse.json({ mesage: "Not Authorized "} , { status: 403 });
        }
        const data = await getDashboardDataPerBranch(userId);
        return NextResponse.json(data, { status: 200 });
    }catch(error){
        return NextResponse.json({ message: `Internal server error: ${error}`}, { status: 500 });
    }
}

