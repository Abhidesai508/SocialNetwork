const { connect, connection } = require('mongoose');
const User = require('../models/users');
const Thought = require('../models/thoughts');
const Friend = require('../models/friend');
const Reaction = require('../models/reaction');

const {
    generateUsers,
    generateThoughts,
    generateReactions,
    generateFriends
} = require('./data');

connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/social-network', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
});

connection.on("error", (err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  });

  connection.once("open", async () => {
    console.log("Mongoose connected successfully");
    try {
        await User.deleteMany({});
        await Thought.deleteMany({});
        await Friend.deleteMany({});
        await Reaction.deleteMany({});

        const users = generateUsers(20);

        const createdUsers = await User.create(users);

        const thoughts = generateThoughts(createdUsers, 10);

        const createdThoughts = await Thought.create(thoughts);
        
        const reactions = generateReactions(createdThoughts, 10);

        const createdReactions = await Reaction.create(reactions);

        const friends = generateFriends(createdUsers, 10);

        const createdFriends = await Friend.create(friends);

        console.log('all done!');
        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
  }
    );

