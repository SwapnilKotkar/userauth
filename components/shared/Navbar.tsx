"use client";
import React from "react";
import { Button } from "../ui/button";
import ThemeToggle from "../ThemeToggle";

const Navbar = () => {
	let session = 123;
	return (
		<div className="py-4 px-4 flex items-center justify-between border-b shadow-sm">
			<div>
				<p>Auth UI</p>
			</div>
			<div className="flex items-center space-x-2">
				{session && (
					<Button
						onClick={() => {
							alert("signout123");
						}}
					>
						Sign out
					</Button>
				)}
				<ThemeToggle />
			</div>
		</div>
	);
};

export default Navbar;
