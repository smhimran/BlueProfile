import mongoose from "mongoose";

const problemSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  judge: { type: String, required: true },
  problemID: { type: String, required: true },
  solved: { type: Number, default: 0 },
});

export default mongoose.model("Problem", problemSchema);
