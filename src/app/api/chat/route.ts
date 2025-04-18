import { NextResponse } from "next/server";

export async function POST(req:Request){

    try {
        const body=await req.json();
        const {file_key,file_name}=body 
           return NextResponse.json({
             status: 200,
             message: "received successfully",
             file_key,
             file_name,
           });
        
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            status: 500,
            message: "Internal Server Error"
        })
    }
}