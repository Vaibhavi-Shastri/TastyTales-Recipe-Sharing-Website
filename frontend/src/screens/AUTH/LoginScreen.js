import React from 'react';
import { Button, Form, Input, notification } from 'antd';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import Link from 'antd/es/typography/Link';

export const LoginScreen = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [_, setCookies] = useCookies(["access_token"]);

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
        backgroundImage: 'url("https://source.unsplash.com/1600x900/?food,cooking")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div
        style={{
          background: 'rgba(255, 255, 255, 0.8)',
          padding: '30px',
          borderRadius: '10px',
          width: '400px',
          boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
        }}
      >
        <div style={{ fontSize: '40px', textAlign: 'center', marginBottom: '20px' }}>
          Login
        </div>
        <Form form={form} onFinish={onFinish} layout="vertical">
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                type: 'email',
                message: 'Please Enter a Valid Email!',
              },
            ]}
          >
            <Input size="large" placeholder="Email ID" />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: 'Please input your password!',
              },
            ]}
          >
            <Input.Password size="large" />
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 8,
            }}
          >
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>

          <div style={{ textAlign: 'center' }}>
            <Link href="/register">Don't have an account? Sign Up</Link>
          </div>
        </Form>
      </div>
    </div>
  );
};