"use client";

import React from "react";
import { Textarea } from "../ui/textarea"
import useTextEditorStore from "@/hooks/use-text-editor"

export default function TextEditor() {
	const { text, setText } = useTextEditorStore()
	return (
		<React.Fragment>
			<Textarea
				className="h-full rounded-none p-6 bg-transparent"
				value={text}
				onChange={(e) => setText(e.target.value)}
			/>
		</React.Fragment>
	)
}