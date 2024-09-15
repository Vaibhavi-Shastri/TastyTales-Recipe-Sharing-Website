import * as React from 'react';
import axios from 'axios';
import { Button, Form,  Input,notification  } from 'antd';
import Link from 'antd/es/typography/Link';
import {useNavigate} from 'react-router-dom';
import { useCookies } from 'react-cookie';



export const RegisterScreen  = () =>  {
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const [_, setCookies] = useCookies(["access_token"])


    const onFinish = async(values) => {
        console.log(values)
        try {
            const response = await axios.post('http://localhost:5000/api/users/register', values);
        
            if (response.status === 201) {
                notification.success({
                message: 'Registeration Successful',
                description: 'You have successfully logged in!',
                });
                setCookies("access_token" , response.data.token)
                window.localStorage.setItem("userID",response.data._id)
                navigate("/")
            }

           
            } catch (error) {
                console.log("error =>",error);
                if (error.response) {
                    notification.error({
                      message: 'Login Error',
                      description: error.response.data.message || 'Something went wrong!',
                    });
                  } else if (error.request) {
                    notification.error({
                      message: 'Network Error',
                      description: 'No response from server. Please try again later.',
                    });
                  } else {
                    notification.error({
                      message: 'Error',
                      description: error.message,
                    });
                }
               
        }
      }


  return (
    <div style={{ alignItems:'center', display:'flex', gap:'4rem', flexDirection:'column' ,justifyContent:'center', margin:'10px'}}>
        
        <div style={{fontSize:'40px', textAlign:'center',textDecoration:'underline'}}>
           Registeration
        </div>
        <Form
            form={form}
            onFinish={onFinish}
            layout='vertical'
            style={{width:'50%' }}
        >   

            <Form.Item
                label="Name"
                name="username"
                rules={[
                    {
                    required: true,
                    message: 'Please Enter Username!',
                    },
                ]}
            >
            <Input 
            size='large'
            placeholder='Username'/>
            </Form.Item>

            <Form.Item
                label="Email"
                name="email"
                rules={[
                    {
                    required: true,
                    type:'email',
                    message: 'Please Enter Valid Email!',
                    },
                ]}
            >
            <Input 
            size='large'
            placeholder='Email id'/>
            </Form.Item>

            

            <Form.Item
            label="Password"
            name="password"
            rules={[
                { required: true, message: 'Please input your password!' },
                {
                  pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=]).{8,}$/,
                  message: 'Password must be at least 8 characters long, include an uppercase letter, a lowercase letter, a number, and a special character.',
                },
              ]}
            >
            <Input.Password size='large'/>
            </Form.Item>


            <Form.Item
                wrapperCol={{
                    offset: 10,
                }}
                >
                <Button type="primary" htmlType="submit" >
                    Submit
                </Button>
            </Form.Item>

            <div style={{justifyContent:"space-between" ,display:"flex" }}>
                <Link href="/login" >
                            {"Already have an account? Sign in"}
                    </Link>  
            </div>
        </Form>
        'Copyright © Rohit Doyal { new Date().getFullYear()}
    </div>
  );
}