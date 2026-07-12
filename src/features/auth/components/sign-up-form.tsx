"use client"

import { AuthCard, AuthOptions } from "./auth-view";
import { CardContent, CardTitle } from "@/components/ui/card";
import { Field, FieldError, FieldGroup, FieldLabel, FieldSeparator } from "@/components/ui/field";

import { Button } from "@/components/ui/button";
import { FirebaseError } from "firebase/app";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { auth } from "@/lib/firebase/client";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { toast } from "sonner";
import { useForm } from "react-hook-form";

type SignUpFormData = {
	email: string;
	password: string;
	confirmPassword: string;
}

export default function SignUpForm() {
	const {
		handleSubmit,
		register,
		formState: { errors },
	} = useForm<SignUpFormData>();

	async function onSignUp(data: SignUpFormData) {
		if (data.password !== data.confirmPassword) {
			return toast.error("Password and Confirm Password didn't match");
		}

		try {
			await createUserWithEmailAndPassword(auth, data.email, data.password);
			toast.success(`Sign Up Successfully as ${data.email}`);
		} catch (e) {
			if (e instanceof FirebaseError) {
				switch (e.code) {
					case "auth/email-already-in-use":
						return toast.error("Email is already registered");

					case "auth/invalid-email":
						return toast.error("Invalid email format");

					case "auth/weak-password":
						return toast.error("Password is too weak");

					case "auth/operation-not-allowed":
						return toast.error("Email/password signup is not enabled");

					case "auth/network-request-failed":
						return toast.error("Network error. Check your internet connection");

					case "auth/too-many-requests":
						return toast.error("Too many requests. Try again later");

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
				<CardTitle className="text-center">
					Create Account
				</CardTitle>

				<form onSubmit={handleSubmit(onSignUp)}>
					<Field>
						<FieldGroup>
							<FieldLabel>Email</FieldLabel>
							<Input
								{...register("email", {
									required: "Email is required",
									pattern: {
										value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
										message: "Invalid email format",
									},
								})}
							/>
							<FieldError>
								{errors.email?.message}
							</FieldError>
						</FieldGroup>

						<FieldGroup>
							<FieldLabel>Password</FieldLabel>
							<Input
								type="password"
								{...register("password", {
									required: "Password is required",
									minLength: {
										value: 6,
										message: "Password must be at least 6 characters",
									},
								})}
							/>
							<FieldError>
								{errors.password?.message}
							</FieldError>
						</FieldGroup>

						<FieldGroup>
							<FieldLabel>Confirm Password</FieldLabel>
							<Input
								type="password"
								{...register("confirmPassword", {
									required: "Please confirm your password",
								})}
							/>
							<FieldError>
								{errors.confirmPassword?.message}
							</FieldError>
						</FieldGroup>

						<Button type="submit">
							Sign Up
						</Button>

						<div className="flex justify-center items-center gap-1">
							Already have account?
							<Link replace={true} href="/login">
								<span className="underline">
									Login
								</span>
							</Link>
						</div>

						<FieldSeparator className="my-2">
							or
						</FieldSeparator>

						<AuthOptions />
					</Field>
				</form>
			</CardContent>
		</AuthCard>
	);
}
