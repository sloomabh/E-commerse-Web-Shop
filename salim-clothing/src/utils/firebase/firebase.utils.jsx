import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";

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

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: "select_account",
});
export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
