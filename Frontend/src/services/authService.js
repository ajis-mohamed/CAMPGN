import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut,
    onAuthStateChanged
} from "firebase/auth";

import { auth, googleProvider } from "../config/firebaseConfig";

// checking Login
export const checkAuth = (callback) => {
    return onAuthStateChanged(auth, (user) => {
        callback(user); 
    });
};

// Register
export const registerUser = async (email, password) => {
    const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password
    );

    return result.user;
};

// Login
export const loginUser = async (email, password) => {
    const result = await signInWithEmailAndPassword(
        auth,
        email,
        password
    );

    return result.user;
};

// Google Login
export const loginWithGoogle = async () => {
    const result = await signInWithPopup(auth, googleProvider);
    return result.user;
};

// Logout
export const logoutUser = async () => {
    await signOut(auth);
};

export const getAuthHeaders = async () => {
    if (!auth.currentUser) {
        throw new Error("Please sign in again to continue.");
    }

    return {
        Authorization: `Bearer ${await auth.currentUser.getIdToken()}`
    };
};