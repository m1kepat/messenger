import { use } from "react";
import UsersContext from "../../context/UsersContext";
import Input from "../UI/Input";
import styles from "../../styles/components/sidebar/SidebarHeader.module.scss";
import Button from "../UI/Button";

const SidebarHeader = ({ searchQuery, setSearchQuery }) => {
  const { handleLogout } = use(UsersContext);

  return (
    <div className={styles["sidebar_header"]}>
      <Button
        className={styles.button}
        onClick={handleLogout}
        aria-label="Выйти"
        title="Выйти"
      >
        <svg
          width="28"
          height="28"
          viewBox="0 0 28 28"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M20.3725 9.15686V3C20.3725 1.89543 19.4771 1 18.3725 1H3C1.89543 1 1 1.89543 1 3V25C1 26.1046 1.89543 27 3 27H18.3725C19.4771 27 20.3725 26.1046 20.3725 25V18.8431M27 13.7451H9.15686M9.15686 13.7451L16.2941 20.8824M9.15686 13.7451L16.2941 6.60785"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </Button>
      <Input
        className={styles.input}
        placeholder="Поиск"
        value={searchQuery}
        onChange={(event) => setSearchQuery(event.target.value)}
      />
    </div>
  );
};

export default SidebarHeader;
