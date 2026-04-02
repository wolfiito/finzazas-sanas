import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import api from '../services/api';
import { HiArrowUpCircle, HiArrowDownCircle, HiChevronLeft, HiChevronRight, HiArrowLeft, HiArrowTrendingDown } from 'react-icons/hi2';

const Transactions: React.FC = () => {
  const [transactions, setTransactions] = useState<any[]>([]);
  const [currentMonth, setCurrentMonth] = useState(new Date());

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const res = await api.get('/api/transactions');
        setTransactions(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchTransactions();
  }, []);

  const formatCurrency = (val: any) => {
    return new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(parseFloat(val || 0));
  };

  const totalIncome = transactions
    .filter(t => parseFloat(t.amount) > 0)
    .reduce((acc, t) => acc + parseFloat(t.amount), 0);

  const totalExpenses = transactions
    .filter(t => parseFloat(t.amount) < 0)
    .reduce((acc, t) => acc + Math.abs(parseFloat(t.amount)), 0);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      style={{ display: 'flex', flexDirection: 'column', gap: '20px', paddingBottom: '100px' }}
    >
      <style>{`
        .month-selector {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 10px 0;
          margin-bottom: 20px;
        }
        .summary-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 15px;
          margin-bottom: 30px;
        }
        .summary-card {
           background: white;
           padding: 20px;
           border-radius: 24px;
           border: 1px solid #f0f0f0;
           box-shadow: 0 4px 15px rgba(0,0,0,0.02);
        }
        .tag {
          padding: 4px 10px;
          background: #f1f2f6;
          color: var(--text-dim);
          border-radius: 8px;
          font-size: 10px;
          font-weight: 800;
          text-transform: capitalize;
        }
      `}</style>

      <header style={{ textAlign: 'center', position: 'relative', padding: '10px 0' }}>
        <button 
          onClick={() => window.history.back()}
          style={{ position: 'absolute', left: 0, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', fontSize: '24px', color: '#2d3436', cursor: 'pointer' }}
        >
          <HiArrowLeft />
        </button>
        <h1 style={{ fontSize: '20px', fontWeight: 900, color: '#1a202c', textTransform: 'uppercase', letterSpacing: '1px' }}>Historial</h1>
      </header>

      <div className="month-selector">
        <HiChevronLeft style={{ fontSize: '24px', color: '#2d3436' }} />
        <h2 style={{ fontSize: '22px', fontWeight: 900, color: '#1a202c' }}>Marzo De 2026</h2>
        <HiChevronRight style={{ fontSize: '24px', color: '#2d3436' }} />
      </div>

      <div className="summary-grid">
        <div className="summary-card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--success)' }}></div>
            <p style={{ fontSize: '11px', fontWeight: 800, color: 'var(--text-dim)', textTransform: 'uppercase' }}>Ingresos</p>
          </div>
          <h3 style={{ fontSize: '20px', fontWeight: 900, color: 'var(--success)' }}>{formatCurrency(totalIncome)}</h3>
        </div>
        <div className="summary-card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--error)' }}></div>
            <p style={{ fontSize: '11px', fontWeight: 800, color: 'var(--text-dim)', textTransform: 'uppercase' }}>Gastos</p>
          </div>
          <h3 style={{ fontSize: '20px', fontWeight: 900, color: 'var(--error)' }}>{formatCurrency(totalExpenses)}</h3>
        </div>
      </div>

      <h4 style={{ fontSize: '14px', fontWeight: 900, color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '10px' }}>Movimientos</h4>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        {transactions.map((tx) => {
          const isExpense = parseFloat(tx.amount) < 0;
          return (
            <motion.div 
              key={tx.id}
              className="glass-card" 
              style={{ padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'white', border: '1px solid #f0f0f0' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                <div style={{ 
                  width: '45px', 
                  height: '45px', 
                  background: isExpense ? '#fff0f3' : '#e6fffb', 
                  borderRadius: '16px', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  color: isExpense ? '#ff4081' : '#00b894', 
                  fontSize: '22px' 
                }}>
                  {isExpense ? <HiArrowTrendingDown /> : <HiArrowUpCircle />}
                </div>
                <div>
                  <p style={{ fontSize: '15px', fontWeight: 800, color: '#1a202c', marginBottom: '2px' }}>{tx.description}</p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <p style={{ fontSize: '11px', color: 'var(--text-dim)', fontWeight: 600 }}>{new Date(tx.date).toLocaleDateString('es-MX', { day: '2-digit', month: 'short' })}</p>
                    <span style={{ fontSize: '10px', color: '#ccc' }}>•</span>
                    <span className="tag">{tx.category || 'Varios'}</span>
                  </div>
                </div>
              </div>
              <div style={{ fontSize: '16px', fontWeight: 900, color: isExpense ? '#1a202c' : 'var(--success)' }}>
                {isExpense ? '-' : '+'}{formatCurrency(Math.abs(tx.amount))}
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
};

export default Transactions;
