import React from "react";
import styles from "./mynfts.module.css";
import Navbar from "./../../Components/Navbar/Navbar";
import Footer from "./../../Components/Footer/Footer";
import CardsContainer from "./../../Components/CardsContainer/CardsContainer";
import MyNFTCardContainer from "../../Components/MyNFTCardContainer/MyNFTCardContainer";
import { ToastContainer } from "react-toastify";

const MyNFTs = () => {

    return (
        <div className={styles.pageContainer}>
            <ToastContainer />
            <div className={styles.contentContainer}>
                <Navbar />
                <MyNFTCardContainer />
                {/* <HomeHero />
        <MainCTASection />
        <FeaturedNFTs />
        <InfoSection
          title="About Us"
          primaryText="Get Popular NFT"
          secondaryText="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum velit, sit amet feugiat lectus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Praesent auctor purus luctus enim egestas, ac scelerisque ante pulvinar. "
          coverImage={AboutCoverImage}
        /> */}
            </div>
            <Footer />
        </div>
    );
};

export default MyNFTs;
