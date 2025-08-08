"use client";

import React from "react";
import { ErrorFallback } from "@/components/error-fallback";
import { logError } from "@/utils/error-logger";

type ErrorBoundaryProps = {
  children: React.ReactNode;
};

type ErrorBoundaryState = {
  hasError: boolean;
  error: unknown;
};

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: unknown): ErrorBoundaryState {
    return { hasError: true, error } as ErrorBoundaryState;
  }

  componentDidCatch(error: unknown, errorInfo: unknown): void {
    logError({
      code: "REACT/BOUNDARY",
      message: (error as Error)?.message || "Render error",
      category: 4 as any, // will be normalized in logger; keep minimal here
      severity: 2 as any,
      timestamp: new Date().toISOString(),
      context: { errorInfo },
    });
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  render(): React.ReactNode {
    if (this.state.hasError) {
      return <ErrorFallback error={this.state.error} onRetry={this.handleReset} />;
    }
    return this.props.children;
  }
}

export function GlobalErrorHandlers() {
  React.useEffect(() => {
    const onError = (message: string | Event, source?: string, lineno?: number, colno?: number, error?: Error) => {
      logError({
        code: "WINDOW/ERROR",
        message: typeof message === "string" ? message : "Window error",
        category: 4 as any,
        severity: 2 as any,
        timestamp: new Date().toISOString(),
        context: { source, lineno, colno, stack: error?.stack },
      });
      return false;
    };

    const onUnhandledRejection = (event: PromiseRejectionEvent) => {
      logError({
        code: "WINDOW/UNHANDLED_REJECTION",
        message: (event.reason as Error)?.message || "Unhandled promise rejection",
        category: 4 as any,
        severity: 2 as any,
        timestamp: new Date().toISOString(),
        context: { reason: event.reason },
      });
    };

    window.addEventListener("error", onError as any);
    window.addEventListener("unhandledrejection", onUnhandledRejection);
    return () => {
      window.removeEventListener("error", onError as any);
      window.removeEventListener("unhandledrejection", onUnhandledRejection);
    };
  }, []);

  return null;
}


