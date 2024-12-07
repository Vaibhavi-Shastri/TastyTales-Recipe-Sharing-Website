import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {useCookies} from 'react-cookie';
import { RecipeCard } from './RecipeCard';
import { useNavigate } from 'react-router-dom';
import { Input, Select, Row, Col } from 'antd';
import Pagination from '../../pagination/Paginationcard';
import FeaturedRecipe from './FeaturedRecipe';
import './Allrecipe.css';

const { Search } = Input;
const { Option } = Select;

export const Allrecipe = () => {
    const [recipe, setRecipe] = useState([]);
    
    const [cookies, _] = useCookies(["access_token"]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const [category, setCategory] = useState('');
    const [difficulty, setDifficulty] = useState('');
    const [searchTerm, setSearchTerm] = useState('');

    const navigate = useNavigate();
    const pagelimit = 3;
    let userID = window.localStorage.getItem('userID');
    let cookie = cookies.access_token;


    useEffect(() => {
        const fetchRecipes = async () => {
            try {
                let getrecipes = await axios.get("http://localhost:5000/api/recipes",
                {
                    params: {
                    page: currentPage,
                    limit: pagelimit,
                    category,
                    difficulty,
                    search: searchTerm,
                    },
                  });

                
                  setRecipe(getrecipes.data.recipesWithUserDetails);
                  setTotalPages(getrecipes.data.totalPages);
            } catch (err) {
                console.log(err);
            }
        }

        

        if(!userID){
            console.log("please login");
            navigate("/login");
        }
        else{
            fetchRecipes();
       }
    }, [currentPage ,category, difficulty, searchTerm]);
    
    

    
    const handleCategoryChange = (value) => {
        setCategory(value);
      };
    
      const handleDifficultyChange = (value) => {
        setDifficulty(value);
      };
    
      const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
      };
    
    return (
       
        <div>
        <div className='Searchbar'>
            <Row gutter={[16, 16]} style={{  marginTop: '0px', borderRadius: '10px' }}>
            <Col span={8}>
                <Search
                placeholder="Search by title or ingredients"
                value={searchTerm}
                onChange={handleSearchChange}
                enterButton
                />
            </Col>
            <Col span={8}>
                <Select
                placeholder="Select Category"
                value={category}
                onChange={handleCategoryChange}
                style={{ width: '100%' }}
                >
                <Option value="">All Categories</Option>
                <Option value="main course">Main course</Option>
                <Option value="dessert">Dessert</Option>
                <Option value="snacks">Snacks</Option>
                <Option value="fastfood">Fastfood</Option>
                </Select>
            </Col>
            <Col span={8}>
                <Select
                placeholder="Select Difficulty"
                value={difficulty}
                onChange={handleDifficultyChange}
                style={{ width: '100%' }}
                >
                <Option value="">All Difficulty Levels</Option>
                <Option value="Easy">Easy</Option>
                <Option value="Medium">Medium</Option>
                <Option value="Hard">Hard</Option>
                </Select>
            </Col>
            </Row>
        </div>

      <Row gutter={[16, 16]}>
        <Col span={16}>
          <div  style={{ display: 'flex', overflow:'auto',
           justifyContent: 'center', alignItems: 'center', flexDirection: 'column', padding: "2px" }}>
            <h2>Recently Added Recipes</h2>
            {recipe && recipe.map((d, index) => (
              <RecipeCard
                key={d._id}
                recipe={d}
                currentUserId={userID}
              />
            ))}
            <Pagination currentPage={currentPage} totalPages={totalPages} setCurrentPage={setCurrentPage} />
          </div>
        </Col>
        <Col span={8}>
          <div className="featured-recipe-container">
            <FeaturedRecipe />
          </div>
        </Col>
      </Row>
    </div>
    );
};
