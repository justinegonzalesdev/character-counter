"use client"

import { AuthCard, AuthOptions } from "./auth-view"
import { CardContent, CardTitle } from "@/components/ui/card";
import { Field, FieldError, FieldGroup, FieldLabel, FieldSeparator } from "@/components/ui/field"
import { User, signInWithEmailAndPassword } from "firebase/auth";

import { Button } from "@/components/ui/button"
import { FirebaseError } from "firebase/app";
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { auth } from "@/lib/firebase/client";
import { toast } from "sonner";
import { useForm } from "react-hook-form";

type LoginFormData = {
	email: string;
	password: string;
}

export default function LoginForm() {

	const {handleSubmit, register, formState: {errors} } = useForm<LoginFormData>()

	async function onLogin(data: LoginFormData) {
		try {
			await signInWithEmailAndPassword(auth, data.email, data.password);
			toast.success(`Login Succesfully as ${data.email}`);
		} catch (e) {
			if (e instanceof FirebaseError) {
				switch (e.code) {
					case "auth/wrong-password":
						return toast.error("Incorrect password");

					case "auth/user-not-found":
						return toast.error("Email not found");

					case "auth/invalid-email":
						return toast.error("Invalid email format");

					case "auth/invalid-credential":
						return toast.error("Invalid email or password");

					case "auth/user-disabled":
						return toast.error("This account has been disabled");

					case "auth/too-many-requests":
						return toast.error("Too many login attempts. Try again later");

					case "auth/network-request-failed":
						return toast.error("Network error. Check your internet connection");

					case "auth/operation-not-allowed":
						return toast.error("Email/password login is not enabled");

					default:
						return toast.error("Something went wrong. Please try again");
				}
			}
			return toast.error((e as Error).message);
		}
	}

	return (
		<AuthCard>
			<CardContent>
				<CardTitle className={'text-center'}>Login</CardTitle>

				<form onSubmit={handleSubmit(onLogin)}>
					<Field>
						<FieldGroup>
							<FieldLabel>Email</FieldLabel>
							<Input {...register("email", {
								required: {
									value: true,
									message: "Email required"
								}
							})} />
							<FieldError>
								{errors.email?.message}
							</FieldError>
						</FieldGroup>

						<FieldGroup>
							<FieldLabel>Password</FieldLabel>
							<Input type={'password'} {...register("password", {
								required: {
									value: true,
									message: "Password required"
								}
							})} />
							<FieldError>
								{errors.password?.message}
							</FieldError>
						</FieldGroup>

						<Button>
							Login
						</Button>

						<div className={'flex justify-center items-center gap-1'}>
							Don&apos;t have account?
							<Link replace={true} href={'/sign-up'}>
								<span className={'underline'}>
									Sign Up
								</span>
							</Link>
						</div>

						<FieldSeparator className={'my-2'}>
							or
						</FieldSeparator>

						<AuthOptions/>
					</Field>
				</form>
			</CardContent>
		</AuthCard>
	)
}
