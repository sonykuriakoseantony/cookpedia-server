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

exports.viewRecipeController = async (req, res) => {
    console.log("--------Inside viewRecipeController--------");
    const { id } = req.params;
    try{
        const viewRecipes = await recipes.findById({_id : id});
        res.status(200).json(viewRecipes);
    }catch(err){
        res.status(500).json(err);
        console.log(err);
    }
}


exports.relatedRecipeController = async (req, res) => {
    console.log("--------Inside viewRecipeController--------");
    const cuisine = req.query.cuisine;
    try{
        const relatedRecipes = await recipes.find({cuisine});
        res.status(200).json(relatedRecipes);
    }catch(err){
        res.status(500).json(err);
        console.log(err);
    }
}

//add recipe
exports.addRecipeController = async (req, res) => {
    console.log("--------Inside addRecipeController--------");

    const {name, ingredients, instructions, prepTimeMinutes, cookTimeMinutes, servings, difficulty, cuisine, caloriesPerServing, image, mealType } = req.body;
    
    try{
        const existingRecipe = await recipes.findOne({name});
        if(existingRecipe){
            res.status(409).json("Recipe already exists. Add a new recipes")
        }
        else{
            const newRecipe = await recipes.create({
                name, ingredients, instructions, prepTimeMinutes, cookTimeMinutes, servings, difficulty, cuisine, caloriesPerServing, image, mealType
            })
            res.status(200).json(newRecipe);
        }
    }catch(err){
        res.status(500).json(err);
        console.log(err);
    }
    
}

//add recipe
exports.editRecipeController = async (req, res) => {
    console.log("--------Inside editRecipeController--------");

    const {name, ingredients, instructions, prepTimeMinutes, cookTimeMinutes, servings, difficulty, cuisine, caloriesPerServing, image, mealType } = req.body;
    const { id } = req.params;
    
    try{
        const updatedRecipe = await recipes.findByIdAndUpdate({_id : id}, {
                name, ingredients, instructions, prepTimeMinutes, cookTimeMinutes, servings, difficulty, cuisine, caloriesPerServing, image, mealType
            }, {new : true})
            res.status(200).json(updatedRecipe);
    }catch(err){
        res.status(500).json(err);
        console.log(err);
    }
    
}
