// Import the Express module

const express = require('express');
const articles = require('./articles');

// Create an instance of the Express application

const app = express();

// Middleware to parse JSON and URL-encoded bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Define a GET route

app.get('/getID/:id', (req, res, next) => {

    res.send('ID: ' + req.params.id);
});
// Start the server

app.listen(3000, () => {

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
app.post('/articles', async (req, res) => {
    try {
        res.status(201).end('Will add the article: ' + req.body.title + ' with details: ' + req.body.text + ' and ' + req.body.date);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}); 
