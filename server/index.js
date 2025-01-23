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
app.get('/get_user', (req, res) => {
    pool.query('SELECT * FROM user', (error, results) => {
        if (error) {
            console.error('Error fetching records:', error);
            return res.status(500).json({ message: 'Error fetching records' });
        }
        res.json(results);
    });
});

// Add a record
app.post('/signup_record', async (req, res) => {
    const { name, email, pass, type } = req.body;
    try {
        const hashPass = await bcrypt.hash(pass, 10);
        pool.query('INSERT INTO user (user_name, user_email, user_password, user_type) VALUES (?,?,?,?)', [name, email, hashPass, type], (error) => {
            if (error) {
                console.error('Error adding record:', error);
                return res.status(500).json({ message: 'Error adding record' });
            }
            res.json({ message: 'signup success' });
        });
    } catch (error) {
        console.error('Error hashing password:', error);
        res.status(500).json({ message: 'Error hashing password' });
    }
});

app.post('/login_record', (req, res) => {
    const { email, pass } = req.body;
    pool.query('SELECT * FROM user WHERE user_email = ?', [email], (error, results) => {
        if (error) {
            console.error('Error adding record:', error);
            return res.status(500).json({ message: 'Error adding record' });
        }

        if (results.length === 0) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }
        
        const password = results[0].user_password;

        if (bcrypt.compare(pass, password))
        {
            const type = results[0].user_type;

            if (type === 'admin')
            {
                res.json({ message: 'admin' });
            }

            else if (type === 'user')
            {
                res.json({ message: 'user' });
            }
        }
    });
});

//end

// Start server
app.listen(5000, () => {
    console.log('Server running on port 5000');
});