import User from "@/app/models/user";
import connect from "@/app/utils/db";
import bcryptjs from "bcryptjs";
import { NextResponse } from "next/server";

export const POST = async (request: any) => {
    const { email, password } = await request.json();

    await connect();

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return new NextResponse("Email is already in use", { status: 400 });
        }

        const hashedPassword = await bcryptjs.hash(password, 5);
        const newUser = new User({
            email,
            password: hashedPassword,
        });

        await newUser.save();
        return new NextResponse("User is Registered !", { status: 200 });
    } catch (err: any) {
        return new NextResponse(err.message, { status: 500 });
    }
};
