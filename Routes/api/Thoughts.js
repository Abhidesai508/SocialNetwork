const express = require("express");
const router = express.Router();

const {
    getAllThoughts,
    getThoughtById,
    createThought,
    updateThoughtById,
    deleteThoughtById,
    createReaction,
    deleteReaction
} = require("../../Controllers/thought.js");

// /api/thoughts
router.route("/")
    .get(getAllThoughts)
    .post(createThought);

// /api/thoughts/:id
router.route("/:id")
    .get(getThoughtById)
    .put(updateThoughtById)
    .delete(deleteThoughtById);

// /api/thoughts/:thoughtId/reactions
router.route("/:thoughtId/reactions")
    .post(createReaction);

// /api/thoughts/:thoughtId/reactions/:reactionId
router.route("/:thoughtId/reactions/:reactionId")
    .delete(deleteReaction);

module.exports = router;