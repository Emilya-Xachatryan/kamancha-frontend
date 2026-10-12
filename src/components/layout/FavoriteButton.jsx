// import { FaHeart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import styles from "./FavoriteButton.module.css";

function FavoriteButton() {
  const navigate = useNavigate();

  return (

    <button
      type="button"
      className={styles.favoriteButton}
      onClick={() => navigate("/favorites")}
      aria-label="Սիրելի ուտեստներ"
    >
      <span className={styles.heartIcon}>♡</span>
    </button>


  );
}

export default FavoriteButton;