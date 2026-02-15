import Login from "../pages/Login";
import Chat from "../pages/Chat";

export const privateRoutes = [
  { path: "/login", component: Login, exact: true },
  { path: "/chat", component: Chat, exact: true },
];

export const publicRoutes = [{ path: "/login", component: Login, exact: true }];
