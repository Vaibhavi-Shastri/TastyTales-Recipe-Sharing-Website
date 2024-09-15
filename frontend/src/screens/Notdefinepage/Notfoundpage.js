import React from 'react';
import { Button, Result,  Space } from 'antd';
import { Link } from 'react-router-dom';
import './NotFoundPage.css'; 
import Paragraph from 'antd/es/typography/Paragraph';
import Title from 'antd/es/typography/Title';


export const Notfoundpage = () => {
  return (
    <div className="not-found-container">
      <Result
        status="404"
        title={<Title level={1}>404</Title>}
        subTitle={<Paragraph>Sorry, the page you are looking for does not exist.</Paragraph>}
        extra={
          <Space>
            <Button type="primary">
              <Link to="/">Back to Home</Link>
            </Button>
          </Space>
        }
      />
    </div>
  )
}
