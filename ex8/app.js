const express = require('express');
const app = express();
const port = 3000;

// Middleware to parse JSON body
app.use(express.json());

// Simulated article saving operation
app.post('/articles', async (req, res, next) => {
  try {
    const { title, date, text } = req.body;
    // Simulate article saving logic
    if (!title || !text || !date) {
      throw new Error("Missing required article fields");
    }
    // If the operation was successful, send a success response
    res.status(201).json({ message: "Article saved successfully" });
  } catch (err) {
    // Pass the error to the error-handling middleware
    next(err);
  }
});

// Error-handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack); // Log the error stack for debugging
  // Send a generic error message
  res.status(500).json({ error: "An error occurred, please try again later." });
});

// Server Start
app.listen(port, '127.0.0.1', () => console.log(`Server running on http://localhost:${port}`));
