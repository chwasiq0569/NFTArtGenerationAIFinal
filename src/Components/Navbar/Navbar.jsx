import React from "react";
import styles from "./navbar.module.css";
import { useMediaQuery } from "react-responsive";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { truncate } from "../../utils/utils";
import ClipLoader from "react-spinners/ClipLoader";
import WebsiteLogo from "../../assets/icons/icons8-blockchain-new-logo-40.png";
import UserAvatar from "../../assets/images/19.png"

const { ethers } = require('ethers')

const Navbar = () => {

  const [balance, setBalance] = React.useState(0);
  const [loadingBalance, setLoadingBalance] = React.useState(false)
  const [userAddress, setUserAddress] = React.useState(JSON.parse(localStorage.getItem("userAddress")) ? JSON.parse(localStorage.getItem("userAddress")) : null);
  const [mobileNavOpened, setMobileNavOpened] = React.useState(false);

  const [user, setUser] = React.useState(JSON.parse(localStorage.getItem("user")));

  const navigate = useNavigate();

  const isTablet = useMediaQuery({
    query: "(max-width: 768px)",
  });

  const getBalance = async () => {
    setLoadingBalance(true)
    const [account] = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    setBalance(ethers.utils.formatEther(balance));
    const signer = provider.getSigner();
    setUserAddress(await signer.getAddress());
    localStorage.setItem("userAddress", JSON.stringify(await signer.getAddress()));
    setLoadingBalance(false)
  };

  React.useEffect(() => {
    setUserAddress(JSON.parse(localStorage.getItem("userAddress")));
  }, [JSON.parse(localStorage.getItem("userAddress"))])



  return (
    <div className={styles.navbarContainer}>
      <Link
        style={{ border: "none", outline: "none", textDecoration: "none" }}
        to="/"
      >
        <div onClick={() => localStorage.removeItem("data")} className={styles.logoContainer}>
          <img src={WebsiteLogo} alt="website_logo" />
        </div>
      </Link>

      {isTablet && <div onClick={() => setMobileNavOpened(!mobileNavOpened)} className={styles.menuText}>
        <span>MENU</span>
      </div>}
      {isTablet ? (
        <div className={mobileNavOpened ? styles.mobileNavWrapper : styles.mobileNavWrapper + " " + styles.mobileNavWrapperClosed}>
          <p onClick={() => setMobileNavOpened(!mobileNavOpened)} className={styles.closeNav}>X</p>
          <Link
            style={{ border: "none", outline: "none", textDecoration: "none" }}
            to="/explore"
          >
            {" "}
            <div onClick={() => localStorage.removeItem("data")} className={styles.mobileNavItem}>
              <span>Explore</span>
            </div>
          </Link>
          <Link style={{ border: "none", outline: "none", textDecoration: "none" }} to="/mintnft">
            {" "}
            <div onClick={() => localStorage.removeItem("data")} className={styles.mobileNavItem}>
              <span>Mint NFT</span>
            </div>
          </Link>
          <Link style={{ border: "none", outline: "none", textDecoration: "none" }} to="/mynfts">
            {" "}
            <div className={styles.mobileNavItem}>
              <span>My NFT's</span>
            </div>
          </Link>
          {/* <div className={styles.mobileNavItem}> */}
          <div className={styles.mobileNavItem}> {
            user ? <div className={styles.avatarAndUsername}>
              <p>{user?.name}</p>
              <img src={UserAvatar} alt="user_avatar" />
            </div> : <div className={styles.mobileNavCtaBtnContainer}><button className={styles.mobileNavCtaBtnContainer} onClick={() => navigate("/auth")}>Sign In</button></div>
          }</div>
          {/* </div> */}
          {/* <button className={styles.mobileNavCtaBtnContainer} onClick={() => navigate("/auth")}>Sign In</button> */}

          {/* <div className={styles.mobileNavCtaBtnContainer}>
            <button>Connect Wallet</button>
          </div> */}
        </div>
      ) : (
        <div className={styles.navItemsContainer}>
          <Link
            style={{ border: "none", outline: "none", textDecoration: "none" }}
            to="/explore"
          >
            {" "}
            <div onClick={() => localStorage.removeItem("data")} className={styles.navItem}>
              <span>Explore</span>
            </div>
          </Link>
          <Link style={{ border: "none", outline: "none", textDecoration: "none" }} to="/mintnft">
            {" "}
            <div onClick={() => localStorage.removeItem("data")} className={styles.navItem}>
              <span>Mint NFT</span>
            </div>
          </Link>
          <Link style={{ border: "none", outline: "none", textDecoration: "none" }} to="/mynfts">
            {" "}
            <div className={styles.navItem}>
              <span>My NFT's</span>
            </div>
          </Link>


          <div className={styles.navCtaBtnContainer}>
            {
              user ? <div className={styles.avatarAndUsername}>
                <p>{user?.name}</p>
                <img src={UserAvatar} alt="user_avatar" />
              </div> : <button className={styles.signInBtn} onClick={() => navigate("/auth")}>Sign In</button>
            }
            <button disabled={userAddress} className={userAddress ? styles.overlayBtn : styles.getBalanceBtn} onClick={getBalance}>
              {
                loadingBalance ? <div className={styles.loaderContainer}><ClipLoader
                  style={{ width: "15px", height: "15px" }}
                  color="white"
                  size={25}
                  aria-label="Loading Spinner"
                  data-testid="loader"
                /></div> : userAddress ? truncate(userAddress, 10) : "Connect Wallet"
              }
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
