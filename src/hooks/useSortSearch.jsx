import { useState, useMemo } from "react";

export const useSortSearch = (items = []) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSortItems = useMemo(() => {
    let result = items ? [...items] : [];
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();

      result = result.filter((item) => {
        const textToSearch = item.name || item.message || "";
        return textToSearch.toLowerCase().includes(query);
      });
    }
    return result;
  }, [items, searchQuery]);

  return { handleSortItems, searchQuery, setSearchQuery };
};

export default useSortSearch;
