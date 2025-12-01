import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(amount: number, currency: string) {
  return new Intl.NumberFormat('en', {
    style: 'currency',
    currency,
    currencyDisplay: 'narrowSymbol',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount)
}

export function createImageErrorHandler(
  setErrorState: (error: boolean) => void,
  fallbackUrl: string = "https://plus.unsplash.com/premium_photo-1664537979073-a467fa628555?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=2371"
) {
  return () => {
    setErrorState(true);
  };
}

export function getImageSrcWithFallback(
  originalSrc: string,
  hasError: boolean,
  fallbackUrl: string = "https://plus.unsplash.com/premium_photo-1664537979073-a467fa628555?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=2371"
): string {
  return hasError ? fallbackUrl : originalSrc;
}

export function formatDateTime(date: string | Date, options?: Intl.DateTimeFormatOptions) {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  const defaultOptions: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  };
  
  return new Intl.DateTimeFormat('en-US', { ...defaultOptions, ...options }).format(dateObj);
}

export function getStatusColor(status: string): string {
  switch (status.toLowerCase()) {
    case "negotiating":
      return "bg-[#FFF9ED] border-[#FFF1D5] text-[#F6A301]";
    case "confirmed":
    case "completed":
    case "swapped":
      return "bg-[#F0FFEE] border-[#C0FFB6] text-[#3DAB2B]";
    case "cancelled":
    case "failed":
      return "bg-[#FFEEEE] border-[#FFADAD] text-[#E42222]";
    default:
      return "bg-[#E4FFE8] border-[#E4FFE8] text-[#68CC58]";
  }
}