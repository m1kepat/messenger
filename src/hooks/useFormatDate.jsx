export const useFormatDate = () => {
  const formatDate = (date = new Date()) => {
    const formatNumber = (number) => (number + "").padStart(2, "0");

    const res = `${formatNumber(date.getMonth() + 1)}.${formatNumber(date.getDate())}, ${formatNumber(date.getHours())}:${formatNumber(date.getMinutes())}`;

    return res;
  };

  return { formatDate };
};

export default useFormatDate;
