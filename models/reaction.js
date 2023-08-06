const mongoose = require('mongoose');

const reactionSchema = new mongoose.Schema({
    reactionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    reactionBody: {
        type: String,
        required: true,
        maxLength: 280
    },
    username: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now()
    }
},
{
    toJSON: {
        getters: true
    }
});

const Reaction = mongoose.model("Reaction", reactionSchema);

module.exports = Reaction;

