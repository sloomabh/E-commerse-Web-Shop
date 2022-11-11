import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyABbrfPQFACqRAbq1XPrzaY6TAgUFBwRis",
  authDomain: "sallim-clothing.firebaseapp.com",
  projectId: "sallim-clothing",
  storageBucket: "sallim-clothing.appspot.com",
  messagingSenderId: "316491088183",
  appId: "1:316491088183:web:97be74edc7a98fbb989ab2",
};
// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const googleprovider = new GoogleAuthProvider();
googleprovider.setCustomParameters({
  prompt: "select_account",
});
export const auth = getAuth();
export const signInWithGooglePopup = () =>
  signInWithPopup(auth, googleprovider);

export const signInWithGoogleRedirect = () =>
  signInWithRedirect(auth, googleprovider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (
  userAuth,
  additionalInformation = {}
) => {
  if (!userAuth) return;
  const userDocRef = doc(db, "users", userAuth.uid);
  console.log(userDocRef);

  const userSnapshot = await getDoc(userDocRef);
  console.log(userSnapshot);
  console.log(userSnapshot.exists());

  if (!userSnapshot.exists()) {
    //if the snapshot does not exist we set it to data base
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation,
      });
    } catch (error) {
      console.log("error creating the user", error.message);
    }
  }

  return userDocRef;
};
//if user data does not exist
//create  /set the document with the data from userAuth in my collection

//if user data exists
// return userDocRef

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  return await signInWithEmailAndPassword(auth, email, password);
};
