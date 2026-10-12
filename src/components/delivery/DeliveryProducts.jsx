import { useCart } from "../../context/CartContext";

import styles from "./DeliveryProducts.module.css";

function DeliveryProducts() {
  const { cart, cartTotal } = useCart();

  return (
    <section className={styles.products}>

      <div className={styles.title}>
        <span>01</span>

        <div>
          <h2>Ձեր պատվերը</h2>
          <p>{cart.length} ապրանք</p>
        </div>
      </div>

      <div className={styles.list}>
        {cart.map((product) => (
          <article
            className={styles.product}
            key={product.id}
          >
            <div className={styles.imageWrapper}>
              <img
                src={product.image}
                alt={product.name}
              />
            </div>

            <div className={styles.info}>
              <h3>{product.name}</h3>

              <p>
                {product.quantity} × {product.price} ֏
              </p>
            </div>

            <strong>
              {product.price * product.quantity} ֏
            </strong>
          </article>
        ))}
      </div>

      <div className={styles.summary}>
        <span>Ընդհանուր</span>
        <strong>{cartTotal} ֏</strong>
      </div>

    </section>
  );
}

export default DeliveryProducts;