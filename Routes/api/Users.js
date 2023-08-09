const express = require("express");
const router = express.Router();

const {
    getAllUsers,
    getUserById,
    createUser,
    updateUserById,
    deleteUserById,
    addFriend,
    removeFriend
} = require("../../controllers/user.js");

// /api/users
router.route("/").get(getAllUsers).post(createUser);

// /api/users/:id
router.route("/:id")
    .get(getUserById)
    .put(updateUserById)
    .delete(deleteUserById);

// /api/users/:userId/friends/:friendId
//localhost:3001/api/users/64d0be0aa45e8063f63b7fc5/friends/64d1ca8fbb1f9299159ac5f9
router.route("/:userId/friends/:friendId")
    .post(addFriend)
    .delete(removeFriend);

module.exports = router;


