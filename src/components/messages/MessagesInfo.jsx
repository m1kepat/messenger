import { useState, useRef } from "react";
import useClickOutside from "../../hooks/useClickOutside";
import useEnter from "../../hooks/useEnter";
import axios from "axios";
import Input from "../UI/Input";
import Button from "../UI/Button";
import styles from "../../styles/components/messages/MessagesInfo.module.scss";

const MessagesInfo = ({
  chat,
  users,
  currentUser,
  participants,
  setParticipants,
  handleChatUpdate,
  onClose,
  usersCount,
  isClosing,
}) => {
  const [selectedUsers, setSelectedUsers] = useState([]);
  const infoRef = useRef(null);

  useClickOutside(infoRef, true, onClose);

  const { handleEnter } = useEnter();

  const handleKeyDown = (event) => {
    handleEnter(event, () =>
      handleUpdateParticipant(event, chat.id, selectedUsers),
    );
  };

  const handleCheckboxChange = (user, isChecked) => {
    if (!user || !user.id) return;

    if (isChecked) {
      setSelectedUsers((prev) => [...prev, user]);
    } else {
      setSelectedUsers((prev) => prev.filter((item) => item.id !== user.id));
    }
  };

  const handleUpdateParticipant = async (event, id, selectedUsers) => {
    event.preventDefault();
    if (selectedUsers.length === 0) return;

    try {
      const response = await axios.post(
        `http://localhost:4000/chats/${id}/participants`,
        { selectedUsers: selectedUsers },
      );

      setParticipants(response.data);
      setSelectedUsers([]);
    } catch (error) {
      console.error(
        "Ошибка при обновлении списка пользователей:",
        error.response?.data,
      );
    }
  };

  const removeUserFromChat = async (id, userId) => {
    try {
      const response = await axios.delete(
        `http://localhost:4000/chats/${id}/participants/${userId}`,
      );

      if (response.data) {
        setParticipants((prev) =>
          prev.filter((participant) => participant.id !== userId),
        );
        handleChatUpdate(response.data.chats);
        return response.data;
      }
    } catch (error) {
      console.error("Ошибка при удалении пользователя:", error.response?.data);
    }
  };

  const isCurrentUserAdmin = participants.find(
    (participant) => participant.id === currentUser.id,
  )?.isAdmin;

  return (
    <div
      className={`${styles.info} ${isClosing ? styles.out : ""}`}
      ref={infoRef}
    >
      <div className={styles["info-details"]}>
        <h2 className={styles["info-name"]}>{chat.name}</h2>
        <p className={styles["info-participants-count"]}>
          {participants.length}
          {usersCount(participants.length)}
        </p>
      </div>
      <Button
        className={`${styles.button} ${styles["button--wide"]}`}
        onClick={async (event) => {
          event.stopPropagation();
          try {
            await removeUserFromChat(chat.id, currentUser.id);
            onClose();
          } catch (error) {
            console.error("Ошибка в работе кнопки:", error);
          }
        }}
        aria-label="Покинуть чат"
      >
        Покинуть чат
      </Button>
      <div className={styles["info-participants"]}>
        <h3 className={styles["info-participants-label"]}>Участники</h3>
        <ul className={styles["info-participants-list"]}>
          {participants.map((participant) => (
            <li
              key={participant.id}
              className={styles["info-participants-item"]}
            >
              <div className={styles["info-participants-details"]}>
                <div className={styles["info-participants-avatar"]}>
                  {participant.username.charAt(0)}
                </div>
                <span className={styles["info-participants-username"]}>
                  {participant.username}
                  {participant.isAdmin && " (создатель)"}
                </span>
              </div>
              {isCurrentUserAdmin && participant.id !== currentUser.id && (
                <Button
                  className={`${styles.button} ${styles["button--wide"]}`}
                  onClick={async (event) => {
                    event.stopPropagation();
                    try {
                      await removeUserFromChat(chat.id, participant.id);
                    } catch (error) {
                      console.error("Ошибка в работе кнопки:", error);
                    }
                  }}
                  aria-label="Удалить участника"
                >
                  Удалить
                </Button>
              )}
            </li>
          ))}
        </ul>

        {isCurrentUserAdmin && (
          <form
            className={styles["info-participants-form"]}
            onKeyDown={handleKeyDown}
            onSubmit={(event) => {
              handleUpdateParticipant(event, chat.id, selectedUsers);
            }}
          >
            <div className={styles["info-participants-label"]}>
              Добавить новых участников
            </div>
            <ul className={styles["info-participants-list"]}>
              {users
                .filter(
                  (user) =>
                    user.id !== currentUser.id &&
                    !participants.find(
                      (participant) => participant.id === user.id,
                    ),
                )
                .map((user) => (
                  <li
                    key={user.id}
                    className={`${styles["info-participants-item"]} ${
                      selectedUsers.includes(user) ? styles.selected : ""
                    }`}
                  >
                    <label
                      htmlFor={`info-checkbox-${user.id}`}
                      className={styles["info-participants-label-checkbox"]}
                    >
                      {user.username}
                    </label>
                    <Input
                      className={styles["info-participants-checkbox"]}
                      type="checkbox"
                      value={user.username}
                      onChange={(event) =>
                        handleCheckboxChange(user, event.target.checked)
                      }
                      id={`info-checkbox-${user.id}`}
                    />
                  </li>
                ))}
            </ul>
            <Button
              type="submit"
              className={`${styles.button} ${styles["button--wide"]}`}
              disabled={selectedUsers.length === 0}
              aria-label="Добавить участников"
            >
              Добавить участников
            </Button>
          </form>
        )}
      </div>
    </div>
  );
};

export default MessagesInfo;
