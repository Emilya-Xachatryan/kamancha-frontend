
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Login.module.css";

const API_URL = "http://localhost:5000";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          email: email.trim(),
          password,
        }),
      });

      const responseText = await response.text();

      console.log("Login status:", response.status);
      console.log("Login raw response:", responseText);

      let data = {};

      try {
        data = JSON.parse(responseText);
      } catch {
        data = { message: responseText };
      }

      if (!response.ok) {
        throw new Error(
          data.message ||
          data.errors?.[0]?.msg ||
          "Մուտքը չհաջողվեց։ Ստուգիր մուտքագրված տվյալները։"
        );
      }

      if (!response.ok) {
        throw new Error(
          data.message ||
          data.errors?.[0]?.msg ||
          "Մուտքը չհաջողվեց։ Ստուգիր մուտքագրված տվյալները։"
        );
      }

      const accessToken =
        data.accessToken ||
        data.userData?.accessToken ||
        data.tokens?.accessToken;

      if (accessToken) {
        sessionStorage.setItem("accessToken", accessToken);
      }

      const user = data.user || data.userData?.user;

      if (user) {
        sessionStorage.setItem("user", JSON.stringify(user));
      }

      navigate("/", { replace: true });
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

        <p className={styles.subtitle}>Ուրախ ենք կրկին տեսնել քեզ</p>
        <h1>Մուտք</h1>

        <form onSubmit={handleSubmit} className={styles.form}>
          <label htmlFor="email">Էլեկտրոնային փոստ</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="example@gmail.com"
            autoComplete="email"
            required
          />

          <label htmlFor="password">Գաղտնաբառ</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Մուտքագրիր գաղտնաբառը"
            autoComplete="current-password"
            required
          />

          {error && (
            <p className={styles.error} role="alert">
              {error}
            </p>
          )}

          <button
            type="submit"
            className={styles.button}
            disabled={loading}
          >
            {loading ? "Մուտք է կատարվում..." : "Մուտք գործել"}
          </button>

          <p className={styles.footerText}>
            Դեռ գրանցված չե՞ս։{" "}
            <Link to="/registration">Գրանցվել</Link>
          </p>
        </form>
      </section>
    </main>
  );
}

export default Login;
