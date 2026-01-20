// Import the Express module

const express = require('express');
const data = require('./data.json');
// Create an instance of the Express application

const app = express();
const PORT = process.env.PORT || 3000;
// Middleware to parse JSON and URL-encoded bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Import validation middlewares
const validateArticle = require('./middleware/validateArticle');
const validateDate = require('./middleware/validateDate');
const validateTextLength = require('./middleware/validateTextLength');

// Define a GET route

app.get('/data', (req, res, next) => {

    res.json({ message: data.message.get });
});
// Start the server

app.listen(PORT, '127.0.0.1', () => {

    console.log('Server is running on port 3000');
});
const article =
{
    title: "My Favorite Vacation",
    date: "2024-03-03",
    text: "We spent seven days in Italy..."
}

//GET all articles
app.get('/articles', async (req, res) => {
    try {
        res.status(200).end('Will send all the articles to you!');
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// POST a new article
app.post('/articles', validateArticle, validateDate, validateTextLength, async (req, res) => {
    try {
        res.status(201).end('Will add the article: ' + req.body.title + ' with details: ' + req.body.text + ' and ' + req.body.date);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

//PUT update an article 
app.put('/articles', async (req, res) => {
    try {
        res.status(403).end('PUT operation not supported on /articles');
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

//DELETE delete an article
app.delete('/articles', async (req, res) => {
    try {
        res.status(200).end('Deleting all articles');
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

//GET a specific article
app.get('/articles/:id', async (req, res) => {
    try {
        res.status(200).end('Will send article: ' + req.params.id + 'to you!');
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

//POST a new article
app.post('/articles/:id', async (req, res) => {
    try {
        res.status(403).end('POST operation not supported on /articles/'+req.params.id);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

//PUT update an article
app.put('/articles/:id', validateArticle, validateDate, validateTextLength, async (req, res) => {
    try {
        res.write('Updating article: ' + req.params.id + '\n');
        res.status(200).end('Will update the article: ' + req.body.title + ' with details: ' + req.body.text + ' and ' + req.body.date);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

//DELETE delete an article
app.delete('/articles/:id', async (req, res) => {
    try {
        res.status(200).end('Deleting article: ' + req.params.id);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});