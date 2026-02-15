import { createContext, useState, useEffect, useMemo } from "react";
import axios from "axios";

export const ChatsContext = createContext();

export const ChatsProvider = ({ children }) => {
  const [chats, setChats] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [savedChat, setSavedChat] = useState(null);
  const [selectedChat, setSelectedChat] = useState(null);

  const fetchChats = async () => {
    try {
      const response = await axios.get("http://localhost:4000/chats");
      setChats(response.data);
    } catch (error) {
      console.error("Ошибка загрузки чатов:", error);
      setError("Ошибка загрузки данных messages");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchChats();
  }, []);

  const currentChat = useMemo(() => {
    if (!selectedChat || !chats) return null;

    return chats.find((chat) => chat.id === selectedChat);
  }, [chats, selectedChat]);

  return (
    <ChatsContext.Provider
      value={{
        fetchChats,
        chats,
        setChats,
        isLoading,
        error,
        currentChat,
        setSavedChat,
        selectedChat,
        setSelectedChat,
      }}
    >
      {children}
    </ChatsContext.Provider>
  );
};

export default ChatsContext;
