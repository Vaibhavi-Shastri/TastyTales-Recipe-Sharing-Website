import axios from 'axios';
import React, { useEffect, useState } from 'react'

import { Card,  Descriptions, Divider, Image, Row } from 'antd';
import { UserOutlined } from '@ant-design/icons'
import {useCookies} from 'react-cookie';
const { Meta } = Card;


export const Userprofile = () => {
  let [user,setUser] = useState("")
  let userID = window.localStorage.getItem('userID');
  const [cookies, _] = useCookies(["access_token"])

  useEffect(()=>{
    const fetchUser = async() =>{
      try{
        
        let getuser =await axios.get(`http://localhost:5000/api/users/profile/${userID}`,
        {headers:{authorization:cookies.access_token}});
        setUser(getuser.data);
        }catch(err){
          console.log(err);
        }
    }
    if(userID){ fetchUser();}
    },[userID])



  return (
    <div>
      <h1>User Profile</h1>
      
      <Row>
        <Card 
        style={{width:'40%'}}>
          
        <Meta
        
          avatar={<UserOutlined/>}
          title= {"Chef "+user.username +" 👨‍🍳"}
        />
        <Divider />
        <Descriptions column={1}>
          <Descriptions.Item label="User Name">{user.username}</Descriptions.Item>
          <Descriptions.Item label="Email">{user.email}</Descriptions.Item>
        </Descriptions>
        <Divider />
      </Card>


    <Image
      height={250}
      src="https://img.freepik.com/free-vector/man-chef-cooking-cartoon-illustration_138676-2048.jpg?w=740&t=st=1722431671~exp=1722432271~hmac=223aff095e5c869bcfc0ca42d34566f09fc4ce5e71d329041bc9f498b5d0c913"
    />
    </Row>
   
    </div>
  )
}






  


