import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js"
dotenv.config();
const app = express();

const PORT = process.env.PORT || 5001;

app.get("/", (req, res) => {
    res.send("Hello Express");
});

console.log(process.env.MONGO_URI);

connectDB();
app.listen(PORT, () => {
    console.log(`App is running on Port: http://localhost:${PORT}`)
})


