import { useEffect, useState } from "react";

import styles from "./SavedCard.module.css";

function SavedCard({ card, onDelete }) {
  const [flipped, setFlipped] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFlipped(true);
    }, 3500);

    return () => clearTimeout(timer);
  }, []);

  const handleFlip = () => {
    setFlipped((prev) => !prev);
  };

  return (
    <div className={styles.wrapper}>

      <div
        className={`${styles.card} ${
          flipped ? styles.flipped : ""
        }`}
        onClick={handleFlip}
      >

        <div className={`${styles.face} ${styles.front}`}>

          <div className={styles.top}>
            <span className={styles.chip}></span>

            <span className={styles.bank}>
              {card.bankName}
            </span>
          </div>

          <div className={styles.cardNumber}>
            •••• •••• •••• {card.lastFour}
          </div>

          <div className={styles.bottom}>

            <div>
              <span className={styles.label}>
                CARD HOLDER
              </span>

              <strong>
                {card.cardHolder}
              </strong>
            </div>

            <div>
              <span className={styles.label}>
                VALID THRU
              </span>

              <strong>{card.expiry}</strong>
            </div>

          </div>

          <span className={styles.visa}>
            VISA
          </span>

        </div>

        <div className={`${styles.face} ${styles.back}`}>

          <div className={styles.blackStrip}></div>

          <div className={styles.signature}>
            <span>AUTHORIZED SIGNATURE</span>

            <div>
              <span>••••••••••••••</span>
              <strong>{card.cvv}</strong>
            </div>
          </div>

          <p>
            This card is protected and belongs
            to the registered customer.
          </p>

          <span className={styles.visa}>
            VISA
          </span>

        </div>

      </div>

      <div className={styles.info}>
        <span>
          Սեղմեք քարտի վրա՝ շրջելու համար
        </span>

        <button
          type="button"
          onClick={onDelete}
        >
          Փոխել քարտը
        </button>
      </div>

    </div>
  );
}

export default SavedCard;