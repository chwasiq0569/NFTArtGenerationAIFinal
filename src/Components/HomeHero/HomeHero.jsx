import React from "react";
import styles from "./homhero.module.css";
import HeroCoverImage from "../../assets/images/heroCoverimage.png";
import { useNavigate } from "react-router-dom";

const HomeHero = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.heroContainer}>
      <div className={styles.heroTextContainer}>
        <h1>Create, Sell & Collect Your Own Creative NFT</h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
          vulputate libero et velit.
        </p>
        <div className={styles.ctaContainer}>
          <button onClick={() => {
            navigate("/explore")
            localStorage.removeItem("data")
          }}>Explore Now</button>
          <button onClick={() => navigate("/mintnft")}>Mint your NFT!</button>
        </div>
      </div>
      <div className={styles.heroCoverContainer}>
        <div className={styles.coverImageContainer}>
          <img src={HeroCoverImage} alt="cover_image" />
        </div>
      </div>
    </div>
  );
};

export default HomeHero;
