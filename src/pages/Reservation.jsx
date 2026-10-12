import { useState } from "react";
import styles from "./Reservation.module.css";

const Reservation = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    date: "",
    time: "",
    guests: "2",
    message: "",
  });

  const [selectedHall, setSelectedHall] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [hallError, setHallError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleHallSelect = (hall) => {
    setSelectedHall(hall);
    setHallError(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedHall) {
      setHallError(true);
      return;
    }

    setApiError("");
    setLoading(true);

    const reservationData = {
      ...formData,
      guests: Number(formData.guests),
      hall: selectedHall,
    };

    try {
      const response = await fetch("http://localhost:5000/reservations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reservationData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Չհաջողվեց կատարել ամրագրումը։");
      }

      setShowModal(true);
      setFormData({
        name: "",
        phone: "",
        email: "",
        date: "",
        time: "",
        guests: "2",
        message: "",
      });
      setSelectedHall("");
      setHallError(false);
    } catch (error) {
      setApiError(
        error.message || "Սերվերի հետ կապ հաստատել չհաջողվեց։ Փորձեք կրկին։"
      );
    } finally {
      setLoading(false);
    }
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const today = new Date(
    Date.now() - new Date().getTimezoneOffset() * 60000
  )
    .toISOString()
    .slice(0, 10);

  return (
    <section className={styles.reservation}>
      <div className={styles.overlay}></div>

      <div className={styles.container}>
        {/* HEADING */}
        <div className={styles.heading}>
          <span className={styles.smallTitle}>KAMANCHA YEREVAN</span>

          <h1>
            Ամրագրեք <span>ձեր սեղանը</span>
          </h1>

          <p>
            Ստեղծեք գեղեցիկ երեկո հայկական համի, երաժշտության և ջերմ մթնոլորտի
            ներքո։
          </p>
        </div>

        {/* HALL SECTION */}
        <div className={styles.hallSection}>
          <div className={styles.hallTitle}>
            <span>CHOOSE YOUR EXPERIENCE</span>

            <h2>
              Ընտրեք ձեր <strong>սրահը</strong>
            </h2>

            <p>
              Ընտրեք այն մթնոլորտը, որը կդարձնի ձեր երեկոն առանձնահատուկ։
            </p>
          </div>

          <div className={styles.hallGrid}>
            {/* OUTDOOR */}
            <div
              className={`${styles.hallCard} ${
                selectedHall === "outdoor" ? styles.selected : ""
              }`}
              onClick={() => handleHallSelect("outdoor")}
            >
              <input
                type="radio"
                name="hall"
                value="outdoor"
                checked={selectedHall === "outdoor"}
                onChange={() => handleHallSelect("outdoor")}
              />

              <div className={styles.hallImage}>
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSt1ajoHOOIhmRH9dOZg2DYl_AYQDNp-uAwVmvGVWYUfpZOILjWbPnjEBQ&s=10"
                  alt="Բացօթյա սրահ"
                />
                <div className={styles.imageOverlay}></div>
                <div className={styles.hallNumber}>01</div>
                <div className={styles.selectedIcon}>✓</div>
              </div>

              <div className={styles.hallInfo}>
                <h3>Բացօթյա սրահ</h3>
                <p>Թարմ օդ, գեղեցիկ միջավայր և հանգիստ երեկո։</p>
                <span className={styles.chooseText}>Ընտրել սրահը →</span>
              </div>
            </div>

            {/* INDOOR */}
            <div
              className={`${styles.hallCard} ${
                selectedHall === "indoor" ? styles.selected : ""
              }`}
              onClick={() => handleHallSelect("indoor")}
            >
              <input
                type="radio"
                name="hall"
                value="indoor"
                checked={selectedHall === "indoor"}
                onChange={() => handleHallSelect("indoor")}
              />

              <div className={styles.hallImage}>
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQDGD4BLqlxO2PjNgu3JzWHGjjAjiSvWdUO6916xC5ahp-kS7dsoO7rsV5&s=10"
                  alt="Ներսի սրահ"
                />
                <div className={styles.imageOverlay}></div>
                <div className={styles.hallNumber}>02</div>
                <div className={styles.selectedIcon}>✓</div>
              </div>

              <div className={styles.hallInfo}>
                <h3>Ներսի սրահ</h3>
                <p>Ջերմ, էլեգանտ և հարմարավետ մթնոլորտ։</p>
                <span className={styles.chooseText}>Ընտրել սրահը →</span>
              </div>
            </div>

            {/* MUSIC HALL */}
            <div
              className={`${styles.hallCard} ${
                selectedHall === "music" ? styles.selected : ""
              }`}
              onClick={() => handleHallSelect("music")}
            >
              <input
                type="radio"
                name="hall"
                value="music"
                checked={selectedHall === "music"}
                onChange={() => handleHallSelect("music")}
              />

              <div className={styles.hallImage}>
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTz9LkpIZXnTJtU_2RqDyWu3gw_VHHFuMB4qBQvgIm_M4yBJ9Lh9BAXMbnU&s=10"
                  alt="Երաժշտական սրահ"
                />
                <div className={styles.imageOverlay}></div>
                <div className={styles.hallNumber}>03</div>
                <div className={styles.selectedIcon}>✓</div>
              </div>

              <div className={styles.hallInfo}>
                <h3>Երաժշտական սրահ</h3>
                <p>Կենդանի երաժշտություն և յուրահատուկ երեկո։</p>
                <span className={styles.chooseText}>Ընտրել սրահը →</span>
              </div>
            </div>
          </div>

          {hallError && (
            <div className={styles.hallError} role="alert">
              Խնդրում ենք ընտրել սրահը։
            </div>
          )}
        </div>

        {/* RESERVATION FORM */}
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.formTitle}>
            <span>RESERVATION DETAILS</span>
            <h2>
              Ձեր <strong>տվյալները</strong>
            </h2>
          </div>

          <div className={styles.formGrid}>
            <div className={styles.inputGroup}>
              <label htmlFor="reservation-name">Անուն</label>
              <input
                id="reservation-name"
                type="text"
                name="name"
                placeholder="Ձեր անունը"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="reservation-phone">Հեռախոսահամար</label>
              <input
                id="reservation-phone"
                type="tel"
                name="phone"
                placeholder="+374 XX XX XX XX"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="reservation-email">Email</label>
              <input
                id="reservation-email"
                type="email"
                name="email"
                placeholder="example@gmail.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="reservation-guests">Հյուրերի քանակ</label>
              <select
                id="reservation-guests"
                name="guests"
                value={formData.guests}
                onChange={handleChange}
              >
                <option value="1">1 անձ</option>
                <option value="2">2 անձ</option>
                <option value="3">3 անձ</option>
                <option value="4">4 անձ</option>
                <option value="5">5 անձ</option>
                <option value="6">6 անձ</option>
                <option value="7">7 անձ</option>
                <option value="8">8+ անձ</option>
              </select>
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="reservation-date">Ամսաթիվ</label>
              <input
                id="reservation-date"
                type="date"
                name="date"
                min={today}
                value={formData.date}
                onChange={handleChange}
                required
              />
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="reservation-time">Ժամ</label>
              <input
                id="reservation-time"
                type="time"
                name="time"
                value={formData.time}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="reservation-message">Լրացուցիչ ցանկություն</label>
            <textarea
              id="reservation-message"
              name="message"
              placeholder="Եթե ունեք հատուկ ցանկություն, գրեք այստեղ..."
              value={formData.message}
              onChange={handleChange}
              rows="4"
            ></textarea>
          </div>

          {apiError && (
            <div
              className={styles.hallError}
              role="alert"
              style={{ marginBottom: "18px" }}
            >
              {apiError}
            </div>
          )}

          <button
            type="submit"
            className={styles.submitButton}
            disabled={loading}
          >
            <span>
              {loading ? "Ամրագրումը ուղարկվում է..." : "Ամրագրել սեղանը"}
            </span>
            <span className={styles.arrow}>{loading ? "..." : "→"}</span>
          </button>
        </form>
      </div>

      {/* SUCCESS MODAL */}
      {showModal && (
        <div className={styles.modalOverlay} onClick={closeModal}>
          <div
            className={styles.modal}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className={styles.closeButton}
              onClick={closeModal}
              aria-label="Փակել"
            >
              ×
            </button>

            <div className={styles.successIcon}>✓</div>

            <h2>Ամրագրման հարցումն ընդունված է։</h2>

            <p>
              Շնորհակալություն։
              <br />
              Մենք ստացել ենք ձեր ամրագրման հարցումը և շուտով կկապվենք ձեզ
              հետ՝ այն հաստատելու համար։
            </p>

            <button className={styles.modalButton} onClick={closeModal}>
              Հիանալի
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default Reservation;
