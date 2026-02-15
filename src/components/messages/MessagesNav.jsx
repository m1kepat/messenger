import { useState, useRef, use, useCallback } from "react";
import useClickOutside from "../../hooks/useClickOutside";
import useDeleteChat from "../../hooks/useDeleteChat";
import ChatsContext from "../../context/ChatsContext";
import Input from "../UI/Input";
import Button from "../UI/Button";
import styles from "../../styles/components/messages/MessagesNav.module.scss";

const MessagesNav = ({ searchQuery, setSearchQuery }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const [isClosing, setIsClosing] = useState(false);
  const { handleDeleteChat } = useDeleteChat();
  const { selectedChat } = use(ChatsContext);

  const handleClose = useCallback(() => {
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      setIsMenuOpen(false);
      setSearchQuery("");
    }, 500);
  }, [setSearchQuery]);

  useClickOutside(menuRef, isMenuOpen && !isClosing, handleClose);

  return (
    <div className={styles.nav} ref={menuRef}>
      <Button
        className={styles.button}
        onClick={(event) => {
          event.stopPropagation();
          setIsMenuOpen(!isMenuOpen);
        }}
        type="button"
        aria-label="Меню"
        title="Меню"
      >
        <svg
          width="28"
          height="26"
          viewBox="0 0 28 26"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1.5 13H26.5M1.5 25H26.5M1 1H26.5"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </Button>
      {isMenuOpen && (
        <div className={`${styles["nav-menu"]} ${isClosing ? styles.out : ""}`}>
          <Button
            className={`${styles.button} ${styles["button--wide"]}`}
            onClick={() => handleDeleteChat(selectedChat)}
            type="button"
          >
            Удалить чат
          </Button>
          <div className={styles.search}>
            <Input
              className={styles["search-input"]}
              placeholder="Поиск"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default MessagesNav;
