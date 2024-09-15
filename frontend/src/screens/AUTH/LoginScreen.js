import React from 'react';
import { Button, Checkbox, Form,  Input,notification  } from 'antd';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import { useCookies } from 'react-cookie';
import Link from 'antd/es/typography/Link';


export const LoginScreen = () =>  {
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const [_, setCookies] = useCookies(["access_token"])


    const onFinish = async(values) => {
        try {
            const response = await axios.post('http://localhost:5000/api/users/login', values);
            if (response.status === 200) {
                notification.success({
                message: 'Login Successful',
                description: 'You have successfully logged in!',
                });
                setCookies("access_token" , response.data.token)
                window.localStorage.setItem("userID",response.data._id)
                navigate("/")
            }
            } catch (error) {
                notification.error({
                message: 'Login Error',
                description: 'Invalid email or password. Please try again.',
            });
            }
      }
    
 

return (

    <div style={{ alignItems:'center', display:'flex', gap:'4rem', flexDirection:'column' ,justifyContent:'center', margin:'10px'}}>
        
        <div style={{fontSize:'40px', textAlign:'center',textDecoration:'underline'}}>
           Login
        </div>
        <Form
            form={form}
            onFinish={onFinish}
            layout='vertical'
            style={{width:'50%' }}
        >
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
                    {
                    required: true,
                    message: 'Please input your password!',
                    },
                ]}
            >
            <Input.Password size='large' />
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
                
                <Link href="/register" >
                            {"Don't have an account? Sign Up"}
                    </Link>  
            </div>
        </Form>
        'Copyright © Rohit Doyal { new Date().getFullYear()}
    </div>
 );
}
    
    
    
