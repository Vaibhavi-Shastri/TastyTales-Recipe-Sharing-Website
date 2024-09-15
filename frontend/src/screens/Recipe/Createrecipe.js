import React from 'react'

import { Button, Form, Input, Select, notification } from 'antd'
import TextArea from 'antd/es/input/TextArea';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import {useCookies} from 'react-cookie';


export const Createrecipe = () => {

  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [cookies, _] = useCookies(["access_token"])
 

  const onFinish = async(values) => {
    let userid = window.localStorage.getItem('userID');
    let ingredientsArray = values?.ingredients.split(',').map((e)=>{
      return e.trim();
    });

    values['userid']= userid;
    values['ingredients'] = ingredientsArray;
    try{
      await axios.post("http://localhost:5000/api/recipes",values, {headers:{authorization:cookies.access_token}});
      notification.success({
        message: 'Recipe created successfully',
        description: 'Your Recipe created successfully, Thank you for sharing your knowledge',
      });

      // Reset the form fields after successful submission
      form.resetFields();
      
      setTimeout(()=>{
        navigate("/")
      },[1000])
    }catch(error){
      notification.error({
        message: 'Server Issue',
      });
    }

  }

  return (
    <div style={{ alignItems:'center', display:'flex', gap:'4rem', flexDirection:'column'}}>
      <div style={{fontSize:'40px', textAlign:'center',textDecoration:'underline'}}>
        Create Recipe
      </div>
      <Form
        form={form}
        onFinish={onFinish}
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
              message: 'Please enter Image URL',
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
    </div>
  )
}
