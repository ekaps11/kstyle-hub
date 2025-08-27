import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function createSlug(title: string) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function formatPrice(n?: number) {
  if (typeof n !== "number") return "-";
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(n * 16000);
}

export function capitalize(str: string) {
  return str
    .split(" ")
    .map((word) => word.replace(word[0], word[0].toUpperCase()))
    .join(" ");
}

export function getPaginatedProducts<T>(
  data: T[] | undefined,
  length: number,
  page: number,
  perPage: number
) {
  const totalPages = Math.ceil(length / perPage);
  const paginatedProducts =
    data?.slice((page - 1) * perPage, page * perPage).filter(Boolean) || [];

  return { totalPages, paginatedProducts };
}
