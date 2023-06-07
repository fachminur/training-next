import { format, parseISO, isValid } from "date-fns";
import { id } from "date-fns/locale";

export const formatDate = (date, args = "default") => {
  if (!date) return "-";

  const formatValue = typeof date === "string" ? new Date(date) : date;
  if (!isValid(formatValue)) return "-";

  if (args?.format === "server") {
    return format(formatValue, "yyyy-MM-dd", { locale: id });
  }

  return format(formatValue, "dd/MM/yyyy", { locale: id });
};

export const formatDateServer = (date) => {
  if (!date) return "-";

  const formatValue = typeof date === "string" ? new Date(date) : date;

  return format(formatValue, "yyyy-MM-dd", { locale: id });
};

export const formatDateTime = (date) => {
  const formatValue = typeof date === "string" ? new Date(date) : date;

  return format(formatValue, "dd/MM/yyyy HH:mm", { locale: id });
};

export const getCurrentDate = () =>
  format(new Date(), "EEEE, dd MMMM yyyy", { locale: id });

export const parseDateObject = (date) => {
  return {
    year: date.getFullYear(),
    month: date.getMonth() + 1,
    day: date.getDate(),
  };
};

export const parseDateType = (date) => {
  return new Date(date.year, date.month - 1, date.day);
};

export const formatDateObject = (date) => {
  return format(new Date(date.year, date.month - 1, date.day), "dd/MM/yyyy", {
    locale: id,
  });
};
export const parseISODate = (date) => {
  return parseISO(date);
};

export const formatDateInd = (isoString) => {
  if (!isoString) return "-";

  const date = new Date(isoString);

  const options = {
    year: "numeric",
    month: "short",
    day: "numeric",
  };

  return new Date(date).toLocaleDateString("id-ID", options);
};

export function getDifferenceInDays(date1, date2) {
  const oneDay = 24 * 60 * 60 * 1000; // Satu hari dalam milidetik
  const diffInTime = Math.abs(date2 - date1); // Selisih waktu dalam milidetik
  const diffInDays = Math.round(diffInTime / oneDay); // Selisih hari bulat
  return diffInDays;
}
