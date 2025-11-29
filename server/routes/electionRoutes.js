import express from "express";
import Election from "../models/Election.js";

const router = express.Router();

// GET ALL COMPLETED ELECTIONS RESULTS
router.get("/results", async (req, res) => {
  try {
    const elections = await Election.find({ isEnded: true }).sort({ _id: -1 });

    if (elections.length === 0) {
      return res.json([]);
    }

    const formatted = elections.map((e) => {

      // Determine max votes
      const maxVotes = Math.max(...e.candidates.map(c => c.votes));

      // Find all candidates with max votes
      const topCandidates = e.candidates.filter(c => c.votes === maxVotes);

      let winner;
      if (topCandidates.length === 0) {
        winner = "No votes";
      } 
      else if (topCandidates.length > 1) {
        winner = "Tie";
      } 
      else {
        winner = topCandidates[0].name;
      }

      return {
        electionId: e._id,
        electionName: e.name,
        winner,
        candidates: e.candidates,
      };
    });

    res.json(formatted);

  } catch (err) {
    console.error("Results error:", err);
    res.status(500).json({ message: "Error fetching results" });
  }
});
                                    


/* ---------------------------------- */
/* GET ALL ELECTIONS                  */
/* ---------------------------------- */
router.get("/", async (req, res) => {
  const elections = await Election.find();
  res.json(elections);
});

/* ---------------------------------- */
/* CREATE ELECTION                    */
/* ---------------------------------- */
router.post("/create", async (req, res) => {
  try {
    const election = new Election({
      name: req.body.name,
      candidates: [],
    });

    await election.save();
    res.json(election);
  } catch (err) {
    console.error("Create election error:", err);
    res.status(500).json({ message: "Could not create election" });
  }
});

/* ---------------------------------- */
/* DELETE ELECTION                    */
/* ---------------------------------- */
router.delete("/:id", async (req, res) => {
  try {
    await Election.findByIdAndDelete(req.params.id);
    res.json({ message: "Election deleted" });
  } catch (err) {
    console.error("Delete election error:", err);
    res.status(500).json({ message: "Could not delete election" });
  }
});

/* ---------------------------------- */
/* ADD CANDIDATE                      */
/* ---------------------------------- */
router.post("/:id/add-candidate", async (req, res) => {
  try {
    const election = await Election.findById(req.params.id);

    if (!election)
      return res.status(404).json({ message: "Election not found" });

    election.candidates.push({
      name: req.body.name,
      party: req.body.party,
      symbolEmoji: req.body.symbolEmoji,
      symbolName: req.body.symbolName,
      votes: 0,
    });

    await election.save();
    res.json({ message: "Candidate added" });
  } catch (err) {
    console.error("Add candidate error:", err);
    res.status(500).json({ message: "Could not add candidate" });
  }
});

/* ---------------------------------- */
/* DELETE CANDIDATE                   */
/* ---------------------------------- */
router.delete("/:id/candidates/:cid", async (req, res) => {
  try {
    const election = await Election.findById(req.params.id);
    if (!election)
      return res.status(404).json({ message: "Election not found" });

    const candidate = election.candidates.id(req.params.cid);
    if (!candidate)
      return res.status(404).json({ message: "Candidate not found" });

    candidate.deleteOne();
    await election.save();

    res.json({ message: "Candidate deleted" });
  } catch (err) {
    console.error("Delete candidate error:", err);
    res.status(500).json({ message: "Could not delete candidate" });
  }
});

//Cast vote
router.post("/:id/vote", async (req, res) => {
  try {
    const { voterId, candidateId } = req.body;

    const election = await Election.findById(req.params.id);
    if (!election)
      return res.status(404).json({ message: "Election not found" });

    if (election.isEnded) {
      return res
        .status(400)
        .json({ message: "Election has ended. Voting closed." });
    }

    if (election.votedVoters.includes(voterId)) {
      return res.status(400).json({ message: "You have already voted" });
    }

    const candidate = election.candidates.id(candidateId);
    if (!candidate)
      return res.status(404).json({ message: "Candidate not found" });

    // Record vote
    candidate.votes += 1;

    // Record voter
    election.votedVoters.push(voterId);

    await election.save();

    res.json({ message: "Vote counted!" });
  } catch (err) {
    console.error("Vote error:", err);
    res.status(500).json({ message: "Error casting vote" });
  }
});


/* ---------------------------------- */
/* END ELECTION                       */
/* ---------------------------------- */
router.put("/:id/end", async (req, res) => {
  try {
    const election = await Election.findById(req.params.id);

    if (!election)
      return res.status(404).json({ message: "Election not found" });

    if (election.isEnded)
      return res.status(400).json({ message: "Election already ended" });

    election.isEnded = true;
    await election.save();

    res.json({ message: "Election ended successfully" });
  } catch (err) {
    console.error("End election error:", err);
    res.status(500).json({ message: "Could not end election" });
  }
});

export default router;
