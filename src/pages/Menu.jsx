import { useState } from "react";

import MenuCategories from "../components/menu/MenuCategories";
import FoodCard from "../components/menu/FoodCard";

import styles from "./Menu.module.css";

function Menu() {
  const [category, setCategory] = useState("All");

  return (
    <main className={styles.menu}>
      <MenuCategories
        category={category}
        setCategory={setCategory}
      />

      <section className={styles.foodSection}>
        <div className={styles.foodContainer}>
          <FoodCard category={category} />
        </div>
      </section>
    </main>
  );
}

export default Menu;