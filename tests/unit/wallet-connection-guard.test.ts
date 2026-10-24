import { describe, it, expect } from "vitest";

describe("Wallet Connection Guard for Token Purchase", () => {
  it("should evaluate wallet connection status correctly", () => {
    const isConnectedWithAddress = (addr?: string | null) => Boolean(addr && addr.trim().length > 0);

    expect(isConnectedWithAddress("")).toBe(false);
    expect(isConnectedWithAddress(null)).toBe(false);
    expect(isConnectedWithAddress(undefined)).toBe(false);
    expect(isConnectedWithAddress("   ")).toBe(false);

    expect(isConnectedWithAddress("GBX6Q2...49XZ")).toBe(true);
    expect(isConnectedWithAddress("0x1234567890abcdef")).toBe(true);
  });

  it("should prevent participation mutation if wallet is not connected", () => {
    let connected = false;
    let mutated = false;
    let connectModalOpened = false;

    const handleConnect = () => {
      connectModalOpened = true;
    };

    const handleParticipate = () => {
      if (!connected) {
        handleConnect();
        return;
      }
      mutated = true;
    };

    // Attempt participate without wallet
    handleParticipate();
    expect(mutated).toBe(false);
    expect(connectModalOpened).toBe(true);

    // Now connect wallet
    connected = true;
    handleParticipate();
    expect(mutated).toBe(true);
  });
});
