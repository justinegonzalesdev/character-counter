"use client"

import { Dialog, DialogContent, DialogHeader, DialogOverlay, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import React, { useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import useBookStore from "../store/use-book-store";
import useCurrentUserStore from "@/features/auth/store/current-user-store";
import { useForm } from "react-hook-form"

export type BookFormDialogProps =
	| {
		mode: "Add";
		children: React.ReactNode;
	}

export default function BookFormDialog(props: BookFormDialogProps) {
	// UI
	const [open, setOpen] = useState(false);
	const formRef = useRef<HTMLFormElement>(null);

	// Stores
	const { currentUser } = useCurrentUserStore()
	const { addBook } = useBookStore(currentUser?.uid);

	// Functions
	async function handleAction(formData: FormData): Promise<void> {
		if (!currentUser) return;

		const title = String(formData.get("title"));
		if (!title) {
			toast.error("Title is required");
			return;
		}

		try {
			await addBook(currentUser.uid, title);
			formRef.current?.reset();
			setOpen(false);
		} catch (e) {
			toast.error((e as Error).message);
		}
	}

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild={true}>
				{props.children}
			</DialogTrigger>
			<DialogOverlay />
			<DialogContent>

				<DialogHeader>
					<DialogTitle>{props.mode} Book</DialogTitle>
				</DialogHeader>

				<form action={handleAction} ref={formRef}>
					<Field>
						<FieldGroup>
							<FieldLabel>Book Title</FieldLabel>
							<Input name={'title'}/>
						</FieldGroup>

						<Button>
							{props.mode} Book
						</Button>
					</Field>
				</form>

			</DialogContent>
		</Dialog>
	)
}
