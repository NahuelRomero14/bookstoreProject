const express = require('express');
const usersController = require('../controllers/userController');


const Joi = require('joi');
const validator = require('express-joi-validation').createValidator();

const bodySchemaUser = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
  phone: Joi.number().required(),
  userName: Joi.required(),
  password: Joi.required(),
  address: Joi.required()
   
});

const routes = (User) => {

  const userRouter = express.Router();
  const { getUsers, postUsers, getUserById, putUsers, deleteUserById, login, validateToken } = usersController(User);
  
  userRouter.route('/users')
  .get(getUsers)
  .post(validator.body(bodySchemaUser),postUsers)

  userRouter.route('/users/:userId')
  .get(getUserById)
  .put(putUsers)
  .delete(deleteUserById)

  userRouter.route('/login')
  .post(login)

  userRouter.route('/login/validate')
  .get(validateToken)

  return userRouter;
}
module.exports = routes;