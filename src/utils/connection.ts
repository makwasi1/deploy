//IMPORT MONGOOSE
import mongoose, { Model } from "mongoose"

// CONNECTING TO MONGOOSE (Get Database Url from .env.local)
// const { DATABASE_URL } = process.env

// connection function
export const connect = async () => {
  const conn = await mongoose
    .connect(`${process.env.MONGO_URI}` as string)
    .catch(err => console.log(err))
  console.log("Mongoose Connection Established")

  // OUR TODO SCHEMA
  const TransactionSchema = new mongoose.Schema({
    name: String,
    amount: Number,
    type: String,
    transaction_hash: String,
    phone_number: Number,
    txn_status: String,
    wallet_id: String,
    order_number: String,
  })

  // OUR TODO MODEL
  const Transaction = mongoose.models.Transaction || mongoose.model("Transaction", TransactionSchema)

  return { conn, Transaction }
}