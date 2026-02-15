import { use } from "react";
import useEnter from "../../hooks/useEnter";
import ChatsContext from "../../context/ChatsContext";
import MessageContext from "../../context/MessageContext";
import Input from "../UI/Input";
import styles from "../../styles/components/messages/MessagesInput.module.scss";

const MessagesInput = ({ handleCreateMessage }) => {
  const { currentChat } = use(ChatsContext);
  const { message, setMessage } = use(MessageContext);
  const { handleEnter } = useEnter();

  return (
    currentChat && (
      <Input
        className={styles.input}
        placeholder="Сообщение"
        value={message}
        onChange={(event) => setMessage(event.target.value)}
        onKeyDown={(event) =>
          handleEnter(event, () => handleCreateMessage(event))
        }
      />
    )
  );
};

export default MessagesInput;
