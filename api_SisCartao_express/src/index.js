const express = require('express')

const books = []

const app = express()

app.use(express.json)

app.post('/books', (req, res) => {
  const { id, title, autor, publishedAt } = req.body
  const book = { id, title, autor, publishedAt }
  books.push(book)
  return res.status(201).json(book)
})

app.listen(3000, () => console.log('Server is running on port 3000'))
