const mongoose = require("mongoose");
const User = require("../models/users");
const Thought = require("../models/thoughts");

const thoughtController = {
    // get all thoughts
    getAllThoughts: async (req, res) => {
        try {
            const thoughts = await Thought.find().populate("reactions");
            res.json(thoughts);
          } catch (err) {
            console.error(err);
            res.status(500).json({ message: "Server Error" });
          }
    },
    // get one thought by id
    getThoughtById: async (req, res) => {
        try {
            const thought = await Thought.findOne({ _id: req.params.id }).populate("reactions");
            if (!thought) {
                return res.status(404).json({ message: "No thought found with this id!" });
            }
            res.json(thought);
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: "Server Error" });
        }
},
    // create thought
    createThought: async (req, res) => {
        try {
            const thought = await Thought.create(req.body);
            const user = await User.findOneAndUpdate(
                { _id: req.body.userId },
                { $push: { thoughts: thought._id } },
                { new: true }
            );
            if (!user) {
                return res.status(404).json({ message: "No user found with this id!" });
            }
            res.json(thought);
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: "Server Error" });
        }
    },      
    // update thought by id
    updateThoughtById: async (req, res) => {
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.id },
                { $set: req.body },
                { new: true }
            );
            if (!thought) {
                return res.status(404).json({ message: "No thought found with this id!" });
            }
            res.json(thought);
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: "Server Error" });
        }
    },
    // delete thought by id
    deleteThoughtById: async (req, res) => {
        try {
            const thought = await Thought.findOneAndDelete({ _id: req.params.id });
            if (!thought) {
                return res.status(404).json({ message: "No thought found with this id!" });
            }
            res.json(thought);
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: "Server Error" });
        }
    },

    // create reaction
    createReaction: async (req, res) => {
        try {
            const reaction = await Thought.findOneAndUpdate(
                { _id: req.params.id },
                { $push: { reactions: req.body } },
                { new: true }
            );
            if (!reaction) {
                return res.status(404).json({ message: "No reaction found with this id!" });
            }
            res.json(reaction);
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: "Server Error" });
        }
    },

    // delete reaction
    deleteReaction: async (req, res) => {
        try {
            const reaction = await Thought.findOneAndUpdate(
                { _id: req.params.id },
                { $pull: { reactions: { reactionId: req.params.reactionId } } },
                { new: true }
            );
            if (!reaction) {
                return res.status(404).json({ message: "No reaction found with this id!" });
            }
            res.json(reaction);
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: "Server Error" });
        }
    },

    // get all reactions
    getAllReactions: async (req, res) => {
        try {
            const reactions = await Thought.find().populate("reactions");
            res.json(reactions);
          } catch (err) {
            console.error(err);
            res.status(500).json({ message: "Server Error" });
          }
    }
};

module.exports = thoughtController;

