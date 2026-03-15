import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: string | Date | null): string {
  if (!date) return "—";
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function isOverdue(updatedAt: string, hours = 48): boolean {
  const diff = Date.now() - new Date(updatedAt).getTime();
  return diff > hours * 60 * 60 * 1000;
}
