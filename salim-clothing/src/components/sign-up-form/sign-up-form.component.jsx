import { useState } from "react";
import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils";

import FormInput from "../form-input/form-imput.component";

const defaultFormFields = {
  displayName: "",
  email: "",
  password: "",
  confirmpassword: "",
};

const SignUpForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);

  console.log(formFields);

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  //we destruct them incase we need them
  const { displayName, email, password, confirmpassword } = formFields;

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password !== confirmpassword) {
      alert("passwords do not match");
      return;
    }
    try {
      const { user } = await createAuthUserWithEmailAndPassword(
        email,
        password
      );

      await createUserDocumentFromAuth(user, { displayName });
      resetFormFields();
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        alert("Cannot user email already exists.");
      } else {
        console.log("user has encountered an error", error);
      }
    }
  };

  const handleChange = (event) => {
    console.log(event);
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  return (
    <div>
      <h1>Sign up with your email and password</h1>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Display Name"
          type="text"
          required
          onChange={handleChange}
          name="displayName"
          value={displayName}
        />

        <label>Email</label>
        <FormInput
          label="Email"
          type="email"
          required
          onChange={handleChange}
          name="email"
          value={email}
        />

        <FormInput
          label="Password"
          type="password"
          required
          onChange={handleChange}
          name="password"
          value={password}
        />

        <FormInput
          label="Confirm Password"
          type="password"
          required
          onChange={handleChange}
          name="confirmpassword"
          value={confirmpassword}
        />

        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};
export default SignUpForm;
