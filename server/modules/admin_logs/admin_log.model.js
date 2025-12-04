const mongoose = require("mongoose");

const adminLogSchema = new mongoose.Schema(
  {
    admin_id: { type: String, required: true, ref: "User" },
    action: { type: String, required: true },
    details: { type: String },
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: false },
  }
);

module.exports = mongoose.model("AdminLog", adminLogSchema);
