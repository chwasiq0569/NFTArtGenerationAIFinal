import React from "react";
import styles from "./authpage.module.css";
import SignUpForm from "../../Components/SignUpForm/SignUpForm";
import SignInForm from "../../Components/SignInForm/SignInForm";
import { ToastContainer } from "react-toastify";
import WebsiteLogo from "../../assets/icons/icons8-blockchain-new-logo-480.png";

const AuthPage = () => {
  const [showSignIn, setShowSignIn] = React.useState(true);

  return (
    <div className={styles.authPageContainer}>
      <ToastContainer />

      <div className={styles.intoDesignContainer}>
        <img src={WebsiteLogo} alt="website_logo" />
      </div>
      <div className={styles.authFormContainer}>
        {/* <div className={styles.logoContainer}>
          <p>NFT</p>
        </div> */}
        {showSignIn ? (
          <SignInForm />
        ) : (
          <SignUpForm setShowSignIn={setShowSignIn} />
        )}

        <div className={styles.alreadyAccount}>
          <p>
            {showSignIn ? "Dont have account?" : "Already have an account?"}{" "}
            <span
              onClick={() => {
                setShowSignIn(!showSignIn);
              }}
            >
              {showSignIn ? "Sign Up" : "Sign In"}
            </span>
          </p>{" "}
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
