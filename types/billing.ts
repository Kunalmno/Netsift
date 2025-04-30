import { string } from "zod";

export enum PackId {
  SMALL = "SMALL",
  MEDIUM = "MEDIUM",
  LARGE = "LARGE",
}

export type CreditsPack = {
  id: PackId;
  name: string;
  label: string;
  credits: number;
  price: number;
  priceId: string;
};

export const CreditsPack: CreditsPack[] = [
  {
    id: PackId.SMALL,
    name: "Small Pack",
    label: "1,000 credits",
    credits: 1000,
    price: 86000, //$9.99 or 860 Rupee
    priceId: process.env.STRIPE_SMALL_PACK_PRICE_ID!,
  },
  {
    id: PackId.MEDIUM,
    name: "Medium Pack",
    label: "5,000 credits",
    credits: 5000,
    price: 344000, //$39.99 or 3,440 Rupee
    priceId: process.env.STRIPE_MEDIUM_PACK_PRICE_ID!,
  },
  {
    id: PackId.LARGE,
    name: "Large Pack",
    label: "10,000 credits",
    credits: 10000,
    price: 602100, //$69.99 or 6021 Rupee
    priceId: process.env.STRIPE_LARGE_PACK_PRICE_ID!,
  },
];

export const getCreditsPack = (id: PackId) =>
  CreditsPack.find((p) => p.id === id);
