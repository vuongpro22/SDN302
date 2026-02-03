const express = require('express');
const mongoose = require('mongoose');
const articleRouter = require('./routes/articleRouter');
const commentRouter = require('./routes/commentRouter');

mongoose.set('strictQuery', true);

const MONGO_URL = 'mongodb://127.0.0.1:27017/exercise14';
const PORT = 3000;

const app = express();

// Body parsers (for safety; articleRouter also has its own)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Simple health check
app.get('/', (req, res) => {
  res.send('API is running');
});

// Mount article routes
app.use('/articles', articleRouter);

// Mount comment routes
app.use('/comments', commentRouter);

async function startServer() {
  try {
    await mongoose.connect(MONGO_URL);
    console.log('MongoDB connected');

    app.listen(PORT, '127.0.0.1', () => {
      console.log(`Server listening on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error('Failed to start server:', err);
    process.exit(1);
  }
}

startServer();