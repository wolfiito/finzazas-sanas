import React from 'react';
import Sidebar from './Sidebar';
import BottomNav from './BottomNav';
import AddTransactionModal from '../AddTransactionModal';
import { useUIStore } from '../../store/uiStore';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAddTransactionModalOpen, closeAddTransactionModal } = useUIStore();

  return (
    <div style={{ display: 'flex', minHeight: '100vh', width: '100%' }}>
      <Sidebar />
      <main className="main-content">
        <div style={{ position: 'relative', zIndex: 1, maxWidth: '1400px', margin: '0 auto', width: '100%' }}>
          {children}
        </div>
      </main>
      
      {/* Mobile-only Nav */}
      <div className="mobile-nav">
        <BottomNav />
      </div>

      <AddTransactionModal 
        isOpen={isAddTransactionModalOpen} 
        onClose={closeAddTransactionModal} 
        onSuccess={() => window.location.reload()} // Simple refresh for now or we could use event bus
      />

      <style>{`
        @media (min-width: 768px) {
          .mobile-nav { display: none; }
        }
      `}</style>
    </div>
  );
};

export default Layout;
