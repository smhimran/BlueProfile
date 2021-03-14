import mongoose from "mongoose";
import problemSchema from "./problem";

const userSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  vjudgeID: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  solves: [{ judge: String, problemID: String }],
});

export default mongoose.model("User", userSchema);
