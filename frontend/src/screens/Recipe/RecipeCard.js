import React from 'react';
import { useNavigate } from 'react-router-dom';
import './RecipeCard.css';

export const RecipeCard = ({ recipe }) => {
  const navigate = useNavigate();

  // Redirect to the recipe details page
  const handleClick = () => {
    navigate(`/recipe/${recipe._id}`); // Navigate to the detailed recipe page
  };

  return (
    <div className="recipe-card" onClick={handleClick}>
      <img src={recipe.image} alt={recipe.title} className="recipe-image" />
      <h3>{recipe.title}</h3>
      <p>{recipe.category}</p>
      <p>{recipe.difficulty}</p>
    </div>
  );
};
