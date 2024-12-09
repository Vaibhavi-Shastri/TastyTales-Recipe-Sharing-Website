import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Button, Modal, Input, Form, message, Select } from 'antd';
import { useCookies } from 'react-cookie';
import TextArea from 'antd/es/input/TextArea';

const { Meta } = Card;

const MyRecipeSection = () => {
  const [recipes, setRecipes] = useState([]);
  const [editingRecipe, setEditingRecipe] = useState(null);
  const [cookies] = useCookies(["access_token"]);
  const userID = window.localStorage.getItem('userID');

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/recipes/myrecipe/${userID}`, {
          headers: { authorization: cookies.access_token }
        });
        setRecipes(response.data);
      } catch (err) {
        console.error(err);
      }
    };
    if (userID) {
      fetchRecipes();
    }
  }, [userID]);

  const deleteRecipe = async (recipeId) => {
    try {
      await axios.delete(`http://localhost:5000/api/recipes/myrecipe/${recipeId}`, {
        headers: { authorization: cookies.access_token }
      });
      setRecipes(recipes.filter(recipe => recipe._id !== recipeId));
      message.success('Recipe deleted successfully');
    } catch (error) {
      console.error(error);
      message.error('Failed to delete recipe');
    }
  };

  const confirmDelete = (recipeId) => {
    Modal.confirm({
      title: 'Are you sure you want to delete this recipe?',
      onOk: () => deleteRecipe(recipeId)
    });
  };

  const handleEdit = (recipe) => {
    setEditingRecipe(recipe);
  };

  const handleUpdate = async (values) => {
    try {
      const response = await axios.put(`http://localhost:5000/api/recipes/myrecipe/${editingRecipe._id}`, values, {
        headers: { authorization: cookies.access_token }
      });
      setRecipes(recipes.map(recipe => (recipe._id === editingRecipe._id ? response.data : recipe)));
      setEditingRecipe(null);
      message.success('Recipe updated successfully');
    } catch (err) {
      console.error(err);
      message.error('Failed to update recipe');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1 style={{ textAlign: 'center', fontSize: '2.5rem' }}>My Recipes</h1>
      {recipes.length === 0 ? (
        <p style={{ textAlign: 'center', marginTop: '50px' }}>No recipes found. Start adding your favorite recipes!</p>
      ) : (
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
          {recipes.map(recipe => (
            <Card
              key={recipe._id}
              style={{ width: '300px', textAlign: 'center' }} // Fixed width for consistent sizing
              cover={<img alt="recipe" src={recipe.imgurl} height='200px' />}
              actions={[
                <Button onClick={() => handleEdit(recipe)}>Edit</Button>,
                <Button onClick={() => confirmDelete(recipe._id)} danger>Delete</Button>
              ]}
            >
              <Meta title={recipe.title} />
              <p>Preparation Time: {recipe.prepTime} minutes</p>
              <p>Difficulty Level: {recipe.difficulty}</p>
              <p>Category: {recipe.category}</p>
            </Card>
          ))}
        </div>
      )}

      {editingRecipe && (
        <Modal
          title="Edit Recipe"
          open={!!editingRecipe}
          onCancel={() => setEditingRecipe(null)}
          footer={null}
        >
          <Form
            initialValues={editingRecipe}
            onFinish={handleUpdate}
            layout='vertical'
          >
            <Form.Item label="Recipe" name="title" rules={[{ required: true, message: "Please enter recipe name" }]}>
              <Input placeholder='Recipe name' />
            </Form.Item>
            <Form.Item label="Ingredients" name="ingredients" tooltip='Enter comma separated names' rules={[{ required: true, message: "Please enter ingredients" }]}>
              <TextArea rows={2} />
            </Form.Item>
            <Form.Item label="Instructions" name="instructions" tooltip='Enter fullstop separated steps' rules={[{ required: true, message: "Please enter recipe instructions" }]}>
              <TextArea rows={3} />
            </Form.Item>
            <Form.Item label="Image Url" name="imgurl" rules={[{ required: true, message: "Please enter Image URL" }, { type: 'url', message: 'Please enter a valid URL' }]}>
              <Input placeholder='Enter image URL' />
            </Form.Item>
            <Form.Item label="Prep Time" name="prepTime" tooltip='Enter preparation time in minutes' rules={[{ required: true, message: "Please enter preparation time" }]}>
              <Input type='number' placeholder='Preparation time in minutes' />
            </Form.Item>
            <Form.Item label="Difficulty" name="difficulty" rules={[{ required: true, message: "Please select difficulty level" }]}>
              <Select
                options={[
                  { label: 'Easy', value: 'Easy' },
                  { label: 'Medium', value: 'Medium' },
                  { label: 'Hard', value: 'Hard' },
                ]}
                placeholder='Select difficulty level'
              />
            </Form.Item>
            <Form.Item label="Category" name="category" rules={[{ required: true, message: "Please select category" }]}>
              <Select
                options={[
                  { label: 'North Indian', value: 'north indian' },
                  { label: 'South Indian', value: 'south indian' },
                  { label: 'Chinese', value: 'chinese' },
                  { label: 'Italian', value: 'italian' },
                  { label: 'Snacks', value: 'snacks' },
                  { label: 'Dessert', value: 'dessert' },
                  { label: 'Beverages', value: 'beverages' },
                ]}
                placeholder='Select category'
              />
            </Form.Item>
            <Form.Item>
              <Button type='primary' htmlType='submit'>Save</Button>
            </Form.Item>
          </Form>
        </Modal>
      )}
    </div>
  );
};

export default MyRecipeSection;
