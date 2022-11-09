import { signInWithGooglePopup } from "../../utils/firebase/firebase.utils";

const SignIn = () => {
  const logGoogleUser = async () => {
    const res = await signInWithGooglePopup();
    console.log(res);
  };
  return (
    <div>
      <h1> this isthe sign in </h1>
      <button onClick={logGoogleUser}>sign in with Google PopUps</button>
    </div>
  );
};
export default SignIn;
