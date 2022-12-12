import React from "react";
import styles from "./itemsdetail.module.css";
import Navbar from "./../../Components/Navbar/Navbar";
import Footer from "./../../Components/Footer/Footer";
import DummyCardImage from "../../assets/images/dummyimage.png";
import CheckoutPopUp from "./../../Components/CheckoutPopUp/CheckoutPopUp";
import { useLocation, useNavigate } from "react-router-dom";
import { saveAs } from 'file-saver'
import axios from "axios";
import StripeCheckout from "react-stripe-checkout";
import { notifyError } from "../../utils";
import { ToastContainer } from "react-toastify";

const ItemsDetail = () => {
  const [openCheckoutPopUp, setOpenCheckoutPopUp] = React.useState(false);
  const [base64Image, setbase64Image] = React.useState("");
  const [showDownloadBtn, setShowDownloadBtn] = React.useState(true);
  const [product, setProduct] = React.useState({
    name: 'Headphone',
    price: 5,
  });

  const [userLoggedIn, setUserLoggedIn] = React.useState(JSON.parse(localStorage.getItem("user")) ? JSON.parse(localStorage.getItem("user")) : null)

  const { state } = useLocation();

  console.log('state', state)

  const navigate = useNavigate();

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

  const addWatermark = (image) => {
    fetch(
      `https://neutrinoapi.net/image-watermark?image-url=${DummyCardImage}?imgurl=https%3A%2F%2Fnetgro.org%2Fwp-content%2Fuploads%2F2020%2F01%2Finstagram-follower.png&imgrefurl=https%3A%2F%2Fnetgro.org%2Fservice%2Finstagram-follower%2F&tbnid=SoL0peMCgNHc9M&vet=12ahUKEwiwt9SYuPr2AhVn7rsIHQfpDhUQMygBegUIARDZAQ..i&docid=0asicL3o7DSjBM&w=636&h=636&q=follower&ved=2ahUKEwiwt9SYuPr2AhVn7rsIHQfpDhUQMygBegUIARDZAQ&watermark-url=https://www.google.com/search?q=flower&sxsrf=APq-WBsd13MDdI1_jP54EM-jv5Hg6AY6LQ:1649076443646&tbm=isch&source=iu&ictx=1&vet=1&fir=X_BrNWU_72e_nM%252C6QnaOLvEQovLfM%252C_%253BoPe3TTSw39P92M%252C5UbOpOqf9qM23M%252C_%253BGGrA_FqXnfse-M%252CZih9vqAzJOmeTM%252C_%253B2_Ni0PgZXkUefM%252C6QnaOLvEQovLfM%252C_%253BiVQQ4BLVOiawRM%252C-JSzIkf42ZvU1M%252C_%253BDLvqNfZoSxNa9M%252CHOqXEvxEUfInTM%252C_%253BkynP2p55eMS7TM%252CMqJ0o7Xjxwc15M%252C_%253BGe0sPl2wtwPeYM%252C6ZeVwdp2vU8abM%252C_%253BRFTubhdlZtnahM%252C3MI-6iRgS0SMDM%252C_%253ByA5D5g6LaFHsMM%252CnVrbZ6x84_QItM%252C_%253B9CiN761KPALpjM%252CbG6MjQwUqGJFlM%252C_%253BM-bOH8LwUKBuqM%252CZih9vqAzJOmeTM%252C_%253BFq2ReKTzIsMA5M%252CLo6lwABxk0AZfM%252C_%253BDf4Wv-YOu1lHFM%252CpiPHuh3Ev6LC_M%252C_&usg=AI4_-kTEGdR0jWehSyasL2laQHBMAGCJRg&sa=X&ved=2ahUKEwjD4oW9uPr2AhXEhf0HHfgNC-YQ9QF6BAgDEAE#imgrc=X_BrNWU_72e_nM`
    )
      .then((res) => res.json())
      .then((data) => console.log("DATA", data));
  };

  React.useEffect(() => {
    toDataURL(DummyCardImage).then((image) => setbase64Image(image));
    // addWatermark(base64Image)
  }, []);

  const downloadImage = () => {
    saveAs(require(`../../models/${state.foldername}/${state.image}`), 'image.jpg') // Put your image url here.
  }

  const checkIfImageDownloadedOrNot = () => {
    var hours = 24; // to clear the localStorage after 1 hour
    // (if someone want to clear after 8hrs simply change hours=8)
    var now = new Date().getTime();
    var setupTime = localStorage.getItem('setupTime');
    if (setupTime == null) {
      localStorage.setItem('setupTime', now)
    } else {
      if (now - setupTime > hours * 60 * 60 * 1000) {
        localStorage.removeItem("imageDownloadedToday")
        localStorage.setItem('setupTime', now);
      }
    }
  }

  React.useState(() => {
    checkIfImageDownloadedOrNot();
  }, [new Date().getTime()])

  console.log('base64Image', base64Image)


  const publishableKey = 'pk_test_51KAs34JBPfp3exDP5KZ00E3s265wlWQ2O3pKoxEWxuOhzpsfVTqZ3qPMgtLweUqwbmabFS1xrTboUY6MxEAMsBOG00pmyBOyR8';

  const priceForStripe = product.price * 100;

  const payNow = async token => {
    try {
      const response = await axios({
        url: 'http://localhost:5000/payment',
        method: 'post',
        data: {
          amount: product.price * 100,
          token,
        },
      });
      if (response.status === 200) {
        // handleSuccess();
        console.log("SUCCESSFULL")
        downloadImage();
      }
    } catch (error) {
      // handleFailure();
      console.log("FAILURE")
      notifyError("Transaction Failed!")
      console.log(error);
    }
  };

  return (
    <div className={styles.pageContainer}>
      <ToastContainer />
      <div className={styles.contentContainer}>
        {openCheckoutPopUp && (
          <>
            {" "}
            <div className={styles.dullWrapper}></div>
            <CheckoutPopUp setOpenCheckoutPopUp={setOpenCheckoutPopUp} />
          </>
        )}
        <Navbar />
        <div className={styles.imageDetailsContainer}>
          <div
            onContextMenu={(e) => e.preventDefault()}
            className={styles.leftSide}
          >
            <div className={styles.imageWrapper}></div>
            <img src={require(`../../models/${state.foldername}/${state.image}`)} alt="image_" />
            {/* <img src={`https://quickchart.io/watermark?mainImageUrl=https%3A%2F%2Fupload.wikimedia.org%2Fwikipedia%2Fcommons%2F6%2F6e%2FGolde33443.jpg&markImageUrl=https%3A%2F%2F1000logos.net%2Fwp-content%2Fuploads%2F2016%2F10%2FBatman-logo.png&markRatio=0.25`} alt="image_" /> */}
          </div>
          <div className={styles.rightSide}>
            <div className={styles.titleAndPrice}>
              <p className={styles.title}>AI Generated Art # {state?.image.replace(".png", "")}</p>
              {/* <p className={styles.price}>$ - 0.5</p> */}
            </div>
            <p className={styles.details}>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book
            </p>
            {

              !userLoggedIn ? <button onClick={() => navigate("/auth")} className={styles.buyButton}>
                Login to Download
              </button> : JSON.parse(localStorage.getItem("imageDownloadedToday")) === true ? <StripeCheckout stripeKey={publishableKey}
                label="Pay Now"
                name="Pay With Credit Card"
                // billingAddress
                // shippingAddress
                amount={priceForStripe}
                description={`Your total is $${product.price}`}
                token={payNow}
              /> :
                <button
                  onClick={() => {
                    console.log("AWRQ", JSON.parse(localStorage.getItem("imageDownloadedToday")))
                    if (JSON.parse(localStorage.getItem("imageDownloadedToday")) === true) {
                      // setOpenCheckoutPopUp(true)
                    } else {
                      downloadImage();
                      localStorage.setItem("imageDownloadedToday", true)
                    }
                  }}
                  className={styles.buyButton}
                >
                  Download
                </button>
            }
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ItemsDetail;
