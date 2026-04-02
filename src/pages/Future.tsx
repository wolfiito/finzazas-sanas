import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { HiChartBar, HiBanknotes } from 'react-icons/hi2';
import api from '../services/api';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  Tooltip 
} from 'recharts';

const Future: React.FC = () => {
  const [projection, setProjection] = useState<any>(null);
  const [balance, setBalance] = useState<string>('0');
  const [monthsAhead, setMonthsAhead] = useState(3);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    try {
      const [balRes, projRes] = await Promise.all([
        api.get('/api/transactions/balance'),
        api.get(`/api/projection?months_ahead=${monthsAhead}`)
      ]);
      setBalance(balRes.data.current_balance);
      setProjection(projRes.data);
    } catch (err) {
      console.error('Error fetching projection:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [monthsAhead]);

  const formatCurrency = (val: any) => {
    return new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN', maximumFractionDigits: 0 }).format(parseFloat(val || 0));
  };

  if (isLoading) return <div style={{ color: 'var(--text-dim)', padding: '40px' }}>Simulando tu futuro...</div>;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      style={{ paddingBottom: '120px' }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <div>
          <h1 style={{ fontSize: '32px', fontWeight: 900, color: 'var(--text-main)', marginBottom: '8px' }}>Proyección</h1>
          <p style={{ color: 'var(--text-dim)', fontSize: '16px' }}>Simula tu futuro financiero</p>
        </div>
        <div style={{ width: '50px', height: '50px', borderRadius: '50%', background: 'var(--primary-glow)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)', fontSize: '24px' }}>
          <HiChartBar />
        </div>
      </div>

      <div className="glass-card" style={{ padding: '20px', background: 'white', marginBottom: '30px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
          <span style={{ fontWeight: 800, fontSize: '14px', color: 'var(--text-main)' }}>Proyectar a:</span>
          <select 
            value={monthsAhead} 
            onChange={(e) => setMonthsAhead(parseInt(e.target.value))}
            style={{ 
              background: 'var(--bg-light)', 
              border: '1px solid #eee', 
              borderRadius: '20px', 
              padding: '8px 20px', 
              fontWeight: 800,
              color: 'var(--primary)'
            }}
          >
            <option value="1">1 Mes</option>
            <option value="3">3 Meses</option>
            <option value="6">6 Meses</option>
            <option value="12">12 Meses</option>
          </select>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '30px' }}>
        <div className="glass-card" style={{ padding: '20px', background: 'white' }}>
          <p style={{ fontSize: '11px', color: 'var(--text-dim)', fontWeight: 800, textTransform: 'uppercase', marginBottom: '10px' }}>Saldo Actual</p>
          <h2 style={{ fontSize: '24px', fontWeight: 900, color: 'var(--text-main)' }}>{formatCurrency(balance)}</h2>
        </div>
        <div className="glass-card" style={{ padding: '20px', background: 'var(--primary)', color: 'white' }}>
          <p style={{ fontSize: '11px', opacity: 0.8, fontWeight: 800, textTransform: 'uppercase', marginBottom: '10px' }}>Saldo Futuro</p>
          <h2 style={{ fontSize: '24px', fontWeight: 900 }}>{formatCurrency(projection?.projected_balance_end)}</h2>
        </div>
      </div>

      <h3 style={{ fontSize: '18px', fontWeight: 900, color: 'var(--text-main)', marginBottom: '20px', textTransform: 'uppercase', letterSpacing: '1px' }}>Eventos Proyectados</h3>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        {projection?.simulation_log?.filter((e: any) => e.type !== 'initial').map((event: any, i: number) => (
          <div key={i} className="glass-card" style={{ padding: '15px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'white' }}>
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: 'var(--bg-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ccc' }}>
                <HiBanknotes />
              </div>
              <div>
                <p style={{ fontSize: '14px', fontWeight: 800, color: 'var(--text-main)' }}>{event.description || 'Movimiento'}</p>
                <p style={{ fontSize: '11px', color: 'var(--text-dim)', fontWeight: 600 }}>{new Date(event.date).toLocaleDateString('es-MX', { day: '2-digit', month: 'short' })}</p>
              </div>
            </div>
            <div style={{ fontWeight: 900, color: event.amount > 0 ? 'var(--success)' : 'var(--text-main)' }}>
              {event.amount > 0 ? '+' : ''}{formatCurrency(event.amount)}
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default Future;
