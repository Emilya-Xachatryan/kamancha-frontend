import {
  FaShoppingCart,
  FaMinus,
  FaPlus,
  FaTrash,
} from "react-icons/fa";

import { useCart } from "../context/CartContext";

import { useNavigate } from "react-router-dom";

import styles from "./Cart.module.css";

function Cart() {
  const {
    cart,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    cartTotal,
  } = useCart();

  const navigate = useNavigate();

  return (
    <section className={styles.cart}>
      <div className={styles.container}>

        <div className={styles.header}>
          <span className={styles.icon}>
            <FaShoppingCart />
          </span>

          <h1>Իմ զամբյուղը</h1>

          <p>
            Ձեր ընտրած ուտեստները՝ մեկ վայրում
          </p>
        </div>

        {cart.length === 0 ? (
          <div className={styles.empty}>
            <div className={styles.emptyIcon}>
              <FaShoppingCart />
            </div>

            <h2>Ձեր զամբյուղը դատարկ է</h2>

            <p>
              Ավելացրեք ձեր նախընտրած ուտեստները
              զամբյուղում՝ պատվեր կատարելու համար։
            </p>
          </div>
        ) : (
          <div className={styles.content}>

            <div className={styles.products}>
              {cart.map((product) => {

                const productTotal =
                  product.price * product.quantity;

                return (
                  <article
                    className={styles.card}
                    key={product.id}
                  >

                    <img
                      className={styles.image}
                      src={product.image}
                      alt={product.name}
                    />

                    <div className={styles.info}>

                      <h3>{product.name}</h3>

                      <p className={styles.description}>
                        {product.description}
                      </p>

                      <span className={styles.price}>
                        {product.price} ֏
                      </span>

                    </div>

                    <div className={styles.quantity}>

                      <button
                        type="button"
                        onClick={() =>
                          decreaseQuantity(product.id)
                        }
                      >
                        <FaMinus />
                      </button>

                      <span>
                        {product.quantity}
                      </span>

                      <button
                        type="button"
                        onClick={() =>
                          increaseQuantity(product.id)
                        }
                      >
                        <FaPlus />
                      </button>

                    </div>

                    <div className={styles.total}>
                      <span>
                        {productTotal} ֏
                      </span>

                      <button
                        type="button"
                        className={styles.delete}
                        onClick={() =>
                          removeFromCart(product.id)
                        }
                        title="Հեռացնել"
                      >
                        <FaTrash />
                      </button>
                    </div>

                  </article>
                );
              })}
            </div>

            <div className={styles.summary}>

              <div className={styles.summaryRow}>
                <span>Ընդհանուր</span>

                <strong>
                  {cartTotal} ֏
                </strong>
              </div>

              <button
                type="button"
                className={styles.deliveryButton}
                onClick={() => navigate("/delivery")}
              >
                Անցնել առաքման
              </button>

            </div>

          </div>
        )}

      </div>
    </section>
  );
}

export default Cart;