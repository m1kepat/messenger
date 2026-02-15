import { useState, useEffect, useCallback } from "react";
import useSidebarToggle from "../../hooks/useSidebarToggle";
import MessagesInfo from "./MessagesInfo";
import Button from "../UI/Button";
import styles from "../../styles/components/messages/MessagesHeader.module.scss";
import MessagesNav from "./MessagesNav";

const MessagesHeader = ({
  chat,
  users,
  currentUser,
  searchQuery,
  setSearchQuery,
  handleChatUpdate,
}) => {
  const [isInfoOpen, setIsInfoOpen] = useState(false);
  const [isInfoClosing, setIsInfoClosing] = useState(false);
  const [participants, setParticipants] = useState(chat?.participants || []);
  const { handleToggle } = useSidebarToggle();

  useEffect(() => {
    if (chat) {
      setParticipants(chat.participants);
    }
  }, [chat]);

  const handleInfoClose = useCallback(() => {
    setIsInfoClosing(true);
    setTimeout(() => {
      setIsInfoOpen(false);
      setIsInfoClosing(false);
    }, 500);
  }, []);

  const usersCount = (count) => {
    const lastDigit = count % 10;
    const lastTwoDigits = count % 100;

    if (lastTwoDigits >= 11 && lastTwoDigits <= 14) {
      return " участников";
    }
    if (lastDigit === 1) {
      return " участник";
    }
    if (lastDigit >= 2 && lastDigit <= 4) {
      return " участника";
    }
    return " участников";
  };

  if (!chat) {
    return null;
  }

  const avatarLetter = chat.name.charAt(0);

  return (
    <div className={styles.messages_header}>
      <div className={styles["messages_header-main"]}>
        <Button
          className={`${styles.button} ${styles["button--back"]}`}
          onClick={(event) => {
            handleToggle(event);
          }}
          aria-label="Вернуться"
          title="Вернуться"
        >
          <svg
            width="28"
            height="23"
            viewBox="0 0 28 23"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M26.4639 11.5H1.46387M1.46387 11.5L12.6884 22M1.46387 11.5L7.07611 6.25L12.6884 1"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </Button>
        <div
          className={styles["messages_header-avatar"]}
          onMouseDown={(event) => {
            event.stopPropagation();
            setIsInfoOpen(!isInfoOpen);
          }}
        >
          {avatarLetter}
        </div>
        <div className={styles["messages_header-info"]}>
          <div className={styles["messages_header-name"]}>{chat.name}</div>
          <div className={styles["messages_header-count"]}>
            {participants.length}
            {usersCount(participants.length)}
          </div>
        </div>
      </div>
      <MessagesNav searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      {isInfoOpen && (
        <MessagesInfo
          chat={chat}
          users={users}
          currentUser={currentUser}
          participants={participants}
          setParticipants={setParticipants}
          handleChatUpdate={handleChatUpdate}
          onClose={handleInfoClose}
          usersCount={usersCount}
          isClosing={isInfoClosing}
        />
      )}
    </div>
  );
};

export default MessagesHeader;
