import { useState } from "react";

const defaultFormFields = {
  displayName: "",
  email: "",
  password: "",
  confirmpassword: "",
};

const SignUpForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);

  //we destruct them incase we need them
  const { displayName, email, password, confirmpassword } = formFields;
  const handleChange = (event) => {
    const { name, value } = event;
  };

  return (
    <div>
      <h1>ghghg</h1>
      <form onSubmit={() => {}}>
        <label>Display Name</label>
        <input
          type="text"
          required
          onChange={handleChange}
          name="displayName"
          value={displayName}
        />

        <label>Email</label>
        <input
          type="email"
          required
          onChange={handleChange}
          name="email"
          value={email}
        />

        <label>Password</label>
        <input
          type="password"
          required
          onChange={handleChange}
          name="password"
          value={password}
        />

        <label>Confirm Password</label>
        <input
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