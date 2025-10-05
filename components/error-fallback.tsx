"use client";

import React from "react";
import { AppError, ErrorCategory, ErrorSeverity, normalizeError } from "@/types/error";
import { Button } from "@/components/ui/button";

interface ErrorFallbackProps {
  error?: unknown;
  onRetry?: () => void;
}

export function ErrorFallback({ error, onRetry }: ErrorFallbackProps) {
  const appError: AppError = normalizeError(error);

  const titleByCategory: Record<ErrorCategory, string> = {
    [ErrorCategory.network]: "Network issue",
    [ErrorCategory.validation]: "Validation error",
    [ErrorCategory.auth]: "Authentication error",
    [ErrorCategory.stellar]: "Stellar error",
    [ErrorCategory.unknown]: "Something went wrong",
  };

  const accent = appError.severity === ErrorSeverity.warning ? "text-yellow-600" : "text-red-600";

  return (
    <div className="w-full min-h-[40vh] flex items-center justify-center p-6">
      <div className="max-w-xl w-full text-center space-y-4 border rounded-lg p-6 bg-background">
        <h2 className={`text-xl font-semibold ${accent}`}>{titleByCategory[appError.category]}</h2>
        <p className="text-sm text-muted-foreground">{appError.message}</p>
        <div className="flex items-center justify-center gap-3 pt-2">
          {onRetry && (
            <Button onClick={onRetry} className="bg-primary text-black hover:opacity-90">Retry</Button>
          )}
          <Button variant="outline" onClick={() => (window.location.href = "/")}>Go home</Button>
          <Button variant="ghost" onClick={() => (window.location.href = "mailto:treebyte.web3@gmail.com")}>Contact support</Button>
        </div>
        <div className="text-xs text-muted-foreground/70 pt-2">
          <span>Code: {appError.code}</span>
        </div>
      </div>
    </div>
  );
}


