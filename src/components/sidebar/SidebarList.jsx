import { use } from "react";
import ChatsContext from "../../context/ChatsContext";
import Loader from "../UI/Loader";
import SidebarItem from "./SidebarItem";
import styles from "../../styles/components/sidebar/SidebarList.module.scss";

const SidebarList = ({ isLoading, error, searchQuery, chats, currentUser }) => {
  const { setSelectedChat } = use(ChatsContext);

  if (isLoading) {
    return <Loader>Загрузка чатов...</Loader>;
  }

  if (error) {
    return <span className={styles.error}>Ошибка загрузки чатов</span>;
  }

  if (!chats || chats.length === 0) {
    return (
      <p className={styles.error}>
        {searchQuery && searchQuery.trim()
          ? "Ничего не найдено"
          : "Чатов пока нет"}
      </p>
    );
  }

  return (
    <ul className={styles.list}>
      {chats
        ?.filter((chat) =>
          chat.participants?.some(
            (participant) => participant.id === currentUser?.id,
          ),
        )
        .map((chat) => (
          <SidebarItem
            key={chat.id}
            chat={chat}
            setSelectedChat={setSelectedChat}
          />
        ))}
    </ul>
  );
};

export default SidebarList;
