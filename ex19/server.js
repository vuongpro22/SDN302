// server.js
const express = require('express');
const exphbs = require('express-handlebars');
const app = express();

// Configure Handlebars
const hbs = exphbs.create({
  defaultLayout: 'main',
  helpers: {
    formatDate: function(date) {
      return new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    }
  }
});

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// Sample articles data
const articles = [
  {
    id: 1,
    title: 'Breaking News: Technology Advances',
    author: 'John Doe',
    date: '2024-01-15',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.'
  },
  {
    id: 2,
    title: 'Science Discovery: New Planet Found',
    author: 'Jane Smith',
    date: '2024-01-14',
    content: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
  },
  {
    id: 3,
    title: 'Sports Update: Championship Results',
    author: 'Mike Johnson',
    date: '2024-01-13',
    content: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.'
  },
  {
    id: 4,
    title: 'Health News: Medical Breakthrough',
    author: 'Sarah Williams',
    date: '2024-01-12',
    content: 'Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.'
  }
];

// Routes
// Exercise 1: Hello World route
app.get('/hello', function(req, res) {
  res.render('hello', {
    title: 'Hello World'
  });
});

// Homepage - displays all articles (Exercise 2-5)
app.get('/', function(req, res) {
  res.render('home', {
    title: 'News Homepage',
    articles: articles
  });
});

// Individual article page
app.get('/articles/:id', function(req, res) {
  const articleId = parseInt(req.params.id);
  const article = articles.find(a => a.id === articleId);
  
  if (article) {
    res.render('article', {
      title: article.title,
      article: article
    });
  } else {
    res.status(404).send('Article not found');
  }
});

// About page (optional)
app.get('/about', function(req, res) {
  res.render('about', {
    title: 'About Us'
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, '127.0.0.1', () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
