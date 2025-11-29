// models/Vote.js
import mongoose from "mongoose";

const voteSchema = new mongoose.Schema({
  voterId: { type: String, required: true },      // unique voter identifier (from your users)
  electionId: { type: mongoose.Schema.Types.ObjectId, ref: "Election", required: true },
  candidateId: { type: mongoose.Schema.Types.ObjectId, required: true },
  createdAt: { type: Date, default: Date.now },
});

voteSchema.index({ voterId: 1, electionId: 1 }, { unique: true }); // prevents duplicate vote records per election

const Vote = mongoose.model("Vote", voteSchema);
export default Vote;
