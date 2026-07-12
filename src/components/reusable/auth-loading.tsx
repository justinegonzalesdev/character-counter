import { cn } from "@/lib/utils";

export default function AuthLoading() {

	return (
		<div
			className={cn(
				"fixed inset-0",
				"flex flex-col justify-center items-center",
			)}>
			<h1
				className={cn(
					"text-8xl font-bold font-serif",

				)}
			>Loading</h1>
		</div>
	)
}
