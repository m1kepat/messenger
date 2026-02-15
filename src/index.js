import React from "react";
import ReactDOM from "react-dom/client";
import { UsersProvider } from "./context/UsersContext";
import { ChatsProvider } from "./context/ChatsContext";
import { SidebarProvider } from "./context/SidebarContext";
import { MessageProvider } from "./context/MessageContext";

import App from "./App";
import "./styles/main.scss";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <UsersProvider>
      <ChatsProvider>
        <SidebarProvider>
          <MessageProvider>
            <App />
          </MessageProvider>
        </SidebarProvider>
      </ChatsProvider>
    </UsersProvider>
  </React.StrictMode>,
);
