"use client";;

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useCallback, useEffect } from "react";

import { Button } from "@/components/ui/button";
import TextEditor from "@/components/reusable/text-editor";
import { toast } from "sonner";
import useTextEditorStore from "@/hooks/use-text-editor";

function Stat({
	label,
	value,
}: {
	label: string;
	value: React.ReactNode;
}) {
	return (
		<div className="flex items-center gap-2">
			<span>{label}</span>
			<div className="flex-1 border-b border-dotted border-black" />
			<span>{value}</span>
		</div>
	);
}

export default function Home() {
	const {
		text,
		characters,
		charactersNoSpaces,
		words,
		paragraphs,
		lines,
		readingTime
	} = useTextEditorStore();

	const handleCopy = useCallback(async () => {
		try {
			await navigator.clipboard.writeText(text);
			toast.success("Text Copied");
		} catch (e) {
			toast.error((e as Error).message ?? "Something went wrong");
		}
	}, [text]);

	useEffect(() => {
		function listener(ev: KeyboardEvent) {
			if (ev.ctrlKey) {
				if (ev.key.toLocaleUpperCase() === 'S') {
					ev.preventDefault();
					handleCopy();
				}
			}
		}
		window.addEventListener("keydown", listener);

		return () => window.removeEventListener("keydown", listener);
	}, [handleCopy])

	return (
		<div
			className={'h-svh grid pb-6'}
			style={{
				gridTemplateRows: "auto 1fr auto",
			}}
		>
			<Accordion type="single" collapsible={true}>
				<AccordionItem value={"info"}>
					<AccordionTrigger>
						<div className="flex w-full items-center justify-between pr-4">
							<span className="font-medium">
								{words.toLocaleString()} words
							</span>

							<span className="text-sm text-muted-foreground">
								{characters.toLocaleString()} chars • {charactersNoSpaces.toLocaleString()} no spaces
							</span>
						</div>
					</AccordionTrigger>
					<AccordionContent>
						<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-x-8 gap-y-3 p-4 text-sm">
							<Stat label="Characters" value={characters} />
							<Stat label="No Spaces" value={charactersNoSpaces} />
							<Stat label="Words" value={words} />
							<Stat label="Paragraphs" value={paragraphs} />
							<Stat label="Lines" value={lines} />
							<Stat label="Reading" value={`${readingTime} min`} />
						</div>
						<div className={'flex justify-end gap-4'}>
							<Button className={'px-6 min-w-50'} onClick={handleCopy}>
								Copy
							</Button>
						</div>
					</AccordionContent>
				</AccordionItem>
			</Accordion>

			<div className={'h-full overflow-auto'}>
				<TextEditor />
			</div>
		</div>
	);
}
