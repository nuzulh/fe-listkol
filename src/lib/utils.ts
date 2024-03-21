import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function countParser(n: number | null) {
  if (!n) return 'N/A'
  if (n > 1000 && n < 10000) return '>1k'
  if (n > 10000 && n < 100000) return '>10k'
  if (n > 100000 && n < 1000000) return '>100k'
  if (n > 1000000 && n < 10000000) return '>1M'
  if (n > 10000000 && n < 100000000) return '>10M'
  if (n > 100000000) return '>100M'
}
