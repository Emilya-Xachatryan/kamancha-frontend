import { useState } from "react";
import styles from "./SavedCard.module.css";

function SavedCard({ card, onDelete, onEdit, show3DCard = true }) {
  const [flipped, setFlipped] = useState(false);

  if (!card || !show3DCard) {
    return null;
  }

  const handleFlip = () => {
    setFlipped((previous) => !previous);
  };

  return (
    <section className={styles.wrapper}>
      <h3 className={styles.heading}>Իմ պահպանված քարտը</h3>

      <div className={styles.cardScene}>
        <div
          className={`${styles.card} ${flipped ? styles.flipped : ""}`}
          onClick={handleFlip}
          role="button"
          tabIndex={0}
          onKeyDown={(event) => {
            if (event.key === "Enter" || event.key === " ") {
              event.preventDefault();
              handleFlip();
            }
          }}
          aria-label="Սեղմիր քարտը՝ այն շրջելու համար"
        >
          <div className={`${styles.face} ${styles.front}`}>
            <div className={styles.top}>
              <span className={styles.brand}>
                {card.bankName || "KAMANCHA"}
              </span>
              <span className={styles.contactless}>)))</span>
            </div>

            <div className={styles.chip} />

            <div className={styles.cardNumber}>
              •••• &nbsp; •••• &nbsp; •••• &nbsp; {card.lastFour}
            </div>

            <div className={styles.bottom}>
              <div className={styles.holder}>
                <span className={styles.label}>ՔԱՐՏԱՊԱՆ</span>
                <span>{card.cardHolder}</span>
              </div>

              <div className={styles.expiry}>
                <span className={styles.label}>ԺԱՄԿԵՏ</span>
                <span>{card.expiry}</span>
              </div>
            </div>

            <div className={styles.cardDecor} />
          </div>

          <div className={`${styles.face} ${styles.back}`}>
            <div className={styles.backTop}>
              {card.bankName || "KAMANCHA"}
            </div>

            <div className={styles.magneticStripe} />

            <div className={styles.signatureRow}>
              <div className={styles.signatureBlock}>
                <span className={styles.label}>ՔԱՐՏԱՊԱՆ</span>
                <div className={styles.signature}>
                  {card.cardHolder}
                </div>
              </div>

              <div className={styles.cvvBlock}>
                <span className={styles.label}>CVV</span>
                <div className={styles.cvvDots}>•••</div>
              </div>
            </div>

            <div className={styles.backBottom}>
              Քարտի համարն ավարտվում է {card.lastFour}-ով
            </div>
          </div>
        </div>
      </div>

      <p className={styles.flipHint}>
        Սեղմիր քարտի վրա՝ այն շրջելու համար
      </p>

      <p className={styles.savedMessage}>
        ✓ Քարտի տվյալները պահպանված են
      </p>

      <div className={styles.actions}>
        <button
          type="button"
          className={styles.changeButton}
          onClick={onEdit}
        >
          Փոխել քարտը
        </button>

        <button
          type="button"
          className={styles.deleteButton}
          onClick={onDelete}
        >
          Ջնջել քարտը
        </button>
      </div>
    </section>
  );
}

export default SavedCard;
