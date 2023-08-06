const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: "Username is required",
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: "Email is required",
        match: [/.+@.+\..+/, "Please enter a valid e-mail address"]
    },
    thoughts: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Thought"
        }
    ],
    friends: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    ]
},
{
    toJSON: {
        virtuals: true,
        getters: true
    },
    id: false
});

userSchema.virtual("friendCount").get(function() {
    return this.friends.length;
}
);

const User = mongoose.model("User", userSchema);

module.exports = User;

