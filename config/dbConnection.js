const mongoose = require("mongoose");
const dbConnection = () => {
  console.log(process.env.MONGO_URL);
  mongoose
    .connect(process.env.MONGO_URL, { dbName: "CarProject" })
    .then(() => {
      console.log("Connected to Mongodb");
    })
    .catch((err) => {
      console.log(`Error in Connection to mongodb function ${err}`);
    });
};
module.exports = dbConnection;
