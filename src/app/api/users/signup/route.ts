import { DBconnect } from "@/DB/dbConnect";
import UserModel from "@/models/Users";
import bcrypt from "bcryptjs";
import { sendVerificationEmail } from "@/helpers/sendVerificationEmail";
import { ApiResponse } from "@/types/apiResponseType";

async function POST(request: Request) {
    try {
        const { username, email, password } = await request.json();

        const verifiedExistingUser = await UserModel.findOne({
            $and: [{ email }, { username }, { isVerified: true }],
        });
        const verifyCode = Math.floor(
            100000 + Math.random() * 900000
        ).toString();
        if (verifiedExistingUser) {
            return Response.json(
                {
                    message: "User already exist with this user/email",
                    success: false,
                },
                { status: 400 }
            );
        }
        const unverifiedExistingUser = await UserModel.findOne({
            $or: [{ username }, { email }],
        });

        if (unverifiedExistingUser) {
            const hashedPassword = await bcrypt.hash(password, 10);
            unverifiedExistingUser.password = hashedPassword;
            unverifiedExistingUser.verifyCode = verifyCode;
            unverifiedExistingUser.verifyCodeexpiry = new Date(
                Date.now() + 360000
            );
            await unverifiedExistingUser.save();
            
        } else {
            if (!(username || email || password)) {
                throw new Error("All fields are required");
            }
            const hashedPassword = await bcrypt.hash(password, 10);
            const verifyCodeexpiry = new Date();
            verifyCodeexpiry.setHours(verifyCodeexpiry.getHours() + 1);
            const newUser = new UserModel({
                username,
                email,
                password: hashedPassword,
                verifyCode,
                isVerified: false,
                verifyCodeexpiry,
                isUserAcceptingMessage: true,
                message: [],
            });

            await newUser.save();
        }

        const emailVerificationResponse = await sendVerificationEmail(
            username,
            email,
            verifyCode
        );
        if (!emailVerificationResponse.success) {
            return Response.json(
                { success: false, message: "email cannot send" },
                { status: 500 }
            );
        }
        return Response.json(
            {
                success: true,
                message:
                    "register successfully please check your email and verify your email",
            },
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
