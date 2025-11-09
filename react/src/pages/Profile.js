import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Descriptions, Button, Modal, Form, Input, message, Spin, Card } from 'antd';
import { EditOutlined, LogoutOutlined } from '@ant-design/icons';
import { getProfile, updateProfile } from '../api/profile';

const Profile = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }
    fetchUserData();
  }, [navigate]);

  const fetchUserData = async () => {
    try {
      setLoading(true);
      const data = await getProfile();
      setUserData(data);
    } catch (error) {
      console.error('Error fetching profile:', error);
      if (error.response && error.response.status === 401) {
        localStorage.removeItem('token');
        navigate('/login');
      } else {
        message.error('Не удалось загрузить данные профиля');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = () => {
    form.setFieldsValue({
      email: userData.email,
      first_name: userData.first_name,
      last_name: userData.last_name,
    });
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  const handleSubmit = async (values) => {
    try {
      setSubmitting(true);
      const updatedData = await updateProfile(values);
      setUserData(updatedData);
      message.success('Профиль успешно обновлен');
      setIsModalVisible(false);
      form.resetFields();
    } catch (error) {
      console.error('Error updating profile:', error);
      message.error('Не удалось обновить профиль');
    } finally {
      setSubmitting(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    message.success('Вы вышли из системы');
    navigate('/login');
  };

  if (loading) {
    return (
      <div data-easytag="id1-react/src/pages/Profile.js" className="flex justify-center items-center min-h-screen">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div data-easytag="id2-react/src/pages/Profile.js" className="max-w-4xl mx-auto p-6">
      <Card
        data-easytag="id3-react/src/pages/Profile.js"
        title="Профиль пользователя"
        extra={
          <div data-easytag="id4-react/src/pages/Profile.js" className="flex gap-2">
            <Button
              data-easytag="id5-react/src/pages/Profile.js"
              type="primary"
              icon={<EditOutlined />}
              onClick={handleEdit}
            >
              Редактировать
            </Button>
            <Button
              data-easytag="id6-react/src/pages/Profile.js"
              danger
              icon={<LogoutOutlined />}
              onClick={handleLogout}
            >
              Выйти
            </Button>
          </div>
        }
      >
        <Descriptions data-easytag="id7-react/src/pages/Profile.js" bordered column={1}>
          <Descriptions.Item label="Email">
            {userData?.email}
          </Descriptions.Item>
          <Descriptions.Item label="Имя">
            {userData?.first_name}
          </Descriptions.Item>
          <Descriptions.Item label="Фамилия">
            {userData?.last_name}
          </Descriptions.Item>
        </Descriptions>
      </Card>

      <Modal
        data-easytag="id8-react/src/pages/Profile.js"
        title="Редактировать профиль"
        open={isModalVisible}
        onCancel={handleCancel}
        footer={null}
        destroyOnClose
      >
        <Form
          data-easytag="id9-react/src/pages/Profile.js"
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
        >
          <Form.Item
            data-easytag="id10-react/src/pages/Profile.js"
            label="Email"
            name="email"
            rules={[
              { required: true, message: 'Пожалуйста, введите email' },
              { type: 'email', message: 'Введите корректный email' },
            ]}
          >
            <Input data-easytag="id11-react/src/pages/Profile.js" placeholder="Введите email" />
          </Form.Item>

          <Form.Item
            data-easytag="id12-react/src/pages/Profile.js"
            label="Имя"
            name="first_name"
            rules={[
              { required: true, message: 'Пожалуйста, введите имя' },
            ]}
          >
            <Input data-easytag="id13-react/src/pages/Profile.js" placeholder="Введите имя" />
          </Form.Item>

          <Form.Item
            data-easytag="id14-react/src/pages/Profile.js"
            label="Фамилия"
            name="last_name"
            rules={[
              { required: true, message: 'Пожалуйста, введите фамилию' },
            ]}
          >
            <Input data-easytag="id15-react/src/pages/Profile.js" placeholder="Введите фамилию" />
          </Form.Item>

          <Form.Item data-easytag="id16-react/src/pages/Profile.js" className="mb-0">
            <div data-easytag="id17-react/src/pages/Profile.js" className="flex justify-end gap-2">
              <Button data-easytag="id18-react/src/pages/Profile.js" onClick={handleCancel}>
                Отмена
              </Button>
              <Button
                data-easytag="id19-react/src/pages/Profile.js"
                type="primary"
                htmlType="submit"
                loading={submitting}
              >
                Сохранить
              </Button>
            </div>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Profile;
