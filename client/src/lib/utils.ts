import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Email validation helper
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Password strength validation helper
export function validatePasswordStrength(password: string): {
  isValid: boolean;
  message: string;
} {
  const minLength = 8;
  const hasNumber = /\d/.test(password);
  const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  
  if (password.length < minLength) {
    return {
      isValid: false,
      message: `Password must be at least ${minLength} characters long`,
    };
  }
  
  if (!hasNumber) {
    return {
      isValid: false,
      message: "Password must contain at least one number",
    };
  }
  
  if (!hasSpecial) {
    return {
      isValid: false,
      message: "Password must contain at least one special character",
    };
  }
  
  return {
    isValid: true,
    message: "Password meets requirements",
  };
}

// Form field validator
export function validateField(
  fieldName: string,
  value: string,
  required: boolean = true
): { isValid: boolean; message: string } {
  if (required && (!value || value.trim() === "")) {
    return {
      isValid: false,
      message: `${fieldName} is required`,
    };
  }
  
  return {
    isValid: true,
    message: "",
  };
}

// Format currency helper
export function formatCurrency(
  amount: number,
  currency: string = "USD",
  locale: string = "en-US"
): string {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
  }).format(amount);
}

// Format percentage helper
export function formatPercentage(
  value: number,
  minimumFractionDigits: number = 0,
  maximumFractionDigits: number = 0
): string {
  return new Intl.NumberFormat("en-US", {
    style: "percent",
    minimumFractionDigits,
    maximumFractionDigits,
  }).format(value / 100);
}

// Truncate text helper
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + "...";
}
