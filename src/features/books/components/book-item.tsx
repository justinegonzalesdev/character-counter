"use client"

import { Book } from "../types/book-type";

export default function BookItem({ book }: {book: Book}) {
	return (
		<div className={'bg-card p-6'}>
			<p>
				{book.title}
			</p>
		</div>
	)
}
