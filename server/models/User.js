import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  voterId: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: false, // 👈 changed to optional since you didn’t collect it
  },
  role: {
    type: String,
    enum: ["voter", "admin"], // 👈 lowercase for safety
    default: "voter",
  },
});

const User = mongoose.model("User", userSchema);
export default User;
