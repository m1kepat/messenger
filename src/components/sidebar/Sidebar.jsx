import { use } from "react";
import ChatsContext from "../../context/ChatsContext";
import UsersContext from "../../context/UsersContext";
import SidebarContext from "../../context/SidebarContext";
import useSortSearch from "../../hooks/useSortSearch";
import styles from "../../styles/components/sidebar/Sidebar.module.scss";
import SideBarHeader from "./SidebarHeader";
import SidebarList from "./SidebarList";
import SidebarNewChat from "./SidebarNewChat";

const Sidebar = () => {
  const { chats, isLoading, error, fetchChats, setSelectedChat } =
    use(ChatsContext);
  const { currentUser } = use(UsersContext);
  const { isSidebarOpen } = use(SidebarContext);

  const {
    handleSortItems: filteredChats,
    searchQuery,
    setSearchQuery,
  } = useSortSearch(chats);

  return (
    <div
      className={`${styles["sidebar"]} ${!isSidebarOpen ? "" : styles["sidebar-closed"]}`}
    >
      <div className={styles["sidebar-main"]}>
        <SideBarHeader
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
        <SidebarList
          searchQuery={searchQuery}
          currentUser={currentUser}
          chats={filteredChats}
          setSelectedChat={setSelectedChat}
          isLoading={isLoading}
          error={error}
        />
      </div>
      <SidebarNewChat currentUser={currentUser} onChatCreated={fetchChats} />
    </div>
  );
};

export default Sidebar;
