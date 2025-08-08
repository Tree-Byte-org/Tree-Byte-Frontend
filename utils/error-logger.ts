"use client";

import { normalizeError, type AppError } from "@/types/error";
import { useGlobalAuthenticationStore } from "@/data";

const sentErrors = new Set<string>();

function getUserContext() {
  try {
    const state = (useGlobalAuthenticationStore as any).getState?.();
    const address = state?.address as string | undefined;
    return { address };
  } catch {
    return {} as Record<string, unknown>;
  }
}

function makeDedupKey(error: AppError): string {
  const base = `${error.code}|${error.message}|${error.category}|${error.severity}`;
  const status = (error as any).status ?? "";
  return `${base}|${status}`;
}

export function logError(error: AppError | unknown) {
  const appError = normalizeError(error);
  const user = getUserContext();
  const payload = { ...appError, user };

  const key = makeDedupKey(appError);
  if (sentErrors.has(key)) return;
  sentErrors.add(key);

  if (process.env.NODE_ENV !== "production") {
    // eslint-disable-next-line no-console
    console.error("[AppError]", payload);
  }

  const shouldReport =
    typeof window !== "undefined" &&
    (window as any).navigator?.onLine &&
    process.env.NEXT_PUBLIC_CLIENT_ERROR_REPORTING === "true" &&
    !!process.env.NEXT_PUBLIC_API_URL;

  if (shouldReport) {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/logs/client`;
    try {
      void fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        keepalive: true,
      });
    } catch {
      // swallow
    }
  }
}


