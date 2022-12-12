import React from "react";
import styles from "./checkoutpopup.module.css";
import DummyCardImage from "../../assets/images/dummyimage.png";

const CheckoutPopUp = ({ setOpenCheckoutPopUp }) => {
  return (
    <div className={styles.popUpContainer}>
      <p className={styles.popUpHead}>Check Out</p>
      <div className={styles.row}>
        <span>Item</span>
        <span>Subtotal</span>
      </div>
      <div className={styles.row}>
        <div className={styles.rowLeft}>
          <div className={styles.itemAndDetails}>
            <img src={DummyCardImage} alt="image_" />
          </div>
          <div className={styles.imageDetails}>
            <p className={styles.primaryText}>Mia Ayana</p>
            <p className={styles.secondaryText}>Abstact Smoke Red Blue</p>
          </div>
        </div>
        <div className={styles.rowRight}>
          <p>$ - 0.5</p>
        </div>
      </div>
      <div className={styles.row}>
        <span>Total</span>
        <span>$ - 0.5</span>
      </div>
      <div className={styles.buttonsContainer}>
        <button className={styles.checkoutButton}>Checkout</button>
        <button
          onClick={() => setOpenCheckoutPopUp(false)}
          className={styles.cancelButton}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default CheckoutPopUp;
