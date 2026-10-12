import { useState } from "react";
import styles from "./CardForm.module.css";

function CardForm({ onSave, onCancel, hasSavedCard }) {
  const [cardNumber, setCardNumber] = useState("");
  const [bankName, setBankName] = useState("");
  const [cardHolder, setCardHolder] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");

  const formatCardNumber = (value) => {
    const numbers = value.replace(/\D/g, "").slice(0, 16);

    return numbers.replace(/(.{4})/g, "$1 ").trim();
  };

  const formatExpiry = (value) => {
    const numbers = value.replace(/\D/g, "").slice(0, 4);

    if (numbers.length > 2) {
      return `${numbers.slice(0, 2)}/${numbers.slice(2)}`;
    }

    return numbers;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (
      !cardNumber ||
      !bankName.trim() ||
      !cardHolder.trim() ||
      !expiry ||
      !cvv
    ) {
      return;
    }

    const numbers = cardNumber.replace(/\s/g, "");

    if (numbers.length !== 16 || cvv.length !== 3) {
      return;
    }

    const cardData = {
      bankName: bankName.trim(),
      cardHolder: cardHolder.trim().toUpperCase(),
      lastFour: numbers.slice(-4),
      expiry,
    };

    // Պահպանում ենք միայն անվտանգ ցուցադրման տվյալները։
    // CVV-ն և քարտի ամբողջական համարը չենք պահպանում։
    onSave(cardData);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.inputGroup}>
        <label htmlFor="card-number">Քարտի համար</label>

        <input
          id="card-number"
          type="text"
          value={cardNumber}
          onChange={(event) =>
            setCardNumber(formatCardNumber(event.target.value))
          }
          placeholder="0000 0000 0000 0000"
          inputMode="numeric"
          autoComplete="cc-number"
          maxLength={19}
          required
        />
      </div>

      <div className={styles.inputGroup}>
        <label htmlFor="bank-name">Բանկի անուն</label>

        <input
          id="bank-name"
          type="text"
          value={bankName}
          onChange={(event) => setBankName(event.target.value)}
          placeholder="Օր․ Ameria Bank"
          required
        />
      </div>

      <div className={styles.inputGroup}>
        <label htmlFor="card-holder">Անուն Ազգանուն</label>

        <input
          id="card-holder"
          type="text"
          value={cardHolder}
          onChange={(event) => setCardHolder(event.target.value)}
          placeholder="Անուն Ազգանուն"
          autoComplete="cc-name"
          required
        />
      </div>

      <div className={styles.row}>
        <div className={styles.inputGroup}>
          <label htmlFor="card-expiry">Վավերականության ժամկետ</label>

          <input
            id="card-expiry"
            type="text"
            value={expiry}
            onChange={(event) =>
              setExpiry(formatExpiry(event.target.value))
            }
            placeholder="MM/YY"
            inputMode="numeric"
            autoComplete="cc-exp"
            maxLength={5}
            required
          />
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="card-cvv">CVV</label>

          <input
            id="card-cvv"
            type="password"
            value={cvv}
            onChange={(event) =>
              setCvv(
                event.target.value.replace(/\D/g, "").slice(0, 3)
              )
            }
            placeholder="•••"
            inputMode="numeric"
            autoComplete="cc-csc"
            maxLength={3}
            required
          />
        </div>
      </div>

      <button type="submit" className={styles.saveButton}>
        Պահպանել քարտը
      </button>

      {hasSavedCard && (
        <button
          type="button"
          className={styles.cancelButton}
          onClick={onCancel}
        >
          Չեղարկել
        </button>
      )}
    </form>
  );
}

export default CardForm;
