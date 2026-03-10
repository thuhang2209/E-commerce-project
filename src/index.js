const express = require('express');
const cors = require('cors'); 
const pool = require('./config/db');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// 1. Middleware - CORS và JSON parsing
app.use(cors({ origin: process.env.FRONTEND_URL })); 
app.use(express.json()); 

// 2. Hàm khởi động server
const startServer = async () => {
  try {
    // Kiểm tra kết nối Postgres
    const res = await pool.query('SELECT NOW()');
    
    app.listen(PORT, async () => {
      console.log(`Server started at: http://localhost:${PORT}`);
      await createTables();
    });
  } catch (err) {
    console.error('startServer error:', err.message);
    process.exit(1); 
  }
};

startServer();

const createTables = async() => {
  const queryText = `
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      username VARCHAR(50) UNIQUE NOT NULL,
      email VARCHAR(100) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );`;

    try {
      await pool.query(queryText);
      console.log("Users table created successfully");
    } catch (err) {
      console.error("Error creating users table:", err.message);
    }
};

// logic register
const bycrypt = require('bcrypt');

app.post('/api/register',  async(req,res) => {
  const {email, password} = req.body;

  try {                                                                                                                                                             // 1. ma hoa mat khau (muc do 10)                          
    const hashedPassword = await bycrypt.hash(password, 10);

    // 2. luu vao db
    const newUser = await pool.query(
      
      // 3. tra ve thong tin nguoi dung (id, email)
      'INSERT INTO users (email, password) VALUES ($1, $2) RETURNING id, email',
      [email, hashedPassword] // truyen tham so vao VALUES
    );

    res.status(201).json({ // 201: Created 
      message: "User registered successfully",
      user: newUser.row[0] // row[0] chua thong tin nguoi dung moi tao
    });
  } catch (err){
    if (err.code === "23505") { // 23505: unique_violation (email da ton tai)
      return res.status(400).json({ message: "Email already exists" });
    }
    res.status(500).json({ message: "Server error" });
  }
});

//Logic Login

const jwt = require("jsonwebtoken");

app.post('/api/login', async (req, res) => {
  const {email, password} = req.body;

  try {
      const userResult = await pool.query(
        'SELECT * FROM users WHERE email = $1',
        [email]
      );
      const user = userResult.rows[0];

      if (!user || !(await bycrypt.compare(password, user.password))) {
        return res.status(401).json({ message: "Invalid email or password" }); // 401: Unauthorized
      }

      // create token
      const token = jwt.sign(
        { id: user.id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_ }
      )
  } 
})

