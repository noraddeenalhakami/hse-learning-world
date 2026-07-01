import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatEnglishTerms(text: string): string {
  return text.replace(/\(([A-Za-z][A-Za-z\s/&-]+)\)/g, '<span class="english-term" data-term="$1">$1</span>');
}
