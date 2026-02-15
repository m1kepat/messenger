import { useState, useRef, useEffect, useCallback } from "react";
import useClickOutside from "../../hooks/useClickOutside";
import useFormatDate from "../../hooks/useFormatDate";
import useEnter from "../../hooks/useEnter";
import axios from "axios";
import Input from "../UI/Input";
import Button from "../UI/Button";
import Loader from "../UI/Loader";
import styles from "../../styles/components/sidebar/SidebarNewChat.module.scss";

const SidebarNewChat = ({ currentUser, onChatCreated }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const modalRef = useRef(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [name, setChatName] = useState("");
  const [isSubmit, setIsSubmit] = useState(false);
  const { handleEnter } = useEnter();
  const { formatDate } = useFormatDate();

  const handleClose = useCallback(() => {
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      setSelectedUsers([]);
      setChatName("");
      setIsModalOpen(false);
      setError("");
    }, 500);
  }, []);

  useClickOutside(modalRef, isModalOpen && !isClosing, handleClose);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setError("");

        const response = await fetch(
          "https://hr2.sibers.com/test/frontend/users.json",
        );
        const users = await response.json();
        setUsers(users.filter((user) => user.id !== currentUser?.id));
      } catch {
        setError("Ошибка загрузки списка пользователей");
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, [currentUser?.id]);

  const handleCheckboxChange = (userId, isChecked) => {
    if (isChecked) {
      setSelectedUsers((prev) => [...prev, userId]);
    } else {
      setSelectedUsers((prev) => prev.filter((id) => id !== userId));
    }
  };

  const participantAdmin = currentUser
    ? {
        id: currentUser.id,
        username: currentUser.username,
        isAdmin: true,
      }
    : null;

  const handleCreateChat = async (event) => {
    event.preventDefault();

    if (selectedUsers.length === 0 || !currentUser) return;

    try {
      const chat = {
        id: `chat_${Date.now()}`,
        name: name.trim(),
        participants: [
          participantAdmin,
          ...users
            .filter((user) => selectedUsers.includes(user.id))
            .map((user) => ({
              id: user.id,
              username: user.username,
              isAdmin: currentUser?.id === user.id,
            })),
        ],
        messages: [],
        createdAt: formatDate(),
      };

      await axios.post("http://localhost:4000/chats", chat, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      onChatCreated();
      handleClose();
    } catch (error) {
      console.error("Ошибка при создании чата:", error);
    } finally {
      setIsSubmit(false);
    }
  };

  return (
    <>
      <Button
        className={styles.button}
        onMouseDown={(event) => {
          event.stopPropagation();
          setIsModalOpen(!isModalOpen);
        }}
        aria-label="Создать чат"
        title="Создать чат"
      >
        <div className={styles.button_icon}>
          <svg
            width="27"
            height="27"
            viewBox="0 0 27 27"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4.19015 19.4118L1.79496 24.8865C1.44172 25.6939 2.22986 26.5303 3.05682 26.2257L9.97245 23.6778C10.2242 23.585 10.4548 23.4426 10.6504 23.2588L25.2767 9.51903C26.127 8.72026 26.1159 7.36623 25.2527 6.58145L22.7229 4.28171C21.9503 3.57928 20.7673 3.58951 20.0069 4.30519L4.65173 18.757C4.45529 18.9419 4.29828 19.1646 4.19015 19.4118Z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </div>
      </Button>
      {isModalOpen && (
        <div
          className={`${styles.modal} ${isClosing ? styles.out : ""}`}
          ref={modalRef}
        >
          <form
            className={styles["modal-form"]}
            onSubmit={handleCreateChat}
            onKeyDown={(event) =>
              handleEnter(event, () => handleCreateChat(event))
            }
          >
            <div className={styles["modal-header"]}>
              <span className={styles["modal-label"]}>Создать новый чат</span>
              <Button
                className={styles.button}
                type="button"
                aria-label="Закрыть"
                title="Закрыть"
                onClick={() => {
                  handleClose();
                }}
              >
                X
              </Button>
            </div>
            <Input
              className={styles["modal-input"]}
              placeholder="Имя чата"
              value={name}
              onChange={(event) => setChatName(event.target.value)}
            />
            {isLoading ? (
              <Loader>Загрузка пользователей...</Loader>
            ) : error ? (
              <span className={styles.error}>
                Ошибка при загрузки пользователей
              </span>
            ) : (
              <div className={styles["modal-participants"]}>
                <span className={styles["modal-participants-label"]}>
                  Выберите участников:
                </span>
                <ul className={styles["modal-participants-list"]}>
                  {users.map((user) => (
                    <li
                      key={user.id}
                      className={`${styles["modal-participants-item"]} ${
                        selectedUsers.includes(user.id) ? styles.selected : ""
                      }`}
                    >
                      <label
                        className={styles["modal-participants-username"]}
                        htmlFor={`modal-checkbox-${user.id}`}
                      >
                        {user.username}
                      </label>
                      <Input
                        className={styles["modal-participants-checkbox"]}
                        type="checkbox"
                        value={user.id}
                        checked={selectedUsers.includes(user.id)}
                        onChange={(event) =>
                          handleCheckboxChange(user.id, event.target.checked)
                        }
                        id={`modal-checkbox-${user.id}`}
                      />
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <Button
              className={`${styles.button} ${styles["button--wide"]}`}
              disabled={name.trim().length === 0 || selectedUsers.length === 0}
              type="submit"
            >
              Создать чат
            </Button>
          </form>
        </div>
      )}
    </>
  );
};

export default SidebarNewChat;
