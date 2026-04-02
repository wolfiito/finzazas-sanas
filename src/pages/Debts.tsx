import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { HiScale, HiExclamationCircle, HiCheckCircle } from 'react-icons/hi2';
import api from '../services/api';

const Debts: React.FC = () => {
  const [debts, setDebts] = useState<any[]>([]);

  useEffect(() => {
    const fetchDebts = async () => {
      try {
        const res = await api.get('/api/debts/');
        setDebts(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchDebts();
  }, []);

  const formatCurrency = (val: any) => {
    return new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(parseFloat(val || 0));
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}
    >
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ fontSize: '32px', fontWeight: 900 }}>Deudas</h1>
          <p style={{ color: 'var(--text-dim)' }}>Controla tus préstamos y saldos pendientes</p>
        </div>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '20px' }}>
        {debts.map((debt, index) => {
          const progress = (parseFloat(debt.paid_amount) / parseFloat(debt.total_amount)) * 100;
          return (
            <motion.div 
              key={debt.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="glass-card"
              style={{ padding: '25px', background: 'white', border: '1px solid #eee' }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <HiScale style={{ fontSize: '24px', color: 'var(--secondary)' }} />
                  <h3 style={{ fontSize: '18px', fontWeight: 800, color: 'var(--text-main)' }}>{debt.description}</h3>
                </div>
                {progress >= 100 ? <HiCheckCircle style={{ color: 'var(--success)', fontSize: '20px' }} /> : <HiExclamationCircle style={{ color: 'var(--accent)', fontSize: '20px' }} />}
              </div>

              <div style={{ marginBottom: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '8px' }}>
                   <span style={{ color: 'var(--text-dim)' }}>Progreso: {Math.round(progress)}%</span>
                   <span style={{ fontWeight: 800, color: 'var(--text-main)' }}>{formatCurrency(debt.paid_amount)} / {formatCurrency(debt.total_amount)}</span>
                </div>
                <div style={{ height: '10px', background: '#f5f5f5', borderRadius: '10px', overflow: 'hidden' }}>
                   <motion.div 
                     initial={{ width: 0 }}
                     animate={{ width: `${progress}%` }}
                     transition={{ duration: 1, delay: 0.5 }}
                     style={{ height: '100%', background: 'linear-gradient(90deg, var(--primary), var(--secondary))', borderRadius: '10px' }} 
                   />
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                 <div>
                   <p style={{ fontSize: '11px', color: 'var(--text-dim)', textTransform: 'uppercase', fontWeight: 700 }}>Pendiente</p>
                   <p style={{ fontSize: '22px', fontWeight: 900, color: 'var(--primary)' }}>{formatCurrency(debt.remaining_amount)}</p>
                 </div>
                 <button style={{ padding: '10px 20px', background: 'var(--primary-glow)', border: 'none', borderRadius: '12px', color: 'var(--primary)', fontSize: '12px', cursor: 'pointer', fontWeight: 800 }}>
                   Abonar
                 </button>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
};

export default Debts;
