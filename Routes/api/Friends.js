const express = require("express");
const router = express.Router();
const User = require("../../models/User");

// Add a friend to a user's friend list
router.post("/:id/friends/:friendId", async (req, res) => {
    try {
        const { id, friendId } = req.params;
    
        // Validate the user ID
        if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: "Invalid user ID" });
        }
    
        // Validate the friend ID
        if (!mongoose.Types.ObjectId.isValid(friendId)) {
        return res.status(400).json({ message: "Invalid friend ID" });
        }
    
        const user = await User.findByIdAndUpdate(
        id,
        { $addToSet: { friends: friendId } },
        { new: true }
        );
    
        if (!user) {
        return res.status(404).json({ message: "User not found" });
        }
    
        res.json(user);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server Error" });
    }
    }
);

// Remove a friend from a user's friend list
router.delete("/:id/friends/:friendId", async (req, res) => {
    try {
        const { userId, friendId } = req.params;

        // Validate the user ID
        if (!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).json({ message: "Invalid user ID" });
        }

        // Validate the friend ID
        if (!mongoose.Types.ObjectId.isValid(friendId)) {
        return res.status(400).json({ message: "Invalid friend ID" });
        }

        user.friends = user.friends.filter(
        (friend) => friend.friendId.toString() !== friendId
        );

        await user.save();

        res.json(user);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server Error" });
    }
    }
);

module.exports = router;

