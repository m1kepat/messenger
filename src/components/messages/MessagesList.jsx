import { useRef, useEffect } from "react";
import styles from "../../styles/components/messages/MessagesList.module.scss";
import MessagesItem from "./MessagesItem";

const MessagesList = ({ getMessageAuthor, messages }) => {
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView();
    }
  }, [messages]);

  return (
    <>
      <ul className={styles.list}>
        {messages.map((message) => {
          const author = getMessageAuthor(message.userId);
          return (
            <MessagesItem key={message.id} message={message} author={author} />
          );
        })}
        <li key="scroll-anchor" ref={messagesEndRef} />
      </ul>
    </>
  );
};

export default MessagesList;
