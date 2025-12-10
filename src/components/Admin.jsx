import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';

const Admin = ({ clients, setClients }) => {
    const navigate = useNavigate();
    const [password, setPassword] = useState('');
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const handleLogin = (e) => {
        e.preventDefault();
        if (password === 'mindlight2024') {
            setIsAuthenticated(true);
        } else {
            alert('Incorrect password');
        }
    };

    if (!isAuthenticated) {
        return (
            <div style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', background: '#1a1a1a', color: 'white' }}>
                <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <h2>Admin Login</h2>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        style={{ padding: '0.5rem' }}
                    />
                    <button type="submit" style={{ padding: '0.5rem', background: '#D4C5A9', border: 'none', cursor: 'pointer' }}>Login</button>
                    <button type="button" onClick={() => navigate('/')} style={{ background: 'transparent', color: '#888', border: 'none', marginTop: '1rem', cursor: 'pointer' }}>Back to Map</button>
                </form>
            </div>
        );
    }

    return (
        <div style={{ padding: '2rem', background: '#1a1a1a', minHeight: '100vh', color: 'white' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h1>Admin Panel</h1>
                <button onClick={() => navigate('/')} style={{ padding: '0.5rem 1rem', background: '#D4C5A9', border: 'none', cursor: 'pointer' }}>Back to Map</button>
            </div>

            <div style={{ display: 'grid', gap: '1rem' }}>
                {clients.map(client => (
                    <div key={client.id} style={{ padding: '1rem', background: '#2a2a2a', borderRadius: '8px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <img src={client.logoUrl} alt={client.name} style={{ width: '40px', height: '40px', objectFit: 'contain' }} />
                            <h3>{client.name}</h3>
                        </div>
                        <p style={{ color: '#888', fontSize: '0.9rem' }}>{client.location}</p>
                    </div>
                ))}
            </div>
            <p style={{ marginTop: '2rem', color: '#888' }}>* Note: Edits made here are local only. Update the Google Sheet for permanent changes.</p>
        </div>
    );
};

export default Admin;
