import React from "react";
import styles from "./cardscontainer.module.css";
import ImageCard from "../ImageCard/ImageCard";
import { Link } from "react-router-dom";
import DummyCardImage from "../../assets/images/dummyimage.png";
import axios from "axios";
import RingLoader from "react-spinners/RingLoader";
import { notifyError } from "../../utils";

const CardsContainer = () => {

  const [data, setData] = React.useState(JSON.parse(localStorage.getItem('data')) ? JSON.parse(localStorage.getItem('data')) : null)
  const [requestProcess, setRequestProcess] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const fetchArt = () => {
    if (!requestProcess) {
      try {
        console.log("requestProcess1", requestProcess)
        setRequestProcess(true)
        setLoading(true)
        axios.post("http://127.0.0.1:8000/").then(res => {
          console.log('res', res)
          setData(res?.data)
          localStorage.setItem('data', JSON.stringify(res?.data))
          setRequestProcess(false)
          console.log("requestProcess2", requestProcess)
          setLoading(false)
        }).catch(err1 => {
          console.log("err1", err1)
          notifyError("Something Went Wrong!")
          setLoading(false)
          setRequestProcess(false)
        })
      } catch (err2) {
        console.log("err2", err2)
        notifyError("Something Went Wrong!")
        setLoading(false)
        setRequestProcess(false)
      }
    }
  }
  console.log("LOCAL_DATA", data)
  // data && console.log("IMAGENAMA", require("../../models/" + data?.foldername + "/" + data?.imagename[0]))
  return (
    <div className={styles.cardsContainer}>
      <div className={styles.btnAndLoaderContainer}>
        {
          !requestProcess && <button className={styles.generateArtBtn} onClick={fetchArt}> Generate NFT's </button>
        }
        {
          loading && <div className={styles.loaderContainer}>
            <RingLoader
              color="white"
              size={150}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
            <p className={styles.loaderText}>Generating Art through AI...</p>
          </div>
        }
      </div>
      {
        !loading && <div className={styles.cardsWrapper}>
          {/* {data && data?.imagename.map(image => <img src={require(`../../models/${data.foldername}/${image}`)} />)} */}
          {data && data.imagename.length > 0 && data.imagename.map(image => <ImageCard foldername={data.foldername} image={image} />)}
        </div>
      }
    </div>
  );
};

export default CardsContainer;
