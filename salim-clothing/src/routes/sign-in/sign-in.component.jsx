import {
  signInWithGooglePopup,
  createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils";
import React from "react";

const SignIn = () => {
  const logGoogleUser = async () => {
    // Destructering  {user}=response
    const { user } = await signInWithGooglePopup();
    createUserDocumentFromAuth(user);
  };
  return (
    <div>
      <h1> this isthe sign in </h1>
      <button onClick={logGoogleUser}>sign in with Google PopUps</button>
    </div>
  );
};
export default SignIn;
