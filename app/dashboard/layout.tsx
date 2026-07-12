import AuthGuard from "@/features/auth/components/auth-guard";

export default function DashboardLayout(props: LayoutProps<"/dashboard">) {
	return (
		<AuthGuard>
			{props.children}
		</AuthGuard>
	)
}
