import React from "react";
import styles from "./home.module.css";
import Navbar from "./../../Components/Navbar/Navbar";
import HomeHero from "./../../Components/HomeHero/HomeHero";
import MainCTASection from "../../Components/MainCTASection/MainCTASection";
import FeaturedNFTs from "./../../Components/FeaturedNFTs/FeaturedNFTs";
import InfoSection from "./../../Components/InfoSection/InfoSection";
import AboutCoverImage from "../../assets/images/aboutSectionImg.png";
import Footer from "./../../Components/Footer/Footer";

const Home = () => {
  return (
    <div className={styles.pageContainer}>
      <div className={styles.contentContainer}>
        <Navbar />
        <HomeHero />
        <MainCTASection />
        <FeaturedNFTs />
        <InfoSection
          title="About Us"
          primaryText="Get Popular NFT"
          secondaryText="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum velit, sit amet feugiat lectus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Praesent auctor purus luctus enim egestas, ac scelerisque ante pulvinar. "
          coverImage={AboutCoverImage}
        />
      </div>
      <Footer />
    </div>
  );
};

export default Home;
