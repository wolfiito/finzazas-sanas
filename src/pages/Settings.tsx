import React from 'react';
import { motion } from 'framer-motion';
import { HiSun, HiMoon, HiComputerDesktop, HiInformationCircle, HiCog6Tooth } from 'react-icons/hi2';

const Settings: React.FC = () => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      style={{ display: 'flex', flexDirection: 'column', gap: '20px', paddingBottom: '100px' }}
    >
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ fontSize: '30px', fontWeight: 900, color: '#1a202c', margin: 0 }}>Ajustes</h1>
          <p style={{ color: 'var(--text-dim)', fontSize: '15px', fontWeight: 500 }}>Personaliza tu experiencia</p>
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
          <HiCog6Tooth />
        </div>
      </header>

      <style>{`
        .settings-section {
          background: white;
          padding: 25px;
          border-radius: 24px;
          border: 1px solid #f0f0f0;
          box-shadow: 0 4px 15px rgba(0,0,0,0.02);
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        .segmented-control {
          background: #f1f2f6;
          padding: 5px;
          border-radius: 16px;
          display: flex;
          gap: 5px;
        }
        .segment-btn {
          flex: 1;
          padding: 12px;
          border: none;
          background: transparent;
          border-radius: 12px;
          font-size: 13px;
          font-weight: 800;
          color: var(--text-dim);
          cursor: pointer;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 5px;
        }
        .segment-btn.active {
          background: var(--primary);
          color: white;
          box-shadow: 0 4px 10px rgba(255, 94, 145, 0.3);
        }
        .info-box {
          background: #f3f9ff;
          padding: 15px;
          border-radius: 16px;
          display: flex;
          gap: 12px;
          border: 1px solid #e1f0ff;
        }
      `}</style>

      <section className="settings-section">
        <h3 style={{ fontSize: '17px', fontWeight: 800, color: '#1a202c', margin: 0 }}>Apariencia</h3>
        <div className="segmented-control">
          <button className="segment-btn active">
            Claro
            <HiSun style={{ fontSize: '18px' }} />
          </button>
          <button className="segment-btn">
            Oscuro
            <HiMoon style={{ fontSize: '18px' }} />
          </button>
          <button className="segment-btn">
            Sistema
            <HiComputerDesktop style={{ fontSize: '18px' }} />
          </button>
        </div>
      </section>

      <section className="settings-section">
        <h3 style={{ fontSize: '17px', fontWeight: 800, color: '#1a202c', margin: 0 }}>Cuenta Maestra</h3>
        <div>
          <label style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-dim)', display: 'block', marginBottom: '8px' }}>Restablecer Saldo Inicial</label>
          <input 
            type="text" 
            defaultValue="10000.00" 
            style={{ 
              width: '100%', 
              padding: '15px', 
              borderRadius: '14px', 
              border: '1px solid #eee', 
              background: '#fcfcfc',
              fontSize: '15px',
              fontFamily: 'monospace',
              color: 'var(--text-dim)'
            }} 
          />
        </div>

        <div className="info-box">
          <HiInformationCircle style={{ fontSize: '24px', color: '#0984e3' }} />
          <p style={{ fontSize: '12px', lineHeight: 1.5, color: '#2d3436', fontWeight: 600, margin: 0 }}>
            <span style={{ fontWeight: 900 }}>Aviso:</span> Esto borrará el historial y establecerá un nuevo punto de partida.
          </p>
        </div>

        <button className="primary-button" style={{ background: '#dfe6e9', color: '#636e72', boxShadow: 'none' }}>
          Actualizar Saldo
        </button>
      </section>

      <p style={{ textAlign: 'center', fontSize: '12px', color: 'var(--text-dim)', fontWeight: 600, marginTop: '20px' }}>
        Healthy Finances V2 - Beta
      </p>
    </motion.div>
  );
};

export default Settings;
