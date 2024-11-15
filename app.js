const express = require("express");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const dbConnection = require("./config/dbConnection");
const err = require("./middleware/error");
dotenv.config({ path: "config/config.env" });
const app = express();
app.use(express.json());
app.use(cookieParser());
dbConnection();
const userRoute = require("./routes/userRoutes");
const carRoute = require("./routes/carRoutes");
app.use("/api/v1", carRoute);
app.use("/api/v1", userRoute);
app.use(err);
app.listen(process.env.PORT, () => {
  console.log(`Server is running on PORT ${process.env.PORT}`);
});
