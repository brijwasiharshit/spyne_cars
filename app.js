const express = require("express");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const dbConnection = require("./config/dbConnection");
const err = require("./middleware/error");

dotenv.config({ path: "config/config.env" });

const app = express();

// Database Connection
dbConnection();

// Middleware
app.use(express.json());
app.use(cookieParser());

// CORS Configuration
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,              
    methods: ["GET", "POST", "PUT", "DELETE"], 
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Routes
const userRoute = require("./routes/userRoutes");
const carRoute = require("./routes/carRoutes");
app.use("/api/v1", carRoute);
app.use("/api/v1", userRoute);

// Error Handling Middleware
app.use(err); 


if(process.env.NODE_ENV == "production"){
  app.use(express.static("client/build"))
}
// Server Initialization
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});
