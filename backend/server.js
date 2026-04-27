require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const taskRoutes = require('./routes/tasks');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/tasks', taskRoutes);

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ Database Connected!");
    app.listen(5000, () => console.log("🚀 Server running on port 5000"));
  })
  .catch(err => console.log("❌ DB Connection Error:", err.message));