const savedRecipes = require('../model/savedRecipeModel')

exports.saveRecipeToCollectionController = async (req, res) =>{
    console.log("Inside saveToCollectionController", req.payload);

    const {id} = req.params;
    const userMail = req.payload;
    const {name, image} = req.body;

    try{

        const existingRecipe = await savedRecipes.findOne({recipeId : id, userMail});
        if(existingRecipe){
            res.status(409).json("Recipe exist in collection, Save another Recipe");
        }
        else{
            const newRecipe = await savedRecipes.create({
                recipeId : id, name, image,  userMail
            });
            res.status(200).json(newRecipe);
        }
    }catch(err){
        res.status(500).json(err);
        console.log(err);
    }
    
}

// getAllSavedRecipesController fur loggedin users
exports.getAllSavedRecipesController = async (req, res) =>{
    console.log("Inside getAllSavedRecipesController", req.payload);
    const userMail = req.payload;
    try{
        const allRecipes = await savedRecipes.find({userMail});
        res.status(200).json(allRecipes);
    }catch(err){
        res.status(500).json(err);
        console.log(err);
    }
}