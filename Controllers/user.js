const mongoose = require("mongoose");
const User = require("../models/users");
const Thought = require("../models/thoughts");

const userController = {
    // get all users
    getAllUsers: async (req, res) => {
        try {
            const users = await User.find().populate("thoughts");
            res.json(users);
          } catch (err) {
            console.error(err);
            res.status(500).json({ message: "Server Error" });
          }
    },
    // get one user by id
    getUserById: async (req, res) => {
        try {
            const user = await User.findOne({ _id: req.params.id }).populate("thoughts");
            if (!user) {
                return res.status(404).json({ message: "No user found with this id!" });
            }
            res.json(user);
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: "Server Error" });
        }
},
    // get All Friends
    getAllFriends: async (req, res) => {
        try {
            const { id } = req.params;
      
            // Validate the user ID
            if (!mongoose.Types.ObjectId.isValid(id)) {
              return res.status(400).json({ message: "Invalid user ID" });
            }
      
            const user = await User.findById(id).populate("friends");
      
            if (!user) {
              return res.status(404).json({ message: "User not found" });
            }
      
            res.json(user.friends);
          } catch (err) {
            console.error(err);
            res.status(500).json({ message: "Server Error" });
          }
},
    // create user
    createUser: async (req, res) => {
        try {
            const user = await User.create(req.body);
            res.json(user);
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: "Server Error" });
        }
    },
    // update user by id
    updateUserById: async (req, res) => {
        try {
            const { id } = req.params;
            const { username, email } = req.body;
            const updatedUser = await User.findByIdAndUpdate(
              id,
              { username, email },
              { new: true }
            );
            if (!updatedUser) {
              return res.status(404).json({ message: "User not found" });
            }
            res.json(updatedUser);
          } catch (err) {
            console.error(err);
            res.status(500).json({ message: "Server Error" });
          }
        },
    // delete user by id
    deleteUserById: async (req, res) => {
        try {
            const { id } = req.params;
            const deletedUser = await User.findByIdAndDelete(id);
            if (!deletedUser) {
              return res.status(404).json({ message: "User not found" });
            }
            res.json(deletedUser);
          } catch (err) {
            console.error(err);
            res.status(500).json({ message: "Server Error" });
          }
        },
    // add friend
    addFriend: async (req, res) => {
        try {
            //const { user_id } = req.params.userId;
            //const { friendId } = req.params.friendId;
     
            // Validate the user ID
            if (!mongoose.Types.ObjectId.isValid(req.params.userId)) {
              return res.status(400).json({ message: "Invalid user ID" });
            }
      
            // Validate the friend ID
            if (!mongoose.Types.ObjectId.isValid(req.params.friendId)) {
              return res.status(400).json({ message: "Invalid friend ID" });
            }
      
            const user = await User.findByIdAndUpdate(
              req.params.userId ,
              { $addToSet: { friends: req.params.friendId } },
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
        },
    // remove friend
    removeFriend: async (req, res) => {
        try {
            // const { id } = req.params;
            // const { friendId } = req.body;
      
            // Validate the user ID
            if (!mongoose.Types.ObjectId.isValid(req.params.userId)) {
              return res.status(400).json({ message: "Invalid user ID" });
            }
      
            // Validate the friend ID
            if (!mongoose.Types.ObjectId.isValid(req.params.friendId)) {
              return res.status(400).json({ message: "Invalid friend ID" });
            }
      
            const user = await User.findByIdAndUpdate(
              req.params.userId,
              { $pull: { friends: req.params.friendId } },
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
        },
};

module.exports = userController;