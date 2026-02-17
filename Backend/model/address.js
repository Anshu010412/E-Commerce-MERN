import mongoose from "mongoose";

const addressSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    fullName: String,
    phone: String,
    addressLine: String,
    city: String,
    state: String,
    pincode: String,
  },
  {
    timeStamps: true,
  },
);

export default mongoose.model("Address", addressSchema);
