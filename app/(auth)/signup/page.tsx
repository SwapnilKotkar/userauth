import SignUp from "@/components/auth/SignUp";
import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision";
import React from "react";

const page = () => {
	return (
		<div className="h-[100vh] bg-muted-foreground/10 flex items-center justify-center">
			<BackgroundBeamsWithCollision>
				<SignUp />
			</BackgroundBeamsWithCollision>
		</div>
	);
};

export default page;
