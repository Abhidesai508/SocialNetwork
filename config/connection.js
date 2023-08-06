const { connect, connection } = require("mongoose");

// Connect to the Mongo DB
connect(process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/social-network", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
});

// Log mongo queries being executed!
connection.on("connected", () => {
    console.log("Successfully connected to MongoDB!");
}
);

connection.on("error", (err) => {
    console.log("Mongoose connection error: ", err);
}
);

module.exports = connection;
