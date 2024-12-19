import { Schema, Types, model } from "mongoose";

const tokenSchema = new Schema(
  {
    userId: { type: Types.ObjectId, ref: "User", required: true },
    refreshToken: { type: String, required: true },
    expiresAt: { type: Date, required: true }, // TTL field
    tokenVersion: { type: Number, default: 1 },
  },
  { timestamps: true }
);

// TTL index for automatic expiration (20 days = 60 * 60 * 24 * 20 seconds)
tokenSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 60 * 60 * 24 * 20 });

// Index for user-based queries
tokenSchema.index({ userId: 1 });

const TokenModel = model("Token", tokenSchema);
export default TokenModel;
