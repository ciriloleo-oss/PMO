export function formatCurrencyBRL(value: number | null | undefined) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    maximumFractionDigits: 0,
  }).format(value ?? 0);
}

export function formatDateBR(value: string | null | undefined) {
  if (!value) return "-";
  return new Intl.DateTimeFormat("pt-BR").format(new Date(value));
}

export function humanizeStatus(status: string) {
  return status
    .replaceAll("_", " ")
    .replace(/\b\w/g, (m) => m.toUpperCase());
}
