import React from "react";
import styles from "./signinform.module.css";
import ClipLoader from "react-spinners/ClipLoader";
import { notifyError } from "../../utils";
import { notifySuccess } from "./../../utils";
import { css } from "@emotion/react";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { ToastContainer } from "react-toastify";

const SignInForm = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const navigate = useNavigate();

  const override = css`
    display: block;
    margin: 0 auto;
    border-color: #ffffff;
  `;

  const signIn = () => {
    setLoading(true);
    fetch("http://localhost:5000/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "1") {
          const user = jwt_decode(data.token);

          localStorage.setItem("user", JSON.stringify(user));

          navigate("/");
        } else {
          notifyError(data.message);
        }
        setLoading(false);
        console.log("API_RES", data);
      }).catch(err => {
        setLoading(false);
        console.log("ERR", err)
        notifyError("Something went wrong!");
      })
  };

  return (
    <div className={styles.formContainer}>
      <ToastContainer />

      <h1>Sign In!</h1>

      <div className={styles.inputFieldContainer}>
        <input
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          type="text"
          placeholder="Enter Email"
        />
      </div>
      <div className={styles.inputFieldContainer}>
        <input
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          type="password"
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
          disabled={email.length < 5 || password.length < 3}
          className={styles.actionButton}
          onClick={signIn}
        >
          Sign In
        </button>
      )}
    </div>
  );
};

export default SignInForm;
