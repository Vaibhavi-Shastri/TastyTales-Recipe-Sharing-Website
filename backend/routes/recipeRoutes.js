
const express = require('express');
const { createRecipe, getRecipes,  
    savedRecipe,getsavedRecipe, getsavedRecipebyid, rateRecipe, gettotalReciperatting,
     getComments, addComment, editComment, deleteComment, getMyrecipe, editMyrecipe, deleteMyrecipe, getFeaturerecipe } = require('../controllers/recipeController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();


router.route('/').get(getRecipes).post(protect , createRecipe);
router.route('/').put(protect ,savedRecipe);
router.route('/savedrecipes/:userID').get(protect ,getsavedRecipe);
router.route('/savedrecipes/ids/:userID').get(protect , getsavedRecipebyid);
//rating route
router.route('/:recipeId/rate').post(protect, rateRecipe).get(gettotalReciperatting);

//comment route 
router.route('/:recipeId/comments').get(getComments);
router.route('/:recipeId/comments').post(protect, addComment);
router.route('/:recipeId/comments/:commentId').put(protect, editComment);
router.route('/:recipeId/comments/:commentId').delete(protect, deleteComment);


//myrecipe route
//comment route /myrecipe/:userId
router.route('/myrecipe/:userId').get(protect,getMyrecipe);
router.route('/myrecipe/:userId').put(protect, editMyrecipe);
router.route('/myrecipe/:recipeId').delete(protect, deleteMyrecipe);


// get the featured recipe
router.route('/featured').get(getFeaturerecipe)

module.exports = router;
