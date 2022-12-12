import React from "react";
import styles from "./featurednft.module.css";
import FeaturedNFTOne from "../../assets/images/19.png";
import FeaturedNFTTwo from "../../assets/images/32.png";
import FeaturedNFTThree from "../../assets/images/897.png";
import FeaturedNFTFour from "../../assets/images/16.png";
import FeaturedNFTFive from "../../assets/images/13.png";
import ImageSlider from "./../ImageSlider/ImageSlider";

const FeaturedNFTs = () => {
  return (
    <div className={styles.mainCTAContainer}>
      <h1 className={styles.sectionHeading}>Featured NFTs</h1>
      <div className={styles.sliderContainer}>
        <ImageSlider
          images={[
            {
              id: 1,
              src: FeaturedNFTOne,
              alt: "Placeholder image",
            },
            {
              id: 2,
              src: FeaturedNFTTwo,
              alt: "Placeholder image",
            },
            {
              id: 3,
              src: FeaturedNFTThree,
              alt: "Placeholder image",
            },
            {
              id: 4,
              src: FeaturedNFTFour,
              alt: "Placeholder image",
            },
            {
              id: 5,
              src: FeaturedNFTFive,
              alt: "Placeholder image",
            },
          ]}
        />
      </div>
    </div>
  );
};

export default FeaturedNFTs;
