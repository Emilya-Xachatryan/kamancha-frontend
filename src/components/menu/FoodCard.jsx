import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useFavorites } from "../../context/FavoritesContext";

import menuData from "../../data/menuData";
import styles from "./FoodCard.module.css";

function FoodCard({ category }) {
  const { toggleFavorite, isFavorite } = useFavorites();

  const filteredProducts =
    category === "All"
      ? menuData
      : menuData.filter(
          (product) => product.category === category
        );

  return (
    <section className={styles.foodSection}>
      <div className={styles.foodGrid}>
        {filteredProducts.map((product, index) => {
          const favorite = isFavorite(product.id);

          return (
            <article
              className={styles.card}
              key={product.id}
              style={{
                "--card-index": index % 4,
              }}
            >
              <div className={styles.imageWrapper}>
                <img
                  src={product.image}
                  alt={product.name}
                  className={styles.image}
                  loading={index < 4 ? "eager" : "lazy"}
                  decoding="async"
                  fetchPriority={index === 0 ? "high" : "auto"}
                />

                <button
                  type="button"
                  className={`${styles.favoriteBtn} ${
                    favorite ? styles.active : ""
                  }`}
                  onClick={() => toggleFavorite(product)}
                  aria-label={
                    favorite
                      ? "Հեռացնել ընտրյալներից"
                      : "Ավելացնել ընտրյալների մեջ"
                  }
                >
                  {favorite ? <FaHeart /> : <FaRegHeart />}
                </button>
              </div>

              <div className={styles.content}>
                <h3>{product.name}</h3>

                <p className={styles.description}>
                  {product.description}
                </p>

                <div className={styles.bottom}>
                  <span className={styles.price}>
                    {product.price} ֏
                  </span>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

export default FoodCard;