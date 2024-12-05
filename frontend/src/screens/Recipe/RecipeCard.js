import React from 'react';

const RecipeCard = ({ recipe }) => {
  // Define styles as a JavaScript object
  const cardStyles = {
    border: '1px solid #ccc',
    borderRadius: '8px',
    padding: '16px',
    margin: '16px',
    backgroundColor: '#f9f9f9',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    cursor: 'pointer',
  };

  const titleStyles = {
    fontSize: '1.5rem',
    marginBottom: '8px',
    color: '#333',
  };

  const imageStyles = {
    width: '100%',
    height: '150px',
    objectFit: 'cover',
    borderRadius: '8px',
    marginBottom: '8px',
  };

  const handleCardClick = () => {
    // Redirect to the details page for this recipe
    window.location.href = `/recipe/${recipe._id}`;
  };

  return (
    <div style={cardStyles} onClick={handleCardClick}>
      <img src={recipe.imgurl} alt={recipe.title} style={imageStyles} />
      <h2 style={titleStyles}>{recipe.title}</h2>
    </div>
  );
};

export default RecipeCard;
