const recipes = require('../model/recipeModel');

exports.getAllRecipesController = async (req, res) => {
    console.log("--------Inside getAllRecipesController--------");
    
    try{
        const allRecipes = await recipes.find();
        res.status(200).json(allRecipes);
    }catch(err){
        res.status(500).json(err);
        console.log(err);
    }
    
}