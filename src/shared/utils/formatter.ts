import { format } from "date-fns"; // Ya está importado

export const formatDate = (date: Date | null | undefined): string | null | undefined => {
  if (date) {
    return format(date, 'dd/MM/yy');
  }
  return null;
};