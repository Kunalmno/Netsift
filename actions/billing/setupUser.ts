"use server";

import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export async function setUpUser() {
  const { userId } = auth();
  if (!userId) {
    throw new Error("unauthenticated");
  }
  const balance = await prisma.userBalance.findUnique({ where: { userId } });
  if (!balance) {
    await prisma.userBalance.create({
      data: {
        userId,
        credits: 100,
      },
    });
  }
  redirect("/");
}
