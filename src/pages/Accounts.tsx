import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiPlus, HiWallet, HiCreditCard, HiChevronRight, HiArrowLeft, HiArrowTrendingDown } from 'react-icons/hi2';
import api from '../services/api';

const Accounts: React.FC = () => {
  const [accounts, setAccounts] = useState<any[]>([]);
  const [selectedAccount, setSelectedAccount] = useState<any>(null);
  const [transactions, setTransactions] = useState<any[]>([]);

  const fetchAccounts = async () => {
    try {
      const res = await api.get('/api/accounts/summary');
      setAccounts(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchAccounts();
  }, []);

  const handleAccountClick = async (account: any) => {
    setSelectedAccount(account);
    try {
      const res = await api.get('/api/transactions');
      const filtered = res.data.filter((t: any) => t.account_id === account.id);
      setTransactions(filtered);
    } catch (err) {
      console.error(err);
    }
  };

  const formatCurrency = (val: any) => {
    return new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(parseFloat(val || 0));
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      style={{ display: 'flex', flexDirection: 'column', gap: '25px', paddingBottom: '100px' }}
    >
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
        {selectedAccount ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <button 
              onClick={() => setSelectedAccount(null)}
              style={{ background: 'var(--bg-light)', border: 'none', color: 'var(--text-main)', padding: '10px', borderRadius: '15px', cursor: 'pointer', display: 'flex' }}
            >
              <HiArrowLeft />
            </button>
            <h1 style={{ fontSize: '24px', fontWeight: 900, color: 'var(--text-main)' }}>{selectedAccount.name}</h1>
          </div>
        ) : (
          <>
            <div>
              <h1 style={{ fontSize: '30px', fontWeight: 900, color: '#1a202c', margin: 0 }}>Mis Cuentas</h1>
              <p style={{ color: 'var(--text-dim)', fontSize: '15px', fontWeight: 500 }}>Gestiona tus tarjetas y efectivo</p>
            </div>
            <div style={{ 
              width: '50px', 
              height: '50px', 
              borderRadius: '20px', 
              background: 'rgba(255, 94, 145, 0.1)', 
              color: 'var(--primary)', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              fontSize: '24px' 
            }}>
              <HiWallet />
            </div>
          </>
        )}
      </header>

      <AnimatePresence mode="wait">
        {selectedAccount ? (
          <motion.div 
            key="detail"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}
          >
            <div className="glass-card" style={{ padding: '25px', background: 'white', border: '1px solid #f0f0f0' }}>
              <p style={{ color: 'var(--text-dim)', fontSize: '12px', marginBottom: '8px', fontWeight: 800, textTransform: 'uppercase' }}>Saldo de cuenta</p>
              <h2 style={{ fontSize: '32px', fontWeight: 900, color: 'var(--text-main)', letterSpacing: '-1px' }}>{formatCurrency(selectedAccount.current_balance)}</h2>
            </div>

            <h3 style={{ fontSize: '15px', fontWeight: 900, color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '1px' }}>Movimientos Recientes</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {transactions.length > 0 ? transactions.map(t => (
                <div key={t.id} className="glass-card" style={{ padding: '18px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'white' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                    <div style={{ width: '40px', height: '40px', background: 'var(--bg-light)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ccc' }}>
                      <HiArrowTrendingDown />
                    </div>
                    <div>
                      <p style={{ fontWeight: 800, color: 'var(--text-main)', fontSize: '14px' }}>{t.description}</p>
                      <p style={{ fontSize: '11px', color: 'var(--text-dim)', fontWeight: 600 }}>{new Date(t.date).toLocaleDateString('es-MX', { day: '2-digit', month: 'short' })}</p>
                    </div>
                  </div>
                  <div style={{ fontSize: '16px', fontWeight: 900, color: t.amount < 0 ? 'var(--text-main)' : 'var(--success)' }}>
                    {formatCurrency(t.amount)}
                  </div>
                </div>
              )) : (
                <p style={{ textAlign: 'center', padding: '40px', color: 'var(--text-dim)' }}>Sin movimientos</p>
              )}
            </div>
          </motion.div>
        ) : (
          <motion.div 
            key="list"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}
          >
            {accounts.map((account) => (
              <motion.div
                key={account.id}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleAccountClick(account)}
                className="glass-card"
                style={{
                  padding: '20px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  background: 'white',
                  border: '1px solid #f0f0f0',
                  boxShadow: '0 4px 15px rgba(0,0,0,0.02)'
                }}
              >
                <div style={{ 
                  width: '50px', 
                  height: '50px', 
                  borderRadius: '16px', 
                  background: account.type === 'CREDIT_CARD' ? 'rgba(0, 206, 201, 0.1)' : 'rgba(46, 213, 115, 0.1)', 
                  color: account.type === 'CREDIT_CARD' ? '#00cec9' : 'var(--success)', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  fontSize: '24px',
                  marginRight: '15px'
                }}>
                  {account.type === 'CREDIT_CARD' ? <HiCreditCard /> : <HiWallet />}
                </div>
                <div style={{ flex: 1 }}>
                  <h3 style={{ fontSize: '17px', fontWeight: 800, color: '#1a202c', marginBottom: '4px' }}>{account.name}</h3>
                  <p style={{ fontSize: '11px', color: 'var(--text-dim)', fontWeight: 700, textTransform: 'uppercase' }}>
                    {account.type === 'CREDIT_CARD' ? 'Tarjeta de Crédito' : 'Efectivo / Débito'}
                  </p>
                </div>
                <div style={{ textAlign: 'right', marginRight: '15px' }}>
                  <p style={{ fontSize: '17px', fontWeight: 900, color: parseFloat(account.current_balance) < 0 ? 'var(--error)' : 'var(--success)', margin: 0 }}>
                    {formatCurrency(account.current_balance)}
                  </p>
                </div>
                <HiChevronRight style={{ color: '#ccc', fontSize: '20px' }} />
              </motion.div>
            ))}
            
            <motion.button 
              whileHover={{ scale: 1.02 }}
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
              <HiPlus /> NUEVA CUENTA
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Accounts;
