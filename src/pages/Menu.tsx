import React from 'react';
import { motion } from 'framer-motion';
import { 
  HiWallet, 
  HiCalendarDays, 
  HiClock, 
  HiChevronRight 
} from 'react-icons/hi2';
import { useNavigate } from 'react-router-dom';

const Menu: React.FC = () => {
  const navigate = useNavigate();

  const menuItems = [
    { 
      title: 'Mis Cuentas', 
      desc: 'Gestiona tarjetas y efectivo', 
      icon: <HiWallet />, 
      color: '#ff5e91', 
      bg: 'rgba(255, 94, 145, 0.1)',
      path: '/accounts' 
    },
    { 
      title: 'Reglas Fijas', 
      desc: 'Pagos recurrentes y fijos', 
      icon: <HiCalendarDays />, 
      color: '#6c5ce7', 
      bg: 'rgba(108, 92, 231, 0.1)',
      path: '/rules' 
    },
    { 
      title: 'Historial de Gastos', 
      desc: 'Ver todos los movimientos', 
      icon: <HiClock />, 
      color: '#ffbc6e', 
      bg: 'rgba(255, 188, 110, 0.1)',
      path: '/transactions' 
    }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      style={{ paddingBottom: '120px' }}
    >
      <div style={{ marginBottom: '30px' }}>
        <h1 style={{ fontSize: '32px', fontWeight: 900, color: 'var(--text-main)', marginBottom: '8px' }}>Menú Principal</h1>
        <p style={{ color: 'var(--text-dim)', fontSize: '16px' }}>¿Qué quieres hacer hoy?</p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {menuItems.map((item, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate(item.path)}
            className="glass-card"
            style={{ 
              padding: '25px', 
              display: 'flex', 
              alignItems: 'center', 
              gap: '20px', 
              cursor: 'pointer',
              background: 'white'
            }}
          >
            <div style={{ 
              width: '60px', 
              height: '60px', 
              borderRadius: '20px', 
              background: item.bg, 
              color: item.color, 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              fontSize: '28px' 
            }}>
              {item.icon}
            </div>
            <div style={{ flex: 1 }}>
              <h3 style={{ fontSize: '18px', fontWeight: 800, color: 'var(--text-main)', marginBottom: '4px' }}>{item.title}</h3>
              <p style={{ fontSize: '13px', color: 'var(--text-dim)', fontWeight: 500 }}>{item.desc}</p>
            </div>
            <HiChevronRight style={{ color: '#ccc', fontSize: '20px' }} />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default Menu;
