const express = require('express');
const booksController = require('../contollers/bookController');

const routes = (Book) => {

  const bookRouter = express.Router();
  const { getBooks, postBooks, getBookById, putBooks, deleteBookById } = booksController(Book);
  
  bookRouter.route('/books')
  .get(getBooks)
  .post(postBooks)

  bookRouter.route('/books/:bookId')
  .get(getBookById)
  .put(putBooks)
  .delete(deleteBookById)

  return bookRouter;
}
module.exports = routes;