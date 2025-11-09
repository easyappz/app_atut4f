import React from 'react';
import { Typography, Card } from 'antd';

const { Title } = Typography;

const Profile = () => {
  return (
    <div data-easytag="id1-react/src/pages/Profile.js" className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <Card data-easytag="id2-react/src/pages/Profile.js" className="shadow-lg">
          <Title level={2} data-easytag="id3-react/src/pages/Profile.js" className="text-center mb-6">
            Профиль
          </Title>
          <div data-easytag="id4-react/src/pages/Profile.js">
            {/* Profile information will be implemented here */}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Profile;
