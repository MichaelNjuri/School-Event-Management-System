// Password validation for signup form
document.addEventListener("DOMContentLoaded", function () {
    var signupForm = document.getElementById("signup-form");

    if (signupForm) {
        signupForm.addEventListener("submit", function (event) {
            var password = document.getElementById("password").value;
            var confirmPassword = document.getElementById("confirm-password").value;
            var errorMessage = document.getElementById("password-error");

            if (password !== confirmPassword) {
                errorMessage.style.display = "block";
                event.preventDefault(); // Prevent form submission
            } else {
                errorMessage.style.display = "none";
            }
        });
    }
});
const mysql = require('mysql2');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());

// Connect to the database
const db = mysql.createConnection({
    host: "localhost",
    user: "student_user",
    password: "yourpassword",
    database: "school_system"
});

db.connect((err) => {
    if (err) {
        console.error("Database connection failed:", err);
    } else {
        console.log("Connected to MySQL");
    }
});

// Sign-up route
app.post('/signup', (req, res) => {
    const { admission_number, name, email, password } = req.body;
    const sql = "INSERT INTO users (admission_number, name, email, password) VALUES (?, ?, ?, ?)";
    db.query(sql, [admission_number, name, email, password], (err, result) => {
        if (err) {
            res.status(500).send("Error registering user");
        } else {
            res.send("User registered successfully");
        }
    });
});

// Login route
app.post('/login', (req, res) => {
    const { admission_number, password } = req.body;
    const sql = "SELECT * FROM users WHERE admission_number = ? AND password = ?";
    db.query(sql, [admission_number, password], (err, results) => {
        if (err) {
            res.status(500).send("Error logging in");
        } else if (results.length > 0) {
            res.send("Login successful");
        } else {
            res.status(401).send("Invalid credentials");
        }
    });
});

// Start the server
app.listen(3000, () => {
    console.log("Server running on port 3000");
});
