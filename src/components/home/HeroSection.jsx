import styles from "./HeroSection.module.css";
import { NavLink } from "react-router-dom";
function HeroSection() {
  return (
    <section className={styles.hero}>
      <div className={styles.overlay}>
        <h1>Հայկական համի և երաժշտության աշխարհ</h1>

        <p>
          Ավանդական խոհանոց, կենդանի երաժշտություն և անմոռանալի մթնոլորտ։
        </p>

        <div className={styles.buttons}>
          <button><NavLink to="/reservation" className={styles.reserveButton}> Ամրագրել սեղան </NavLink></button>
          <button><NavLink to="/menu"> Տեսնել Մենյուն </NavLink></button>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;