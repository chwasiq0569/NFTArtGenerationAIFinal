import React from "react";
import styles from "./infosection.module.css";

const InfoSection = ({ title, primaryText, secondaryText, coverImage }) => {
  return (
    <div className={styles.infoComponentContainer}>
      <div className={styles.titleContainer}>
        {title && <h1 className={styles.titleText}>{title}</h1>}
      </div>
      <div className={styles.aboutContainer}>
        <div className={styles.infoContainer}>
          {primaryText && <p className={styles.primaryText}>{primaryText}</p>}
          {secondaryText && (
            <p className={styles.secondaryText}>{secondaryText}</p>
          )}
        </div>
        <div className={styles.coverContainer}>
          <div className={styles.imageContainer}>
            {coverImage && <img src={coverImage} alt="about_us_cover" />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoSection;
