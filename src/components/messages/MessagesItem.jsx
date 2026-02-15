import styles from "../../styles/components/messages/MessagesItem.module.scss";

const MessagesItem = ({ author, message }) => {
  const avatarLetter = author.username.charAt(0);

  return (
    <div className={styles.list_item}>
      <div className={styles["list_item-avatar"]}>{avatarLetter}</div>
      <div className={styles["list_item-main"]}>
        <div className={styles["list_item-username"]}>{author.username}</div>
        <div className={styles["list_item-message"]}>{message.message}</div>
      </div>
      <div className={styles["list_item-time"]}>{message.time}</div>
    </div>
  );
};

export default MessagesItem;
