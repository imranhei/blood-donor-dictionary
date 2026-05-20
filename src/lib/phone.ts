export function normalizeBangladeshiPhone(phone: string) {
  const cleaned = phone.replace(/[\s-]/g, "");

  if (cleaned.startsWith("+88")) {
    return cleaned.slice(3);
  }

  if (cleaned.startsWith("88")) {
    return cleaned.slice(2);
  }

  return cleaned;
}

export function isValidBangladeshiPhone(phone: string) {
  const normalized = normalizeBangladeshiPhone(phone);

  return /^01[3-9]\d{8}$/.test(normalized);
}