"use client"

import { Book } from "../types/book-type";

export default function BookItem({ book }: {book: Book}) {
	return (
		<div className={'bg-card h-15 flex flex-row items-center px-6'}>
			<p>
				{book.title}
			</p>
		</div>
	)
}
