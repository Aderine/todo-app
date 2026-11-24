export default function normalizeDueDate(value) {
  if (typeof value !== "string") return "";

  const date = value
    .trim()
    .replace(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/, "$3-$2-$1");
  const parts = /^(\d{4})-(\d{1,2})-(\d{1,2})$/.exec(date);
  if (!parts) return "";

  const [, year, month, day] = parts;
  const normalized = `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
  const parsed = new Date(normalized);

  if (year === "0000" || Number.isNaN(parsed.getTime())) return "";
  return parsed.toISOString().slice(0, 10) === normalized ? normalized : "";
}
