import React from "react";
import styles from "./mainctasection.module.css";
import WalletIcon from "../../assets/icons/Wallet_perspective_matte.png";
import MarketIcon from "../../assets/icons/Shop_perspective_matte.png";
import CollectIcon from "../../assets/icons/Shopping_perspective_matte.png";

const MainCTASection = () => {
  return (
    <div className={styles.mainCTAContainer}>
      <h1 className={styles.sectionHeading}>Create and sell your NFTs</h1>
      <div className={styles.boxesContainer}>
        <div className={styles.box}>
          <img src={WalletIcon} alt="wallet_icon" />
          <div className={styles.textContainer}>
            <p className={styles.primaryText}>Connect Wallet</p>
            <p className={styles.secondaryText}>
              We have parteners to connect wallets and it is very easy to access
              for you.
            </p>
          </div>
        </div>
        <div className={styles.box}>
          <img src={MarketIcon} alt="wallet_icon" />
          <div className={styles.textContainer}>
            <p className={styles.primaryText}>Collect AI Generated NFT!</p>
            <p className={styles.secondaryText}>
              {/* We provide a marketplace to buy or sell creator's collections of
              NFT. */}
              Add your favourite NFT to your NFT
              collection from now.
            </p>
          </div>
        </div>
        <div className={styles.box}>
          <img src={CollectIcon} alt="wallet_icon" />
          <div className={styles.textContainer}>
            <p className={styles.primaryText}>NFT Minting</p>
            <p className={styles.secondaryText}>
              Mint your NFT!. Using our NFT Minting Service.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainCTASection;
