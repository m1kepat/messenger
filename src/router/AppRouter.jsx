import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/Login";
import Chat from "../pages/Chat";
import NotFound from "../pages/NotFound";

const AppRouter = ({ isAuth, onLogin }) => {
  return (
    <Routes>
      {isAuth ? (
        <>
          <Route path="*" element={<Navigate to="/chat" />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="error" element={<NotFound />} />
        </>
      ) : (
        <>
          <Route path="*" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login onLogin={onLogin} />} />
          <Route path="error" element={<NotFound />} />
        </>
      )}
    </Routes>
  );
};

export default AppRouter;
