
import axios from 'axios';
import {useCookies} from 'react-cookie';
import React, { useEffect, useState } from 'react'
import { RecipeCard } from './RecipeCard';


export const Savedrecepe = () => {
  const [recipe, setRecipe] = useState([]);
  const userID  =  window.localStorage.getItem('userID');
  const [cookies, _] = useCookies(["access_token"])

  useEffect(() => {
    const fetchsavedrecipe = async()=>{
        try{
            let getsaverecipes =await axios.get(
                `http://localhost:5000/api/recipes/savedrecipes/${userID}`,
                {headers:{authorization:cookies.access_token}});
                setRecipe(getsaverecipes.data.savedRecipes);
        }catch(err){
            console.log(err);
        }
    }
    if(userID){
        fetchsavedrecipe();}
  }, [userID]);


  return (
    
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', padding: "2px" }}>
        <h2>Saved Recipes</h2>
        {recipe && recipe.map((d, index) => (
            <RecipeCard
                key={d._id}
                recipe={d}
                currentUserId={userID}
                
            />
        ))}
    </div>
  );
};
