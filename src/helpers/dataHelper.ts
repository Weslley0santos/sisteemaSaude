export const isSameDay = (dateA: string, dateB: string) => {
  if (!dateA || !dateB) return false;

  const a = new Date(dateA);
  const b = new Date(dateB);

  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
};
