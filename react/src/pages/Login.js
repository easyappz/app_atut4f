import React, { useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../api/auth';

const Login = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const response = await loginUser(values);
      localStorage.setItem('token', response.access);
      if (response.refresh) {
        localStorage.setItem('refresh_token', response.refresh);
      }
      message.success('Вход выполнен успешно!');
      navigate('/profile');
    } catch (error) {
      if (error.response && error.response.status === 401) {
        message.error('Неверный email или пароль');
      } else if (error.response && error.response.data) {
        const errorData = error.response.data;
        if (typeof errorData === 'object') {
          Object.keys(errorData).forEach((key) => {
            const errorMessages = Array.isArray(errorData[key]) 
              ? errorData[key].join(', ') 
              : errorData[key];
            message.error(`${key}: ${errorMessages}`);
          });
        } else {
          message.error('Ошибка входа. Попробуйте снова.');
        }
      } else {
        message.error('Ошибка входа. Попробуйте снова.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div data-easytag="id1-react/src/pages/Login.js" className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Вход
          </h2>
        </div>
        <div className="bg-white shadow-md rounded-lg p-8">
          <Form
            form={form}
            name="login"
            onFinish={onFinish}
            layout="vertical"
            autoComplete="off"
          >
            <Form.Item
              label="Email"
              name="email"
              rules={[
                {
                  required: true,
                  message: 'Пожалуйста, введите email!',
                },
                {
                  type: 'email',
                  message: 'Введите корректный email!',
                },
              ]}
            >
              <Input placeholder="Введите email" size="large" />
            </Form.Item>

            <Form.Item
              label="Пароль"
              name="password"
              rules={[
                {
                  required: true,
                  message: 'Пожалуйста, введите пароль!',
                },
              ]}
            >
              <Input.Password placeholder="Введите пароль" size="large" />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                block
                size="large"
                className="mt-4"
              >
                Войти
              </Button>
            </Form.Item>
          </Form>
          <div className="text-center mt-4">
            <span className="text-gray-600">Нет аккаунта? </span>
            <a href="/register" className="text-blue-600 hover:text-blue-800">
              Зарегистрироваться
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
