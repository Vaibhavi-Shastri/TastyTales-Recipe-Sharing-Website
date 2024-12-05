import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const RecipeDetails = () => {
  const { id } = useParams();
  console.log("Recipe ID from URL:", id);
  const [recipe, setRecipe] = useState(null); // State to hold the recipe data
  const [loading, setLoading] = useState(true);
  
  
  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await fetch(`/api/recipes/${id}`); // Adjust URL as needed
        const data = await response.json();
        setRecipe(data); // Set recipe data
      } catch (error) {
        console.error('Error fetching recipe:', error);
      } finally {
        setLoading(false); // Stop loading spinner
      }
    };

    fetchRecipe();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (!recipe) return <p>No recipe found.</p>;

  return (
    <div>
      <h1>{recipe.title}</h1>
      <img src={recipe.imgurl} alt={recipe.title} />
      <ul>
        {recipe.ingredients?.map((ingredient, index) => (
          <li key={index}>{ingredient}</li>
        ))}
      </ul>
      <p>{recipe.instructions}</p>
    </div>
  );
};

export default RecipeDetails;
