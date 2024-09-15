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
    if(userID){
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
      <h1>My Recipes</h1>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '40px' }}>
        {recipes.map(recipe => (
          <Card
            key={recipe._id}
            style={{ width: '300px' }}
            cover={<img alt="recipe" src={recipe.imgurl} height='200px'/>}
            actions={[
              <Button onClick={() => handleEdit(recipe)}>Edit</Button>,
              <Button onClick={() => confirmDelete(recipe._id)} danger>Delete</Button>
            ]}
          >
            <Meta title={recipe.title} />
            <p>Preparation Time: {recipe.prepTime+"minutes"} </p>
            <p>Difficulty Level: {recipe.difficulty} </p>
            <p>Category: {recipe.category} </p>
          </Card>
        ))}
      </div>

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
        style={{width:'60%'}}
      >
        <Form.Item
          label="Recipe"
          name="title"
          rules={[
            {
              required: true,
              message: "Please enter recipe name"
            }
          ]}
        >
          <Input
            size='large'
            placeholder='Recipe name'
          />
        </Form.Item>

        <Form.Item
          label="Ingredients"
          name="ingredients"
          tooltip='Enter comma seperated names'
          rules={[
            {
              required: true,
              message: "Please enter ingredients"
            }
          ]}
        >
          <TextArea
            rows={2}
          />
        </Form.Item>

        <Form.Item
          label="Instructions"
          name="instructions"
          rules={[
            {
              required: true,
              message: "Please enter recipe instruction "
            }
          ]}
        >
          <TextArea
            placeholder='Enter here recipe instruction '
            rows={3}
          />
        </Form.Item>

        <Form.Item
          label="Image Url"
          name="imgurl"

          rules={[
            {
              required: true,
              message: "Please enter Image Url"
            },
            {
              type: 'url',
              message: 'Please enter a valid URL',
            },
          ]}
        >
          <Input
            size='large'
            placeholder='enter here'
          />
        </Form.Item>


        <Form.Item
          label="Preptime"
          name="prepTime"
          tooltip='Please enter prepration time in minutes'
          rules={[
            {
              required: true,
              message: "Please enter Prepration time "
            }
          ]}
        >
          <Input
            size='large'
            type='number'
            placeholder='Prepration time in minutes'
          />
        </Form.Item>


        <Form.Item
          label="Difficulty"
          name="difficulty"
          rules={[
            {
              required: true,
              message: "Please select difficulty level"
            }
          ]}
        >
          <Select
            options={[
              {
                label: 'Easy',
                value: 'Easy'
              },
              {
                label: 'Medium',
                value: 'Medium'
              },
              {
                label: 'Hard',
                value: 'Hard'
              },
            
          
            ]}
            placeholder='Select difficulty level '
          />
        </Form.Item>

        <Form.Item
          label="Category"
          name="category"
          rules={[
            {
              required: true,
              message: "Please select category"
            }
          ]}
        >
          <Select
            options={[
              {
                label: 'Main course',
                value: 'main course'
              },
              {
                label: 'Dessert',
                value: 'dessert'
              },
              {
                label: 'Snacks',
                value: 'snacks'
              },
              {
                label: 'Fastfood',
                value: 'fastfood'
              },
          
            ]}
            placeholder='Select category from here'
          />
        </Form.Item>

        <Form.Item
         
        >
          <Button
            htmlType='submit'
            type='primary'
            
          >Save</Button>
        </Form.Item>
      </Form>
        </Modal>
      )}
    </div>
  );
};

export default MyRecipeSection;
