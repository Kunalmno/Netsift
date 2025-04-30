import prisma from "@/lib/prisma";
import { stripe } from "@/lib/stripe/stripe";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { userId } = auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { id } = body;

    const purchase = await prisma.userPurchase.findUnique({
      where: {
        id,
        userId,
      },
    });

    if (!purchase) {
      return NextResponse.json(
        { error: "Purchase not found" },
        { status: 404 }
      );
    }

    const session = await stripe.checkout.sessions.retrieve(purchase.stripeId);

    if (!session.invoice) {
      return NextResponse.json(
        { error: "Invoice not available" },
        { status: 404 }
      );
    }

    const invoice = await stripe.invoices.retrieve(session.invoice as string);

    return NextResponse.json({ url: invoice.hosted_invoice_url });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
