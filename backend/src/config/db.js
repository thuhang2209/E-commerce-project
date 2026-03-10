const { Pool } = require("pg");

require("dotenv").config(); // Sử dụng dotenv để tải biến môi trường từ file .env

const pool = new Pool({
    host: process.env.DB_HOST || "pg", // pg là tên service của postgres trong docker-compose.yml
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

pool.on("error", (err) => { 
    console.error("Database Error", err);
});

// Kết nối đến database khi khởi động ứng dụng
(async () => {
    await pool.connect();
    console.log("Connected to Database");
})();


module.exports = pool;   // module.exports: xuất đối tượng pool để các file khác có thể sử dụng để kết nối database và thực hiện truy vấn