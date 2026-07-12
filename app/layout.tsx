import "./globals.css";

import { Geist, Geist_Mono, Instrument_Sans, Inter } from "next/font/google";

import { AuthProvider } from "@/features/auth/provider/auth-provider";
import type { Metadata } from "next";
import { Toaster } from "@/components/ui/sonner";
import { cn } from "@/lib/utils";

const instrumentSansHeading = Instrument_Sans({subsets:['latin'],variable:'--font-heading'});

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "Story Realm",
	description: "A local text editor that saves your notes automatically, keeping your content safe even after reloads.",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html
			lang="en"
			className={cn("h-full", "antialiased", geistSans.variable, geistMono.variable, inter.variable, instrumentSansHeading.variable)}
			suppressHydrationWarning={true}
		>
			<body className="dark min-h-full flex flex-col">
				<Toaster />
				<AuthProvider>
					{children}
				</AuthProvider>
			</body>
		</html>
	);
}
