const redis = require("redis");
require("dotenv").config();

// Tạo client Redis
const client = redis.createClient({
    url: "redis://redis:6379", // redis là tên service của Redis trong docker-compose.yml   
});

client.on("error", (err) => {
    console.error("Redis Client Error", err);
});

// Kết nối đến Redis
(async () => {
    await client.connect();
    console.log("Connected to Redis");
})();

module.exports = client; 