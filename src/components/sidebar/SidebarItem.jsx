import styles from "../../styles/components/sidebar/SidebarItem.module.scss";
import useDeleteChat from "../../hooks/useDeleteChat";
import useSaveCurrentChat from "../../hooks/useSaveCurrentChat";
import useSidebarToggle from "../../hooks/useSidebarToggle";
import Button from "../UI/Button";

const SidebarItem = ({ chat, setSelectedChat }) => {
  const avatarLetter = chat.name?.charAt(0);
  const { handleDeleteChat } = useDeleteChat();
  const { handleSaveCurrentChat } = useSaveCurrentChat();
  const { handleToggle } = useSidebarToggle();

  return (
    <li
      className={styles.list_item}
      onClick={(event) => {
        setSelectedChat(chat.id);
        handleSaveCurrentChat(chat);
        handleToggle(event);
      }}
    >
      <div className={styles["list_item-avatar"]}>{avatarLetter}</div>
      <div className={styles["list_item-info"]}>
        <div className={styles["list_item-name"]}>{chat.name}</div>
        <div className={styles["list_item-time"]}>
          {chat.messages.at(-1)?.time}
        </div>
        <div className={styles["list_item-message"]}>
          {chat.messages.at(-1)?.message}
        </div>
        <div className={styles["list_item-date"]}>{chat.createdAt}</div>
      </div>
      <Button
        className={`${styles.button} ${styles["button--wide"]}`}
        onClick={(event) => {
          event.stopPropagation();
          handleDeleteChat(chat.id);
        }}
        aria-label="Удалить чат"
        title="Удалить чат"
      >
        X
      </Button>
    </li>
  );
};

export default SidebarItem;
