export function parseDate(dateString: string): Date {
  const trimmedDate = dateString.trim();
  const parsedDate = new Date(trimmedDate);

  if (isNaN(parsedDate.getTime())) {
    throw new Error(`Invalid date: ${dateString}`);
  }

  return parsedDate;
}

export function formatDate(date: Date): string {
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export const convertToLocaleDateString = (date: Date): string => {
  return date.toLocaleDateString("en-US", {
    day: "2-digit",
    month: "short",
  });
};
