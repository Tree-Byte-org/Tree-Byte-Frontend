export enum ErrorSeverity {
  info = "info",
  warning = "warning",
  error = "error",
  critical = "critical",
}

export enum ErrorCategory {
  network = "network",
  validation = "validation",
  auth = "auth",
  stellar = "stellar",
  unknown = "unknown",
}

export interface AppError {
  code: string;
  message: string;
  category: ErrorCategory;
  severity: ErrorSeverity;
  context?: Record<string, unknown>;
  timestamp: string; // ISO
}

export type NetworkError = AppError & {
  category: ErrorCategory.network;
  status?: number;
};

export type ValidationError = AppError & {
  category: ErrorCategory.validation;
  fieldErrors?: Record<string, string>;
};

export type AuthError = AppError & {
  category: ErrorCategory.auth;
};

export function isAppError(value: unknown): value is AppError {
  if (!value || typeof value !== "object") return false;
  const maybe = value as Partial<AppError>;
  return (
    typeof maybe.code === "string" &&
    typeof maybe.message === "string" &&
    typeof maybe.category === "string" &&
    typeof maybe.severity === "string" &&
    typeof maybe.timestamp === "string"
  );
}

function baseError(
  code: string,
  message: string,
  category: ErrorCategory,
  severity: ErrorSeverity,
  context?: Record<string, unknown>
): AppError {
  return {
    code,
    message,
    category,
    severity,
    context,
    timestamp: new Date().toISOString(),
  };
}

function fromNetwork(
  message: string,
  status?: number,
  context?: Record<string, unknown>
): NetworkError {
  const severity = status && status >= 500 ? ErrorSeverity.error : ErrorSeverity.warning;
  return {
    ...baseError(
      "NETWORK/REQUEST_FAILED",
      message,
      ErrorCategory.network,
      severity,
      { status, ...context }
    ),
    category: ErrorCategory.network,
    status,
  };
}

function fromValidation(
  message: string,
  fieldErrors?: Record<string, string>,
  context?: Record<string, unknown>
): ValidationError {
  return {
    ...baseError(
      "VALIDATION/SCHEMA",
      message,
      ErrorCategory.validation,
      ErrorSeverity.warning,
      { fieldErrors, ...context }
    ),
    category: ErrorCategory.validation,
    fieldErrors,
  };
}

function fromAuth(message: string, code = "AUTH/UNKNOWN", context?: Record<string, unknown>): AuthError {
  return {
    ...baseError(code, message, ErrorCategory.auth, ErrorSeverity.error, context),
    category: ErrorCategory.auth,
  };
}

function fromStellar(message: string, context?: Record<string, unknown>): AppError {
  return baseError("STELLAR/ERROR", message, ErrorCategory.stellar, ErrorSeverity.error, context);
}

export function normalizeError(
  value: unknown,
  context?: Record<string, unknown>
): AppError {
  try {
    // Already an AppError
    if (isAppError(value)) {
      return value;
    }

    // Fetch Response-like
    if (value && typeof value === "object" && "status" in (value as any) && "ok" in (value as any)) {
      const res = value as Response & { data?: unknown };
      const status = (res as any).status as number | undefined;
      return fromNetwork(`HTTP ${status ?? "?"}`, status, { ...context });
    }

    // Error instance
    if (value instanceof Error) {
      const name = value.name?.toLowerCase() || "error";
      const msg = value.message || "Unexpected error";

      // Heuristics
      if (/network|fetch|http/.test(name + msg)) return fromNetwork(msg, undefined, context);
      if (/validat|zod|schema/.test(name + msg)) return fromValidation(msg, undefined, context);
      if (/auth|token|login|register/.test(name + msg)) return fromAuth(msg, "AUTH/ERROR", context);
      if (/stellar|horizon|friendbot|wallet/.test(name + msg)) return fromStellar(msg, context);

      return baseError("UNKNOWN/ERROR", msg, ErrorCategory.unknown, ErrorSeverity.error, context);
    }

    // String
    if (typeof value === "string") {
      return baseError("UNKNOWN/STRING", value, ErrorCategory.unknown, ErrorSeverity.error, context);
    }

    // Fallback
    return baseError("UNKNOWN/THROWN", "An unknown error occurred", ErrorCategory.unknown, ErrorSeverity.error, {
      original: value,
      ...context,
    });
  } catch (e) {
    return baseError("NORMALIZE/FAILED", "Failed to process error", ErrorCategory.unknown, ErrorSeverity.error, {
      original: value,
      normalizeError: (e as Error)?.message,
      ...context,
    });
  }
}


