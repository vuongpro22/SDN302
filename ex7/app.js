const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const articleRouter =require('./routes/articleRouter');
const videoRouter = require('./routes/videoRouter');
app.use('/articles', articleRouter);
app.use('/videos', videoRouter);
app.listen(PORT, '127.0.0.1', () => {
    console.log('Server is running on port 3000');
});