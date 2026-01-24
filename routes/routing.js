const express = require('express');
const recipeController = require('../controller/recipeController');
const userController = require('../controller/userController');

const router = express.Router();


//----------------Auth Login/Register-------------------
// register user
router.post('/register', userController.registerUserController);

// login user
router.post('/login', userController.loginUserController);


//----------------Users CRUD-------------------
// get user by id
router.get('/user/:userId', userController.getUserController);

// update user profile
router.put('/user/:userId', userController.updateUserController);


//----------------Recipes CRUD-------------------
// get all recipe router
router.get('/recipes', recipeController.getAllRecipesController);

// get recipe by id
router.get('/recipes/:id', recipeController.viewRecipeController);

module.exports = router;
