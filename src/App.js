import { use } from "react";
import UsersContext from "./context/UsersContext";
import { BrowserRouter } from "react-router-dom";
import AppRouter from "./router/AppRouter";

const App = () => {
  const { isAuth, handleLogin, handleLogout, users, currentUser } =
    use(UsersContext);

  return (
    <BrowserRouter>
      <AppRouter
        isAuth={isAuth}
        onLogin={handleLogin}
        onLogout={handleLogout}
        users={users}
        currentUser={currentUser}
      />
    </BrowserRouter>
  );
};

export default App;
