import React from 'react';
import { Typography, Card } from 'antd';

const { Title } = Typography;

const Register = () => {
  return (
    <div data-easytag="id1-react/src/pages/Register.js" className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-md mx-auto">
        <Card data-easytag="id2-react/src/pages/Register.js" className="shadow-lg">
          <Title level={2} data-easytag="id3-react/src/pages/Register.js" className="text-center mb-6">
            Регистрация
          </Title>
          <div data-easytag="id4-react/src/pages/Register.js">
            {/* Registration form will be implemented here */}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Register;
