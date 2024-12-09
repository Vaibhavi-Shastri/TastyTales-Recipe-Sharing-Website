import axios from 'axios'; 

import { useCookies } from 'react-cookie'; 

import React, { useEffect, useState } from 'react'; 

import { RecipeCard } from './RecipeCard'; // Ensure this path is correct 

 

export const Savedrecepe = () => { 

  const [recipes, setRecipes] = useState([]); 

  const userID = window.localStorage.getItem('userID'); 

  const [cookies] = useCookies(['access_token']); 

 

  useEffect(() => { 

    const fetchSavedRecipes = async () => { 

      try { 

        const response = await axios.get( 

          `http://localhost:5000/api/recipes/savedrecipes/${userID}`, 

          { headers: { authorization: cookies.access_token } } 

        ); 

        setRecipes(response.data.savedRecipes); 

      } catch (err) { 

        console.error(err); 

      } 

    }; 

 

    if (userID) { 

      fetchSavedRecipes(); 

    } 

  }, [userID, cookies]); 

 

  return ( 

    <div 

      style={{ 

        display: 'flex', 
        backgroundColor: '#f0f2f5', 

        flexWrap: 'wrap', 

        justifyContent: 'center', 

        gap: '20px', 

        padding: '20px', 

      }} 

    > 

      <h2 style={{ width: '100%', textAlign: 'center', fontSize: '2.5rem' }}>Saved Recipes</h2> {/* Increased font size */} 

      {recipes.length > 0 ? ( 

        recipes.map((recipe) => ( 

          <RecipeCard key={recipe._id} recipe={recipe} currentUserId={userID} /> 

        )) 

      ) : ( 

        <p style={{ width: '100%', textAlign: 'center' }}>No saved recipes found!</p> 

      )} 

    </div> 

  ); 

}; 

 

 