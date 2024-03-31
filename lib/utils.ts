import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function goBottomOfElement(selector: string) {
  const element = document.querySelector(selector)
  setTimeout(() => {
    if (element) {
      element.scrollTop = element.scrollHeight
    }
  }, 200)
}
