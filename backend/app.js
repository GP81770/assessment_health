import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import doctorRoutes from "./routes/doctor.routes.js";
import pqroutes from "./routes/pq.routes.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import authRoute from "./routes/AuthRoute.js";
dotenv.config();

const { MONGO_URL } = process.env;

export const PORT = 5555 || process.env.PORT;

const app = express();
app.use(
  cors({
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(express.json());

app.use(cookieParser());
app.use(doctorRoutes);
app.use(pqroutes);
app.use("/", authRoute);

const start = async () => {
  const connectDB = await mongoose
    .connect(MONGO_URL, {
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
      dbName: "allo",
    })
    .then(() => {
      console.log("connected to database");
      app.listen(PORT, () => {
        console.log(`server is running on port ${PORT}`);
      });
    });
};
start();
