import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number, currency: string) {
  return new Intl.NumberFormat("en", {
    style: "currency",
    currency,
    currencyDisplay: "narrowSymbol",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

/** Show real rating when > 0; treat 0 / missing as 1. Never falls back to hardcoded 3.5. */
export function displayRating(rating?: number | null) {
  return rating && rating > 0 ? rating : 1;
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
  fallbackUrl: string = "https://images.unsplash.com/vector-1742875355318-00d715aec3e8?q=80&w=1480&auto=format&fit=crop"
): string {
  return hasError ? fallbackUrl : originalSrc;
}

export function formatDateTime(date: string | Date, options?: Intl.DateTimeFormatOptions) {
  const dateObj = typeof date === "string" ? new Date(date) : date;

  const defaultOptions: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  };

  return new Intl.DateTimeFormat("en-US", { ...defaultOptions, ...options }).format(dateObj);
}

export function getStatusColor(status: string): string {
  switch (status.toLowerCase().replace(/\s+/g, "")) {
    case "negotiation":
    case "negotiating":
    case "advnegotiation":
    case "requestadvnegotiation":
      return "bg-[#EEF5FF] border-[#9EC5FF] text-[#007AFF]";
    case "awaitingconfirmation":
    case "awaitingvendorholdingfee":
    case "advancechargepaymentcompleted":
    case "resolution":
    case "published":
      return "bg-[#FFF9ED] border-[#F6C96B] text-[#C67C00]";
    case "confirmed":
    case "completed":
    case "swapped":
    case "advnegotiationswapped":
      return "bg-[#F0FFEE] border-[#8FD97F] text-[#2F8F22]";
    case "cancelled":
    case "failed":
    case "closed":
      return "bg-[#FFEEEE] border-[#FFADAD] text-[#E42222]";
    default:
      return "bg-[#F5F5F5] border-[#D9D9D9] text-[#737373]";
  }
}

export function formatSwapStatus(status: string): string {
  switch (status.toLowerCase().replace(/\s+/g, "")) {
    case "negotiation":
      return "Negotiating";
    case "awaitingconfirmation":
      return "Awaiting Confirmation";
    case "requestadvnegotiation":
      return "Advance Negotiation Request";
    case "advancechargepaymentcompleted":
      return "Advance Payment Done";
    case "awaitingvendorholdingfee":
      return "Awaiting Holding Fee";
    case "advnegotiation":
      return "Advance Negotiation";
    case "advnegotiationswapped":
      return "Advance Swap Completed";
    default:
      return status;
  }
}
