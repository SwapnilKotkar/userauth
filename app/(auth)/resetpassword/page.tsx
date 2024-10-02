import ResetPassword from "@/components/auth/ResetPassword";
import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision";
import React, { Suspense } from "react";

const page = () => {
	return (
		<div className="h-[100vh] flex items-center justify-center">
			<BackgroundBeamsWithCollision>
				<Suspense fallback={<div>Loading...</div>}>
					<ResetPassword />
				</Suspense>
			</BackgroundBeamsWithCollision>
		</div>
	);
};

export default page;
