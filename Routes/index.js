const router = require('express').Router();
const userRoutes = require('./api/Users');
const thoughtRoutes = require('./api/Thoughts');

router.use("/api/Users", userRoutes);
router.use("/api/Thoughts", thoughtRoutes);
// router.use("/api/Reactions", reactionRoutes);
// router.use("/api/Friends", friendRoutes);

router.use("/api/thoughts/:thoughtId/reactions", thoughtRoutes);
router.use("/api/users/:userId/friends", userRoutes);

module.exports = router;


