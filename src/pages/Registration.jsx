
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Registration.module.css";

const API_URL = "http://localhost:5000";

function Registration() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    email: "",
    age: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [registered, setRegistered] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setMessage("");
    setError("");

    if (form.password.length < 6 || form.password.length > 32) {
      setError("Գաղտնաբառը պետք է պարունակի 6–32 նիշ։");
      return;
    }

    if (form.age && (
      !Number.isInteger(Number(form.age)) ||
      Number(form.age) < 1 ||
      Number(form.age) > 120
    )) {
      setError("Մուտքագրիր ճիշտ տարիք։");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/registration`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          username: form.username.trim(),
          email: form.email.trim(),
          password: form.password,
          age: form.age ? Number(form.age) : undefined,
        }),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(
          data.message ||
          data.errors?.[0]?.msg ||
          "Գրանցումը չհաջողվեց։ Ստուգիր տվյալները։"
        );
      }

      setRegistered(true);
      setMessage(
        "Գրանցումը հաջողվեց։ Ստուգիր էլեկտրոնային փոստդ և ակտիվացրու հաշիվդ։"
      );
    } catch (err) {
      setError(
        err.message === "Failed to fetch"
          ? "Սերվերի հետ կապ չկա։ Ստուգիր՝ backend-ը գործարկվա՞ծ է։"
          : err.message
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className={styles.page}>
      <section className={styles.card}>
        <Link to="/" className={styles.brand}>
          KAMANCHA
        </Link>

        <p className={styles.subtitle}>Բարի գալուստ մեր ընտանիք</p>
        <h1>Գրանցում</h1>

        {registered ? (
          <div className={styles.success}>
            <span className={styles.successIcon}>✓</span>
            <p>{message}</p>
            <p className={styles.hint}>
              Եթե նամակը չես տեսնում, ստուգիր նաև Spam բաժինը։
            </p>

            <button
              type="button"
              className={styles.button}
              onClick={() => navigate("/login")}
            >
              Անցնել մուտքի էջ
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className={styles.form}>
            <label htmlFor="username">Անուն</label>
            <input
              id="username"
              name="username"
              type="text"
              placeholder="Մուտքագրիր անունդ"
              value={form.username}
              onChange={handleChange}
              autoComplete="name"
            />

            <label htmlFor="email">Էլեկտրոնային փոստ</label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="example@gmail.com"
              value={form.email}
              onChange={handleChange}
              autoComplete="email"
              required
            />

            <label htmlFor="age">Տարիք</label>
            <input
              id="age"
              name="age"
              type="number"
              placeholder="Մուտքագրիր տարիքդ"
              min="1"
              max="120"
              value={form.age}
              onChange={handleChange}
            />

            <label htmlFor="password">Գաղտնաբառ</label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="Առնվազն 6 նիշ"
              value={form.password}
              onChange={handleChange}
              autoComplete="new-password"
              minLength={6}
              maxLength={32}
              required
            />

            {error && (
              <p className={styles.error} role="alert">
                {error}
              </p>
            )}

            <button
              className={styles.button}
              type="submit"
              disabled={loading}
            >
              {loading ? "Գրանցվում է..." : "Գրանցվել"}
            </button>

            <p className={styles.footerText}>
              Արդեն գրանցվա՞ծ ես։ <Link to="/login">Մուտք գործիր</Link>
            </p>
          </form>
        )}
      </section>
    </main>
  );
}

export default Registration;
