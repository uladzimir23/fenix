// src/app/App.tsx
import React from 'react';
import { HashRouter as Router, Navigate, Route, Routes } from 'react-router-dom';
import { AuthProvider } from '@/app/providers/AuthProvider/AuthProvider';
import { Layout } from '@/widgets/Layout/Layout';
import { Home } from '@/pages/Home/Home';
import { Catalog } from '@/pages/Catalog/Catalog';
import { Profile } from '@/pages/Profile/Profile';
import { Files } from '@/pages/Files/Files';
import { Messages } from '@/pages/Messages/Messages';
import { Login } from '@/pages/Login/Login';
import { ApiTester } from '@/widgets/ApiTester/ApiTester';
import '@/app/styles/globals.scss';

const App: React.FC = () => {
  return (
    <Router>
      <AuthProvider>
        <Layout>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/test-api" element={<ApiTester />} />
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/catalog" element={<Catalog />} />
            <Route path="/files" element={<Files />} />
            <Route path="/messages" element={<Messages />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Layout>
      </AuthProvider>
    </Router>
  );
};

export default App; // ← default export