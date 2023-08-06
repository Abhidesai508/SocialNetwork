const express = require("express");
const router = express.Router();
const Thought = require("../../models/Thought");


// Add a reaction to a thought
router.post("/:id/reactions", async (req, res) => {
    try {
        const { id } = req.params;
        const { reactionBody, username } = req.body;

        const thought = await Thought.findByIdAndUpdate(
            id,
            { $push: { reactions: { reactionBody, username } } },
            { new: true }
        );

        if (!thought) {
            return res.status(404).json({ message: "Thought not found" });
        }

        res.json(thought);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server Error" });
    }
});

// Remove a reaction from a thought
router.delete("/:id/reactions/:reactionId", async (req, res) => {
    try {
        const { thoughtId, reactionId } = req.params;
    
        const thought = await Thought.findById(thoughtId);
    
        if (!thought) {
          return res.status(404).json({ error: "Thought not found" });
        }
    
        thought.reactions = thought.reactions.filter(
          (reaction) => reaction.id.toString() !== reactionId
        );
        await thought.save();
    
        res.status(200).json(thought);
      } catch (err) {
        console.error("Error deleting reaction:", err);
        res.status(500).json({ error: "Failed to delete reaction" });
      }
    });

module.exports = router;

    