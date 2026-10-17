
import { Link, useSearchParams } from "react-router-dom";
import styles from "./ActivationResult.module.css";

function ActivationResult() {
  const [searchParams] = useSearchParams();
  const status = searchParams.get("status");
  const success = status === "success";

  return (
    <main className={styles.page}>
      <section className={styles.card}>
        <div className={success ? styles.successIcon : styles.errorIcon}>
          {success ? "✓" : "!"}
        </div>

        <h1>
          {success ? "Հաշիվն ակտիվացված է" : "Ակտիվացումը չհաջողվեց"}
        </h1>

        <p>
          {success
            ? "Շնորհավորում ենք։ Այժմ կարող ես մուտք գործել քո հաշիվ։"
            : "Հղումը կարող է սխալ լինել կամ այլևս վավեր չլինել։ Փորձիր կրկին։"}
        </p>

        <Link
          to={success ? "/login" : "/registration"}
          className={styles.button}
        >
          {success ? "Մուտք գործել" : "Գրանցման էջ"}
        </Link>

        <Link to="/" className={styles.homeLink}>
          Վերադառնալ գլխավոր էջ
        </Link>
      </section>
    </main>
  );
}

export default ActivationResult;
