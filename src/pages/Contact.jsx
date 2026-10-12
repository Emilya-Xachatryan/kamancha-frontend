import { useNavigate } from "react-router-dom";

import styles from "./Contact.module.css";

function Contact() {
  const navigate = useNavigate();

  const goToPage = (path) => {
    navigate(path);
  };

  return (
    <main className={styles.contact}>
      <div className={styles.backgroundGlow}></div>
      <div className={styles.backgroundGlowTwo}></div>

      <div className={styles.container}>

        {/* HEADER */}

        <header className={styles.header}>
          <span className={styles.smallTitle}>
            ✦ ԿԱՊ KAMANCHA-Ի ՀԵՏ ✦
          </span>

          <h1>
            Գտեք մեզ
            <span> և եկեք Kamancha</span>
          </h1>

          <p>
            Հայկական համը, կենդանի երաժշտությունն ու
            ջերմ մթնոլորտը սպասում են ձեզ։
          </p>
        </header>


        {/* NAVIGATION CARDS */}

        <section className={styles.cardsSection}>

          <button
            type="button"
            className={styles.card}
            onClick={() => goToPage("/reservation")}
          >
            <div className={styles.cardNumber}>01</div>

            <div className={styles.cardIcon}>
              🍽️
            </div>

            <div className={styles.cardContent}>
              <h2>Ամրագրել սեղան</h2>

              <p>
                Ստեղծեք ձեր գեղեցիկ երեկոն
                Kamancha-ում։
              </p>

              <span className={styles.cardLink}>
                Ամրագրել →
              </span>
            </div>
          </button>


          <button
            type="button"
            className={styles.card}
            onClick={() => goToPage("/menu")}
          >
            <div className={styles.cardNumber}>02</div>

            <div className={styles.cardIcon}>
              🥘
            </div>

            <div className={styles.cardContent}>
              <h2>Դիտել մենյուն</h2>

              <p>
                Բացահայտեք հայկական խոհանոցի
                մեր համերը։
              </p>

              <span className={styles.cardLink}>
                Տեսնել մենյուն →
              </span>
            </div>
          </button>


          <button
            type="button"
            className={styles.card}
            onClick={() => goToPage("/delivery")}
          >
            <div className={styles.cardNumber}>03</div>

            <div className={styles.cardIcon}>
              🚚
            </div>

            <div className={styles.cardContent}>
              <h2>Պատվիրել առաքում</h2>

              <p>
                Ձեր սիրելի ուտեստները՝
                հենց ձեր հասցեում։
              </p>

              <span className={styles.cardLink}>
                Պատվիրել →
              </span>
            </div>
          </button>


          <button
            type="button"
            className={styles.card}
            onClick={() => goToPage("/about")}
          >
            <div className={styles.cardNumber}>04</div>

            <div className={styles.cardIcon}>
              ✦
            </div>

            <div className={styles.cardContent}>
              <h2>Մեր մասին</h2>

              <p>
                Ծանոթացեք Kamancha-ի
                պատմությանը և մթնոլորտին։
              </p>

              <span className={styles.cardLink}>
                Իմանալ ավելին →
              </span>
            </div>
          </button>

        </section>


        {/* MAP SECTION */}

        <section className={styles.locationSection}>

          <div className={styles.locationInfo}>

            <span className={styles.locationLabel}>
              ✦ ՄԵՐ ԳՏՆՎԵԼՈՒ ՎԱՅՐԸ
            </span>

            <h2>
              Հանդիպենք
              <span> Kamancha-ում</span>
            </h2>

            <p>
              Մենք գտնվում ենք Երևանի հենց սրտում՝
              Թումանյան փողոցում։
            </p>


            <div className={styles.address}>
              <div className={styles.addressIcon}>
                📍
              </div>

              <div>
                <span>Հասցե</span>

                <strong>
                  23 Թումանյան փողոց,
                  Երևան
                </strong>
              </div>
            </div>


            <div className={styles.hours}>
              <div className={styles.hoursIcon}>
                ◷
              </div>

              <div>
                <span>Երաժշտական երեկոներ</span>

                <strong>
                  Ամեն օր՝ 19:30-ից
                </strong>
              </div>
            </div>


            <a
              href="https://www.google.com/maps/search/?api=1&query=Kamancha+Restaurant+23+Tumanyan+Street+Yerevan"
              target="_blank"
              rel="noreferrer"
              className={styles.mapButton}
            >
              Բացել Google Maps
              <span>↗</span>
            </a>

          </div>


          <div className={styles.mapWrapper}>

            <div className={styles.mapGlow}></div>

            <iframe
              title="Kamancha Restaurant Location"
              src="https://www.google.com/maps?q=Kamancha+Restaurant,+23+Tumanyan+Street,+Yerevan&output=embed"
              className={styles.map}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>

            <div className={styles.mapOverlay}>
              <span className={styles.mapPin}>
                ✦
              </span>

              <span>KAMANCHA</span>
            </div>

          </div>

        </section>


        {/* INSTAGRAM / FINAL SECTION */}

        <section className={styles.socialSection}>

          <div className={styles.socialLine}></div>

          <span>ՀԵՏԵՎԵՔ ՄԵԶ</span>

          <h2>
            @kamancha_yerevan
          </h2>

          <p>
            Բացահայտեք մեր նորությունները,
            երեկոները և Kamancha-ի մթնոլորտը։
          </p>

          <a
            href="https://www.instagram.com/kamancha_yerevan/"
            target="_blank"
            rel="noreferrer"
            className={styles.instagramButton}
          >
            Instagram
            <span>↗</span>
          </a>

        </section>

      </div>
    </main>
  );
}

export default Contact;