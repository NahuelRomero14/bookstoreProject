const { response } = require("express");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

 

const usersController = (User) => {

  const getUsers = async (req, res) => {
    const { query } = req;
    const response = await User.find(query);

    res.json(response);
  }

  const postUsers = async (req, res) => {
    const user = new User(req.body);
    
    user.password = await bcrypt.hash(user.password, 10);
    await user.save();
    res.json(user);
  }

  const getUserById = async (req, res) => {
    const { params } = req;
    const response = await User.findById(params.userId);
    res.json(response);
  }

  const putUsers = async (req, res) => {
    const { body } = req;
    const response = await User.updateOne({
      _id: req.params.userId
    }, {
        $set: {
        firstName: body.firstName,
        lastName: body.lastName,
        userName: body.userName,
        password: body.password,
        email: body.email,
        address: body.address,
        phone: body.phone

      } 
    });
    res.json(response);
  }

  const deleteUserById = async (req, res) => {
    const id = req.params.userId;
    await User.findByIdAndDelete(id);
    res.status(202).json('The user has been successfully deleted.');
  }

  const login = async (req, res) => {
    const { body } = req;
    var response;
    const savedUser = await User.findOne({ "userName": body.userName });

    if (savedUser && body.password === savedUser.password){       
      
      const token = generateToken(savedUser);
      response = { message:'Ok', token};
      console.log('The generate token for '+ body.userName + ' is :' + token);

    } else {
      res.status(401).json('invalid credentials')

    }
    res.json(response);
  
  }
  const validateToken = async (req, res) => {
    const { body } = req;
    const token = body.token;
    var decoded = jwt.verify(token, 'secretKey');
    console.log(decoded);//*
    res.json(decoded);


  }


  const generateToken = savedUser => {
    const tokenPayLoad = {

      firstName: savedUser.firstName,
      lastName: savedUser.lastName,
      userName: savedUser.userName,
      email: savedUser.email,
      address: savedUser.address,
      phone: savedUser.phone

    }
    return jwt.sign ({ tokenPayLoad }, 'secretKey', { expiresIn: '1h' });
  }


  return { getUsers, postUsers, getUserById, putUsers, deleteUserById, login, validateToken};
}

module.exports = usersController;