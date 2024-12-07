import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card } from 'antd';
import { RecipeCard } from './RecipeCard';



const FeaturedRecipe = () => {
  const [featRecipe, setFeatRecipe] = useState(null);
  let [username,setUsername]= useState("");
  let userID = window.localStorage.getItem('userID');

  useEffect(() => {
    const fetchFeaturedRecipe = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/recipes/featured');
        
        setFeatRecipe(response.data.featuredRecipe);
        setUsername(response.data.username);
      } catch (error) {
        console.error('Error fetching featured recipe:', error);
      }
    };

    fetchFeaturedRecipe();
  }, []);

  
  return ( 
    <div style={{height:'100%',minWidth:'310px', margin:'5px', justifyContent:'center',display:'flex-box',flexDirection:'column'}}>
      <h2 style={{textAlign:'center'}}>Featured Recipe of the Day</h2>

      {featRecipe ? (
            <RecipeCard 
                key={featRecipe._id}
                recipe={featRecipe}
                currentUserId={userID}
              
            />
        ): (
          <p>Loading featured recipe...</p>)}
    </div>
  );
};

export default FeaturedRecipe;
