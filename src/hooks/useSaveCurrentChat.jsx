import { use } from "react";
import ChatsContext from "../context/ChatsContext";

export const useSaveCurrentChat = () => {
  const { setSavedChat } = use(ChatsContext);

  const handleSaveCurrentChat = (chat) => {
    if (chat) {
      setSavedChat(chat);
      sessionStorage.setItem("saved_chat", JSON.stringify(chat));
    }
  };

  return { handleSaveCurrentChat };
};

export default useSaveCurrentChat;
