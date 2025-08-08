import { NextResponse } from "next/server";

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

export async function POST(req: Request) {
  try {
    const { encryptedKey, passphrase } = (await req.json()) ?? {};

    if (!isNonEmptyString(encryptedKey) || !isNonEmptyString(passphrase)) {
      return NextResponse.json(
        { error: "Invalid payload: 'encryptedKey' and 'passphrase' are required" },
        { status: 400 }
      );
    }

    if (passphrase.trim().length < 8) {
      return NextResponse.json(
        { error: "Passphrase must be at least 8 characters long" },
        { status: 422 }
      );
    }

    // Mocked recovery: in a real implementation, decrypt with passphrase and return publicKey
    const mockPublicKey = "GTESTPUBLICKEYMOCKED1234567890";

    return NextResponse.json({ publicKey: mockPublicKey });
  } catch (error) {
    return NextResponse.json({ error: "Recovery failed" }, { status: 500 });
  }
}
