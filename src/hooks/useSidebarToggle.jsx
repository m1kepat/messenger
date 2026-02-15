import { use, useCallback } from "react";
import { SidebarContext } from "../context/SidebarContext";

export const useSidebarToggle = () => {
  const { isSidebarOpen, setIsSidebarOpen } = use(SidebarContext);

  const handleToggle = useCallback(
    (event) => {
      event.stopPropagation();
      setIsSidebarOpen(!isSidebarOpen);
    },
    [isSidebarOpen, setIsSidebarOpen],
  );

  return { handleToggle };
};

export default useSidebarToggle;
