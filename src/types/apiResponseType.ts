import { Message } from "@/models/Users";

export interface ApiResponse {
    success: boolean;
    message: string;
    isAccesptingMessage?: boolean;
    messages?: Array<Message>;
}
