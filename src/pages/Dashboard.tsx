import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { 
  HiArrowTrendingDown, 
  HiBanknotes
} from 'react-icons/hi2';
import api from '../services/api';
import { useUIStore } from '../store/uiStore';

const Dashboard: React.FC = () => {
  const [balance, setBalance] = useState<string>('0');
  const [, setAccounts] = useState<any[]>([]);
  const [, setProjection] = useState<any>(null);
  const [recentTransactions, setRecentTransactions] = useState<any[]>([]);
  const [upcomingPayments, setUpcomingPayments] = useState<any[]>([]);
  const [monthsAhead ,] = useState(1);
  const [,] = useState(false);
  const { } = useUIStore();
  const [isLoading, setIsLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(window.matchMedia('(max-width: 768px)').matches);

  useEffect(() => {
    const mql = window.matchMedia('(max-width: 768px)');
    const onChange = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mql.addEventListener('change', onChange);
    return () => mql.removeEventListener('change', onChange);
  }, []);

  const fetchData = async () => {
    try {
      const [balRes, accRes, projRes, transRes, paymentsRes] = await Promise.all([
        api.get('/api/transactions/balance'),
        api.get('/api/accounts/summary'),
        api.get(`/api/projection?months_ahead=${monthsAhead}`),
        api.get('/api/transactions'),
        api.get('/api/summary/monthly_payments')
      ]);
      
      setBalance(balRes.data.current_balance);
      setAccounts(accRes.data);
      setProjection(projRes.data);
      setRecentTransactions(transRes.data.filter((t: any) => parseFloat(t.amount) < 0).slice(0, 5));
      setUpcomingPayments(paymentsRes.data);
    } catch (err) {
      console.error('Error fetching dashboard data:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [monthsAhead]);

  const formatCurrency = (val: any) => {
    return new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(parseFloat(val || 0));
  };

  const simplifyDescription = (desc: string) => {
    // Remove "Pago Proyectado (Corte X/X): " or similar patterns
    return desc.replace(/Pago Proyectado \(Corte .*?\): /i, '').replace(/Pago Mensual: /i, '').trim();
  };

  // ... (containerVariants and cardVariants same)
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  if (isLoading) return <div style={{ color: 'var(--text-dim)', padding: '40px' }}>Preparando tu inicio premium...</div>;

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      style={{ display: 'flex', flexDirection: 'column', gap: '0', margin: '-20px -20px 0 -20px', paddingBottom: '120px' }}
    >
      <style>{`
        .header-fixed {
          background: linear-gradient(180deg, #ff5e91 0%, #ff8fa3 100%);
          padding: 60px 20px 40px 20px;
          text-align: center;
          color: white;
          border-radius: 0 0 60px 60px;
          box-shadow: 0 15px 40px rgba(255, 94, 145, 0.2);
          margin-bottom: 30px;
          position: relative;
          overflow: hidden;
        }
        .header-fixed::before {
          content: '';
          position: absolute;
          top: -50px;
          right: -50px;
          width: 200px;
          height: 200px;
          background: rgba(255,255,255,0.1);
          border-radius: 50%;
        }
      `}</style>

      {/* Premium Header Saldo */}
      <div className="header-fixed">
        <p style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '3px', marginBottom: '10px', opacity: 0.9 }}>Saldo Total</p>
        <h2 style={{ 
          fontSize: isMobile ? 'clamp(2.2rem, 11vw, 3.2rem)' : '4rem', 
          fontWeight: 900, 
          margin: 0,
          letterSpacing: '-2px',
          textShadow: '0 4px 15px rgba(0,0,0,0.1)'
        }}>
          {formatCurrency(balance)}
        </h2>
      </div>

      <div style={{ padding: '0 20px', display: 'flex', flexDirection: 'column', gap: '30px' }}>
        {/* Próximos Pagos Section */}
        <section>
          <h3 style={{ fontSize: '16px', fontWeight: 900, marginBottom: '15px', color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '1px', display: 'flex', alignItems: 'center', gap: '10px' }}>
             Próximos Pagos
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            {upcomingPayments.length > 0 ? upcomingPayments.slice(0, 5).map((p, i) => {
              const isIncome = parseFloat(p.amount) > 0;
              return (
                <motion.div 
                  key={i} 
                  variants={cardVariants} 
                  className="glass-card" 
                  style={{ 
                    padding: '18px 20px', 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center',
                    background: 'white',
                    boxShadow: '0 8px 25px rgba(0,0,0,0.03)'
                  }}
                >
                  <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
                     <div style={{ 
                       width: '40px', 
                       height: '40px', 
                       background: isIncome ? 'rgba(46, 213, 115, 0.15)' : 'rgba(255, 94, 145, 0.08)', 
                       borderRadius: '12px', 
                       display: 'flex', 
                       alignItems: 'center', 
                       justifyContent: 'center', 
                       color: isIncome ? 'var(--success)' : 'var(--primary)', 
                       fontSize: '18px' 
                     }}>
                        <HiBanknotes />
                     </div>
                     <div>
                       <p style={{ fontWeight: 800, color: 'var(--text-main)', fontSize: '14px', marginBottom: '2px' }}>{simplifyDescription(p.description)}</p>
                       <p style={{ fontSize: '11px', color: 'var(--text-dim)', fontWeight: 700 }}>{new Date(p.date).toLocaleDateString('es-MX', { day: '2-digit', month: 'long' })}</p>
                     </div>
                  </div>
                  <div style={{ fontSize: '16px', fontWeight: 900, color: isIncome ? 'var(--success)' : 'var(--text-main)' }}>
                    {formatCurrency(p.amount)}
                  </div>
                </motion.div>
              );
            }) : (
              <p style={{ color: 'var(--text-dim)', fontSize: '14px', background: 'white', padding: '30px', borderRadius: '24px', textAlign: 'center', border: '1px solid #eee' }}>Sin pagos pendientes ✨</p>
            )}
          </div>
        </section>

        {/* Movimientos Section */}
        <section>
          <h3 style={{ fontSize: '16px', fontWeight: 900, marginBottom: '15px', color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '1px' }}>Últimos Movimientos</h3>
          <div className="glass-card" style={{ background: 'white', padding: '5px', border: '1px solid #eee' }}>
            {recentTransactions.length > 0 ? recentTransactions.map((t, i) => (
              <div key={i} style={{ 
                padding: '18px 20px', 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                borderBottom: i === recentTransactions.length - 1 ? 'none' : '1px solid #f9f9f9'
              }}>
                <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
                  <div style={{ 
                    width: '42px', 
                    height: '42px', 
                    background: 'var(--bg-light)', 
                    borderRadius: '12px', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    color: '#ccc', 
                    fontSize: '20px'
                  }}>
                    <HiArrowTrendingDown />
                  </div>
                  <div>
                    <p style={{ fontSize: '14px', fontWeight: 800, color: 'var(--text-main)', marginBottom: '2px' }}>{t.description}</p>
                    <p style={{ fontSize: '11px', color: 'var(--text-dim)', fontWeight: 600 }}>{new Date(t.date).toLocaleDateString('es-MX', { day: '2-digit', month: 'short' })}</p>
                  </div>
                </div>
                <div style={{ fontWeight: 900, fontSize: '16px', color: 'var(--text-main)' }}>{formatCurrency(t.amount)}</div>
              </div>
            )) : (
               <p style={{ textAlign: 'center', padding: '30px', color: 'var(--text-dim)', fontSize: '14px', fontStyle: 'italic' }}>Sin movimientos aún</p>
            )}
          </div>
        </section>
      </div>
    </motion.div>
  );
};

export default Dashboard;
