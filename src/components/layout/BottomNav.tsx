import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  HiHome, 
  HiSquares2X2, 
  HiChartBar, 
  HiCog6Tooth,
  HiPlus
} from 'react-icons/hi2';
import { useUIStore } from '../../store/uiStore';

const BottomNav: React.FC = () => {
  const { openAddTransactionModal } = useUIStore();
  const navItems = [
    { to: '/', icon: <HiHome />, label: 'Inicio' },
    { to: '/menu', icon: <HiSquares2X2 />, label: 'Más' },
    { to: '#', icon: <HiPlus />, label: 'Nuevo', isSpecial: true, onClick: (e: any) => { e.preventDefault(); openAddTransactionModal(); } },
    { to: '/future', icon: <HiChartBar />, label: 'Futuro' },
    { to: '/settings', icon: <HiCog6Tooth />, label: 'Ajustes' },
  ];

  return (
    <nav style={{
      position: 'fixed',
      bottom: '15px',
      left: '15px',
      right: '15px',
      height: '65px',
      background: 'rgba(255, 255, 255, 0.85)',
      backdropFilter: 'blur(20px)',
      borderRadius: '22px',
      border: '1px solid rgba(255,255,255,1)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-around',
      zIndex: 1000,
      padding: '0 10px',
      boxShadow: '0 10px 40px rgba(255, 94, 145, 0.12)'
    }}>
      {navItems.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          onClick={item.onClick}
          style={({ isActive }) => ({
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '4px',
            color: (item.to !== '#' && isActive) ? 'var(--primary)' : 'var(--text-dim)',
            textDecoration: 'none',
            fontSize: '10px',
            transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
            background: item.isSpecial ? 'linear-gradient(135deg, var(--primary), #ff8fa3)' : 'transparent',
            width: item.isSpecial ? '58px' : 'auto',
            height: item.isSpecial ? '58px' : 'auto',
            borderRadius: item.isSpecial ? '18px' : '0',
            marginTop: item.isSpecial ? '-35px' : '0',
            boxShadow: item.isSpecial ? '0 8px 25px var(--primary-glow)' : 'none',
            transform: (isActive && !item.isSpecial) ? 'scale(1.1)' : 'none'
          })}
        >
          {({ isActive }) => (
            <>
              <span style={{ 
                fontSize: item.isSpecial ? '28px' : '22px', 
                color: item.isSpecial ? 'white' : 'inherit',
                filter: (isActive && !item.isSpecial) ? 'drop-shadow(0 4px 6px var(--primary-glow))' : 'none'
              }}>
                {item.icon}
              </span>
              {!item.isSpecial && <span style={{ fontWeight: isActive ? 800 : 500 }}>{item.label}</span>}
            </>
          )}
        </NavLink>
      ))}
    </nav>
  );
};

export default BottomNav;
