import { use, useEffect } from "react";
import useFormatDate from "../hooks/useFormatDate";
import UsersContext from "../context/UsersContext";
import ChatsContext from "../context/ChatsContext";
import MessageContext from "../context/MessageContext";
import axios from "axios";
import Sidebar from "../components/sidebar/Sidebar";
import Messages from "../components/messages/Messages";
import styles from "../styles/components/pages/Chat.module.scss";

const Chat = () => {
  const { formatDate } = useFormatDate();
  const { users, currentUser } = use(UsersContext);
  const { setSavedChat, selectedChat, setSelectedChat, fetchChats } =
    use(ChatsContext);
  const { message, setMessage } = use(MessageContext);

  useEffect(() => {
    document.title = "Сообщения";
  }, []);

  useEffect(() => {
    const saved = sessionStorage.getItem("saved_chat");
    if (saved) {
      const parsedChat = JSON.parse(saved);
      setSavedChat(parsedChat);
      setSelectedChat(parsedChat.id);
    }
  }, [setSavedChat, setSelectedChat]);

  const handleCreateMessage = async (event) => {
    event.preventDefault();

    if (message.length === 0) return;

    try {
      await axios.post(`http://localhost:4000/chats/${selectedChat}/messages`, {
        userId: currentUser.id,
        message: message.trim(),
        time: formatDate(),
      });

      fetchChats();
      setMessage("");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={styles.chat}>
      <Sidebar />
      <Messages
        users={users}
        currentUser={currentUser}
        handleCreateMessage={handleCreateMessage}
      />
    </div>
  );
};

export default Chat;
