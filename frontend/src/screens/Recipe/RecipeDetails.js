// Importing necessary modules
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './RecipeDetails.css';

// Recipe Details component
export const RecipeDetails = () => {
  const { id } = useParams(); // Get the recipe id from the URL
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    const fetchRecipeDetails = async () => {
      try {
        // Fetching the recipe details from the API using the recipe id
        const response = await axios.get(`http://localhost:5000/api/recipes/${id}`);
        setRecipe(response.data);
      } catch (err) {
        console.error('Error fetching recipe details', err);
      }
    };

    fetchRecipeDetails();
  }, [id]);

  // If the recipe is still loading, show loading message
  if (!recipe) {
    return <div>Loading...</div>;
  }

  return (
    <div className="recipe-details-container">
      <h1>{recipe.title}</h1>
      <img src={recipe.image} alt={recipe.title} className="recipe-details-image" />
      <p><strong>Category:</strong> {recipe.category}</p>
      <p><strong>Difficulty:</strong> {recipe.difficulty}</p>
      <p><strong>Ingredients:</strong></p>
      <ul>
        {recipe.ingredients.map((ingredient, index) => (
          <li key={index}>{ingredient}</li>
        ))}
      </ul>
      <p><strong>Instructions:</strong> {recipe.instructions}</p>
    </div>
  );
};

// Express API Endpoint (backend)
const express = require('express');
const mongoose = require('mongoose');
const Recipe = require('./models/Recipe'); // Assuming you have a Recipe model

const app = express();
const port = 5000;

mongoose.connect('mongodb://localhost:27017/recipes', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.get('/api/recipes/:id', async (req, res) => {
  try {
    // Fetching recipe from MongoDB using the recipe ID
    const recipe = await Recipe.findById(req.params.id);
    
    if (!recipe) {
      return res.status(404).json({ message: 'Recipe not found' });
    }

    // Returning the recipe data as a JSON response
    res.json(recipe);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

