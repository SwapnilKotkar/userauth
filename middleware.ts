import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export function middleware(request: NextRequest) {
	const url = request.nextUrl;
	const publicRoutes = [
		"/signin",
		"/signup",
		// "/forgotpassword",
		// "/resetpassword",
		// "/verifyotp",
		"/verifyemail",
	];

	const emailParam = url.searchParams.get("email");
	const emailToken = url.searchParams.get("token");
	const resetPasswordToken = url.searchParams.get("resetpasswordtoken");

	// Get the token from the request cookies
	const token = request.cookies.get("token")?.value;

	console.log("token---", token);

	if (!token && publicRoutes.includes(url.pathname)) {
		if (
			url.pathname === "/verifyemail" &&
			(!emailParam || emailParam.trim() === "") &&
			(!emailToken || emailToken.trim() === "")
		) {
			return NextResponse.redirect(new URL(`/signin`, request.url)); // Redirect to signin if email is missing or empty
		}

		return NextResponse.next();
	}

	if (!token && !publicRoutes.includes(url.pathname)) {
		return NextResponse.redirect(new URL(`/signin`, request.url));
	}

	if (token && url.pathname !== "/") {
		return NextResponse.redirect(new URL(`/`, request.url));
	}

	return NextResponse.next();
}

export const config = {
	matcher: [
		"/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
	],
};
