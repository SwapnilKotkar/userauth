"use server";

import {
	CreateUserParams,
	emailVerifyParams,
	getUserLoginParams,
	otpParams,
	providersLoginParams,
	resetPasswordParams,
	UpdateUserParams,
} from "@/types";
import User from "@/models/user.model";
import CryptoJS from "crypto-js";
// import { connectToDatabase } from "../database";
// import { revalidatePath } from "next/cache";
// import crypto from "crypto";

const salt = process.env.PASSWORD_SECRET!;

export async function hashPassword(password: string): Promise<string> {
	const combined = password + salt;
	return CryptoJS.SHA256(combined).toString();
}

export async function verifyPassword(
	password: string,
	hashedPassword: string
): Promise<boolean> {
	const hash = await hashPassword(password);
	return hash === hashedPassword;
}

export async function createUser(user: CreateUserParams) {
	user.password = await hashPassword(user.password);

	const newUser = await User.create({
		email: user.email,
		password: user.password,
		onboarding: false,
	});

	console.log("✅ NEW user created", newUser);

	return newUser;
}
