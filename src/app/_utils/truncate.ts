export const truncateName = (name: string, maxLength: number = 10): string => {
  if (!name) return "";
  if (name.length <= maxLength) return name;
  return name.slice(0, maxLength) + "…";
};
