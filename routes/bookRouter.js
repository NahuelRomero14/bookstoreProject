const express = require('express');
const booksController = require('../controllers/bookController');

const Joi = require('joi');
const validator = require('express-joi-validation').createValidator();

const bodySchemaBook = Joi.object({
  title: Joi.string().alphanum().required(), // posible cambio a title: Joi.string().required(),
  author: Joi.string().min(3).max(30).required(),
  genre: Joi.string().required(),
  read: Joi.boolean().required()
});

const routes = (Book) => {

  const bookRouter = express.Router();

  
  const { getBooks, postBooks, getBookById, putBooks, deleteBookById } = booksController(Book);
  
  bookRouter.route('/books')
  .get(getBooks)
  .post(validator.body(bodySchemaBook), postBooks) // posible cambio para la actividad : .post(validator.body(bodySchema),validator.params(paramsSchema), postBooks)
 
  bookRouter.route('/books/:bookId')
  .get(getBookById)
  .put(putBooks)
  .delete(deleteBookById)

  return bookRouter;
}
module.exports = routes;