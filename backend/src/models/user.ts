import { Schema, model } from "mongoose";

const userSchema = new Schema({
  nome: { type: String, required: true },
  email: { type: String, required: true},
  cpf: { type: String, required: true},
  descricao: String,
}, { timestamps: true });

export const User = model("Item", userSchema);