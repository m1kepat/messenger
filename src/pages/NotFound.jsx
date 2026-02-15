import { useNavigate } from "react-router-dom";
import styles from "../styles/components/pages/NotFound.module.scss";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.notFound}>
      <span className={styles["notFound-label"]}>404</span>
      <button
        className={`${styles.button} ${styles["button--wide"]}`}
        onClick={() => navigate("/", { replace: true })}
      >
        Вернуться
      </button>
    </div>
  );
};

export default NotFound;
