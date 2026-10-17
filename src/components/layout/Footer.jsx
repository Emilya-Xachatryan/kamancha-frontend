
import {
  FaFacebookF,
  FaInstagram,
  FaTiktok,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaEnvelope,
} from "react-icons/fa";
import { NavLink } from "react-router-dom";

import styles from "./Footer.module.css";

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.grid}>
          {/* Logo */}

          <div className={styles.brand}>
            <h2 className={styles.logo}>Kamancha</h2>

            <p>
              Հայկական ավանդական խոհանոց, փիդեներ, կենդանի երաժշտություն և
              անմոռանալի երեկոներ Երևանի սրտում։
            </p>

            <div className={styles.socials}>
              <a
                href="https://www.facebook.com/kamancharest/"
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
              >
                <FaFacebookF />
              </a>

              <a
                href="https://www.instagram.com/kamancha_yerevan/"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
              >
                <FaInstagram />
              </a>

              <a
                href="https://www.tiktok.com/@kamancha_yerevan"
                target="_blank"
                rel="noreferrer"
                aria-label="TikTok"
              >
                <FaTiktok />
              </a>
            </div>
          </div>

          {/* Links */}

          <div>
            <h3>Նավիգացիա</h3>

            <ul className={styles.links}>
              <li><NavLink to="/">Գլխավոր</NavLink></li>
              <li><NavLink to="/menu">Մենյու</NavLink></li>
              <li><NavLink to="/delivery">Առաքում</NavLink></li>
              <li><NavLink to="/reservation">Ամրագրում</NavLink></li>
              <li><NavLink to="/about">Մեր մասին</NavLink></li>
              <li><NavLink to="/contact">Կոնտակտ</NavLink></li>
            </ul>
          </div>

          {/* Contact */}

          <div>
            <h3>Կապ մեզ հետ</h3>

            <div className={styles.contactItem}>
              <FaMapMarkerAlt />
              <span>ք. Երևան, Տումանյան 24</span>
            </div>

            <div className={styles.contactItem}>
              <FaPhoneAlt />
              <span>+374 00 000 000</span>
            </div>

            <div className={styles.contactItem}>
              <FaEnvelope />
              <span>info@kamancha.am</span>
            </div>
          </div>

          {/* Newsletter and Registration */}

          <div>
            <h3>Բաժանորդագրվեք</h3>

            <p className={styles.newsText}>
              Ստացեք նոր առաջարկներն ու միջոցառումների մասին տեղեկություններ։
            </p>

            {/* <div className={styles.newsletter}>
              <input
                type="email"
                placeholder="Ձեր էլ. հասցեն"
                aria-label="Ձեր էլեկտրոնային հասցեն"
              />

              <button type="button">Ուղարկել</button>
            </div> */}

            <div className={styles.registration}>
              <NavLink
                to="/registration"
                className={styles.registrationButton}
              >
                Գրանցվել
              </NavLink>

              <p>
                Արդեն ունե՞ք հաշիվ։{" "}
                <NavLink to="/login">Մուտք գործել</NavLink>
              </p>
            </div>
          </div>
        </div>

        <div className={styles.bottom}>
          <p>
            © 2026 Kamancha Yerevan | Բոլոր իրավունքները պաշտպանված են։
          </p>
        </div>
      </div>

      {/* Map */}

      {/*
      <div>
        <h3>Մեր գտնվելու վայրը</h3>

        <div className={styles.map}>
          <iframe
            title="Kamancha Map"
            src="https://www.google.com/maps?q=Kamancha+Yerevan&output=embed"
            loading="lazy"
            allowFullScreen
          ></iframe>
        </div>
      </div>
      */}
    </footer>
  );
}

export default Footer;
