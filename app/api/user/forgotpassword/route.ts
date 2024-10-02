import { connectToDatabase } from "@/lib/database";
import { NextResponse } from "next/server";
import { sendPasswordResetEmail } from "@/lib/mailer";

export async function POST(request: Request) {
	const body = await request.json();

	console.log("password_reset_payload_____", body);

	try {
		await connectToDatabase();

		let response = await sendPasswordResetEmail(body.email);

		if (response.success) {
			return NextResponse.json(
				{
					message:
						"Reset password link sent on your email address, please check your inbox.",
				},
				{ status: 200 }
			);
		} else {
			return NextResponse.json({ error: response.error }, { status: 500 });
		}
	} catch (error: any) {
		console.log("error in /resetpassword", error);
		return NextResponse.json(
			{ success: false, error: error.message },
			{ status: 500 }
		);
	}
}
