import Navbar from "@/components/shared/Navbar";
import React from "react";
import Cookies from "js-cookie";
import jwt from "jsonwebtoken";

const page = async () => {
	let session = 123;

	// Get the token from the cookies
	const token = Cookies.get("token"); // Replace "token" with your cookie name if different
	console.log("token********", token);

	// Decode the token
	const decodedToken = token ? jwt.decode(token) : null;

	console.log("Decoded Token----------------------", decodedToken);

	return (
		<div className="h-[100vh]">
			<Navbar />
			<div>hello</div>
			<pre className="py-6 px-4 whitespace-pre-wrap break-all">
				{JSON.stringify(decodedToken, null, 2)}
			</pre>
		</div>
	);
};

export default page;
