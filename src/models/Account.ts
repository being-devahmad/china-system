import mongoose, { Schema, Document, model, models } from "mongoose";

export interface IShopAccount extends Document {
  shopPicture: string;
  shopNo: string;
  mobileBoss: string;
  mobileMiss: string;
  mobileManager: string;
  mobileFactory: string;
  accountType: "expense" | "company" | "supplier" | "shopkeeper";
  shopAddress: string;
  city: string;
  email: string;
  bankAccounts: string[];
  createdAt: Date;
}

const ShopAccountSchema = new Schema<IShopAccount>(
  {
    shopPicture: { type: String, default: "" },
    shopNo: { type: String, required: true },
    mobileBoss: { type: String, default: "" },
    mobileMiss: { type: String, required: true },
    mobileManager: { type: String, default: "" },
    mobileFactory: { type: String, default: "" },
    accountType: {
      type: String,
      enum: ["expense", "company", "supplier", "shopkeeper"],
      required: true,
    },
    shopAddress: { type: String, required: true },
    city: { type: String, required: true },
    email: { type: String, required: true },
    bankAccounts: { type: [String], required: true },
    createdAt: { type: Date, default: Date.now },
  },
  {
    collection: "shop_accounts", // optional: collection name
  }
);

// Prevent model overwrite in dev environment (Next.js hot reload)
export const ShopAccount = models.ShopAccount || model<IShopAccount>("ShopAccount", ShopAccountSchema);
