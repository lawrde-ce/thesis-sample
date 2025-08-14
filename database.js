const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./energy.db");

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS appliances (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      room TEXT,
      status TEXT,
      power REAL,
      voltage REAL,
      current REAL,
      energy REAL,
      last_updated DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);
});

module.exports = db;
