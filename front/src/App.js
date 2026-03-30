import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [dbStatus, setDbStatus] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_URL = process.env.REACT_APP_API_URL || 'https://flask-render-iac-reezemvp.onrender.com';

  useEffect(() => {
    fetch(API_URL + '/db')
      .then(res => res.json())
      .then(data => {
        setDbStatus(data.database_url_set);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, [API_URL]);

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'sans-serif',
      backgroundColor: '#1a1a2e',
      color: '#eee'
    }}>
      <h1>🖥️ Front React — Atelier Render</h1>
      <h2>Statut de la base de données</h2>

      {loading && <p>Chargement...</p>}
      {error && <p style={{ color: '#ff6b6b' }}>Erreur : {error}</p>}

      {!loading && !error && (
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '15px',
          padding: '20px 40px',
          borderRadius: '12px',
          backgroundColor: '#16213e',
          marginTop: '20px',
          fontSize: '1.2rem'
        }}>
          <span style={{
            width: '20px',
            height: '20px',
            borderRadius: '50%',
            backgroundColor: dbStatus ? '#00e676' : '#ff1744',
            display: 'inline-block',
            boxShadow: dbStatus
              ? '0 0 12px #00e676'
              : '0 0 12px #ff1744'
          }} />
          <span>
            PostgreSQL : {dbStatus ? 'Connectée ✅' : 'Déconnectée ❌'}
          </span>
        </div>
      )}

      <p style={{ marginTop: '30px', color: '#888', fontSize: '0.85rem' }}>
        Backend : {API_URL}
      </p>
    </div>
  );
}

export default App;