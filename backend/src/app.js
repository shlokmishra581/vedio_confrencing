import express from "express";
import { createServer } from "node:http";
import { Server } from "socket.io";
import mongoose from "mongoose";
import { connectToSocket } from "./controllers/socketManger.js";
import cors from "cors";

import userRouter from "./controllers/models/routes/userrouters.js";

const app = express();
const server = createServer(app);
const io = connectToSocket(server);

app.set("port", process.env.PORT || 8000);

app.use(cors());
app.use(express.json({ limit: "40kb" })); 
app.use(express.urlencoded({ extended: true, limit: "40kb" }));

app.use("/api/v1/users", userRouter);
// app.use("/api/v2/newUser",Routees)

const start = async () => {
  try {
    const connectionDb = await mongoose.connect(
      
      "mongodb+srv://shlokmishra302_db_user:j0qwLO8bdRt2fZLu@cluster0.uulub6n.mongodb.net/?retryWrites=true&w=majority"
    );
    console.log(`MONGO connected DB Host: ${connectionDb.connection.host}`);

    server.listen(app.get("port"), () => {
      console.log(`LISTENING ON PORT ${app.get("port")}`);
    });
  } catch (error) {
    console.error("Error connecting to DB:", error);
  }
};

start();