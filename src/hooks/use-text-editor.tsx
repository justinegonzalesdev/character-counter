"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

const TEXT_EDITOR_KEY = "text-editor";

type TextEditorState = {
	text: string;

	characters: number;
	charactersNoSpaces: number;
	words: number;
	lines: number;
	paragraphs: number;
	readingTime: number;

	setText: (text: string) => void;
	clear: () => void;
};

function getStats(text: string) {
	const characters = text.length;

	const charactersNoSpaces = text.replace(
		/[^\p{L}\p{N}]/gu,
		""
	).length;

	const words =
		text.trim() === ""
			? 0
			: text.trim().split(/\s+/).length;

	const lines =
		text === ""
			? 0
			: text.split(/\r?\n/).length;

	const paragraphs =
		text.trim() === ""
			? 0
			: text.trim().split(/\n\s*\n/).length;

	const readingTime = words === 0 ? 0 : Math.ceil(words / 200);

	return {
		characters,
		charactersNoSpaces,
		words,
		lines,
		paragraphs,
		readingTime,
	};
}

export const textEditor = create<TextEditorState>()(
	persist(
		(set) => ({
			text: "",

			characters: 0,
			charactersNoSpaces: 0,
			words: 0,
			lines: 0,
			paragraphs: 0,
			readingTime: 0,

			setText: (text) =>
				set({
					text,
					...getStats(text),
				}),

			clear: () =>
				set({
					text: "",

					characters: 0,
					charactersNoSpaces: 0,
					words: 0,
					lines: 0,
					paragraphs: 0,
					readingTime: 0,
				}),
		}),
		{
			name: TEXT_EDITOR_KEY,
		}
	)
);

export default function useTextEditorStore() {
	const text = textEditor((s) => s.text);

	const characters = textEditor((s) => s.characters);
	const charactersNoSpaces = textEditor((s) => s.charactersNoSpaces);
	const words = textEditor((s) => s.words);
	const lines = textEditor((s) => s.lines);
	const paragraphs = textEditor((s) => s.paragraphs);
	const readingTime = textEditor((s) => s.readingTime);

	const setText = textEditor((s) => s.setText);
	const clear = textEditor((s) => s.clear);

	return {
		text,

		characters,
		charactersNoSpaces,
		words,
		lines,
		paragraphs,
		readingTime,

		setText,
		clear,
	} as const;
}