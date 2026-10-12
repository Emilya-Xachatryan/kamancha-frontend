import { useEffect, useState } from "react";

import { useCart } from "../context/CartContext";

import DeliveryProducts from "../components/delivery/DeliveryProducts";
import CardForm from "../components/delivery/CardForm";
import SavedCard from "../components/delivery/SavedCard";

import styles from "./Delivery.module.css";

const API_URL = "http://localhost:5000";

function Delivery() {
  const { cart, cartTotal, clearCart } = useCart();

  const [savedCard, setSavedCard] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const [isOrdering, setIsOrdering] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [orderId, setOrderId] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  const [customer, setCustomer] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    notes: "",
  });

  useEffect(() => {
    try {
      const card = localStorage.getItem("savedCard");

      if (card) {
        setSavedCard(JSON.parse(card));
      }
    } catch (error) {
      console.error("Քարտի տվյալները կարդալու սխալ:", error);
    }
  }, []);

  const handleCustomerChange = (event) => {
    const { name, value } = event.target;

    setCustomer((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const saveCard = (cardData) => {
    // Պահպանում ենք միայն ցուցադրման համար անհրաժեշտ տվյալները։
    // CVV և քարտի ամբողջական համարը չենք պահպանում։
    const safeCardData = {
      bankName: cardData.bankName,
      cardHolder: cardData.cardHolder,
      lastFour: cardData.lastFour,
      expiry: cardData.expiry,
    };

    localStorage.setItem(
      "savedCard",
      JSON.stringify(safeCardData)
    );

    setSavedCard(safeCardData);
    setShowForm(false);
  };

  const deleteCard = () => {
    localStorage.removeItem("savedCard");
    setSavedCard(null);
    setShowForm(true);
  };

  const handleOrder = async (event) => {
    event.preventDefault();

    if (isOrdering || orderSuccess) {
      return;
    }

    setErrorMessage("");

    if (cart.length === 0) {
      setErrorMessage("Ձեր զամբյուղը դատարկ է։");
      return;
    }

    if (
      !customer.name.trim() ||
      !customer.phone.trim() ||
      !customer.address.trim()
    ) {
      setErrorMessage(
        "Խնդրում ենք լրացնել անունը, հեռախոսահամարը և հասցեն։"
      );
      return;
    }

    const invalidItems = cart.some(
      (product) =>
        !Number.isInteger(Number(product.id)) ||
        !Number.isInteger(Number(product.quantity)) ||
        Number(product.quantity) < 1
    );

    if (invalidItems) {
      setErrorMessage(
        "Զամբյուղում ապրանքի տվյալները սխալ են։ Խնդրում ենք ստուգել զամբյուղը։"
      );
      return;
    }

    setIsOrdering(true);

    try {
      const orderData = {
        customer: {
          name: customer.name.trim(),
          phone: customer.phone.trim(),
          email: customer.email.trim(),
          address: customer.address.trim(),
          notes: customer.notes.trim(),
        },

        items: cart.map((product) => ({
          id: Number(product.id),
          quantity: Number(product.quantity),
        })),
      };

      const response = await fetch(`${API_URL}/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(
          data.message || "Չհաջողվեց գրանցել պատվերը։"
        );
      }

      setOrderId(data.order?.id ?? null);
      setOrderSuccess(true);
      clearCart();
    } catch (error) {
      console.error("Պատվերի գրանցման սխալ:", error);

      setErrorMessage(
        error.message === "Failed to fetch"
          ? "Չհաջողվեց կապ հաստատել սերվերի հետ։ Ստուգեք backend-ի աշխատանքը։"
          : error.message || "Պատվերի գրանցման ժամանակ սխալ առաջացավ։"
      );
    } finally {
      setIsOrdering(false);
    }
  };

  if (orderSuccess) {
    return (
      <main className={styles.delivery}>
        <div className={styles.successContainer}>
          <div className={styles.successCircle}>
            <span>✓</span>
          </div>

          <div className={styles.successLine}></div>

          <h1>Պատվերը գրանցվեց</h1>

          <p>
            Ձեր պատվերը հաջողությամբ ընդունվել է։
            <br />
            Շնորհակալություն մեր ընտրության համար։
          </p>

          {orderId !== null && (
            <div className={styles.successDetails}>
              <span>Պատվերի համար</span>
              <strong>#{orderId}</strong>
            </div>
          )}

          <div className={styles.successDetails}>
            <span>Պատվերի կարգավիճակ</span>
            <strong>Ընդունված ✓</strong>
          </div>

          <div className={styles.successDecor}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </main>
    );
  }

  if (cart.length === 0) {
    return (
      <main className={styles.delivery}>
        <div className={styles.empty}>
          <div className={styles.emptyIcon}>✦</div>

          <h1>Ձեր զամբյուղը դատարկ է</h1>

          <p>
            Առաքման համար նախ ավելացրեք ուտեստներ
            զամբյուղում։
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className={styles.delivery}>
      <div className={styles.container}>
        <header className={styles.header}>
          <span>✦</span>

          <h1>Պատվերի ձևակերպում</h1>

          <p>
            Լրացրեք առաքման տվյալները և հաստատեք
            ձեր պատվերը։
          </p>
        </header>

        <div className={styles.content}>
          <DeliveryProducts />

          <section className={styles.paymentSection}>
            <div className={styles.sectionTitle}>
              <span>02</span>

              <div>
                <h2>Առաքման տվյալներ</h2>
                <p>Լրացրեք պատվերի ստացման տվյալները</p>
              </div>
            </div>

            <form
              className={styles.customerForm}
              onSubmit={handleOrder}
            >
              <div className={styles.customerField}>
                <label htmlFor="customer-name">
                  Անուն Ազգանուն *
                </label>

                <input
                  id="customer-name"
                  type="text"
                  name="name"
                  value={customer.name}
                  onChange={handleCustomerChange}
                  placeholder="Ձեր անունը և ազգանունը"
                  autoComplete="name"
                  required
                  maxLength={100}
                />
              </div>

              <div className={styles.customerField}>
                <label htmlFor="customer-phone">
                  Հեռախոսահամար *
                </label>

                <input
                  id="customer-phone"
                  type="tel"
                  name="phone"
                  value={customer.phone}
                  onChange={handleCustomerChange}
                  placeholder="+374 XX XXX XXX"
                  autoComplete="tel"
                  required
                  maxLength={30}
                />
              </div>

              <div className={styles.customerField}>
                <label htmlFor="customer-email">
                  Էլեկտրոնային փոստ
                </label>

                <input
                  id="customer-email"
                  type="email"
                  name="email"
                  value={customer.email}
                  onChange={handleCustomerChange}
                  placeholder="example@gmail.com"
                  autoComplete="email"
                  maxLength={150}
                />
              </div>

              <div className={styles.customerField}>
                <label htmlFor="customer-address">
                  Առաքման հասցե *
                </label>

                <input
                  id="customer-address"
                  type="text"
                  name="address"
                  value={customer.address}
                  onChange={handleCustomerChange}
                  placeholder="Փողոց, շենք, բնակարան"
                  autoComplete="street-address"
                  required
                  maxLength={255}
                />
              </div>

              <div className={styles.customerField}>
                <label htmlFor="customer-notes">
                  Լրացուցիչ նշումներ
                </label>

                <textarea
                  id="customer-notes"
                  name="notes"
                  value={customer.notes}
                  onChange={handleCustomerChange}
                  placeholder="Մուտքի կոդ, հարկ կամ այլ մանրամասներ"
                  rows={3}
                  maxLength={500}
                />
              </div>

              {errorMessage && (
                <p
                  className={styles.errorMessage}
                  role="alert"
                >
                  {errorMessage}
                </p>
              )}

              <div className={styles.sectionTitle}>
                <span>03</span>

                <div>
                  <h2>Վճարման քարտ</h2>

                  <p>
                    {savedCard
                      ? "Պահպանված քարտ"
                      : "Ավելացրեք քարտի տվյալները"}
                  </p>
                </div>
              </div>

              {savedCard && !showForm ? (
                <SavedCard
                  card={savedCard}
                  onDelete={deleteCard}
                />
              ) : (
                <CardForm
                  onSave={saveCard}
                  onCancel={() => setShowForm(false)}
                  hasSavedCard={Boolean(savedCard)}
                />
              )}

              <div className={styles.total}>
                <div>
                  <span>Պատվերի ընդհանուր արժեքը</span>
                  <strong>{cartTotal} ֏</strong>
                </div>

                <button
                  type="submit"
                  className={`${styles.orderButton} ${
                    isOrdering ? styles.ordering : ""
                  }`}
                  disabled={isOrdering}
                >
                  {isOrdering ? (
                    <span className={styles.orderLoader}>
                      <span></span>
                    </span>
                  ) : (
                    <>
                      <span className={styles.orderText}>
                        Հաստատել պատվերը
                      </span>

                      <span className={styles.orderArrow}>
                        →
                      </span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </section>
        </div>
      </div>
    </main>
  );
}

export default Delivery;
