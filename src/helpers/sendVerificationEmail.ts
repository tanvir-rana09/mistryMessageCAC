import { ApiResponse } from "@/types/apiResponseType";
import { resend } from "@/lib/resend";
import VerificationEmail from "../../emails/verificationEmail";

export const sendVerificationEmail = async (
    username: string,
    email: string,
    verifycode: string
): Promise<ApiResponse> => {
    try {
        await resend.emails.send({
            from: "onboarding@resend.dev",
            to: email,
            subject: "Mystry Message verification Code",
            react: VerificationEmail({ username, otp: verifycode }),
        });
        return {
            success: false,
            message: "email verification send successfully",
        };
    } catch (error) {
        console.log("got some error while sending verification email ", error);
        return { success: false, message: "failed to send verification email" };
    }
};
