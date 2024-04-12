import mongoose, { Schema, Document } from "mongoose";

export interface Message extends Document {
    content: string;
    createdAt: Date;
}

const messageSchema: Schema<Message> = new Schema({
    content: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        required: true,
    },
});

export interface User extends Document {
    username: string;
    email: string;
    password: string;
    verifyCode: string;
    isVerified: boolean;
    verifyCodeexpiry: Date;
    isUserAcceptingMessage: boolean;
    message: Message[];
}
const UserChema: Schema<User> = new Schema({
    username: {
        type: String,
        required: [true, "User name is required"],
        unique: true,
        trim: true,
        toLowerCase: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
        match: [
            /\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/,
            "Please Enter a valid email address",
        ],
    },
    password: {
        type: String,
        required: true,
        match: [
            /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm,
            "Please Enter a valid strong address",
        ],
    },
    verifyCode: {
        type: String,
        required: true,
    },
    verifyCodeexpiry: {
        type: Date,
        required: true,
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    isUserAcceptingMessage: {
        type: Boolean,
        default: false,
    },
    message: [messageSchema],
});

const UserModel =
    (mongoose.models.users as mongoose.Model<User>) ||
    mongoose.model<User>("User", UserChema);

export default UserModel;
