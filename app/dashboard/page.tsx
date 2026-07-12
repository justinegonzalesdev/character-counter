// Wrap with AuthGuard
"use client"

import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Empty, EmptyTitle } from "@/components/ui/empty";

import BookFormDialog from "@/features/books/components/book-form-dialog";
import BookItem from "@/features/books/components/book-item";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import useBookStore from "@/features/books/store/use-book-store";
import useCurrentUserStore from "@/features/auth/store/current-user-store";

export default function Dashboard() {

	const { currentUser } = useCurrentUserStore();
	const { books, isLoading } = useBookStore();

	return currentUser && (
		<div className={'flex flex-col'}>
			<div className={cn(
				"sticky top-0",
				"bg-background z-50 p-6",
				"flex justify-between items-center"
			)}>
				<h1>Dashboard</h1>
				<BookFormDialog mode={'Add'}>
					<Button>Add Book</Button>
				</BookFormDialog>
			</div>

			<div className={'flex flex-col gap-4 px-6 pb-6'}>
				{isLoading && Array.from({ length: 5 }).map((_, index) => (
					<Skeleton key={`book-skeleton-${index}`} className={'h-15'} />
				))}

				{!isLoading && books.length === 0 && (
					<Empty className={'bg-card'}>
						<EmptyTitle>No Books Yet</EmptyTitle>
					</Empty>
				)}

				{!isLoading && books.map((book) => (
					<BookItem key={book.id} book={book}/>
				))}
			</div>
		</div>
	)
}
