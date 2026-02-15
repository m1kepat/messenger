const useEnter = () => {
  const handleEnter = (event, callback) => {
    if (event.key === "Enter" && callback) {
      event.stopPropagation();
      callback();
    }
  };

  return { handleEnter };
};

export default useEnter;
