const connection = require('../config/connection');
const User = require('../models/users');
const Thought = require('../models/thoughts');
// const Reaction = require('../models/reactions');
const Userdata = require ('./user')
const Thoughtdata = require ('./thought')
const Reactiondata = require ('./reaction')

console.log ('starting seeding ...')

connection.once('open', async () => {
    console.log ('seeding ...')
    try {
        await User.deleteMany({});
        await Thought.deleteMany({});
        await User.insertMany(Userdata);
        await Thought.insertMany(Thoughtdata);
        // await Reaction.insertMany(Reactiondata);
        console.log ('seeding complete')
    }
    catch (err) {
        console.error(err);
        process.exit(0);
    }
});

