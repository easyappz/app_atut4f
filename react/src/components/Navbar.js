import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu } from 'antd';
import { HomeOutlined, UserOutlined, LoginOutlined, UserAddOutlined } from '@ant-design/icons';

const Navbar = () => {
  const location = useLocation();
  const token = localStorage.getItem('token');

  const items = [
    {
      key: '/',
      icon: <HomeOutlined />,
      label: <Link to="/" data-easytag="id1-react/src/components/Navbar.js">Главная</Link>,
    },
    !token && {
      key: '/register',
      icon: <UserAddOutlined />,
      label: <Link to="/register" data-easytag="id2-react/src/components/Navbar.js">Регистрация</Link>,
    },
    !token && {
      key: '/login',
      icon: <LoginOutlined />,
      label: <Link to="/login" data-easytag="id3-react/src/components/Navbar.js">Вход</Link>,
    },
    token && {
      key: '/profile',
      icon: <UserOutlined />,
      label: <Link to="/profile" data-easytag="id4-react/src/components/Navbar.js">Профиль</Link>,
    },
  ].filter(Boolean);

  return (
    <nav data-easytag="id5-react/src/components/Navbar.js" className="border-b border-gray-200">
      <Menu
        mode="horizontal"
        selectedKeys={[location.pathname]}
        items={items}
        style={{ justifyContent: 'center' }}
      />
    </nav>
  );
};

export default Navbar;
