const mongoose = require("mongoose");

const friendSchema = new mongoose.Schema( {
    friendId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    friendName: {
        type: String,
        required: true
    }
});

const Friend = mongoose.model("Friend", friendSchema);

module.exports = Friend;