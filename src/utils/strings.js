export function truncateString(string, maxLength) {
  if (string) {
    if (string.length > maxLength) {
      return `${string.substring(0, maxLength)}...`;
    }
  }
  return string;
}

export const capitalizeFirstLetter = str =>
  str.charAt(0).toUpperCase() + str.slice(1);
