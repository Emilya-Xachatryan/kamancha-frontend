import { Routes, Route } from "react-router-dom";

import Layout from "../components/layout/Layout";

import Home from "../pages/Home";
import Menu from "../pages/Menu";
import Delivery from "../pages/Delivery";
import Reservation from "../pages/Reservation";
import About from "../pages/About";
import Contact from "../pages/Contact";
import ProductDetails from "../pages/ProductDetails";
import Favorites from "../pages/Favorites";
import Cart from "../pages/Cart";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>

        <Route index element={<Home />} />

        <Route path="favorites" element={<Favorites />} />
        <Route path="cart" element={<Cart />} />
        <Route path="delivery" element={<Delivery />} />

        <Route path="menu" element={<Menu />} />

        <Route
          path="menu/:slug"
          element={<ProductDetails />}
        />

        <Route
          path="reservation"
          element={<Reservation />}
        />

        <Route
          path="about"
          element={<About />}
        />

        <Route
          path="contact"
          element={<Contact />}
        />

      </Route>
    </Routes>
  );
}

export default AppRoutes;