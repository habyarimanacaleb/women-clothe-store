// app/api/momo/pay/route.ts
import { NextResponse } from "next/server";
import crypto from "crypto";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log("Incoming request:", body);

    const { amount, phoneNumber } = body;
    const referenceId = crypto.randomUUID();

    const baseUrl = process.env.MOMO_BASE_URL!;
    const subscriptionKey = process.env.MOMO_SUBSCRIPTION_KEY!;
    const apiUser = process.env.MOMO_USER_ID!;
    const apiKey = process.env.MOMO_PRIMARY_KEY!;
    const targetEnv = process.env.MOMO_ENV!;

    // Step 1: Get access token
    const tokenRes = await fetch(`${baseUrl}/collection/token/`, {
      method: "POST",
      headers: {
        Authorization: `Basic ${Buffer.from(`${apiUser}:${apiKey}`).toString("base64")}`,
        "Ocp-Apim-Subscription-Key": subscriptionKey,
      },
    });

    const tokenData = await tokenRes.json();
    const accessToken = tokenData.access_token;
    if (!accessToken) throw new Error("Failed to get access token");

    // Step 2: Initiate payment
    const url = `${baseUrl}/collection/v1_0/requesttopay`;
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "X-Reference-Id": referenceId,
        "X-Target-Environment": targetEnv,
        "Ocp-Apim-Subscription-Key": subscriptionKey,
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount,
        currency: "RWF",
        externalId: "123456",
        payer: { partyIdType: "MSISDN", partyId: phoneNumber },
        payerMessage: "Clothing Store Purchase",
        payeeNote: "Payment received successfully",
      }),
    });

    if (!res.ok) {
      const err = await res.text();
      console.error("Payment error:", err);
      return NextResponse.json({ error: "Payment initiation failed" }, { status: 400 });
    }

    // Step 3: Wait and check payment status
    await new Promise((r) => setTimeout(r, 5000));

    const statusUrl = `${baseUrl}/collection/v1_0/requesttopay/${referenceId}`;
    const statusRes = await fetch(statusUrl, {
      headers: {
        "X-Target-Environment": targetEnv,
        "Ocp-Apim-Subscription-Key": subscriptionKey,
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!statusRes.ok) {
      const errText = await statusRes.text();
      console.error("Status check failed:", errText);
      return NextResponse.json({ error: "Status check failed" }, { status: 400 });
    }

    const statusData = await statusRes.json();

    return NextResponse.json({
      success: statusData.status === "SUCCESSFUL",
      referenceId,
      status: statusData.status,
    });
  } catch (error: any) {
    console.error("MoMo error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
