import React from "react";
import styles from "./mynftcardcontainer.module.css";
import ImageCard from "../ImageCard/ImageCard";
import { Link } from "react-router-dom";
import DummyCardImage from "../../assets/images/dummyimage.png";
import axios from "axios";
import RingLoader from "react-spinners/RingLoader";
import MyNFTImageCard from "../MyNFTImageCard/MyNFTImageCard";
import { notifyError } from "../../utils";
import { ClipLoader } from "react-spinners";

const MyNFTCardContainer = () => {

    const [data, setData] = React.useState([])
    const [requestProcess, setRequestProcess] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const [userAddress, setUserAddress] = React.useState(JSON.parse(localStorage.getItem("userAddress")) ? JSON.parse(localStorage.getItem("userAddress")) : "");
    const [user, setUser] = React.useState(JSON.parse(localStorage.getItem("user")) ? JSON.parse(localStorage.getItem("user")) : null);


    const fetchNFTs = () => {
        setLoading(true)
        fetch("http://127.0.0.1:5000/api/getmynfts?walletAddress=0x904d8dDe3bA55D69120aD2dcBb4178ea4d421ffC").then(res => res.json()).then(data => {
            console.log("My NFTs", data)
            if (data?.status) {
                setLoading(false)
                setData(data?.nfts)
            }
            else {
                notifyError("Something went wrong!");
            }
            setLoading(false)
        }).catch(err => {
            console.log("ERR", err)
            notifyError("Something went wrong!");
            setLoading(false)
        })
    }

    React.useEffect(() => {
        fetchNFTs();
    }, [])

    console.log("DATA||DATA", data.length)

    return (
        <div className={styles.cardsContainer}>
            {
                userAddress && user ? loading ? <div className={styles.loaderContainer}><ClipLoader
                    color="white"
                    size={50}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                /></div> : data && data.length <= 0 ? <p className={styles.noNftFound}>No NFT Found</p> : <div className={styles.cardsWrapper}>
                    {
                        data.map(nft => <MyNFTImageCard nft={nft} />)
                    }
                </div> : <p className={styles.loginAndConnectWallet}>Login & Connect Wallet!</p>
            }

        </div >
    );
};

export default MyNFTCardContainer;
