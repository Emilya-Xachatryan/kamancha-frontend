import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import CardForm from "../components/delivery/CardForm";
import SavedCard from "../components/delivery/SavedCard";
import styles from "./Delivery.module.css";

const API_URL = "http://localhost:5000";

function Delivery() {
  const navigate = useNavigate();

  const [savedCard, setSavedCard] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    comment: "",
  });

  // Բեռնում ենք պահպանված քարտն ու զամբյուղի ապրանքները
  useEffect(() => {
    try {
      const storedCard = localStorage.getItem("kamanchaSavedCard");

      if (storedCard) {
        const parsedCard = JSON.parse(storedCard);

        if (
          parsedCard &&
          parsedCard.bankName &&
          parsedCard.cardHolder &&
          parsedCard.lastFour &&
          parsedCard.expiry
        ) {
          setSavedCard(parsedCard);
        }
      }
    } catch (err) {
      console.error("Քարտի տվյալները կարդալ չհաջողվեց:", err);
    }

    try {
      const possibleKeys = ["cart", "kamanchaCart", "cartItems"];
      let foundItems = [];

      for (const key of possibleKeys) {
        const storedCart = localStorage.getItem(key);

        if (storedCart) {
          const parsedCart = JSON.parse(storedCart);

          if (Array.isArray(parsedCart) && parsedCart.length > 0) {
            foundItems = parsedCart;
            break;
          }
        }
      }

      setCartItems(foundItems);
    } catch (err) {
      console.error("Զամբյուղի տվյալները կարդալ չհաջողվեց:", err);
    }
  }, []);

  // Պահպանում ենք միայն քարտի անվտանգ ցուցադրման տվյալները
  const saveCard = (cardData) => {
    try {
      const safeCard = {
        bankName: cardData.bankName,
        cardHolder: cardData.cardHolder,
        lastFour: cardData.lastFour,
        expiry: cardData.expiry,
      };

      localStorage.setItem(
        "kamanchaSavedCard",
        JSON.stringify(safeCard)
      );

      setSavedCard(safeCard);
      setShowForm(false);
      setError("");
    } catch (err) {
      console.error("Քարտը պահպանել չհաջողվեց:", err);
      setError("Քարտի տվյալները պահպանել չհաջողվեց։");
    }
  };

  const editCard = () => {
    setShowForm(true);
  };

  const deleteCard = () => {
    try {
      localStorage.removeItem("kamanchaSavedCard");
      setSavedCard(null);
      setShowForm(true);
      setError("");
    } catch (err) {
      console.error("Քարտը ջնջել չհաջողվեց:", err);
      setError("Քարտը ջնջել չհաջողվեց։");
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const getItemName = (item) =>
    item.name || item.title || item.productName || "Ուտեստ";

  const getItemPrice = (item) =>
    Number(item.price ?? item.finalPrice ?? 0);

  const getItemQuantity = (item) =>
    Number(item.quantity ?? item.count ?? 1);

  const totalPrice = cartItems.reduce((total, item) => {
    return total + getItemPrice(item) * getItemQuantity(item);
  }, 0);

  // Պատվերն ուղարկում ենք backend-ին
  const handleOrderSubmit = async (event) => {
    event.preventDefault();

    setError("");
    setSuccess(false);

    if (cartItems.length === 0) {
      setError("Զամբյուղը դատարկ է։ Նախ ավելացրու ուտեստներ։");
      return;
    }

    if (
      !formData.name.trim() ||
      !formData.phone.trim() ||
      !formData.address.trim()
    ) {
      setError("Լրացրու անունը, հեռախոսահամարը և հասցեն։");
      return;
    }

    // Backend-ը պահանջում է յուրաքանչյուր ուտեստի թվային ID-ն
    // և քանակը։ Գինը backend-ը պետք է հաշվի իր տվյալներից։
    const items = cartItems.map((item) => ({
      id: Number(item.id),
      quantity: Number(item.quantity ?? item.count ?? 1),
    }));

    const invalidItem = items.some(
      (item) =>
        !Number.isInteger(item.id) ||
        item.id <= 0 ||
        !Number.isInteger(item.quantity) ||
        item.quantity <= 0
    );

    if (invalidItem) {
      console.error("Սխալ զամբյուղի տվյալներ:", cartItems);

      setError(
        "Զամբյուղի ապրանքների ID-ն կամ քանակը սխալ է։ " +
          "Ստուգիր, որ յուրաքանչյուր ուտեստ ունենա backend-ի հետ համապատասխան թվային ID։"
      );

      return;
    }

    // Պահանջվող կառուցվածքը՝ { customer, items }
    const orderData = {
      customer: {
        name: formData.name.trim(),
        phone: formData.phone.trim(),
        address: formData.address.trim(),
        notes: formData.comment.trim(),
      },
      items,
    };

    console.log("Ուղարկվող պատվերը:", orderData);

    setLoading(true);

    try {
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
          data.message ||
            data.error ||
            "Պատվերը գրանցել չհաջողվեց։"
        );
      }

      setSuccess(true);
      setError("");
      setCartItems([]);

      // Մաքրում ենք զամբյուղի պահպանված տվյալները
      ["cart", "kamanchaCart", "cartItems"].forEach((key) => {
        localStorage.removeItem(key);
      });

      setFormData({
        name: "",
        phone: "",
        address: "",
        comment: "",
      });
    } catch (err) {
      console.error("Պատվերի սխալ:", err);

      if (err.message === "Failed to fetch") {
        setError(
          "Սերվերին միանալ չհաջողվեց։ Ստուգիր՝ backend-ը միացվա՞ծ է, " +
            "և CORS-ը թույլատրո՞ւմ է frontend-ի հարցումները։"
        );
      } else {
        setError(
          err.message || "Պատվերի ընթացքում սխալ առաջացավ։"
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className={styles.deliveryPage}>
      <section className={styles.deliveryContainer}>
        <button
          type="button"
          className={styles.backButton}
          onClick={() => navigate(-1)}
        >
          ← Վերադառնալ
        </button>

        <header className={styles.pageHeader}>
          <span className={styles.eyebrow}>
            KAMANCHA YEREVAN
          </span>

          <h1 className={styles.pageTitle}>
            Պատվերի <span>ձևակերպում</span>
          </h1>

          <p className={styles.pageDescription}>
            Պատվիրիր սիրելի ուտեստները և վայելիր հայկական համերը։
          </p>
        </header>

        {success && (
          <div className={styles.successMessage} role="status">
            <span className={styles.successIcon}>✓</span>

            <div>
              <h3>Պատվերը հաջողությամբ գրանցվեց։</h3>
              <p>
                Շնորհակալություն Kamancha-ն ընտրելու համար։
              </p>
            </div>
          </div>
        )}

        {error && (
          <div className={styles.errorMessage} role="alert">
            {error}
          </div>
        )}

        <div className={styles.deliveryGrid}>
          <section className={styles.orderSection}>
            <h2 className={styles.sectionTitle}>
              Առաքման տվյալներ
            </h2>

            <form
              className={styles.orderForm}
              onSubmit={handleOrderSubmit}
            >
              <div className={styles.inputGroup}>
                <label htmlFor="deliveryName">
                  Անուն, ազգանուն
                </label>

                <input
                  id="deliveryName"
                  name="name"
                  type="text"
                  placeholder="Մուտքագրիր անունդ"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className={styles.inputGroup}>
                <label htmlFor="deliveryPhone">
                  Հեռախոսահամար
                </label>

                <input
                  id="deliveryPhone"
                  name="phone"
                  type="tel"
                  placeholder="+374 XX XXX XXX"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className={styles.inputGroup}>
                <label htmlFor="deliveryAddress">
                  Առաքման հասցե
                </label>

                <input
                  id="deliveryAddress"
                  name="address"
                  type="text"
                  placeholder="Փողոց, շենք, բնակարան"
                  value={formData.address}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className={styles.inputGroup}>
                <label htmlFor="deliveryComment">
                  Լրացուցիչ նշումներ
                </label>

                <textarea
                  id="deliveryComment"
                  name="comment"
                  placeholder="Մուտքի կամ պատվերի վերաբերյալ նշումներ"
                  value={formData.comment}
                  onChange={handleInputChange}
                  rows={4}
                />
              </div>

              <button
                type="submit"
                className={styles.orderButton}
                disabled={loading}
              >
                {loading
                  ? "Պատվերը ուղարկվում է..."
                  : "Հաստատել պատվերը"}
              </button>
            </form>
          </section>

          <aside className={styles.paymentSection}>
            <h2 className={styles.sectionTitle}>
              Վճարման քարտ
            </h2>

            <div className={styles.savedCardArea}>
              {savedCard && !showForm ? (
                <SavedCard
                  card={savedCard}
                  onEdit={editCard}
                  onDelete={deleteCard}
                  show3DCard={true}
                />
              ) : (
                <CardForm
                  onSave={saveCard}
                  onCancel={
                    savedCard
                      ? () => setShowForm(false)
                      : undefined
                  }
                  hasSavedCard={Boolean(savedCard)}
                />
              )}
            </div>

            <div className={styles.orderSummary}>
              <h3>Պատվերի ամփոփում</h3>

              {cartItems.length === 0 ? (
                <p className={styles.emptyCart}>
                  Զամբյուղը դատարկ է։
                </p>
              ) : (
                <>
                  <div className={styles.orderItems}>
                    {cartItems.map((item, index) => (
                      <div
                        className={styles.orderItem}
                        key={
                          item.id ??
                          item._id ??
                          `${getItemName(item)}-${index}`
                        }
                      >
                        <span>
                          {getItemName(item)} ×{" "}
                          {getItemQuantity(item)}
                        </span>

                        <span>
                          {(
                            getItemPrice(item) *
                            getItemQuantity(item)
                          ).toLocaleString("hy-AM")}{" "}
                          ֏
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className={styles.totalRow}>
                    <span>Ընդհանուր</span>

                    <strong>
                      {totalPrice.toLocaleString("hy-AM")} ֏
                    </strong>
                  </div>
                </>
              )}
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}

export default Delivery;