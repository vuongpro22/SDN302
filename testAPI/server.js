const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// In-memory data storage (for testing)
let users = [
  { id: 1, name: 'Nguyễn Văn A', email: 'nguyenvana@example.com', age: 25 },
  { id: 2, name: 'Trần Thị B', email: 'tranthib@example.com', age: 30 },
  { id: 3, name: 'Lê Văn C', email: 'levanc@example.com', age: 28 }
];

let posts = [
  { id: 1, title: 'Bài viết đầu tiên', content: 'Nội dung bài viết đầu tiên', author: 'Nguyễn Văn A' },
  { id: 2, title: 'Bài viết thứ hai', content: 'Nội dung bài viết thứ hai', author: 'Trần Thị B' }
];

// ==================== USER APIs ====================

// GET - Lấy tất cả users
app.get('/api/users', (req, res) => {
  res.json({
    success: true,
    message: 'Lấy danh sách users thành công',
    data: users,
    count: users.length
  });
});

// GET - Lấy user theo ID
app.get('/api/users/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const user = users.find(u => u.id === id);
  
  if (user) {
    res.json({
      success: true,
      message: 'Tìm thấy user',
      data: user
    });
  } else {
    res.status(404).json({
      success: false,
      message: 'Không tìm thấy user với ID này'
    });
  }
});

// POST - Tạo user mới
app.post('/api/users', (req, res) => {
  const { name, email, age } = req.body;
  
  if (!name || !email) {
    return res.status(400).json({
      success: false,
      message: 'Tên và email là bắt buộc'
    });
  }
  
  const newUser = {
    id: users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1,
    name,
    email,
    age: age || null
  };
  
  users.push(newUser);
  
  res.status(201).json({
    success: true,
    message: 'Tạo user thành công',
    data: newUser
  });
});

// PUT - Cập nhật user
app.put('/api/users/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { name, email, age } = req.body;
  const userIndex = users.findIndex(u => u.id === id);
  
  if (userIndex === -1) {
    return res.status(404).json({
      success: false,
      message: 'Không tìm thấy user với ID này'
    });
  }
  
  users[userIndex] = {
    ...users[userIndex],
    ...(name && { name }),
    ...(email && { email }),
    ...(age !== undefined && { age })
  };
  
  res.json({
    success: true,
    message: 'Cập nhật user thành công',
    data: users[userIndex]
  });
});

// DELETE - Xóa user
app.delete('/api/users/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const userIndex = users.findIndex(u => u.id === id);
  
  if (userIndex === -1) {
    return res.status(404).json({
      success: false,
      message: 'Không tìm thấy user với ID này'
    });
  }
  
  const deletedUser = users.splice(userIndex, 1)[0];
  
  res.json({
    success: true,
    message: 'Xóa user thành công',
    data: deletedUser
  });
});

// ==================== POST APIs ====================

// GET - Lấy tất cả posts
app.get('/api/posts', (req, res) => {
  res.json({
    success: true,
    message: 'Lấy danh sách posts thành công',
    data: posts,
    count: posts.length
  });
});

// GET - Lấy post theo ID
app.get('/api/posts/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const post = posts.find(p => p.id === id);
  
  if (post) {
    res.json({
      success: true,
      message: 'Tìm thấy post',
      data: post
    });
  } else {
    res.status(404).json({
      success: false,
      message: 'Không tìm thấy post với ID này'
    });
  }
});

// POST - Tạo post mới
app.post('/api/posts', (req, res) => {
  const { title, content, author } = req.body;
  
  if (!title || !content) {
    return res.status(400).json({
      success: false,
      message: 'Tiêu đề và nội dung là bắt buộc'
    });
  }
  
  const newPost = {
    id: posts.length > 0 ? Math.max(...posts.map(p => p.id)) + 1 : 1,
    title,
    content,
    author: author || 'Anonymous',
    createdAt: new Date().toISOString()
  };
  
  posts.push(newPost);
  
  res.status(201).json({
    success: true,
    message: 'Tạo post thành công',
    data: newPost
  });
});

