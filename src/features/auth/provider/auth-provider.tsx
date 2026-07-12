"use client"

import React, { PropsWithChildren, createContext, useContext, useEffect, useState } from "react";
import { User, onAuthStateChanged } from "firebase/auth"

import { auth } from "@/lib/firebase/client";

// Context
export type AuthContextType = {
	currentUser: User | null;
	isLoading: boolean;
}
export const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provider
export function AuthProvider({ children }: PropsWithChildren) {
	const [currentUser, setCurrentUser] = useState<AuthContextType['currentUser']>(null);
	const [isLoading, setIsLoading] = useState<AuthContextType['isLoading']>(true);

	useEffect(() => {
		const cleanAuthtateChanged = onAuthStateChanged(auth, (user) => {
			setCurrentUser(user);
			setIsLoading(false);
		});

		return () => cleanAuthtateChanged();
	}, []);

	return (
		<AuthContext.Provider value={{ currentUser, isLoading }}>
			{children}
		</AuthContext.Provider>
	)
}

// Hooks
export function useAuthContext() {
	const ctx = useContext(AuthContext);
	if (!ctx) throw new Error("useAuthContext must be inside AuthProvider");
	return ctx;
}
