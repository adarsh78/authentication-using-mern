import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import bodyParser from "body-parser";
import cors from "cors";
import AuthRoutes from "./Routes/auth.route.js";
import productRoutes from "./Routes/products.route.js"
dotenv.config();
const app = express();

const PORT = process.env.PORT || 5001;

app.get("/", (req, res) => {
    res.send("Hello Express");
});

app.use(bodyParser.json());
app.use(cors());

app.use("/auth", AuthRoutes);
app.use("/products", productRoutes);

connectDB();
app.listen(PORT, () => {
    console.log(`App is running on Port: http://localhost:${PORT}`)
})
