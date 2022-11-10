import React from "react";

import {
  signInWithGooglePopup,
  createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils";
import { async } from "@firebase/util";
import SignUpForm from "../../components/sign-up-form/sign-up-form.component";

const SignIn = () => {
  /* useEffect(() => {
    (async () => {
      const response = await getRedirectResult(auth);
      if (response) {
        const userDocRef = await createUserDocumentFromAuth(response.user);
      }
    })();
  }, []); -//we want to run this when applicationmounts when the sign in component monts for the first time //when we pas  an empty array -->run this function once when this component mounts for the first time
*/
  // when makecall to database it is an asynchronous operation
  const logGoogleUser = async () => {
    // Destructering  {user}=response
    const { user } = await signInWithGooglePopup();
    const userDocRef = await createUserDocumentFromAuth(user);
  };

  return (
    <div>
      <h1> this isthe sign in </h1>
      <button onClick={logGoogleUser}>sign in with Google PopUps</button>
      <SignUpForm />
    </div>
  );
};
export default SignIn;
