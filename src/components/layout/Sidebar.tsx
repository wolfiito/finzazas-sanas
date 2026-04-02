import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  HiChartBar, 
  HiWallet, 
  HiArrowsRightLeft, 
  HiCalendarDays, 
  HiArrowRightOnRectangle,
  HiScale
} from 'react-icons/hi2';
import { useAuthStore } from '../../store/authStore';

const Sidebar: React.FC = () => {
  const logout = useAuthStore((state) => state.logout);

  const navItems = [
    { to: '/', icon: <HiChartBar />, label: 'Dashboard' },
    { to: '/accounts', icon: <HiWallet />, label: 'Cuentas' },
    { to: '/transactions', icon: <HiArrowsRightLeft />, label: 'Historial' },
    { to: '/rules', icon: <HiCalendarDays />, label: 'Reglas' },
    { to: '/debts', icon: <HiScale />, label: 'Deudas' },
  ];

  return (
    <aside 
      className="sidebar glass-card"
      style={{
        width: '85px',
        height: 'calc(100vh - 40px)',
        position: 'fixed',
        left: '20px',
        top: '20px',
        display: 'none',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '30px 0',
        gap: '20px',
        zIndex: 100,
        background: 'rgba(255, 255, 255, 0.7)',
        border: '1px solid rgba(255, 255, 255, 0.5)',
        boxShadow: '0 10px 40px rgba(255, 94, 145, 0.1)'
      }}
    >
      <style>{`
        @media (min-width: 768px) {
          .sidebar { display: flex !important; }
        }
      `}</style>
      <div style={{ 
        width: '50px', 
        height: '50px', 
        background: 'linear-gradient(135deg, var(--primary), var(--secondary))',
        borderRadius: '16px',
        marginBottom: '20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: '900',
        color: 'white',
        fontSize: '22px',
        boxShadow: '0 8px 15px var(--primary-glow)'
      }}>
        HF
      </div>

      <nav style={{ display: 'flex', flexDirection: 'column', gap: '15px', flex: 1 }}>
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            style={({ isActive }) => ({
              width: '55px',
              height: '55px',
              borderRadius: '18px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '26px',
              color: isActive ? 'white' : 'var(--text-dim)',
              background: isActive ? 'var(--primary)' : 'transparent',
              transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
              boxShadow: isActive ? '0 8px 20px var(--primary-glow)' : 'none',
              border: 'none'
            })}
          >
            {item.icon}
          </NavLink>
        ))}
      </nav>

      <button 
        onClick={logout}
        style={{
          width: '50px',
          height: '50px',
          borderRadius: '16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '22px',
          color: 'var(--error)',
          background: 'rgba(255, 71, 87, 0.1)',
          border: 'none',
          cursor: 'pointer',
          transition: 'all 0.3s ease'
        }}
      >
        <HiArrowRightOnRectangle />
      </button>
    </aside>
  );
};

export default Sidebar;
