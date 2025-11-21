const express = require('express');
const cors = require('cors');
const db = require('./db');

const app = express();

app.use(cors());
app.use(express.json());

app.post('/register', (req, res) => {
    const sql = "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";
    const values = [
        req.body.name,
        req.body.email,
        req.body.password
    ];

    db.query(sql, values, (err, data) => {
        if (err) {
            console.error(err);
            return res.json({ Status: "Fail", Error: "Error creating user" });
        }
        return res.json({ Status: "Success", Data: data });
    });
});

app.post('/login', (req, res) => {
    const sql = "SELECT * FROM users WHERE email = ? AND password = ?";
    
    db.query(sql, [req.body.email, req.body.password], (err, data) => {
        if (err) {
            console.error(err);
            return res.json({ Status: "Fail", Error: "Login Error" });
        }
        
        if (data.length > 0) {
            return res.json({ Status: "Success", User: data[0] });
        } else {
            return res.json({ Status: "Fail", Error: "Wrong email or password" });
        }
    });
});

const PORT = 8081;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
