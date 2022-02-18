const express = require('express');
const booksController = require('../controllers/bookController');

const Joi = require('joi');
const validator = require('express-joi-validation').createValidator();

const bodySchemaBook = Joi.object({
  title: Joi.string().alphanum().required(), 
  author: Joi.string().min(3).max(30).required(),
  genre: Joi.string().required(),
  read: Joi.boolean().required()
});

const routes = (Book) => {

  const bookRouter = express.Router();

  
  const { getBooks, postBooks, getBookById, getBookByName, getBookByAuthor, putBooks, deleteBookById } = booksController(Book);
  
  bookRouter.route('/books')
  .get(getBooks)
  .post(validator.body(bodySchemaBook), postBooks) 
 
  bookRouter.route('/books/:bookId')
  .get(getBookById)
  .put(putBooks)
  .delete(deleteBookById)

  
  bookRouter.route('/books/byName/:bookName')
  .get(getBookByName)

 
  bookRouter.route('/books/byAuthor/:bookAuthor')
  .get(getBookByAuthor)

  
  return bookRouter;
}
module.exports = routes;