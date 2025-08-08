"use client";

import { useCallback } from "react";
import { normalizeError, type AppError } from "@/types/error";
import { logError } from "@/utils/error-logger";
import { showErrorToast } from "@/components/ui/error-toast";

interface HandleErrorOptions {
  context?: Record<string, unknown>;
  toast?: boolean;
}

export function useErrorHandler() {
  const handleError = useCallback((error: unknown, options?: HandleErrorOptions): AppError => {
    const appError = normalizeError(error, options?.context);
    logError(appError);
    if (options?.toast !== false) {
      showErrorToast(appError);
    }
    return appError;
  }, []);

  return { handleError } as const;
}


