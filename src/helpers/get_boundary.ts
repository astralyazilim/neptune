export function getBoundary(header: string): string {
  const items = header.split(";");
  if (items) {
    for (let i = 0; i < items.length; i++) {
      const item = new String(items[i]).trim();
      if (item.indexOf("boundary") >= 0) {
        const k = item.split("=");
        return new String(k[1]).trim().replace(/^["']|["']$/g, "");
      }
    }
  }
  return "";
}
