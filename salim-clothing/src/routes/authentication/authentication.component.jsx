import React from "react";
import "./authentication.styles.scss";
import { async } from "@firebase/util";
import SignUpForm from "../../components/sign-up-form/sign-up-form.component";
import SignInForm from "../../components/sign-in-form/sign-in-form.component";
const Athentication = () => {
  /* useEffect(() => {
    (async () => {
      const response = await getRedirectResult(auth);
      if (response) {
        const userDocRef = await createUserDocumentFromAuth(response.user);
      }
    })();
  }, []); -//we want to run this when applicationmounts when the sign in component monts for the first time //when we pas  an empty array -->run this function once when this component mounts for the first time
*/

  return (
    <div className="authentication-container">
      {/* <button onClick={logGoogleUser}>sign in with Google PopUps</button> */}
      <SignInForm />
      <SignUpForm />
    </div>
  );
};
export default Athentication;
