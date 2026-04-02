import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Accounts from './pages/Accounts';
import Transactions from './pages/Transactions';
import Rules from './pages/Rules';
import Debts from './pages/Debts';
import Menu from './pages/Menu';
import Future from './pages/Future';
import Settings from './pages/Settings';
import Layout from './components/layout/Layout';
import { useAuthStore } from './store/authStore';



const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
};

function App() {
  return (
    <BrowserRouter>
      <div className="app-container" style={{ minHeight: '100vh', position: 'relative', overflow: 'hidden', background: 'var(--bg-light)' }}>
        {/* Decorative Blobs */}
        <div className="blob" style={{ width: '400px', height: '400px', background: 'var(--primary-glow)', top: '-100px', left: '-100px', animationDelay: '0s' }} />
        <div className="blob" style={{ width: '300px', height: '300px', background: 'var(--secondary-glow)', bottom: '100px', right: '-50px', animationDelay: '-5s' }} />
        <div className="blob" style={{ width: '250px', height: '250px', background: 'var(--accent)', top: '40%', right: '10%', opacity: 0.2, animationDelay: '-10s' }} />
        
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route 
              path="/*" 
              element={
                <ProtectedRoute>
                  <Layout>
                    <Routes>
                      <Route path="/" element={<Dashboard />} />
                      <Route path="/menu" element={<Menu />} />
                      <Route path="/accounts" element={<Accounts />} />
                      <Route path="/transactions" element={<Transactions />} />
                      <Route path="/rules" element={<Rules />} />
                      <Route path="/debts" element={<Debts />} />
                      <Route path="/future" element={<Future />} />
                      <Route path="/settings" element={<Settings />} />
                    </Routes>
                  </Layout>
                </ProtectedRoute>
              } 
            />
          </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
