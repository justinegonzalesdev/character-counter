"use client"

import React, { useEffect } from "react";

import AuthLoading from "@/components/reusable/auth-loading";
import { useAuthContext } from "@/features/auth/provider/auth-provider"
import { useRouter } from "next/navigation";

export default function DashboardLayout(props: LayoutProps<"/dashboard">) {
	const { isLoading, currentUser } = useAuthContext();
	const router = useRouter()

	useEffect(() => {
		if (isLoading) return;
		if(!currentUser) {
			router.replace("/login");
		}
	}, [isLoading, currentUser, router]);

	if (isLoading || !currentUser) {
		return <AuthLoading/>
	}

	return (
		<React.Fragment>
			{props.children}
		</React.Fragment>
	)
}
