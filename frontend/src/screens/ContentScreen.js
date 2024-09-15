import React from 'react';
import { useSelector } from 'react-redux';
import { Allrecipe } from './Recipe/Allrecipe';
import { Createrecipe } from './Recipe/Createrecipe';
import { Savedrecepe } from './Recipe/Savedrecepe';
import { Userprofile } from './profile/Userprofile';
import MyRecipeSection from './Recipe/MyRecipeSection';






export const ContentScreen = () => {
  const currentPage = useSelector((state) => state.page.currentPage);

  return (
    <div className="content-box" style={{overflow: 'auto',
                                      height: 'calc(100vh - 64px - 70px)', /* Adjust height to fit header and footer */
                                      padding: '4px',
                                      overflowX:'hidden',
                                      background: 'rgb(249 251 255)',
                                      borderRadius: '10px'
                                      }}>

      {currentPage === 'Home' &&  <Allrecipe/>}
        {currentPage === 'Profile' && <Userprofile/>}
        {currentPage === 'Create Recipe' && <Createrecipe/>}
        {currentPage === 'Saved Recipes' && <Savedrecepe/>}
        {currentPage === 'My Recipes' && <MyRecipeSection/>}
    </div>
  );
};


