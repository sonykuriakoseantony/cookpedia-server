const express = require('express');
const recipeController = require('../controller/recipeController');
const userController = require('../controller/userController');

const router = express.Router();

// get all recipe router
router.get('/recipes', recipeController.getAllRecipesController);

// register user
router.post('/register', userController.registerUserController);

// login user
router.post('/login', userController.loginUserController);

// get user by id
router.get('/user/:userId', userController.getUserController);

// update user profile
router.put('/user/:userId', userController.updateUserController);

module.exports = router;
