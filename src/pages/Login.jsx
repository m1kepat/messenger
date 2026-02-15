import { useState, useEffect } from "react";
import { use } from "react";
import UsersContext from "../context/UsersContext";
import { useNavigate } from "react-router-dom";
import Input from "../components/UI/Input";
import styles from "../styles/components/pages/Login.module.scss";
import Button from "../components/UI/Button";

const Login = ({ onLogin }) => {
  const { users } = use(UsersContext);
  const [loginValue, setLoginValue] = useState("");
  const navigate = useNavigate();
  const [error, setError] = useState("");

  useEffect(() => {
    document.title = "Авторизация";
  }, []);

  useEffect(() => {
    const savedLogin = localStorage.getItem("chat_login");
    if (savedLogin) {
      setLoginValue(savedLogin);
    }
  }, []);

  const handleLogin = (event) => {
    event.preventDefault();

    if (!loginValue.trim()) {
      setError("Введите логин");
      return;
    }

    const findUser = users?.find(
      (user) => user.username.toLowerCase() === loginValue.trim().toLowerCase(),
    );

    if (!findUser) {
      setError("Пользователь не найден");
      return;
    }

    setError("");
    onLogin(loginValue.trim());
    navigate("/chat");
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleLogin(event);
    }
  };

  return (
    <div className={styles.login}>
      <div className={styles["logo-wrapper"]}>
        <img className={styles.logo} src="/logo.png" alt="messenger logo" />
        <p className={styles["logo-name"]}>Messenger</p>
      </div>

      <form className={styles["login-form"]}>
        <h1 className={styles["login-label"]}>Войти</h1>
        <ul className={styles.list}>
          <li className={styles["list-item"]}>
            <Input
              className={styles.input}
              type="text"
              placeholder="Логин"
              value={loginValue}
              onChange={(event) => {
                setLoginValue(event.target.value);
                setError("");
              }}
              onKeyDown={handleKeyDown}
            />
          </li>
          <li
            className={`${styles["list-item"]} ${styles["list-item--error"]}`}
          >
            {error && <span className={styles.error}>{error}</span>}
          </li>
          <li className={styles["list-item"]}>
            <Button
              className={`${styles.button} ${styles["button--wide"]}`}
              type="submit"
              onClick={handleLogin}
            >
              Войти
            </Button>
          </li>
        </ul>
      </form>
    </div>
  );
};

export default Login;
