"use client";
import React from "react";
import { setAllowed } from "@stellar/freighter-api";

export interface ConnectButtonProps {
  label: string;
  isHigher?: boolean;
}

export default function ConnectButton({ label }: ConnectButtonProps) {
  return (
    <button
      className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded`}
      onClick={setAllowed}
    >
      {label}
    </button>
  );
}