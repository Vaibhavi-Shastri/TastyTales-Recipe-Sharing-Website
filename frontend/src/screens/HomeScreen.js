import React, { useEffect } from 'react';
import { UploadOutlined, UserOutlined, HomeOutlined, SaveOutlined, LogoutOutlined } from '@ant-design/icons';
import { Layout, Menu, notification, theme } from 'antd';
import { useDispatch } from 'react-redux';
import { setPage } from '../redux/actions/actions';
import { ContentScreen } from './ContentScreen';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';


const { Header, Content, Footer, Sider } = Layout;

const navbaritem = ['Profile', 'Home', 'Create Recipe', 'Saved Recipes','My Recipes', 'Logout'];
const items = [UserOutlined, HomeOutlined, UploadOutlined, SaveOutlined,HomeOutlined, LogoutOutlined].map(
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
        description: 'We hope you will back soon ',
      });
      setTimeout(()=>{
        navigate("/login")
      },[1000])
      
      // console.log('Logged out');
    } else {
      const pageName = navbaritem[parseInt(page, 10) - 1]; //convert the page number to int and then change to array index
      dispatch(setPage(pageName));
    }
  };

  return (
    <div >
      <Layout style={{ height: '100vh'}}>
        <Sider>
          <div className="demo-logo-vertical" />
          <Menu theme="dark" mode="inline" defaultSelectedKeys={['2']} items={items} onClick={(e) => handlePageChange(e.key)} />
        </Sider>
        <Layout>
          <Header
            style={{
              padding: '2px', margin:'2px',
              background: colorBgContainer,
              textAlign: 'center',
              
            }}
          >
            <h1> ¯`*•.¸,¤°´✿.｡.:* Recipe Media *.:｡.✿`°¤,¸.•*´¯ </h1>
          </Header>

          <Content
            style={{
              margin: '4px 5px 0',
             
              
            }}
          >
            <div
               style={{
                padding: '10px 0px',
                background: colorBgContainer,
                borderRadius: borderRadiusLG,
              
                maxHeight: 'calc(100vh - 50px)',
              }}
            >
              <ContentScreen/>
            </div>
          </Content>
          <Footer
            style={{
              padding: '8px 10px',
              textAlign: 'center',
              lineHeight: '30px', // Center text vertically
            }}
          >
            Rohit Doyal ©{new Date().getFullYear()}
          </Footer>
        </Layout>
      </Layout>
    </div>
  );
};

