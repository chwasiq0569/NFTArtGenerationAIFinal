import React from "react";
import styles from "./footer.module.css";
import { FaTwitter } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa";

const Footer = () => {
  return (
    <div className={styles.footerContainer}>
      <div className={styles.footerLeftSide}></div>
      <div className={styles.footerRightSide}>
        <FaFacebookF
          style={{
            color: "white",
            cursor: "pointer",
          }}
        />
        <FaTwitter
          style={{
            color: "white",
            margin: "0 2rem",
            cursor: "pointer",
          }}
        />
        <FaInstagram
          style={{
            color: "white",
            cursor: "pointer",
          }}
        />
      </div>
    </div>
  );
};

export default Footer;
