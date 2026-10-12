import { FaHeart, FaTrash, FaShoppingCart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import { useFavorites } from "../context/FavoritesContext";
import { useCart } from "../context/CartContext";

import styles from "./Favorites.module.css";

function Favorites() {
  const { favorites, removeFavorite } = useFavorites();
  const { addToCart } = useCart();

  const navigate = useNavigate();

  return (
    <section className={styles.favorites}>
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.icon}>
            <FaHeart />
          </span>

          <h1>Իմ սիրելի ուտեստները</h1>

          <p className={styles.text} >Ձեր ընտրած ուտեստները՝ մեկ վայրում</p>
        </div>

        {favorites.length === 0 ? (
          <div className={styles.empty}>
            <div className={styles.emptyIcon}>
              <FaHeart />
            </div>

            <h2>Ձեր սիրելի ուտեստները դեռ այստեղ չեն</h2>

            <p>
              Մենյուից սեղմեք սրտիկի վրա,
              որպեսզի ձեր նախընտրած ուտեստները
              պահպանվեն այստեղ։
            </p>
          </div>
        ) : (
          <>
            <div className={styles.count}>
              <span>{favorites.length}</span>

              {favorites.length === 1
                ? " սիրելի ուտեստ"
                : " սիրելի ուտեստներ"}
            </div>

            <div className={styles.grid}>
              {favorites.map((product) => (
                <article
                  className={styles.card}
                  key={product.id}
                >
                  <div className={styles.imageWrapper}>
                    <img
                      src={product.image}
                      alt={product.name}
                    />

                    <div className={styles.favoriteIcon}>
                      <FaHeart />
                    </div>
                  </div>

                  <div className={styles.content}>
                    <h3>{product.name}</h3>

                    <p className={styles.description}>
                      {product.description}
                    </p>

                    <div className={styles.footer}>
                      <span className={styles.price}>
                        {product.price} ֏
                      </span>

                      <div className={styles.actions}>
                        <button
                          type="button"
                          className={styles.cartButton}
                          onClick={() => {
                            addToCart(product);
                            navigate("/cart");
                          }}
                          title="Ավելացնել զամբյուղ"
                        >
                          <FaShoppingCart />
                        </button>

                        <button
                          type="button"
                          className={styles.removeButton}
                          onClick={() =>
                            removeFavorite(product.id)
                          }
                          title="Հեռացնել"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}

export default Favorites;