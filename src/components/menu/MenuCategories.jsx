import styles from "./MenuCategories.module.css";

function MenuCategories({ category, setCategory }) {
  return (
    <section className={styles.categories}>
      <div className={styles.container}>

        <h2 className={styles.title}>Մեր Մենյուն</h2>

        <p className={styles.subtitle}>
          Ընտրեք բաժինը
        </p>

        <div className={styles.buttons}>

          <button
            className={category === "All" ? styles.active : ""}
            onClick={() => setCategory("All")}
          >
            Բոլորը
          </button>

          <button
            className={category === "Pide" ? styles.active : ""}
            onClick={() => setCategory("Pide")}
          >
            🍕 Փիդե
          </button>

          <button
            className={category === "BBQ" ? styles.active : ""}
            onClick={() => setCategory("BBQ")}
          >
            🥩 Խորոված
          </button>

          <button
            className={category === "Salad" ? styles.active : ""}
            onClick={() => setCategory("Salad")}
          >
            🥗 Աղցաններ
          </button>

          <button
            className={category === "Drink" ? styles.active : ""}
            onClick={() => setCategory("Drink")}
          >
            🥤 Խմիչքներ
          </button>

          <button
            className={category === "Dessert" ? styles.active : ""}
            onClick={() => setCategory("Dessert")}
          >
            🍰 Աղանդեր
          </button>

        </div>

      </div>
    </section>
  );
}

export default MenuCategories;