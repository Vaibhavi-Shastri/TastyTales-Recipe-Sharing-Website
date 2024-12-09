import axios from 'axios'; 

import React, { useEffect, useState } from 'react'; 

import { Card, Descriptions, Divider, Row, Col, Typography, Avatar } from 'antd'; 

import { UserOutlined } from '@ant-design/icons'; 

import { useCookies } from 'react-cookie'; 

 

const { Meta } = Card; 

const { Title, Paragraph } = Typography; 

 

export const Userprofile = () => { 

  const [user, setUser] = useState(""); 

  const userID = window.localStorage.getItem('userID'); 

  const [cookies] = useCookies(["access_token"]); 

 

  useEffect(() => { 

    const fetchUser = async () => { 

      try { 

        const getUser = await axios.get( 

          `http://localhost:5000/api/users/profile/${userID}`, 

          { headers: { authorization: cookies.access_token } } 

        ); 

        setUser(getUser.data); 

      } catch (err) { 

        console.error(err); 

      } 

    }; 

    if (userID) { 

      fetchUser(); 

    } 

  }, [userID, cookies]); 

 

  return ( 

    <div 

      style={{ 

        backgroundColor: '#f0f2f5', 

        minHeight: '100vh', 

        padding: '40px 20px', 

        fontFamily: '"Roboto", sans-serif', 

      }} 

    > 

      <div style={{ textAlign: 'center', marginBottom: '30px' }}> 

        <Title level={2} style={{ color: '#333' }}> 

          Welcome to Your Profile 

        </Title> 

        <Paragraph style={{ fontSize: '18px', color: '#666' }}> 

          Here are your account details, Chef {user.username || "Loading..."}! 

        </Paragraph> 

      </div> 

 

      <Row justify="center"> 

        <Col xs={24} sm={24} md={12} lg={10}> 

          <Card 

            style={{ 

              borderRadius: '10px', 

              boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)', 

              backgroundColor: '#fff', 

              textAlign: 'center', 

            }} 

          > 

            <Avatar 

              size={100} 

              src="https://img.freepik.com/free-vector/man-chef-cooking-cartoon-illustration_138676-2048.jpg?w=740&t=st=1722431671~exp=1722432271~hmac=223aff095e5c869bcfc0ca42d34566f09fc4ce5e71d329041bc9f498b5d0c913" 

              alt="Profile Avatar" 

              style={{ 

                marginBottom: '20px', 

                border: '2px solid #1890ff', 

              }} 

            /> 

            <Meta 

              title={ 

                <span style={{ fontSize: '20px', fontWeight: 'bold', color: '#333' }}> 

                  Chef {user.username || "Loading..."} 👨‍🍳 

                </span> 

              } 

            /> 

            <Divider /> 

            <Descriptions column={1}> 

              <Descriptions.Item label={<b>Username</b>}> 

                {user.username || "Loading..."} 

              </Descriptions.Item> 

              <Descriptions.Item label={<b>Email</b>}> 

                {user.email || "Loading..."} 

              </Descriptions.Item> 

            </Descriptions> 

          </Card> 

        </Col> 

      </Row> 

 

      {/* Footer Section without line */} 

      <div 

        style={{ 

          marginTop: '40px', 

          textAlign: 'center', 

          fontSize: '16px', 

          color: '#888', 

          padding: '20px 0', 

        }} 

      > 

        <Paragraph> 

          “Cooking is an art, and every artist deserves a great profile!”<br /> 

          Keep your profile updated to connect with more food enthusiasts. 

        </Paragraph> 

      </div> 

    </div> 

  ); 

}; 

 

 