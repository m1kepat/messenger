import { use, useMemo } from "react";
import ChatsContext from "../../context/ChatsContext";
import UsersContext from "../../context/UsersContext";
import SidebarContext from "../../context/SidebarContext";
import useSortSearch from "../../hooks/useSortSearch";
import MessagesHeader from "./MessagesHeader";
import MessagesList from "./MessagesList";
import MessagesInput from "./MessagesInput";
import styles from "../../styles/components/messages/Messages.module.scss";

const Messages = ({ handleCreateMessage }) => {
  const { setChats, error, currentChat, selectedChat } = use(ChatsContext);

  const { users, currentUser } = use(UsersContext);
  const { isSidebarOpen } = use(SidebarContext);

  const handleChatUpdate = (updatedChats) => {
    setChats(updatedChats);
  };

  const getMessageAuthor = (userId) => {
    if (!currentChat?.participants) return null;

    let author = currentChat.participants.find(
      (participant) => participant.id === userId,
    );

    if (!author) {
      author = users.find((user) => user.id === userId);
    }

    return author;
  };

  const messages = useMemo(() => {
    return currentChat?.messages || [];
  }, [currentChat]);

  const {
    handleSortItems: sortedMessages,
    searchQuery,
    setSearchQuery,
  } = useSortSearch(messages);

  if (error) {
    return <span className={styles.error}>Ошибка загрузки сообщений</span>;
  }

  return (
    <div
      className={`${styles["messages"]} ${!isSidebarOpen ? styles["messages-closed"] : ""}`}
    >
      <MessagesHeader
        chat={currentChat}
        selectedChat={selectedChat}
        users={users}
        currentUser={currentUser}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        handleChatUpdate={handleChatUpdate}
      />
      <div className={styles["messages-main"]}>
        <MessagesList
          messages={sortedMessages}
          getMessageAuthor={getMessageAuthor}
        />
        <MessagesInput handleCreateMessage={handleCreateMessage} />
      </div>
    </div>
  );
};

export default Messages;
