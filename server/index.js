const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const bcrypt = require('bcrypt');

const app = express();
app.use(cors());
app.use(express.json()); // Parse JSON bodies

// Create MySQL pool
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'practice',
});

//start
// Get records
app.get('/record', (req, res) => {
    pool.query('SELECT * FROM users', (error, results) => {
        if (error) {
            console.error('Error fetching records:', error);
            return res.status(500).json({ message: 'Error fetching records' });
        }
        if (results.length === 0) {
            return res.status(401).json({ message: 'Error' });
        }
        res.json({
            results: results
        });
    });
});

app.post('/signup', async (req, res) => {
    const {name, email, pass, type} = req.body;
    const hashPass = await bcrypt.hash(pass, 10);
    pool.query('INSERT INTO users(user_name, user_email, user_password, user_type) VALUES($1, $2, $3, $4)', [name, email, hashPass, type], (error, results) => {
        if (error) {
            console.error('Error fetching records:', error);
            return res.status(500).json({ message: 'Error fetching records' });
        }
        res.json({
            message:'success'
        });
    });
});

app.post('/login', async (req, res) => {
    const {email, pass} = req.body;
    pool.query('SELECT * FROM users WHERE user_email = ?', [email], async (error, results) => {
        if (error) {
            console.error('Error fetching records:', error);
            return res.status(500).json({ message: 'Error fetching records' });
        }
        if (results.length === 0) {
            return res.status(401).json({ message: 'Error' });
        }

        const isMatch = await bcrypt.compare(pass, results[0].user_password);

        if (isMatch) {
            if (results[0].user_type === "admin") {
                res.json({
                    message:'admin',
                    userName: results[0].user_name,
                    userType: results[0].user_type
                });
            } else if (results[0].user_type === "user") {
                res.json({
                    message:'user',
                    userName: results[0].user_name,
                    userType: results[0].user_type
                });
            }
        }

        else {
            res.json({
                message:'invalid password'
            });
        }
    });
});
//end

// Start server
app.listen(5000, () => {
    console.log('Server running on port 5000');
});