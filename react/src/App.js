import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ConfigProvider, Layout } from 'antd';
import ruRU from 'antd/locale/ru_RU';
import ErrorBoundary from './ErrorBoundary';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import Profile from './pages/Profile';
import './App.css';

const { Content } = Layout;

function App() {
  useEffect(() => {
    if (window.handleRoutes) {
      window.handleRoutes(['/', '/register', '/login', '/profile']);
    }
  }, []);

  return (
    <ErrorBoundary>
      <ConfigProvider locale={ruRU}>
        <Router>
          <Layout data-easytag="id1-react/src/App.js" className="App">
            <Navbar />
            <Content>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route 
                  path="/profile" 
                  element={
                    <ProtectedRoute>
                      <Profile />
                    </ProtectedRoute>
                  } 
                />
              </Routes>
            </Content>
          </Layout>
        </Router>
      </ConfigProvider>
    </ErrorBoundary>
  );
}

export default App;
