"use client";

import "client-only";

import { User, onAuthStateChanged } from "firebase/auth";

import { auth } from "@/lib/firebase/client";
import { create } from "zustand";
import { useEffect } from "react";

export interface CurrentUserStoreState {
	currentUser: User | null;
	isLoading: boolean;

	setCurrentUser: (currentUser: User | null) => void;
}

const currentUserStore = create<CurrentUserStoreState>((set) => ({
	currentUser: null,
	isLoading: true,

	setCurrentUser(currentUser) {
		set({
			currentUser,
			isLoading: false,
		});
	},
}));

function initializeCurrentUserStore() {
	const unsubscribe = onAuthStateChanged(auth, (user) => {
		currentUserStore.getState().setCurrentUser(user);
	});

	return {
		unsubscribe,
	}
}

export default function useCurrentUserStore() {

	const currentUser = currentUserStore(s => s.currentUser);
	const isLoading = currentUserStore(s => s.isLoading);

	useEffect(() => {
		const listener = initializeCurrentUserStore();
		return () => listener.unsubscribe();
	}, []);

	return {
		currentUser,
		isLoading,
	};
}
