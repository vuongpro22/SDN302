# Node.js API Test Project

Project Node.js với Express.js để test API bằng Postman.

## 📋 Yêu cầu

- Node.js (version 14 trở lên)
- npm hoặc yarn

## 🚀 Cài đặt

1. Cài đặt dependencies:
```bash
npm install
```

## ▶️ Chạy Server

Chạy server ở chế độ production:
```bash
npm start
```

Chạy server ở chế độ development (tự động restart khi có thay đổi):
```bash
npm run dev
```

Server sẽ chạy tại: `http://localhost:3000`

## 📡 API Endpoints

### User APIs

| Method | Endpoint | Mô tả |
|--------|----------|-------|
| GET | `/api/users` | Lấy danh sách tất cả users |
| GET | `/api/users/:id` | Lấy thông tin user theo ID |
| POST | `/api/users` | Tạo user mới |
| PUT | `/api/users/:id` | Cập nhật user |
| DELETE | `/api/users/:id` | Xóa user |

**Ví dụ POST `/api/users`:**
```json
{
  "name": "Nguyễn Văn D",
  "email": "nguyenvand@example.com",
  "age": 27
}
```

### Post APIs

| Method | Endpoint | Mô tả |
|--------|----------|-------|
| GET | `/api/posts` | Lấy danh sách tất cả posts |
| GET | `/api/posts/:id` | Lấy thông tin post theo ID |
| POST | `/api/posts` | Tạo post mới |
| PUT | `/api/posts/:id` | Cập nhật post |
| DELETE | `/api/posts/:id` | Xóa post |

**Ví dụ POST `/api/posts`:**
```json
{
  "title": "Bài viết mới",
  "content": "Nội dung bài viết",
  "author": "Nguyễn Văn A"
}
```

### Test APIs

| Method | Endpoint | Mô tả |
|--------|----------|-------|
| GET | `/api/test/query?name=John&age=25` | Test query parameters |
| POST | `/api/test/json` | Test JSON body |
| POST | `/api/test/form` | Test form data |
| GET | `/api/test/headers` | Test headers |
| POST | `/api/test/upload` | Test upload (simulate) |
| GET | `/api/health` | Health check |

### Root

| Method | Endpoint | Mô tả |
|--------|----------|-------|
| GET | `/` | Thông tin API và danh sách endpoints |

## 📝 Ví dụ Test với Postman

### ⚠️ Lưu ý quan trọng: Test không cần WiFi

**Vấn đề:** Nếu bạn dùng IP thực (ví dụ: `192.168.1.100:3000`) trong Postman, khi tắt WiFi sẽ không test được.

**Giải pháp:** Luôn dùng `localhost` hoặc `127.0.0.1` trong Postman để test:
- ✅ `http://localhost:3000/api/users`
- ✅ `http://127.0.0.1:3000/api/users`
- ❌ `http://192.168.1.100:3000/api/users` (không hoạt động khi tắt WiFi)

**Giải thích:** `localhost`/`127.0.0.1` là loopback interface, hoạt động ngay cả khi tắt WiFi vì nó không cần kết nối mạng thực.

### 1. GET Request - Lấy danh sách users
- Method: `GET`
- URL: `http://localhost:3000/api/users`

### 2. POST Request - Tạo user mới
- Method: `POST`
- URL: `http://localhost:3000/api/users`
- Headers: `Content-Type: application/json`
- Body (raw JSON):
```json
{
  "name": "Trần Văn E",
  "email": "tranvane@example.com",
  "age": 32
}
```

### 3. GET Request với Query Parameters
- Method: `GET`
- URL: `http://localhost:3000/api/test/query?name=John&age=25&city=Hanoi`

### 4. PUT Request - Cập nhật user
- Method: `PUT`
- URL: `http://localhost:3000/api/users/1`
- Headers: `Content-Type: application/json`
- Body (raw JSON):
```json
{
  "name": "Nguyễn Văn A Updated",
  "age": 26
}
```

### 5. DELETE Request - Xóa user
- Method: `DELETE`
- URL: `http://localhost:3000/api/users/1`

## 🔧 Cấu trúc Project

```
CODE/
├── server.js          # File server chính
├── package.json       # Dependencies và scripts
├── .gitignore         # Git ignore file
└── README.md          # Tài liệu hướng dẫn
```

## 📦 Dependencies

- **express**: Web framework cho Node.js
- **body-parser**: Parse request body
- **cors**: Enable CORS cho API
- **nodemon** (dev): Tự động restart server khi có thay đổi

## ⚠️ Lưu ý

- Dữ liệu được lưu trong memory, sẽ mất khi restart server
- Server chạy trên port 3000 mặc định (có thể thay đổi bằng biến môi trường PORT)
