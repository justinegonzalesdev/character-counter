import { AuthCard, AuthOptions } from "./auth-view";
import { CardContent, CardTitle } from "@/components/ui/card";
import { Field, FieldGroup, FieldLabel, FieldSeparator } from "@/components/ui/field";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";

export default function SignUpForm() {

	return (
		<AuthCard>

			<CardContent>
				<CardTitle className={'text-center'}>Create Account</CardTitle>

				<Field>
					<FieldGroup className={'gap-0'}>
						<FieldLabel>Email</FieldLabel>
						<Input />
					</FieldGroup>

					<FieldGroup className={'gap-0'}>
						<FieldLabel>Password</FieldLabel>
						<Input />
					</FieldGroup>

					<FieldGroup className={'gap-0'}>
						<FieldLabel>Confirm Password</FieldLabel>
						<Input />
					</FieldGroup>

					<Button>
						Sign Up
					</Button>

					<div className={'flex justify-center items-center gap-1'}>
						Already have accunt?
						<Link replace={true} href={'/login'}>
							<span className={'underline'}>
								Login
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
