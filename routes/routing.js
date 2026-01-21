const express = require('express');
const recipeController = require('../controller/recipeController');

const router = express.Router();

// get all recipe router
router.get('/recipes', recipeController.getAllRecipesController)

module.exports = router;
