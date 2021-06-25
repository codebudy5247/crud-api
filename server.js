const express = require("express");
const connectDB = require("./config/db");
const cors = require('cors')
const app = express();

// Connect Database
connectDB();

// Init Middleware
app.use(express.json({ extended: false }));
app.use(cors())
//Test Routes
app.get("/", async (req, res) => {
  res.json({ message: "pass!" });
});

// Define Routes
app.use("/api/contacts", require("./routes/contacts"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
