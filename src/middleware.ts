import { NextRequest, NextResponse } from "next/server";

export async function middleware(req:NextRequest) {
    if(await isAuthenticated(req) === false ){
return new NextResponse("Unauthorized",{ status: 401,headers: {"WWW-Authentificate":"basic"}})

    } 

    
}
async function isAuthenticated(req:NextRequest) {
    return Promise.resolve(false)
}
export const config={
    matcher:"/admin/:path"
}