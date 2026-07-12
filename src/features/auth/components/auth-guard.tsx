"use client"

import React, { PropsWithChildren, useEffect } from "react";

import AuthLoading from "@/components/reusable/auth-loading";
import useCurrentUserStore from "../store/current-user-store";
import { useRouter } from "next/navigation";

export default function AuthGuard(props: PropsWithChildren) {
	const { isLoading, currentUser } = useCurrentUserStore();
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

	return currentUser && (
		<React.Fragment>
			{props.children}
		</React.Fragment>
	)
}
