const router = require('express').Router();
const userRoutes = require('./api/Users');
const thoughtRoutes = require('./api/Thoughts');
const reactionRoutes = require('./api/Reactions');
const friendRoutes = require('./api/Friends');

router.use("/api/Users", userRoutes);
router.use("/api/Thoughts", thoughtRoutes);
router.use("/api/Reactions", reactionRoutes);
router.use("/api/Friends", friendRoutes);

router.use("/api/thoughts/:thoughtId/reactions", reactionRoutes);
router.use("/api/users/:userId/friends", friendRoutes);

module.exports = router;


