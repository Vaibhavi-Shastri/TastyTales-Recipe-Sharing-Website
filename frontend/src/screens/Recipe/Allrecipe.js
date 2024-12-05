import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import RecipeCard from '../Recipe/RecipeCard';
import { useNavigate } from 'react-router-dom';
import { Input, Select, Row, Col } from 'antd';
import Pagination from '../../pagination/Paginationcard';
import FeaturedRecipe from './FeaturedRecipe';
import './Allrecipe.css';

const { Search } = Input;
const { Option } = Select;

export const Allrecipe = () => {
  const [recipe, setRecipe] = useState([]);
  const [cookies] = useCookies(["access_token"]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [category, setCategory] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const pagelimit = 3;
  const userID = window.localStorage.getItem('userID');

  const fetchRecipes = async () => {
    try {
        const response = await axios.get('http://localhost:5000/api/recipes', {
            params: {
                page: currentPage,
                limit: pagelimit,
                category,
                difficulty,
                search: searchTerm,
            },
        });
        setRecipe(response.data.recipesWithUserDetails);
        setTotalPages(response.data.totalPages);
    } catch (err) {
        console.error('Error fetching recipes:', err.response || err);
    }
};


  useEffect(() => {
    if (!userID) {
      console.log("Please login");
      navigate("/login");
    } else {
      fetchRecipes();
    }
  }, [currentPage, category, difficulty, searchTerm]);

  return (
    <div>
      <div className="Searchbar">
        <Row gutter={[16, 16]} style={{ marginTop: '0px', borderRadius: '10px' }}>
          <Col span={8}>
            <Search
              placeholder="Search by title or ingredients"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              enterButton
            />
          </Col>
          <Col span={8}>
            <Select
              placeholder="Select Category"
              value={category}
              onChange={(value) => setCategory(value)}
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
              onChange={(value) => setDifficulty(value)}
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

      <div className="page-container">
        <div className="featured-recipe-container">
          <FeaturedRecipe />
        </div>
        <div className="recipe-container-wrapper">
          {Array.isArray(recipe) && recipe.map((d) => (
            <RecipeCard key={d._id} recipe={d} />
          ))}
        </div>
      </div>

      <Pagination currentPage={currentPage} totalPages={totalPages} setCurrentPage={setCurrentPage} />
    </div>
  );
};
