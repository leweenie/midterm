/**
 * Midterm API Project - COMP229 Winter 2024
 **/

const express = require('express');
const path = require('path');
const app = express();
app.use(express.json());

// Serve static files (e.g., images, CSS) from the "public" folder
app.use(express.static(path.join(__dirname, 'public')));

// Array of strings (books)
let books = ['The Hobbit', '1984', 'To Kill a Mockingbird', 'Moby Dick', 'Pride and Prejudice'];

// Set the port for the server
const PORT = 8080;

// Serve the instructions HTML file (index.html)
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/index.html'));
});

// API Endpoints

// GET /api/items
// Description: Get all items (books)
// Task: Implement logic to return the full list of books
app.get('/api/items', (req, res) => {
  res.json(books);
});

// GET /api/items?title=[<<partial title name>>]
// Description: Search for books by partial title match
// Task: Implement logic to return books matching the partial title
app.get('/api/items/search', (req, res) => {
  const { title } = req.query;
  const filteredBooks = books.filter(book => book.toLowerCase().includes(title.toLowerCase()));
  res.json(filteredBooks);
});

// GET /api/items/:id
// Description: Get a specific item by ID
// Task: Implement logic to return a book by its index (ID)
app.get('/api/items/:id', (req, res) => {
  const { id } = req.params;
  const book = books[parseInt(id)];
  if (book) {
    res.json(book);
  } else {
    res.status(404).send('Book not found');
  }
});

// POST /api/items
// Description: Add a new item
// Task: Implement logic to add a new book to the array
app.post('/api/items', (req, res) => {
  const { title } = req.body;
  books.push(title);
  res.status(201).json(title);
});

// PUT /api/items/:id
// Description: Update an item by ID
// Task: Implement logic to update a book by its index (ID)
app.put('/api/items/:id', (req, res) => {
  const { id } = req.params;
  const { title } = req.body;
  if (books[parseInt(id)]) {
    books[parseInt(id)] = title;
    res.json(title);
  } else {
    res.status(404).send('Book not found');
  }
});

// DELETE /api/items/:id
// Description: Remove an item by ID
// Task: Implement logic to remove a book by its index (ID)
app.delete('/api/items/:id', (req, res) => {
  const { id } = req.params;
  if (books[parseInt(id)]) {
    const deletedBook = books.splice(parseInt(id), 1);
    res.json(deletedBook);
  } else {
    res.status(404).send('Book not found');
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
