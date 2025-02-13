const getMonthsBetweenDates = (startDate: string, endDate: string): number => {
  if (!startDate || !endDate) {
    return 0;
  }
  const start = new Date(startDate);
  const end = new Date(endDate);

  const yearsDiff = end.getFullYear() - start.getFullYear();
  const monthsDiff = end.getMonth() - start.getMonth();

  return yearsDiff * 12 + monthsDiff;
};

export default getMonthsBetweenDates;
