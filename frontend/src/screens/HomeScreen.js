import React, { useEffect } from 'react';
import { UploadOutlined, UserOutlined, HomeOutlined, SaveOutlined, LogoutOutlined } from '@ant-design/icons';
import { Layout, Menu, notification, theme } from 'antd';
import { useDispatch } from 'react-redux';
import { setPage } from '../redux/actions/actions';
import { ContentScreen } from './ContentScreen';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

import logo from '../assets/logo.jpg';  // Correct relative path to logo.jpg

const { Header, Content, Footer, Sider } = Layout;

const navbaritem = ['Profile', 'Home', 'Create Recipe', 'Saved Recipes', 'My Recipes', 'Logout'];
const items = [UserOutlined, HomeOutlined, UploadOutlined, SaveOutlined, HomeOutlined, LogoutOutlined].map(
  (icon, index) => ({
    key: String(index + 1),
    icon: React.createElement(icon),
    label: `${navbaritem[index]}`,
  })
);

export const HomeScreen = () => {
  const [cookie, setCookie, removeCookie] = useCookies(['access_token']);
  const navigate = useNavigate();

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const dispatch = useDispatch();
  const handlePageChange = (page) => {
    if (page === '6') {
      // Clear cookies and  Clear local storage or any other stored user data
      removeCookie('access_token');
      window.localStorage.removeItem('userID');
      notification.success({
        message: 'Logged out successfully',
        description: 'We hope you will be back soon!',
      });
      setTimeout(() => {
        navigate('/login');
      }, [1000]);
    } else {
      const pageName = navbaritem[parseInt(page, 10) - 1]; // Convert the page number to int and then change to array index
      dispatch(setPage(pageName));
    }
  };

  return (
    <div>
      <Layout style={{ height: '100vh' }}>
        <Sider>
          <div className="demo-logo-vertical" />
          <Menu theme="dark" mode="inline" defaultSelectedKeys={['2']} items={items} onClick={(e) => handlePageChange(e.key)} />
        </Sider>
        <Layout>
        <Header
  style={{
    padding: '20px 20px',
    margin: '0',
    background: '#A96E72', // Soft muted pinkish color
    textAlign: 'center',
    color: '#fff', // White text color
    fontSize: '3rem', // Larger font size (for header)
    fontWeight: 'bold', // Bold text
    boxShadow: '0 8px 12px rgba(0, 0, 0, 0.1)', // Subtle shadow for depth
    letterSpacing: '1px', // Slightly increased spacing for style
    animation: 'fadeIn 1.5s ease', // Simple fade-in animation
    display: 'flex', // Flexbox to center the content
    justifyContent: 'center', // Center horizontally
    alignItems: 'center', // Center vertically
  }}
>
  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '20px' }}>
    {/* Logo */}
    <img src={logo} alt="TastyTales Logo" style={{ height: '60px', borderRadius: '10px', border: '3px solid white' }} />
    <h1 style={{ margin: '0', fontSize: '2.5rem', fontFamily: 'Georgia, serif', letterSpacing: '2px' }}>TastyTales</h1>
  </div>
</Header>


          <Content style={{ margin: '4px 5px 0' }}>
            <div
              style={{
                padding: '10px 0px',
                background: colorBgContainer,
                backgroundColor: '#f0f2f5', 
                borderRadius: borderRadiusLG,
                maxHeight: 'calc(100vh - 50px)',
              }}
            >
              <ContentScreen />
            </div>
          </Content>
          <Footer
  style={{
    padding: '8px 10px',
    textAlign: 'center',
    lineHeight: '30px',
    backgroundColor: '#f0f2f5', // Light background for footer
  }}
>
© 2024 RecipeSharingWebsite. Let's cook together!
</Footer>
        </Layout>
      </Layout>
    </div>
  );
};
