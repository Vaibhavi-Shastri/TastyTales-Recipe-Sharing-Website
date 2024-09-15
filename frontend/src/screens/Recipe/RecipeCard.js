import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card,  Modal } from 'antd';
import { Button } from 'antd/es/radio';
import { useCookies } from 'react-cookie';
import CommentSection from './CommentSection';
const { Meta } = Card;



const RatingComponent = ({ userRating, onRatingChange }) => {
  return (
    <div>
      <b>Your Rating</b>
      <div>
        {[1, 2, 3, 4, 5].map(star => (
          <span
            key={star}
            style={{ cursor: 'pointer', color: star <= userRating ? 'gold' : 'gray', fontSize:"24px"  }}
            onClick={() => onRatingChange(star)}
          >
            ★
          </span>
        ))}
      </div>
    </div>
  );
};

const AverageRatingComponent = ({ averageRating, numberOfRatings }) => {
    const renderStars = () => {
      const fullStars = Math.floor(averageRating);
      const halfStar = averageRating % 1 !== 0;
      const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
  
      return (
        <>
          {[...Array(fullStars)].map((_, index) => (
            <span key={index} style={{ color: 'gold', fontSize: '24px' }}>★</span>
          ))}
          {halfStar && <span style={{ color: 'gold', fontSize: '24px' }}>☆</span>}
          {[...Array(emptyStars)].map((_, index) => (
            <span key={index} style={{ color: 'gray', fontSize: '24px' }}>★</span>
          ))}
        </>
      );
    };
  
    return (
      <div>
        <b>Average Rating</b>
        <div>{renderStars()}</div>
        <p>({numberOfRatings} ratings)</p>
      </div>
    );
  };


export const RecipeCard = ({ recipe, currentUserId}) => {

    const [userRating, setUserRating] = useState(0);
    const [averageRatingData, setAverageRatingData] = useState({ averageRating: 0, numberOfRatings: 0 });
    const [cookies, _] = useCookies(["access_token"])
    const [showComments, setShowComments] = useState(false);
    const [showDetail, setShowDetail] = useState(false);

    const [saverecipe, setSaverecipe] = useState([]);

    let userID = currentUserId;
    let cookie = cookies.access_token;

    useEffect(() => {
        const existingRating = recipe.ratings.find(r => r.userid === currentUserId);
        if (existingRating) {
            setUserRating(existingRating.rating);
        }

        const fetchoverallrating = async () => {
            try {
            let reciperating = await axios.get(`http://localhost:5000/api/recipes/${recipe._id}/rate`);
            setAverageRatingData(reciperating.data);
            } catch (err) {
            console.log(err);
            }
        };

        const fetchsavedrecipe = async () => {
          try {
              let getsaverecipes = await axios.get(
                  `http://localhost:5000/api/recipes/savedrecipes/ids/${userID}`,{headers:{authorization:cookie}}
              );
            
              setSaverecipe(getsaverecipes.data.savedRecipes);
          } catch (err) {
              console.log( err);
          }
      }
      if(userID){
        fetchsavedrecipe();
        fetchoverallrating();}
    }, [recipe, currentUserId]);

    const handleRatingChange = async (newRating) => {
        try {
            const response = await axios.post(`http://localhost:5000/api/recipes/${recipe._id}/rate`, { userid: currentUserId, rating: newRating },{headers:{authorization:cookies.access_token}});
            console.log("response is: ",response);
            setUserRating(newRating);
            setAverageRatingData(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const saveditem = async (recipeID) => {
      const values = { "recipeID": recipeID, "userID": userID };
      try {
          const response = await axios.put("http://localhost:5000/api/recipes", values,
              { headers: { authorization: cookies.access_token }});
          setSaverecipe(response.data.savedRecipes);
          // console.log("response saved api", response);
      } catch (e) {
          console.log("Server issue");
      }
    }
    const isRecipesaved = (id) => saverecipe?.includes(id);
      

return (
  <Card
    hoverable
    key={recipe._id}
    style={{
      width:'350px',
      padding: '5px',
      margin: '10px',
      boxShadow: '2px 2px 16px gray',
    }}
    cover={<img alt="FOOD" src={recipe.imgurl} style={{ height: '200px' }} />}
  >
    <Meta title={recipe?.title.toUpperCase()} />
    <p>Difficulty Level: {recipe?.difficulty.toUpperCase()}</p>
    <p>Preparation Time: {recipe?.prepTime} minutes</p>
    <Button onClick={() => saveditem(recipe._id)} disabled={isRecipesaved(recipe._id)}>
      {isRecipesaved(recipe._id) ? 'Saved Recipe' : 'Save Recipe'}
    </Button>
    <p>Created By: {recipe?.username}</p>

    <RatingComponent userRating={userRating} onRatingChange={handleRatingChange} />
    <AverageRatingComponent
      averageRating={averageRatingData.averageRating}
      numberOfRatings={averageRatingData.numberOfRatings}
    />

    {/* Description Toggle Button */}
    <Button onClick={() => setShowDetail(!showDetail)}>
        {showDetail ? 'Hide Ingredients & Instructions' : 'Show Ingredients & Instructions'}
      </Button>

      {/* Conditional Rendering of CommentSection */}
      {showDetail && (<Modal
        title="Ingredients And Instructions"
        open={!!showDetail }
        onCancel={() => setShowDetail(false)}
        footer={null}
        >
          <div>
        <b>Ingredients : </b>
        <p>{recipe?.ingredients}</p>
        <b>Instructions : </b>
        <p>{recipe?.instructions}</p>
        </div>
      </Modal>)}
    <b style={{display:'block'}}>Comment</b>


    


    {/* Comments Toggle Button */}
    <Button onClick={() => setShowComments(!showComments)}>
        {showComments ? 'Hide Comments' : 'Show Comments'}
      </Button>

      {/* Conditional Rendering of CommentSection */}
      {showComments && <CommentSection recipeId={recipe._id} currentUserId={currentUserId} />}

  </Card>
  );
};
