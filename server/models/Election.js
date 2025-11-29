import mongoose from "mongoose";

const candidateSchema = new mongoose.Schema({
  name: String,
  symbolEmoji: String,
  symbolName: String,
  votes: { type: Number, default: 0 }
});

const electionSchema = new mongoose.Schema({
  name: String,
  candidates: [candidateSchema],
  isEnded: { type: Boolean, default: false },
  votedVoters: { type: [String], default: [] } // store voter IDs
});

const Election = mongoose.model("Election", electionSchema);

export default Election;
