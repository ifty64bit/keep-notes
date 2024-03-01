// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
    collection,
    deleteDoc,
    doc,
    getDocs,
    getFirestore,
    query,
    setDoc,
} from "firebase/firestore";
import {
    GoogleAuthProvider,
    User,
    browserLocalPersistence,
    createUserWithEmailAndPassword,
    getAuth,
    onAuthStateChanged,
    setPersistence,
    signInWithEmailAndPassword,
    signInWithPopup,
} from "firebase/auth";

const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: "keep-notes-1ebc6.firebaseapp.com",
    projectId: "keep-notes-1ebc6",
    storageBucket: "keep-notes-1ebc6.appspot.com",
    messagingSenderId: "1006847260413",
    appId: "1:1006847260413:web:0fc803ddbea5496c0f7094",
    measurementId: "G-ZKRMCB5498",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const auth = getAuth(app);

export async function signupWithEmailPassword(email: string, password: string) {
    try {
        const userCredential = await createUserWithEmailAndPassword(
            auth,
            email,
            password
        );
        console.log(userCredential);
        return userCredential.user;
    } catch (error) {
        console.error(error);
    }
}

export async function loginWithEmailPassword(email: string, password: string) {
    try {
        await setPersistence(auth, browserLocalPersistence);
        const userCredential = await signInWithEmailAndPassword(
            auth,
            email,
            password
        );
        return userCredential.user;
    } catch (error) {
        console.error(error);
    }
}

export async function loginWithGoogle() {
    try {
        const googleProvider = new GoogleAuthProvider();
        const userCredential = await signInWithPopup(auth, googleProvider);
        const user = userCredential.user;
        console.log(userCredential);
        return user;
    } catch (error) {
        console.error(error);
    }
}

export async function logout() {
    try {
        await auth.signOut();
        return true;
    } catch (error) {
        console.error(error);
    }
}

export async function checkForUser(): Promise<User> {
    return new Promise((resolve, reject) => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            unsubscribe(); // Unsubscribe after checking
            if (user) {
                resolve(user); // User found, fulfill the promise
            } else {
                reject(new Error("No user found")); // Reject with error message
            }
        });
    });
}

export async function getAllNotesOfUser() {
    const q = query(
        collection(db, "notes", auth.currentUser?.uid as string, "userNotes")
    );
    const notes = await getDocs(q);

    return notes.docs.map((doc) => ({ id: doc.id, ...doc.data() })) as Note[];
}

export async function saveOrUpdateNote({ id, title, content, bgColor }: Note) {
    try {
        const userUID = auth.currentUser?.uid as string;
        if (!userUID) {
            throw new Error("User not found");
        }
        if (!id) {
            id = crypto.randomUUID();
        }
        const data = await setDoc(doc(db, "notes", userUID, "userNotes", id), {
            title,
            content,
            bgColor,
        });
        return data;
    } catch (error) {
        console.error(error);
    }
}

export async function deleteNoteById(id: string) {
    try {
        const userUID = auth.currentUser?.uid as string;
        if (!userUID) {
            throw new Error("User not found");
        }
        await deleteDoc(doc(db, "notes", userUID, "userNotes", id));
        return true;
    } catch (error) {
        console.error(error);
    }
}
