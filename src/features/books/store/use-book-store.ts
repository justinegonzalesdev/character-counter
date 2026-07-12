"use client"

import "client-only"

import { Book } from "../types/book-type"
import { create } from "zustand";
import { FIRESTORE_KEYS } from "@/utils/constants";
import { collection, doc, onSnapshot, query, setDoc, where } from "firebase/firestore";
import { db } from "@/lib/firebase/client";
import { useEffect } from "react";

export type BookStoreState = {
	books: Book[];
	isLoading: boolean;

	setBooks: (books: Book[]) => void;

	addBook: (ownerId: string, bookTitle: string) => Promise<void>;
}

export const bookStore = create<BookStoreState>((set) => ({
	books: [],
	isLoading: true,
	setBooks(books) {
		set({
			isLoading: false,
			books,
		})
	},
	addBook: async (ownerId, bookTitle) => {
		const now = Date.now();

		const newBook = {
			id: crypto.randomUUID(),
			title: bookTitle,
			note: "",
			ownerId,
			createdAt: now,
			updatedAt: now,
		} satisfies Book;

		await setDoc(
			doc(db, FIRESTORE_KEYS.BOOKS, newBook.id),
			newBook
		);
	},
}));

export default function useBookStore(ownerId?: string|undefined) {
	const books = bookStore(s => s.books);
	const isLoading = bookStore(s => s.isLoading);
	const addBook = bookStore(s => s.addBook);

	useEffect(() => {
		if (!ownerId) return;

		const booksQuery = query(
			collection(db, FIRESTORE_KEYS.BOOKS),
			where("ownerId", "==", ownerId)
		);

		const unsubscribe = onSnapshot(booksQuery, (snapshot) => {
			const books = snapshot.docs.map((doc) => ({
			id: doc.id,
			...doc.data(),
			})) as Book[];

			bookStore.getState().setBooks(books);
		});

		return unsubscribe;
	}, [ownerId]);

	return {
		books,
		isLoading,
		addBook,
	}
}
