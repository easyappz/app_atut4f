import React from 'react';
import { Typography, Card } from 'antd';

const { Title, Paragraph } = Typography;

const Home = () => {
  return (
    <div data-easytag="id1-react/src/pages/Home.js" className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <Card data-easytag="id2-react/src/pages/Home.js" className="shadow-lg">
          <div className="text-center">
            <Title level={1} data-easytag="id3-react/src/pages/Home.js">
              Добро пожаловать!
            </Title>
            <Paragraph data-easytag="id4-react/src/pages/Home.js" className="text-lg text-gray-600 mt-4">
              Это главная страница приложения. Здесь вы можете зарегистрироваться или войти в свой профиль.
            </Paragraph>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Home;
