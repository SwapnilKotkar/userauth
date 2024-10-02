// app/api/send-otp/route.ts
import { connectToDatabase } from "@/lib/database";
import { NextResponse } from "next/server";
import CryptoJS from "crypto-js";
import User from "@/models/user.model";
import { generateTokenAndSetCookie } from "@/lib/generateTokenAndSetCookie";

export async function POST(request: Request) {
	let body = await request.json();

	console.log("emailverify_payload_____", body);

	try {
		await connectToDatabase();
		const existingUser = await User.findOne({ email: body.email });

		if (!existingUser) {
			return NextResponse.json(
				{
					error: "Failed. Email address doesn't exists",
				},
				{ status: 404 }
			);
		}

		console.log("existingUser_verify", existingUser);
		console.log("date_now", Date.now());

		if (
			!existingUser ||
			!existingUser.emailVerifyResetToken ||
			Date.now() > existingUser.emailVerifyResetExpires
		) {
			// throw new Error('OTP is invalid or expired');

			return NextResponse.json(
				{
					error: "Token is invalid or expired",
				},
				{ status: 404 }
			);
		}

		if (!body.emailToken) {
			throw new Error("Email token is missing");
		}

		const hashedEmailToken = CryptoJS.SHA256(body.emailToken).toString();

		// console.log("hashedEmailToken", hashedEmailToken);

		if (hashedEmailToken !== existingUser.emailVerifyResetToken) {
			return NextResponse.json(
				{
					error: "Email token is incorrect",
				},
				{ status: 404 }
			);
		}

		let updatedUser = await User.findOneAndUpdate(
			{ email: body.email },
			{
				$set: { isEmailVerified: true },
				$unset: { emailVerifyResetToken: 1, emailVerifyResetExpires: 1 },
			},
			{ new: true }
		);

		console.log("DONEEEEEEEEEEEEEEEE", updatedUser);

		let tokenData = {
			userId: updatedUser._id,
			email: updatedUser.email,
			isEmailVerified: updatedUser.isEmailVerified,
		};

		let response = generateTokenAndSetCookie(tokenData);

		console.log("verifyemail_response", response);

		// return NextResponse.json(
		// 	{
		// 		message: "Email is verified successfully",
		// 	},
		// 	{ status: 200 }
		// );
		return response;
	} catch (error) {
		console.log("❌ Error while verifying OTP ---", error);
	}
}
