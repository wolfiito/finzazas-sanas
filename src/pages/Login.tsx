import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HiLockClosed, HiEnvelope, HiSparkles } from 'react-icons/hi2';
import { useAuthStore } from '../store/authStore';
import api from '../services/api';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  const setAuth = useAuthStore((state) => state.setAuth);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    try {
      const endpoint = isLogin ? '/api/auth/login' : '/api/auth/register';
      const payload = { username, password };
      
      const response = await api.post(endpoint, payload);
      
      if (isLogin) {
        // La API devuelve 'token', no 'access_token'
        setAuth(response.data.token, { id: 1, username });
        navigate('/');
      } else {
        setIsLogin(true);
        setError('Registro exitoso. ¡Bienvenido!');
      }
    } catch (err: any) {
      setError(err.response?.data?.error || 'Error en la autenticación');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-page" style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      padding: '20px',
      background: 'var(--bg-light)',
      backgroundImage: 'var(--bg-mesh)'
    }}>
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card"
        style={{ 
          width: '100%', 
          maxWidth: '450px', 
          padding: '48px', 
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
          background: 'white'
        }}
      >
        {/* Decorative elements */}
        <div style={{ 
          position: 'absolute', 
          top: '-10%', 
          right: '-10%', 
          width: '150px', 
          height: '150px', 
          background: 'var(--primary-glow)', 
          filter: 'blur(60px)',
          borderRadius: '50%',
          zIndex: 0
        }} />

        <div style={{ position: 'relative', zIndex: 1 }}>
          <header style={{ marginBottom: '40px' }}>
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 4, repeat: Infinity }}
              style={{ display: 'inline-block', marginBottom: '16px' }}
            >
              <div style={{ 
                width: '60px', 
                height: '60px', 
                background: 'linear-gradient(135deg, var(--primary), var(--secondary))',
                borderRadius: '18px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: '24px',
                fontWeight: '900',
                boxShadow: '0 8px 20px var(--primary-glow)'
              }}>HF</div>
            </motion.div>
            <h1 style={{ fontSize: '32px', fontWeight: 900, letterSpacing: '-1px', marginBottom: '8px', color: 'var(--text-main)' }}>
              {isLogin ? '¡Hola de nuevo!' : 'Crea tu cuenta'}
            </h1>
            <p style={{ color: 'var(--text-dim)', fontSize: '15px' }}>
              {isLogin ? 'Tus finanzas, ahora más dulces' : 'Gestiona tu dinero con estilo pastel'}
            </p>
          </header>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

            
            <div style={{ position: 'relative' }}>
              <HiEnvelope style={{ position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-dim)' }} />
              <input 
                type="text" 
                placeholder="Nombre de usuario" 
                className="input-field" 
                style={{ paddingLeft: '45px' }}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required 
              />
            </div>

            <div style={{ position: 'relative' }}>
              <HiLockClosed style={{ position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-dim)' }} />
              <input 
                type="password" 
                placeholder="Contraseña" 
                className="input-field" 
                style={{ paddingLeft: '45px' }}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required 
              />
            </div>

            {error && (
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                style={{ color: 'var(--error)', fontSize: '13px', fontWeight: 600 }}
              >
                {error}
              </motion.p>
            )}

            <button type="submit" className="primary-button" disabled={isLoading} style={{ marginTop: '10px' }}>
              {isLoading ? 'Procesando...' : (isLogin ? 'Entrar' : 'Registrar')}
            </button>
          </form>

          <footer style={{ marginTop: '32px', fontSize: '14px' }}>
            <span style={{ color: 'var(--text-dim)' }}>
              {isLogin ? '¿No tienes cuenta?' : '¿Ya eres miembro?'}
            </span>
            <button 
              onClick={() => setIsLogin(!isLogin)}
              style={{ 
                background: 'none', 
                border: 'none', 
                color: 'var(--secondary)', 
                fontWeight: 700, 
                marginLeft: '8px', 
                cursor: 'pointer',
                textDecoration: 'underline'
              }}
            >
              {isLogin ? 'Regístrate aquí' : 'Inicia sesión'}
            </button>
          </footer>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
