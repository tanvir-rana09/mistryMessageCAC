import { DBconnect } from "@/DB/dbConnect";
import UserModel from "@/models/Users";
import bcrypt from "bcryptjs";
import { sendVerificationEmail } from "@/helpers/sendVerificationEmail";
import { ApiResponse } from "@/types/apiResponseType";

async function POST(request: Request) {
    try {
        const { username, email, password } = await request.json();
        return Response.json(
            { success: true, message: "register successfully" },
            { status: 200 }
        );
    } catch (error) {
        console.log("register error ", error);
        return Response.json(
            { success: false, message: "user registration failed" },
            { status: 500 }
        );
    }
}
