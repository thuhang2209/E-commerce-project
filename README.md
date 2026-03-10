# E-commerce-project

web-phone-ecommerce/
├── src/
│   ├── config/
│   │   ├── db.js             # Cấu hình kết nối PostgreSQL
│   │   └── redis.js          # Cấu hình kết nối Redis
│   ├── controllers/
│   │   ├── authController.js  # Xử lý Đăng nhập/Đăng ký
│   │   ├── cartController.js  # Xử lý Giỏ hàng (Logic Redis)
│   │   ├── orderController.js # Xử lý Đơn hàng & Tạo mã QR
│   │   └── paymentController.js # Xử lý Webhook từ SePay
│   ├── middleware/
│   │   └── auth.js           # Kiểm tra Session Token từ Redis
│   ├── models/
│   │   ├── userModel.js      # Định nghĩa bảng Người dùng
│   │   ├── productModel.js   # Định nghĩa bảng Điện thoại & Tồn kho
│   │   └── orderModel.js     # Định nghĩa bảng Đơn hàng
│   ├── routes/
│   │   └── api.js            # Khai báo các đường dẫn API
│   └── app.js                # File chạy chính của Node.js
├── docker/
│   └── postgres/
│       └── init.sql          # Khởi tạo bảng dữ liệu ban đầu
├── .env                      # Lưu biến bảo mật (DB Pass, SePay API Key)
├── docker-compose.yml        # File điều phối các Container
├── Dockerfile                # File đóng gói ứng dụng Node.js
└── package.json              # Khai báo các thư viện (Express, pg, redis)


docker run --name ecommerce-db -e POSTGRES_PASSWORD=2209 -e POSTGRES_DB=ecommerce -p 5432:5432 -d postgres:latest
- dbname: ecommerce
- password: 2209
- container name: ecommerce-db 
