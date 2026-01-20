import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

import listingRoutes from "./routes/listingRoutes.js";
import cityRoutes from "./routes/cityRoutes.js"; // ✅ THIS LINE

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Arrivio backend running 🚀");
});

app.use("/api/listings", listingRoutes);
app.use("/api/cities", cityRoutes); // ✅ THIS LINE

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
