"use client";

import { toast } from "sonner";
import { AppError, ErrorSeverity, ErrorCategory } from "@/types/error";

function getTitleByCategory(category: ErrorCategory): string {
  switch (category) {
    case ErrorCategory.network:
      return "Network issue";
    case ErrorCategory.validation:
      return "Validation error";
    case ErrorCategory.auth:
      return "Authentication error";
    case ErrorCategory.stellar:
      return "Stellar error";
    default:
      return "Something went wrong";
  }
}

export function showErrorToast(error: AppError) {
  const title = getTitleByCategory(error.category);
  const description = error.message;

  switch (error.severity) {
    case ErrorSeverity.info:
      return toast(title, { description });
    case ErrorSeverity.warning:
      return toast.warning(title, { description });
    case ErrorSeverity.critical:
    case ErrorSeverity.error:
    default:
      return toast.error(title, { description, duration: 6000 });
  }
}


