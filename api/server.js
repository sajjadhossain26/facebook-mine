import express from "express";
import dotenv from "dotenv";
import colors from "colors";
import mongoDB from "./config/db.js";
import errorHandler from "./middlewares/errorHandler.js";
import cookieParser from "cookie-parser";
import userRoute from "./routes/user.js";

// express init
const app = express();

// dotenv config and init
dotenv.config();
const PORT = process.env.PORT || 8080;

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// router setup
app.use("/api/v1/user", userRoute);

//custom error handler
app.use(errorHandler);

// static folder
app.use(express.static("api/public"));

app.listen(PORT, () => {
  mongoDB();
  console.log(`Server is running on port ${PORT}`.bgGreen.black);
});
