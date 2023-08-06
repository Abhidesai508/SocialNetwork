const mongoose = require("mongoose");
const faker = require("faker");
const { count } = require("../models/users");

const generateUsername = () => {
    const firstName = faker.name.firstName().toLowerCase();
    const lastName = faker.name.lastName().toLowerCase();
    return `${firstName}${lastName}`;
  };

const generateEmail = () => { 
    return faker.internet.email();
}

const generateUsers = () => {
    let users = [];
    for (let i = 0; i < 10; i++) {
        const username = generateUsername();
        const email = generateEmail();
        const user = {
            username,
            email
        };
        users.push(user);
    }
    return users;
}

const generateThoughts = (users) => {
    let thoughts = [];
    for (let i = 0; i < 10; i++) {
        const thoughtText = faker.lorem.sentence();
        const username = users[Math.floor(Math.random() * users.length)].username;
        const thought = {
            thoughtText,
            username
        };
        thoughts.push(thought);
    }
    return thoughts;
}

const generateReactions = (thoughts) => {
    let reactions = [];
    const reactionBody = faker.lorem.sentence();
    for (let i = 0; i < 10; i++) {
        const username = thoughts[Math.floor(Math.random() * thoughts.length)].username;
        const reaction = {
            reactionBody,
            username
        };
        reactions.push(reaction);
    }
    return reactions;
}

const generateFriends = (users, count) => {
    let friends = [];
    for (let i = 0; i < count; i++) {
        const username = users[Math.floor(Math.random() * users.length)].username;
        friends.push(username);
    }
    return friends;
}

module.exports = {
    generateUsers,
    generateThoughts,
    generateReactions,
    generateFriends
};

