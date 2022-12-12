import React from "react";
import styles from "./signupform.module.css";
import { css } from "@emotion/react";
import ClipLoader from "react-spinners/ClipLoader";
import { notifyError } from "../../utils";
import { notifySuccess } from "./../../utils";

const SignUpForm = ({ setShowSignIn }) => {
  const [username, setUsername] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const override = css`
    display: block;
    margin: 0 auto;
    border-color: #ffffff;
  `;

  const signUp = () => {
    setLoading(true);
    fetch("http://localhost:5000/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: username,
        email: email,
        password: password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "1") {
          notifySuccess("User Created Successfully!");
          setShowSignIn(true);
        } else {
          notifyError(data.message);
        }
        setLoading(false);

        console.log("API_RES", data);
      }).catch(err => {
        notifyError("Something went wrong!");
        setLoading(false);
      });
  };

  return (
    <div className={styles.formContainer}>
      <h1>Sign Up!</h1>

      <div className={styles.inputFieldContainer}>
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          type="text"
          placeholder="Enter Username"
        />
      </div>
      <div className={styles.inputFieldContainer}>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="text"
          placeholder="Enter Email"
        />
      </div>
      <div className={styles.inputFieldContainer}>
        <input
          value={password}
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter Password"
        />
      </div>
      {loading ? (
        <div className={styles.loaderContainer}>
          <ClipLoader
            color="#ffffff"
            loading={loading}
            css={override}
            size={25}
          />
        </div>
      ) : (
        <button
          disabled={
            username.length < 3 || email.length < 5 || password.length < 3
          }
          onClick={signUp}
          className={styles.actionButton}
        >
          Sign Up
        </button>
      )}
    </div>
  );
};

export default SignUpForm;
