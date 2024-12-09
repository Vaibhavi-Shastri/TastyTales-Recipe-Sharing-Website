import React from 'react'; 

import { Button, Form, Input, notification } from 'antd'; 

import { useNavigate } from 'react-router-dom'; 

import { useCookies } from 'react-cookie'; 

import axios from 'axios'; 

import Link from 'antd/es/typography/Link'; 

 

// Import Google Fonts via CDN in your main index.html or App component: 

// <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap" rel="stylesheet"> 

 

export const LoginScreen = () => { 

  const [form] = Form.useForm(); 

  const navigate = useNavigate(); 

  const [, setCookies] = useCookies(["access_token"]); 

 

  const onFinish = async (values) => { 

    try { 

      const response = await axios.post('http://localhost:5000/api/users/login', values); 

      if (response.status === 200) { 

        notification.success({ 

          message: 'Login Successful', 

          description: 'You have successfully logged in!', 

        }); 

        setCookies("access_token", response.data.token); 

        window.localStorage.setItem("userID", response.data._id); 

        navigate("/"); 

      } 

    } catch (error) { 

      notification.error({ 

        message: 'Login Error', 

        description: 'Invalid email or password. Please try again.', 

      }); 

    } 

  }; 

 

  return ( 

    <div 

      style={{ 

        height: '100vh', 

        display: 'flex', 

        justifyContent: 'center', 

        alignItems: 'center', 

        backgroundImage: `linear-gradient( 

          rgba(0, 0, 0, 0.4),  

          rgba(0, 0, 0, 0.4) 

        ), url("https://png.pngtree.com/thumb_back/fw800/background/20240328/pngtree-healthy-thai-food-recipes-concept-image_15645273.jpg")`, 

        backgroundSize: 'cover', 

        backgroundPosition: 'center', 

        fontFamily: '"Roboto", sans-serif', // Apply Roboto font 

      }} 

    > 

      <div 

        style={{ 

          background: 'rgba(255, 255, 255, 0.8)', 

          padding: '30px', 

          borderRadius: '10px', 

          width: '400px', 

          boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)', 

          textAlign: 'center', 

        }} 

      > 

        <div 

          style={{ 

            fontSize: '40px', 

            fontWeight: '700', 

            marginBottom: '20px', 

            color: '#333', 

          }} 

        > 

          Login 

        </div> 

        <Form form={form} onFinish={onFinish} layout="vertical"> 

          <Form.Item 

            label={<span style={{ fontSize: '16px', fontWeight: '500' }}>Email</span>} 

            name="email" 

            rules={[ 

              { 

                required: true, 

                type: 'email', 

                message: 'Please Enter a Valid Email!', 

              }, 

            ]} 

          > 

            <Input size="large" placeholder="Email ID" style={{ borderRadius: '5px' }} /> 

          </Form.Item> 

 

          <Form.Item 

            label={<span style={{ fontSize: '16px', fontWeight: '500' }}>Password</span>} 

            name="password" 

            rules={[ 

              { 

                required: true, 

                message: 'Please input your password!', 

              }, 

            ]} 

          > 

            <Input.Password size="large" style={{ borderRadius: '5px' }} /> 

          </Form.Item> 

 

          <Form.Item> 

            <Button 

              type="primary" 

              htmlType="submit" 

              style={{ 

                width: '100%', 

                fontWeight: '500', 

                fontSize: '16px', 

                height: '40px', 

                borderRadius: '5px', 

              }} 

            > 

              Submit 

            </Button> 

          </Form.Item> 

 

          <div style={{ textAlign: 'center', fontSize: '14px', marginTop: '10px' }}> 

            <Link href="/register">Don't have an account? Sign Up</Link> 

          </div> 

        </Form> 

      </div> 

    </div> 

  ); 

}; 