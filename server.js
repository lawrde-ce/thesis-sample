const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const db = require("./database");
const PORT = process.env.PORT || 3000;

const app = express();
app.use(cors());
app.use(bodyParser.json());

// 1️⃣ ESP32 sends data here
app.post("/api/data", (req, res) => {
  const { name, room, status, power, voltage, current, energy } = req.body;

  db.run(
    `INSERT INTO appliances (name, room, status, power, voltage, current, energy) 
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [name, room, status, power, voltage, current, energy],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ success: true, id: this.lastID });
    }
  );
});

// 2️⃣ Get all appliances
app.get("/api/data", (req, res) => {
  db.all(
    `SELECT * FROM appliances ORDER BY last_updated DESC`,
    [],
    (err, rows) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(rows);
    }
  );
});

// 3️⃣ Control appliances
app.post("/api/control", (req, res) => {
  const { id, status } = req.body;
  db.run(
    `UPDATE appliances SET status = ? WHERE id = ?`,
    [status, id],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ success: true });
    }
  );
});

app.listen(PORT, () =>
  console.log(`✅ Server running on http://localhost:${PORT}`)
);
