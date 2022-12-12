import React from "react";
import styles from "./mynftimagecard.module.css";
import DummyCardImage from "../../assets/images/dummyimage.png";
import { useNavigate } from "react-router-dom";
import UserAvatar from "../../assets/images/19.png";
import { truncate } from "../../utils/utils"

const MyNFTImageCard = ({ nft }) => {

    console.log("nftimage", nft)
    const navigate = useNavigate();
    const [base64Image, setbase64Image] = React.useState([]);

    const [fileFormat, setFileFormat] = React.useState("");
    const [url, setUrl] = React.useState("");

    // const makeWater = async (IMG) => {
    //     let convertApi = ConvertApi.auth('reYPnhMeNxU1LFu2')
    //     let params = convertApi.createParams()
    //     params.add('File', IMG);
    //     params.add('Text', 'HELLO');
    //     let result = await convertApi.convert('png', 'watermark', params)
    //     setUrl(result?.dto?.Files[0]?.Url)
    // }

    function createFile(file) {
        fetch(file).then(res => res.blob()).then(data => {
            let file = new File([data], "test.png", {
                type: 'image/png'
            });
            setFileFormat(file)
        })
    }

    return (
        nft &&
        <div key={nft?._id} onContextMenu={(e) => e.preventDefault()} className={styles.imageCardContainer}>
            <div className={styles.userProfile}>
                <img src={UserAvatar} />
                <p>chwasiq0569</p>
            </div>
            <img className={styles.nftImage} src={nft?.image} alt="image_" />
            <div className={styles.nftDetails}>
                <p className={styles.nftName}>{nft?.name}</p>
                <p className={styles.nftDescription}>{truncate(nft?.description, 35)}</p>
            </div>
        </div>
    );
};

export default MyNFTImageCard;
