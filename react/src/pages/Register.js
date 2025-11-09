import React, { useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../api/auth';

const Register = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const response = await registerUser(values);
      message.success('Регистрация успешно завершена!');
      navigate('/login');
    } catch (error) {
      if (error.response && error.response.data) {
        const errorData = error.response.data;
        if (typeof errorData === 'object') {
          Object.keys(errorData).forEach((key) => {
            const errorMessages = Array.isArray(errorData[key]) 
              ? errorData[key].join(', ') 
              : errorData[key];
            message.error(`${key}: ${errorMessages}`);
          });
        } else {
          message.error('Ошибка регистрации. Попробуйте снова.');
        }
      } else {
        message.error('Ошибка регистрации. Попробуйте снова.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div data-easytag="id1-react/src/pages/Register.js" className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Регистрация
          </h2>
        </div>
        <div className="bg-white shadow-md rounded-lg p-8">
          <Form
            form={form}
            name="register"
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
              label="Имя"
              name="first_name"
              rules={[
                {
                  required: true,
                  message: 'Пожалуйста, введите имя!',
                },
              ]}
            >
              <Input placeholder="Введите имя" size="large" />
            </Form.Item>

            <Form.Item
              label="Фамилия"
              name="last_name"
              rules={[
                {
                  required: true,
                  message: 'Пожалуйста, введите фамилию!',
                },
              ]}
            >
              <Input placeholder="Введите фамилию" size="large" />
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
                Зарегистрироваться
              </Button>
            </Form.Item>
          </Form>
          <div className="text-center mt-4">
            <span className="text-gray-600">Уже есть аккаунт? </span>
            <a href="/login" className="text-blue-600 hover:text-blue-800">
              Войти
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
