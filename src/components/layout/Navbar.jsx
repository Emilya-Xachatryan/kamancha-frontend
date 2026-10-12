import { useState } from "react";
import { NavLink } from "react-router-dom";
import FavoriteButton from "./FavoriteButton";
import styles from "./Navbar.module.css";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <nav className={styles.navbar}>
      <h2>Kamancha</h2>

      {/* Burger button */}
      <button
        type="button"
        className={`${styles.burger} ${isOpen ? styles.open : ""}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Բացել մենյուն"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      {/* Navigation */}
      <ul className={`${styles.links} ${isOpen ? styles.showMenu : ""}`}>
        <li>
          <NavLink to="/" onClick={closeMenu}>
            Գլխավոր
          </NavLink>
        </li>

        <li>
          <NavLink to="/menu" onClick={closeMenu}>
            Մենյու
          </NavLink>
        </li>

        <li>
          <NavLink to="/delivery" onClick={closeMenu}>
            Առաքում
          </NavLink>
        </li>

        <li>
          <NavLink to="/reservation" onClick={closeMenu}>
            Ամրագրում
          </NavLink>
        </li>

        <li>
          <NavLink to="/about" onClick={closeMenu}>
            Մեր մասին
          </NavLink>
        </li>

        <li>
          <NavLink to="/contact" onClick={closeMenu}>
            Կոնտակտ
          </NavLink>
        </li>

        <li>
          <FavoriteButton />
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;