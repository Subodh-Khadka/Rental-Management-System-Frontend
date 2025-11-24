// Formats ISO string to YYYY-MM-DDTHH:mm for input
export function formatDateTimeLocal(dateString) {
  if (!dateString) return "";
  const date = new Date(dateString);

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  return `${year}-${month}-${day}T${hours}:${minutes}`;
}

// Formats ISO string for **table display**: DD-MM-YYYY HH:mm
export function formatDateDisplay(dateString) {
  if (!dateString) return "N/A";
  const date = new Date(dateString);

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  return `${day}-${month}-${year}`;
}

export function ConvertToIsoString(dateTimeLocalValue) {
  if (!dateTimeLocalValue) return null;
  const date = new Date(dateTimeLocalValue);
  return date.toISOString();
}
