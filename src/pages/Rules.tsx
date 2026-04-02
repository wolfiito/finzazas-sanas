import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import api from '../services/api';
import { HiPlus, HiArrowPath, HiMiniClock, HiTrash, HiArrowPathRoundedSquare } from 'react-icons/hi2';

const Rules: React.FC = () => {
  const [rules, setRules] = useState<any[]>([]);

  useEffect(() => {
    const fetchRules = async () => {
      try {
        const res = await api.get('/api/rules/');
        setRules(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchRules();
  }, []);

  const formatCurrency = (val: any) => {
    return new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(parseFloat(val || 0));
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      style={{ display: 'flex', flexDirection: 'column', gap: '20px', paddingBottom: '100px' }}
    >
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ fontSize: '30px', fontWeight: 900, color: '#1a202c', margin: 0 }}>Reglas Fijas</h1>
          <p style={{ color: 'var(--text-dim)', fontSize: '15px', fontWeight: 500 }}>Pagos y cobros recurrentes</p>
        </div>
        <button style={{ background: 'none', border: 'none', fontSize: '28px', color: '#636e72', cursor: 'pointer' }}>
          <HiArrowPath />
        </button>
      </header>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        {rules.map((rule) => (
          <motion.div 
            key={rule.id}
            className="glass-card"
            style={{ 
              padding: '20px', 
              background: 'white', 
              border: '1px solid #f0f0f0', 
              display: 'flex', 
              alignItems: 'center',
              boxShadow: '0 4px 15px rgba(0,0,0,0.02)'
            }}
          >
            {/* Date Tag */}
            <div style={{ 
              width: '60px', 
              height: '65px', 
              background: '#f9f5ff', 
              borderRadius: '16px', 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center', 
              justifyContent: 'center',
              marginRight: '15px',
              border: '1px solid #f3ebff'
            }}>
              <span style={{ fontSize: '9px', fontWeight: 900, color: '#a29bfe', textTransform: 'uppercase' }}>Próx</span>
              <span style={{ fontSize: '22px', fontWeight: 900, color: '#6c5ce7' }}>
                {new Date(rule.next_execution_date).getDate()}
              </span>
            </div>

            <div style={{ flex: 1 }}>
              <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#1a202c', marginBottom: '4px' }}>{rule.description}</h3>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ 
                  padding: '4px 12px', 
                  background: '#f1f2f6', 
                  color: 'var(--text-dim)', 
                  borderRadius: '20px', 
                  fontSize: '11px', 
                  fontWeight: 800 
                }}>
                  {rule.frequency === 'monthly' ? 'Mensual' : 'Única vez'}
                </span>
                <span style={{ fontSize: '13px', color: '#ccc', fontWeight: 600 }}>{formatCurrency(rule.amount)}</span>
              </div>
            </div>

            <button style={{ background: 'none', border: 'none', color: '#ff7675', fontSize: '22px', cursor: 'pointer', padding: '10px' }}>
              <HiTrash />
            </button>
          </motion.div>
        ))}

        <motion.button 
          whileTap={{ scale: 0.98 }}
          style={{
            marginTop: '10px',
            padding: '20px',
            borderRadius: '24px',
            border: '2px dashed #eee',
            background: 'transparent',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '10px',
            color: 'var(--text-dim)',
            fontWeight: 800,
            cursor: 'pointer'
          }}
        >
          <HiPlus /> NUEVA REGLA
        </motion.button>
      </div>
    </motion.div>
  );
};

export default Rules;
