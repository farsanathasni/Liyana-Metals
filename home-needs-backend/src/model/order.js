const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  items: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Products"
      },
      name: String,
      image: String,
      quantity: Number,
      price: Number
    }
  ],

 

  total: {
    type: Number,
    required: true
  },

  customer: {
    name: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true }
  },

  payment: {
    type: String,
    enum: ["COD", "UPI", "Card"],
    default: "COD"
  },

  status: {
    type: String,
    enum: ["placed", "shipped", "delivered","cancelled"],
    default: "placed"
  },
  paymentStatus: {
  type: String,
  enum: ["pending", "paid", "failed"],
  default: "pending"
},

transactionId: String

}, { timestamps: true });

module.exports = mongoose.model("Order", orderSchema);