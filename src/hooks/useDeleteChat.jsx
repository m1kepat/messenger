import axios from "axios";
import { useState, useContext } from "react";
import { ChatsContext } from "../context/ChatsContext";

export const useDeleteChat = () => {
  const { setChats } = useContext(ChatsContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleDeleteChat = async (id) => {
    setLoading(true);
    setError(null);
    try {
      await axios.delete(`http://localhost:4000/chats/${id}`);

      setChats((prev) => prev.filter((chat) => chat.id !== id));
      sessionStorage.removeItem("saved_chat");
    } catch (error) {
      setError(error.message);
      console.error("Ошибка удаления чата:", error);
    } finally {
      setLoading(false);
    }
  };

  return { handleDeleteChat, loading, error };
};

export default useDeleteChat;
