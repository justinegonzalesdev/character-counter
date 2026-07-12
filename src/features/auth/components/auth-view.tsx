"use client"

import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import React, { PropsWithChildren } from "react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { FirebaseError } from "firebase/app";
import { auth } from "@/lib/firebase/client";
import { toast } from "sonner";

export function AuthPage({children}: PropsWithChildren) {
	return (
		<div className={'p-0 md:p-6 flex flex-col items-center sm:min-h-svh'}>
			{children}
		</div>
	)
}

export function AuthCard({children}: PropsWithChildren) {
	return (
		<Card className={'w-full md:w-md flex-1 md:flex-none'}>
			{children}
		</Card>
	)
}

export function AuthOptions() {

	async function handleGooglogin() {
		try {
			const googleProvider = new GoogleAuthProvider();
			const userCredential = await signInWithPopup(auth, googleProvider);

			toast.success(`Login successfully as ${userCredential.user.email}`);
		} catch (e) {
			if (e instanceof FirebaseError && e.code === 'auth/popup-closed-by-user') {
				return;
			}
			toast.error(`${(e as Error).message ?? "Something went wrong"}`);
		}
	}

	return (
		<React.Fragment>
			<Button variant={'secondary'} onClick={handleGooglogin}>
				Login with Google
			</Button>
		</React.Fragment>
	)
}
