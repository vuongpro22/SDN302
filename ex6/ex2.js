// Import the Express module

const express = require('express');
const data = require('./data.json');
// Create an instance of the Express application

const app = express();
const PORT = process.env.PORT || 3000;
// Middleware to parse JSON and URL-encoded bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Define a GET route

app.get('/data', (req, res, next) => {

    res.json({ message: data.message.get });
});
// Start the server

app.listen(PORT, '127.0.0.1', () => {

    console.log('Server is running on port 3000');
});
const article = require('./article');

//GET all articles
app.get('/articles', async (req, res) => {
    try {
        res.status(200).json(article);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// POST a new article
app.post('/articles', async (req, res) => {
    const newArticle = {
        id: article.length + 1,
        title: req.body.title,
        date: req.body.date,
        text: req.body.text
    };
    article.push(newArticle);
    res.status(201).json(newArticle);
});
//GET a specific article
app.get('/articles/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const articleFound = article.find(article => article.id === id);
        if (articleFound) {
            res.status(200).json(articleFound);
        } else {
            res.status(404).json({ message: 'Article not found' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

//POST a new article
app.post('/articles/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const articleFound = article.find(article => article.id === id);
        if (articleFound) {
            res.status(403).json({ message: 'Article already exists' });
        } else {
            res.status(201).json({ message: 'Article created' });
        }
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

//PUT update an article
app.put('/articles/:id', async (req, res) => {
    const index = article.findIndex(article => article.id === parseInt(req.params.id));
    if (index === -1) return res.status(404).json({ message: 'Article not found' });
    article[index] = {
        ...article[index],
        ...req.body
    };
    res.json(article[index]);
});

//DELETE delete an article
app.delete('/articles/:id', async (req, res) => {
    const index = article.findIndex(article => article.id === parseInt(req.params.id));
    if (index === -1) return res.status(404).json({ message: 'Article not found' });
    const deletedArticle = article.splice(index, 1);
    res.status(200).json(deletedArticle);
});