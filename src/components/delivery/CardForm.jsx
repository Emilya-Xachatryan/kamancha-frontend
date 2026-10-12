import { useState } from "react";
import styles from "./CardForm.module.css";

function CardForm({ onSave, onCancel, hasSavedCard }) {
  const [cardNumber, setCardNumber] = useState("");
  const [bankName, setBankName] = useState("");
  const [cardHolder, setCardHolder] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [error, setError] = useState("");

  const handleCardNumberChange = (event) => {
    const value = event.target.value
      .replace(/\D/g, "")
      .slice(0, 16);

    setCardNumber(value);
    setError("");
  };

  const handleExpiryChange = (event) => {
    let value = event.target.value.replace(/\D/g, "").slice(0, 4);

    if (value.length > 2) {
      value = `${value.slice(0, 2)}/${value.slice(2)}`;
    }

    setExpiry(value);
    setError("");
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const cleanCardNumber = cardNumber.replace(/\s/g, "");

    if (cleanCardNumber.length !== 16) {
      setError("Մուտքագրիր քարտի 16 նիշանոց համարը։");
      return;
    }

    if (!bankName.trim()) {
      setError("Մուտքագրիր բանկի անունը։");
      return;
    }

    if (cardHolder.trim().length < 2) {
      setError("Մուտքագրիր քարտապանի անունը։");
      return;
    }

    if (!/^\d{2}\/\d{2}$/.test(expiry)) {
      setError("Ամսաթիվը լրացրու MM/YY ձևաչափով։");
      return;
    }

    const [month, year] = expiry.split("/").map(Number);

    if (month < 1 || month > 12) {
      setError("Մուտքագրիր վավեր ամիս։");
      return;
    }

    const currentDate = new Date();
    const currentYear = currentDate.getFullYear() % 100;
    const currentMonth = currentDate.getMonth() + 1;

    if (
      year < currentYear ||
      (year === currentYear && month < currentMonth)
    ) {
      setError("Քարտի ժամկետը լրացած է։");
      return;
    }

    if (!/^\d{3,4}$/.test(cvv)) {
      setError("CVV-ն պետք է պարունակի 3 կամ 4 նիշ։");
      return;
    }

    // Պահպանում ենք միայն քարտի ցուցադրման համար անհրաժեշտ տվյալները։
    // Քարտի ամբողջ համարը և CVV-ն չեն պահպանվում։
    onSave({
      bankName: bankName.trim(),
      cardHolder: cardHolder.trim().toUpperCase(),
      lastFour: cleanCardNumber.slice(-4),
      expiry,
    });
  };

  return (
    <div className={styles.cardFormWrapper}>
      <h3 className={styles.formTitle}>
        {hasSavedCard ? "Փոխել քարտի տվյալները" : "Ավելացնել քարտ"}
      </h3>

      <p className={styles.formDescription}>
        Լրացրու տվյալները՝ քարտի ձևավորումը պահպանելու համար։
      </p>

      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.inputGroup}>
          <label htmlFor="cardNumber">Քարտի համար</label>
          <input
            id="cardNumber"
            type="text"
            inputMode="numeric"
            autoComplete="off"
            placeholder="1234 5678 9012 3456"
            value={cardNumber}
            onChange={handleCardNumberChange}
            maxLength={16}
            required
          />
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="bankName">Բանկի անունը</label>
          <input
            id="bankName"
            type="text"
            placeholder="Օրինակ՝ Ameriabank"
            value={bankName}
            onChange={(event) => {
              setBankName(event.target.value);
              setError("");
            }}
            required
          />
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="cardHolder">Քարտապանի անունը</label>
          <input
            id="cardHolder"
            type="text"
            autoComplete="off"
            placeholder="ԱՆՈՒՆ ԱԶԳԱՆՈՒՆ"
            value={cardHolder}
            onChange={(event) => {
              setCardHolder(event.target.value);
              setError("");
            }}
            required
          />
        </div>

        <div className={styles.row}>
          <div className={styles.inputGroup}>
            <label htmlFor="expiry">Ժամկետը</label>
            <input
              id="expiry"
              type="text"
              inputMode="numeric"
              autoComplete="off"
              placeholder="MM/YY"
              value={expiry}
              onChange={handleExpiryChange}
              maxLength={5}
              required
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="cvv">CVV</label>
            <input
              id="cvv"
              type="password"
              inputMode="numeric"
              autoComplete="new-password"
              placeholder="•••"
              value={cvv}
              onChange={(event) => {
                setCvv(
                  event.target.value.replace(/\D/g, "").slice(0, 4)
                );
                setError("");
              }}
              maxLength={4}
              required
            />
          </div>
        </div>

        {error && (
          <p className={styles.errorMessage} role="alert">
            {error}
          </p>
        )}

        <button className={styles.saveButton} type="submit">
          Պահպանել քարտը <span>→</span>
        </button>

        {onCancel && (
          <button
            className={styles.cancelButton}
            type="button"
            onClick={onCancel}
          >
            Չեղարկել
          </button>
        )}
      </form>
    </div>
  );
}

export default CardForm;