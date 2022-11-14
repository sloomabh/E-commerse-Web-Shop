import "./button.styles.scss";
/*we have 3 types of buttons
default

inverted

google sign in

----> the solutionis to create a variable */
const BUTTON_TYPECLASSES = {
  google: "google-sign-in",
  inverted: "inverted",
};
const Button = ({ children, buttonType, ...otherProps }) => {
  return (
    <button
      className={`button-container ${BUTTON_TYPECLASSES[buttonType]}`}
      {...otherProps}
    >
      {children}
    </button>
  );
};

export default Button;