// PUT - Cập nhật post
app.put('/api/posts/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { title, content, author } = req.body;
  const postIndex = posts.findIndex(p => p.id === id);
  
  if (postIndex === -1) {
    return res.status(404).json({
      success: false,
      message: 'Không tìm thấy post với ID này'
    });
  }
  
  posts[postIndex] = {
    ...posts[postIndex],
    ...(title && { title }),
    ...(content && { content }),
    ...(author && { author }),
    updatedAt: new Date().toISOString()
  };
  
  res.json({
    success: true,
    message: 'Cập nhật post thành công',
    data: posts[postIndex]
  });
});

// DELETE - Xóa post
app.delete('/api/posts/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const postIndex = posts.findIndex(p => p.id === id);
  
  if (postIndex === -1) {
    return res.status(404).json({
      success: false,
      message: 'Không tìm thấy post với ID này'
    });
  }
  
  const deletedPost = posts.splice(postIndex, 1)[0];
  
  res.json({
    success: true,
    message: 'Xóa post thành công',
    data: deletedPost
  });
});

// ==================== TEST APIs ====================

// GET - Test endpoint với query parameters
app.get('/api/test/query', (req, res) => {
  const { name, age, city } = req.query;
  
  res.json({
    success: true,
    message: 'Test query parameters',
    queryParams: {
      name: name || 'Không có',
      age: age || 'Không có',
      city: city || 'Không có'
    },
    allQuery: req.query
  });
});

// POST - Test endpoint với JSON body
app.post('/api/test/json', (req, res) => {
  res.json({
    success: true,
    message: 'Test JSON body',
    receivedData: req.body,
    timestamp: new Date().toISOString()
  });
});

// POST - Test endpoint với form data
app.post('/api/test/form', (req, res) => {
  res.json({
    success: true,
    message: 'Test form data',
    receivedData: req.body,
    timestamp: new Date().toISOString()
  });
});

// GET - Test endpoint với headers
app.get('/api/test/headers', (req, res) => {
  res.json({
    success: true,
    message: 'Test headers',
    receivedHeaders: req.headers,
    customHeader: req.headers['custom-header'] || 'Không có'
  });
});

// POST - Test endpoint upload (simulate)
app.post('/api/test/upload', (req, res) => {
  res.json({
    success: true,
    message: 'Test upload endpoint',
    note: 'Đây là endpoint mô phỏng upload file',
    body: req.body,
    headers: req.headers
  });
});

// GET - Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'Server đang hoạt động tốt',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// GET - Root endpoint
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Chào mừng đến với Node.js API Test Server',
    version: '1.0.0',
    endpoints: {
      users: '/api/users',
      posts: '/api/posts',
      test: '/api/test',
      health: '/api/health'
    }
  });
});

// Start server
// Bind vào localhost (127.0.0.1) để có thể test ngay cả khi tắt wifi
// Loopback interface không cần kết nối mạng
app.listen(PORT, '127.0.0.1', () => {
  console.log(`🚀 Server đang chạy tại http://localhost:${PORT}`);
  console.log(`📝 Test các API endpoints với Postman`);
  console.log(`\n⚠️  LƯU Ý: Dùng localhost hoặc 127.0.0.1 trong Postman để test không cần wifi`);
  console.log(`\nCác endpoint chính:`);
  console.log(`  GET    /api/users - Lấy danh sách users`);
  console.log(`  POST   /api/users - Tạo user mới`);
  console.log(`  GET    /api/posts - Lấy danh sách posts`);
  console.log(`  POST   /api/posts - Tạo post mới`);
  console.log(`  GET    /api/test/query - Test query parameters`);
  console.log(`  POST   /api/test/json - Test JSON body`);
  console.log(`  GET    /api/health - Health check`);
});
