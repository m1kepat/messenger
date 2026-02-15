import { createContext, useState, useEffect, useMemo } from "react";

export const UsersContext = createContext();

export const UsersProvider = ({ children }) => {
  const [isAuth, setIsAuth] = useState(false);
  const [loginValue, setLoginValue] = useState("");
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const savedLogin = localStorage.getItem("chat_login");
    const savedAuth = localStorage.getItem("chat_isAuth");

    if (savedLogin && savedAuth) {
      setLoginValue(savedLogin);
      setIsAuth(true);
    }
  }, []);

  const handleLogin = (login) => {
    setLoginValue(login);
    setIsAuth(true);

    localStorage.setItem("chat_login", login);
    localStorage.setItem("chat_isAuth", true);
  };

  const handleLogout = () => {
    localStorage.clear();
    sessionStorage.clear();
    window.location.reload();
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(
          "https://hr2.sibers.com/test/frontend/users.json",
        );
        const users = await response.json();

        setUsers(users);
      } catch (error) {
        console.error("Ошибка загрузки списка пользователей");
      }
    };

    fetchUsers();
  }, []);

  const currentUser = useMemo(() => {
    return users.find(
      (user) => user.username === loginValue || user.email === loginValue,
    );
  }, [users, loginValue]);

  return (
    <UsersContext.Provider
      value={{
        isAuth,
        handleLogin,
        handleLogout,
        users,
        setUsers,
        currentUser,
      }}
    >
      {children}
    </UsersContext.Provider>
  );
};

export default UsersContext;
