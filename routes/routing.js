const express = require('express');
const recipeController = require('../controller/recipeController');
const userController = require('../controller/userController');
const jwtMiddleware = require('../middlewares/jwtMiddleware')

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

//-------------------For Autherized users----------------------
// get recipe by id
router.get('/recipes/:id', jwtMiddleware, recipeController.viewRecipeController);

// get related recipes by cuisine
router.get('/recipes-related', jwtMiddleware, recipeController.relatedRecipeController);

module.exports = router;
