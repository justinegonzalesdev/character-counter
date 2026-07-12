import "client-only"

import { connectAuthEmulator, getAuth } from "firebase/auth";
import { connectFirestoreEmulator, getFirestore } from "firebase/firestore";

import { __DEV__ } from "@/utils/constants";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyD0VGyjrVv576BtCZ3t5COjoDxUOlZeMow",
  authDomain: "story-realm-5f1f2.firebaseapp.com",
  projectId: "story-realm-5f1f2",
  storageBucket: "story-realm-5f1f2.firebasestorage.app",
  messagingSenderId: "419966122359",
  appId: "1:419966122359:web:fe37623582b831c24ac972"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

if (__DEV__) {
	connectAuthEmulator(auth, "http://localhost:9099", { disableWarnings: false });
	connectFirestoreEmulator(db, "localhost", 8080);
}

export { app, auth, db };
