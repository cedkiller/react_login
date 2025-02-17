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
    pool.query('SELECT * FROM user', (error, results) => {
        if (error) {
            console.error('Error fetching records:', error);
            return res.status(500).json({ message: 'Error fetching records' });
        }
        if (results.length === 0) {
            return res.status(401).json({ message: 'Error' });
        }
        res.json({
            results
        });
    });
});

app.post('/signup_rec', async (req, res) => {
    const { name, email, pass, type } = req.body;
    const hashPass = await bcrypt.hash(pass, 10);
    pool.query('INSERT INTO user(user_name, user_email, user_password, user_type) VALUES(?,?,?,?)', [name, email, hashPass, type], (error, results) => {
        if (error) {
            console.error('Error adding record:', error);
            return res.status(500).json({ message: 'Error adding record' });
        }
        if (results.length === 0) {
            return res.status(401).json({ message: 'Error' });
        }
        res.json({ 
            message: 'success' 
        });
    });
});

app.post('/login_rec', (req, res) => {
    const { email, pass } = req.body;
    pool.query('SELECT * FROM user WHERE user_email = ?', [email], (error, results) => {
        if (error) {
            console.error('Error adding record:', error);
            return res.status(500).json({ message: 'Error adding record' });
        }
        if (results.length === 0) {
            return res.status(401).json({ message: 'Error' });
        }
        
        bcrypt.compare(pass, results.[0].user_password, (err, isMatch) => {
            if (isMatch)
            {
                const user_name = results.[0].user_name;
                const user_type = results.[0].user_type;

                res.json({
                    message:'success',
                    user_name,
                    user_type
                });
            }

            else {
                res.json({
                    message:'Invalid Password'
                });
            }
        });
    });
});
//end

// Start server
app.listen(5000, () => {
    console.log('Server running on port 5000');
});
