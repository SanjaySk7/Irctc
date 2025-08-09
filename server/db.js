import express from 'express';
import mysql from 'mysql';
import cors from 'cors';


const app = express();
app.use(cors());
app.use(express.json());

// Create a MySQL connection pool
const db = mysql.createPool({
  connectionLimit: 10,
  host: "localhost",
  user: "root",
  password: "",
  database: "irctc",
});

// Register User
app.post("/irctc", (req, res) => {
  const { name, email, password } = req.body;
  const sql = "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";
  db.query(sql, [name, email, password], (err, result) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ message: "Error inserting user" });
    }
    return res
      .status(201)
      .json({
        message: "User registered successfully",
        userId: result.insertId,
      });
  });
});

// User Login
app.post("/login", (req, res) => {
  const { email, password } = req.body;
  const loginQuery = "SELECT id FROM users WHERE email = ? AND password = ?";
  db.query(loginQuery, [email, password], (err, result) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ message: "Internal server error" });
    }
    if (result.length === 0) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const userId = result[0].id;
    res.status(200).json({ userId });
  });
});

// Get user name by ID
app.get("/user/:id", (req, res) => {
  const userId = req.params.id;
  const userQuery = "SELECT name FROM users WHERE id = ?";
  db.query(userQuery, [userId], (err, result) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ message: "Internal server error" });
    }
    if (result.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ userName: result[0].name });
  });
});

// Add Train
app.post("/add-train", (req, res) => {
  const {
    trainName,
    source,
    destination,
    departureTime,
    arrivalTime,
    departureDate,
    arrivalDate,
    seats,
  } = req.body;
  const sql = `INSERT INTO trains 
    (trainName, source, destination, departureTime, arrivalTime, departureDate, arrivalDate, seats) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
  const values = [
    trainName,
    source,
    destination,
    departureTime,
    arrivalTime,
    departureDate,
    arrivalDate,
    seats,
  ];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ message: "Error inserting train data" });
    }
    return res
      .status(201)
      .json({ message: "Train added successfully", trainId: result.insertId });
  });
});

// Get all trains
app.get("/get-trains", (req, res) => {
  const sql = "SELECT * FROM trains";
  db.query(sql, (err, result) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ message: "Error fetching trains" });
    }
    return res.status(200).json(result);
  });
});

// Get trains by route
app.get("/get-trains/:fromStation/:toStation", (req, res) => {
  const { fromStation, toStation } = req.params;
  const sql = "SELECT * FROM trains WHERE source = ? AND destination = ?";
  db.query(sql, [fromStation, toStation], (err, result) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ message: "Error fetching trains" });
    }
    return res.status(200).json(result);
  });
});

// Book Train
app.post("/book-train", (req, res) => {
  const { trainId, userId } = req.body;
  db.getConnection((err, connection) => {
    if (err) {
      console.error("Connection error:", err);
      return res.status(500).json({ message: "Database connection error" });
    }

    connection.beginTransaction((err) => {
      if (err) {
        connection.release();
        return res.status(500).json({ message: "Transaction error" });
      }

      const updateSql =
        "UPDATE trains SET seats = seats - 1 WHERE train_id = ? AND seats > 0";
      connection.query(updateSql, [trainId], (err, result) => {
        if (err || result.affectedRows === 0) {
          return connection.rollback(() => {
            connection.release();
            const msg =
              result.affectedRows === 0
                ? "No seats available"
                : "Error updating seats";
            return res.status(400).json({ message: msg });
          });
        }

        const insertSql =
          "INSERT INTO bookings (user_id, trains_id, seats_booked) VALUES (?, ?, 1)";
        connection.query(insertSql, [userId, trainId], (err) => {
          if (err) {
            return connection.rollback(() => {
              connection.release();
              return res
                .status(500)
                .json({ message: "Error inserting booking" });
            });
          }

          connection.commit((err) => {
            if (err) {
              return connection.rollback(() => {
                connection.release();
                return res
                  .status(500)
                  .json({ message: "Error committing transaction" });
              });
            }
            connection.release();
            return res.status(201).json({ message: "Booking successful!" });
          });
        });
      });
    });
  });
});

// Get user bookings
app.get("/user-bookings/:userId", (req, res) => {
  const userId = req.params.userId;
  const sql = `
    SELECT b.booking_id AS bookingId, b.user_id, b.trains_id, 
           t.trainName, t.source, t.destination, t.departureTime, 
           t.arrivalTime, b.seats_booked
    FROM bookings b
    JOIN trains t ON b.trains_id = t.train_id
    WHERE b.user_id = ?`;

  db.query(sql, [userId], (err, results) => {
    if (err) {
      console.error("Error retrieving bookings:", err);
      return res.status(500).json({ message: "Error retrieving bookings" });
    }
    if (results.length === 0) {
      return res.status(404).json({ message: "No bookings found" });
    }
    return res.status(200).json(results);
  });
});

// Start server
app.listen(8081, () => {
  console.log("Server running on port:8081");
});
