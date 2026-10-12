import { useState } from "react";
import { useParams, Link } from "react-router-dom";

import menuData from "../data/menuData";

import styles from "./ProductDetalis.module.css";

import { FaStar, FaShoppingCart } from "react-icons/fa";

function ProductDetails() {
  const { slug } = useParams();

  const product = menuData.find(
    (item) => item.slug === slug
  );

  const [quantity, setQuantity] = useState(1);

  const [activeImage, setActiveImage] = useState(
    product?.image
  );

  if (!product) {
    return (
      <section className={styles.notFound}>
        <h2>Ապրանքը չի գտնվել։</h2>

        <Link to="/menu">
          Վերադառնալ մենյու
        </Link>
      </section>
    );
  }

  // Նման ուտեստներ
  const relatedProducts = menuData.filter(
    (item) =>
      item.category === product.category &&
      item.slug !== product.slug
  );

  // Ընդհանուր գին
  const totalPrice = product.price * quantity;

  return (
    <section className={styles.details}>
      <div className="container">

        <div className={styles.wrapper}>

          {/* =========================
              LEFT - IMAGE
          ========================= */}

          <div className={styles.imageSide}>

            <img
              src={activeImage}
              alt={product.name}
            />

            {/* Gallery */}

            <div className={styles.gallery}>

              {product.images?.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`${product.name} ${index + 1}`}
                  onClick={() => setActiveImage(img)}
                />
              ))}

            </div>

          </div>

          {/* =========================
              RIGHT - CONTENT
          ========================= */}

          <div className={styles.content}>

            {/* Rating */}

            <div className={styles.rating}>

              <FaStar />

              <span>
                {product.rating}
              </span>

            </div>

            {/* Name */}

            <h1>
              {product.name}
            </h1>

            {/* Description */}

            <p className={styles.description}>
              {product.description}
            </p>

            {/* Price */}

            <h2 className={styles.price}>
              {totalPrice.toLocaleString()} ֏
            </h2>

            {/* Quantity */}

            <div className={styles.quantity}>

              <button
                type="button"
                onClick={() => {
                  if (quantity > 1) {
                    setQuantity(quantity - 1);
                  }
                }}
              >
                -
              </button>

              <span>
                {quantity}
              </span>

              <button
                type="button"
                onClick={() =>
                  setQuantity(quantity + 1)
                }
              >
                +
              </button>

            </div>

            {/* Ingredients */}

            <h3>
              Բաղադրիչներ
            </h3>

            <ul className={styles.ingredients}>

              <li>
                ✔ Թարմ բաղադրիչներ
              </li>

              <li>
                ✔ Բարձր որակի պանիր
              </li>

              <li>
                ✔ Հայկական համեմունքներ
              </li>

              <li>
                ✔ Թխված քարե վառարանում
              </li>

            </ul>

            {/* Add to cart */}

            <button
              type="button"
              className={styles.button}
            >
              <FaShoppingCart />

              Ավելացնել զամբյուղ
            </button>

          </div>

        </div>

        {/* =========================
            RELATED PRODUCTS
        ========================= */}

        <div className={styles.related}>

          <h2>
            Նման ուտեստներ
          </h2>

          <div className={styles.relatedGrid}>

            {relatedProducts.map((item) => (

              <Link
                to={`/menu/${item.slug}`}
                className={styles.card}
                key={item.slug}
              >

                <img
                  src={item.image}
                  alt={item.name}
                />

                <h3>
                  {item.name}
                </h3>

                <p>
                  {item.price.toLocaleString()} ֏
                </p>

              </Link>

            ))}

          </div>

        </div>

      </div>
    </section>
  );
}

export default ProductDetails;