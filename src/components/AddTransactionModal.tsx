import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiXMark, HiBanknotes } from 'react-icons/hi2';
import api from '../services/api';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const AddTransactionModal: React.FC<Props> = ({ isOpen, onClose, onSuccess }) => {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState('expense');
  const [accountId, setAccountId] = useState('');
  const [accounts, setAccounts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isMobile, setIsMobile] = useState(window.matchMedia('(max-width: 768px)').matches);

  useEffect(() => {
    const mql = window.matchMedia('(max-width: 768px)');
    const onChange = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mql.addEventListener('change', onChange);
    
    if (isOpen) {
      api.get('/api/accounts/summary').then(res => setAccounts(res.data));
    }
    return () => mql.removeEventListener('change', onChange);
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await api.post('/api/transactions/new', {
        description,
        amount: parseFloat(amount),
        type,
        account_id: accountId || null,
        category: 'general'
      });
      onSuccess();
      onClose();
      setDescription('');
      setAmount('');
    } catch (err) {
      console.error(err);
      alert('Error al crear transacción');
    } finally {
      setIsLoading(false);
    }
  };

  const modalVariants = isMobile ? {
    hidden: { y: '100%' },
    visible: { y: 0 },
    exit: { y: '100%' }
  } : {
    hidden: { opacity: 0, scale: 0.9, y: 20 },
    visible: { opacity: 1, scale: 1, y: 0 },
    exit: { opacity: 0, scale: 0.9, y: 20 }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div 
          className="modal-overlay" 
          onClick={onClose}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.6)',
            backdropFilter: 'blur(10px)',
            zIndex: 2000,
            display: 'flex',
            alignItems: isMobile ? 'flex-end' : 'center',
            justifyContent: 'center'
          }}
        >
          <motion.div 
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="glass-card"
            style={{ 
              width: '100%', 
              maxWidth: isMobile ? '100%' : '500px', 
              padding: '35px', 
              position: 'relative',
              background: 'white',
              borderRadius: isMobile ? '30px 30px 0 0' : '32px',
              borderBottom: isMobile ? 'none' : '1px solid #eee',
              maxHeight: '90vh',
              overflowY: 'auto'
            }}
            onClick={e => e.stopPropagation()}
          >
            {isMobile && (
              <div style={{ width: '40px', height: '5px', background: '#eee', borderRadius: '10px', margin: '0 auto 20px auto' }} />
            )}
            
            <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                <div style={{ padding: '10px', background: 'var(--primary-glow)', borderRadius: '12px', color: 'var(--primary)' }}>
                  <HiBanknotes style={{ fontSize: '24px' }} />
                </div>
                <h2 style={{ fontSize: '24px', fontWeight: 900, color: 'var(--text-main)' }}>Nueva Transacción</h2>
              </div>
              <button onClick={onClose} style={{ background: '#f5f5f5', border: 'none', color: 'var(--text-dim)', padding: '8px', borderRadius: '10px', cursor: 'pointer' }}>
                <HiXMark style={{ fontSize: '20px' }} />
              </button>
            </header>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{ display: 'flex', gap: '12px', background: '#f8f8f8', padding: '6px', borderRadius: '14px', border: '1px solid #eee' }}>
                <button 
                  type="button"
                  onClick={() => setType('expense')}
                  style={{ 
                    flex: 1, 
                    padding: '12px', 
                    borderRadius: '10px', 
                    border: 'none',
                    background: type === 'expense' ? 'var(--primary)' : 'transparent',
                    color: type === 'expense' ? 'white' : 'var(--text-dim)',
                    fontWeight: 700,
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                  }}
                >
                  Gasto
                </button>
                <button 
                  type="button"
                  onClick={() => setType('income')}
                  style={{ 
                    flex: 1, 
                    padding: '12px', 
                    borderRadius: '10px', 
                    border: 'none',
                    background: type === 'income' ? 'var(--success)' : 'transparent',
                    color: type === 'income' ? 'white' : 'var(--text-dim)',
                    fontWeight: 700,
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                  }}
                >
                  Ingreso
                </button>
              </div>

              <div style={{ position: 'relative' }}>
                <input 
                  className="input-field" 
                  placeholder="¿En qué lo usaste?" 
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  required
                />
              </div>
              
              <div style={{ position: 'relative' }}>
                <input 
                  className="input-field" 
                  type="number" 
                  step="0.01"
                  placeholder="Monto ($0.00)" 
                  value={amount}
                  onChange={e => setAmount(e.target.value)}
                  required
                  style={{ fontSize: '28px', textAlign: 'center', fontWeight: '900', color: 'var(--primary)' }}
                />
              </div>

              <select 
                className="input-field"
                value={accountId}
                onChange={e => setAccountId(e.target.value)}
              >
                <option value="">Seleccionar Cuenta</option>
                {accounts.map(acc => (
                  <option key={acc.id} value={acc.id}>{acc.name} - {new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(acc.current_balance)}</option>
                ))}
              </select>

              <button type="submit" className="primary-button" disabled={isLoading} style={{ marginTop: '10px', height: '55px', fontSize: '18px' }}>
                {isLoading ? 'Guardando...' : 'Confirmar Registro'}
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default AddTransactionModal;
