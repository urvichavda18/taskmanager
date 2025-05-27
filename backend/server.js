require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const app = express();
const PORT = process.env.PORT || 5000;
const authRoutes = require("./routes/authRoutes");

app.use(
    cors({
        origin: process.env.CLIENT_URL || "*",
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: ["Content-Type", "Authorization"],
    })
)

app.use(express.json());

app.use("/api/auth",authRoutes);
// app.use("/api/user", userRoutes);
// app.use("/api/report", reportRoutes);
// app.use("/api/task", taskRoutes);

//conect database
connectDB();
app.listen(PORT, () => {
    console.log(`server is Running on ${PORT}`)
})