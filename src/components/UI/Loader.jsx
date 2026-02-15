const Loader = ({ children }) => {
  return (
    <div className="loader">
      <div className="loader-wheel"></div>
      <p>{children}</p>
    </div>
  );
};

export default Loader;
