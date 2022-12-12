import React from 'react';
import Footer from '../../Components/Footer/Footer';
import Navbar from '../../Components/Navbar/Navbar';
import styles from "./mintnft.module.css";
import { pinJSONToIPFS } from '../../utils/pinata';
import ContractAbi from "../../artifact/contracts/MyToken.sol/MyToken.json";
import NFTPlaceholderImage from "../../assets/images/nfplaceholder.svg";
import ClipLoader from "react-spinners/ClipLoader";
import { notifyError, notifySuccess } from '../../utils';
import { ToastContainer } from "react-toastify";

const { ethers } = require('ethers')

const MintNFT = () => {
    const [balance, setBalance] = React.useState(0);
    const [selectedImage, setSelectedImage] = React.useState(null);
    const [imageUrl, setImageUrl] = React.useState(null);
    const [name, setName] = React.useState("");
    const [description, setDescription] = React.useState("");
    const [base64Image, setbase64Image] = React.useState("");
    const [loading, setLoading] = React.useState(false);
    const [userAddress, setUserAddress] = React.useState(JSON.parse(localStorage.getItem("userAddress")) ? JSON.parse(localStorage.getItem("userAddress")) : "");
    const [user, setUser] = React.useState(JSON.parse(localStorage.getItem("user")) ? JSON.parse(localStorage.getItem("user")) : null);

    React.useEffect(() => {
        if (selectedImage) {
            setImageUrl(URL.createObjectURL(selectedImage));
            // toDataURL(selectedImage).then((image) => setbase64Image(image));
            encodeImageFileAsURL()
        }
    }, [selectedImage]);

    console.log('selectedImage', selectedImage)
    console.log('imageUrl', imageUrl)
    console.log('base64Image', base64Image)

    const getBalance = async () => {
        const [account] = await window.ethereum.request({
            method: "eth_requestAccounts",
        });
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const balance = await provider.getBalance(account);
        setBalance(ethers.utils.formatEther(balance));
    };

    const uploadToIFPS = async () => {
        if (!userAddress) {
            notifyError("Please Connect Wallet!")
        } else {
            setLoading(true)
            const pinataResponse = await pinJSONToIPFS({
                name: name,
                description: description,
                image: base64Image
            });
            console.log('pinataResponse', pinataResponse)
            mintNft(pinataResponse.pinataUrl)
        }
    }

    const mintNft = async (metadataURI) => {
        try {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const address = await provider.send("eth_requestAccounts", []);
            const signer = provider.getSigner();
            console.log('ContractAbi.abi', ContractAbi.abi)
            console.log('address[0]', address[0])
            const contract = new ethers.Contract(address[0], ContractAbi.abi, signer);
            const result = await contract.mintNFT(address[0], metadataURI)
            let res = await result.wait();

            if (res) {
                fetchMetaDataURI(metadataURI);
                console.log("res", res);
                // notifySuccess("Your NFT Minted Successfully!")
            } else {
                notifyError("Something went wrong!")
            }
        } catch (err) {
            setLoading(false);
            notifyError("NFT Not Minted!")
        }

    }

    const fetchMetaDataURI = (metadatauri) => {
        fetch(metadatauri).then(res => res.json()).then(data => {
            console.log('META_DATA', data)
            if (data) {
                saveToDB(data?.name, data?.description, data?.image, userAddress)
            } else {
                notifyError("Something went wrong!")
            }
        })

    }

    const saveToDB = (name, description, image, walletAddress) => {
        console.log(name, description, image, walletAddress)
        fetch("http://localhost:5000/api/savenft", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: name,
                description: description,
                image: image,
                walletAddress: walletAddress
            })
        }).then(res => res.json()).then(data => {
            console.log('SAVED_NFT', data)
            if (data?.status == '1' || data?.status == 1) {
                notifySuccess("Your NFT Minted Successfully!");
                clearState();
            } else {
                notifyError("Something went wrong!")
            }
            setLoading(false)
        }).catch(err => {
            console.log("err", err)
            notifyError("Something went wrong!")
        })
    }

    function encodeImageFileAsURL() {
        var reader = new FileReader();
        reader.onloadend = function () {
            console.log('RESULT', reader.result)
            setbase64Image(reader.result)
        }
        reader.readAsDataURL(selectedImage);
    }

    const toDataURL = (url) =>
        fetch(url)
            .then((response) => response.blob())
            .then(
                (blob) =>
                    new Promise((resolve, reject) => {
                        const reader = new FileReader();
                        reader.onloadend = () => resolve(reader.result);
                        reader.onerror = reject;
                        reader.readAsDataURL(blob);
                    }),
                []
            );

    const clearState = () => {
        setSelectedImage(null)
        setImageUrl(null)
        setName("")
        setDescription("")
        setbase64Image("")
        setLoading(false)
    }

    React.useEffect(() => {
        setUserAddress(JSON.parse(localStorage.getItem("userAddress")))
    }, [localStorage.getItem("userAddress")])

    return (<div className={styles.pageContainer}>
        <ToastContainer />

        <div className={styles.contentContainer}>
            <Navbar />
            <h1 className={styles.pageHead}>Mint your NFT!</h1>
            <p className={styles.pageDescription}>We need metadata about your nft. Please fill the form & convert your digital asset into NFT!</p>

            <div className={styles.nftInputForm}>
                <div className={styles.formLeftSide}>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder='Enter Name' />
                    <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} placeholder='Enter Description' />
                    {!userAddress || !user ? <p className={styles.pageDescription}>Please Login & Connect Wallet to Mint an NFT!</p> : loading ? <div className={styles.loaderContainer}><ClipLoader
                        style={{ width: "30px", height: "30px", margin: "0 auto" }}
                        color="white"
                        size={30}
                        aria-label="Loading Spinner"
                        data-testid="loader"
                    /></div> : <button onClick={uploadToIFPS} disabled={!name || !description || !selectedImage}>Mint NFT</button>}
                </div>
                <div className={styles.formRightSide}>
                    <div className={styles.nftImageUpload}>
                        <label htmlFor="file-input">
                            <img src={imageUrl ? imageUrl : NFTPlaceholderImage} alt="placeholder_image" />
                        </label>
                        <input id="file-input" type="file" accept=".jpg, .jpeg, .png" style={{ display: "none" }} onChange={e => {
                            setSelectedImage(e.target.files[0])
                        }} />
                    </div>
                </div>
            </div>
        </div>
        <Footer />
    </div>);
}

export default MintNFT;