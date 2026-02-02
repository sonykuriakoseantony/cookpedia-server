const express = require('express');
const recipeController = require('../controller/recipeController');
const userController = require('../controller/userController');
const downloadsController = require('../controller/downloadController');
const saveRecipeController = require('../controller/saveRecipeController');
const feedbackController = require('../controller/feedbackController');

const jwtMiddleware = require('../middlewares/jwtMiddleware');
const multerMiddleWare = require('../middlewares/multerMiddleware');

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

// update user picture
router.put('/users/:id', jwtMiddleware, multerMiddleWare.single('picture'), userController.updateUserImageController);

//----------------Feedback CRUD-------------------
// add feedbacks
router.post('/feedback/add', feedbackController.addFeedbackController);

// fecth feedbacks
router.get('/feedbacks', feedbackController.getAllFeedbacksController);

// get approved feedbacks
router.get('/approved-feedbacks', feedbackController.getApprovedFeedbacksController);


//----------------Recipes CRUD-------------------
// get all recipe router
router.get('/recipes', recipeController.getAllRecipesController);

//-------------------For Autherized users----------------------
// get recipe by id
router.get('/recipes/:id', jwtMiddleware, recipeController.viewRecipeController);

// get related recipes by cuisine
router.get('/recipes-related', jwtMiddleware, recipeController.relatedRecipeController);

// download recipe
router.post('/downloads/:id', jwtMiddleware, downloadsController.addToDownloadsController);

// get user downloaded recipe
router.get('/user-downloads', jwtMiddleware, downloadsController.getUserDownloadListController);

// save recipe
router.post('/save-recipe/:id', jwtMiddleware, saveRecipeController.saveRecipeToCollectionController);

// get saved recipes
router.get('/saved-recipes', jwtMiddleware, saveRecipeController.getAllSavedRecipesController);

// delete saved recipes
router.delete('/saved-recipes/:id/delete', jwtMiddleware, saveRecipeController.removeSavedRecipesController);



module.exports = router;
