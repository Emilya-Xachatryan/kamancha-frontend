import styles from "./AboutSection.module.css";

function AboutSection() {
  return (
    <section className={styles.about}>
      <div className="container">
        <h2 className={styles.title}>Մեր Մասին</h2>

        <div className={styles.cards}>
          <div className={styles.card}>
            <img
              src="https://kamancharest.com/images/location.jpg"
              alt="Location"
            />

            <h3>Թումանյան փողոց</h3>

            <p>
              Գտնվում ենք Երևանի սրտում՝ Թումանյան փողոցում։
            </p>
          </div>

          <div className={styles.card}>
            <img
              src="https://kamancharest.com/images/music.jpg"
              alt="Live Music"
            />

            <h3>Կենդանի Երաժշտություն</h3>

            <p>
              Ամեն երեկո կենդանի երաժշտություն և ջերմ մթնոլորտ։
            </p>
          </div>

          <div className={styles.card}>
            <img
              src="https://kamancharest.com/images/interior.jpg"
              alt="Interior"
            />

            <h3>Ավանդական Ինտերիեր</h3>

            <p>
              Հայկական մշակութային տարրերով յուրահատուկ ինտերիեր։
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutSection;