export function parseToDate(
  value: string | Date | number | undefined
): Date | null {
  if (!value) return null;
  if (value instanceof Date) return value;
  // try numeric
  if (typeof value === "number") return new Date(value);
  // try ISO / fallback
  const parsed = new Date(value);
  if (!isNaN(parsed.getTime())) return parsed;
  return null;
}

export function formatDate(
  value: string | Date | number | undefined,
  opts?: { relative?: boolean; locale?: string }
) {
  const locale = opts?.locale ?? "vi-VN";
  const relative = !!opts?.relative;
  const dt = parseToDate(value);
  if (!dt) return "";

  if (relative) {
    const now = Date.now();
    const diffMs = now - dt.getTime();
    const sec = Math.floor(diffMs / 1000);
    if (sec < 60) return `${sec} giây trước`;
    const min = Math.floor(sec / 60);
    if (min < 60) return `${min} phút trước`;
    const hrs = Math.floor(min / 60);
    if (hrs < 24) return `${hrs} giờ trước`;
    const days = Math.floor(hrs / 24);
    if (days < 30) return `${days} ngày trước`;
    // fallback to full date
  }

  // Full localized format: e.g., 1 thg 1, 2025, 18:37
  try {
    const df = new Intl.DateTimeFormat(locale, {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    } as Intl.DateTimeFormatOptions);
    return df.format(dt);
  } catch (e) {
    // fallback
    return dt.toLocaleString(locale);
  }
}

export default formatDate;
