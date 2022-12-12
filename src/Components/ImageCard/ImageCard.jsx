import React from "react";
import styles from "./imagecard.module.css";
import DummyCardImage from "../../assets/images/dummyimage.png";
import { useNavigate } from "react-router-dom";

const ImageCard = ({ foldername, image }) => {
  const navigate = useNavigate();
  const [base64Image, setbase64Image] = React.useState([]);

  const [fileFormat, setFileFormat] = React.useState("");
  const [url, setUrl] = React.useState("");

  console.log("PATHSA", `../../models/${foldername}/${image}`)

  // const makeWater = async (IMG) => {
  //   // console.log("IMG", IMG)
  //   let convertApi = ConvertApi.auth('reYPnhMeNxU1LFu2')
  //   let params = convertApi.createParams()
  //   params.add('File', IMG);
  //   params.add('Text', 'HELLO');
  //   let result = await convertApi.convert('png', 'watermark', params)
  //   // return result;
  //   // return result?.dto?.Files[0]?.Url;
  //   setUrl(result?.dto?.Files[0]?.Url)
  // }

  function createFile(file) {
    fetch(file).then(res => res.blob()).then(data => {
      let file = new File([data], "test.png", {
        type: 'image/png'
      });
      setFileFormat(file)
    })
  }

  // const toDataURL = (url) =>
  //   fetch(url)
  //     .then((response) => response.blob())
  //     .then(
  //       (blob) =>
  //         new Promise((resolve, reject) => {
  //           const reader = new FileReader();
  //           reader.onloadend = () => resolve(reader.result);
  //           reader.onerror = reject;
  //           reader.readAsDataURL(blob);
  //         }),
  //       []
  //     );
  React.useEffect(() => {
    // image && toDataURL(image).then((image) => setbase64Image(image));
    // image && console.log("IMGIMG", makeWater(createFile()));
    // image && createFile()
    // image && createFile();
    // createFile().then(data => data)
    // makeWater(createFile(require("../../models/104210408/118739211.png")));
    // makeWater(createFile().then(data => data))
  }, [image]);

  console.log(fileFormat)
  console.log(url)

  // const addWatermark = () => {
  //   fetch(
  //     `https://neutrinoapi.net/image-watermark?image-url=${image}&watermark-url=https://www.google.com/search?q=flower&sxsrf=APq-WBsd13MDdI1_jP54EM-jv5Hg6AY6LQ:1649076443646&tbm=isch&source=iu&ictx=1&vet=1&fir=X_BrNWU_72e_nM%252C6QnaOLvEQovLfM%252C_%253BoPe3TTSw39P92M%252C5UbOpOqf9qM23M%252C_%253BGGrA_FqXnfse-M%252CZih9vqAzJOmeTM%252C_%253B2_Ni0PgZXkUefM%252C6QnaOLvEQovLfM%252C_%253BiVQQ4BLVOiawRM%252C-JSzIkf42ZvU1M%252C_%253BDLvqNfZoSxNa9M%252CHOqXEvxEUfInTM%252C_%253BkynP2p55eMS7TM%252CMqJ0o7Xjxwc15M%252C_%253BGe0sPl2wtwPeYM%252C6ZeVwdp2vU8abM%252C_%253BRFTubhdlZtnahM%252C3MI-6iRgS0SMDM%252C_%253ByA5D5g6LaFHsMM%252CnVrbZ6x84_QItM%252C_%253B9CiN761KPALpjM%252CbG6MjQwUqGJFlM%252C_%253BM-bOH8LwUKBuqM%252CZih9vqAzJOmeTM%252C_%253BFq2ReKTzIsMA5M%252CLo6lwABxk0AZfM%252C_%253BDf4Wv-YOu1lHFM%252CpiPHuh3Ev6LC_M%252C_&usg=AI4_-kTEGdR0jWehSyasL2laQHBMAGCJRg&sa=X&ved=2ahUKEwjD4oW9uPr2AhXEhf0HHfgNC-YQ9QF6BAgDEAE#imgrc=X_BrNWU_72e_nM`
  //   )
  //     .then((res) => res.json())
  //     .then((data) => console.log("DATA", data));
  // };

  return (
    image && (
      <div
        onClick={() => navigate("/itemDetail", {
          state: {
            foldername: foldername,
            image: image
          }
        })}
        onContextMenu={(e) => e.preventDefault()}
        className={styles.imageCardContainer}
        key={image}
      >
        <div className={styles.imageWrapper}><p>Watermark</p></div>
        <img src={require(`../../models/${foldername}/${image}`)} alt="image_" />
        {/* <div className={styles.lowerContent}> */}
        {/* <div className={styles.details}> */}
        {/* <p>Abstact Smoke Red Blue</p> */}
        {/* <p>1.25 ETH</p> */}
        {/* </div> */}
        {/* <button className={styles.buyButton}>Buy</button> */}
        {/* </div> */}
      </div>
    )
  );
};

export default ImageCard;
