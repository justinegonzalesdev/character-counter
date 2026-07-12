"use client"

import { AuthCard, AuthOptions } from "./auth-view"
import { CardContent, CardTitle } from "@/components/ui/card";
import { Field, FieldGroup, FieldLabel, FieldSeparator } from "@/components/ui/field"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"

export default function LoginForm() {
	return (
		<AuthCard>
			<CardContent>
				<CardTitle className={'text-center'}>Login</CardTitle>

				<Field>
					<FieldGroup className={'gap-0'}>
						<FieldLabel>Email</FieldLabel>
						<Input />
					</FieldGroup>

					<FieldGroup className={'gap-0'}>
						<FieldLabel>Password</FieldLabel>
						<Input />
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
			</CardContent>
		</AuthCard>
	)
}
