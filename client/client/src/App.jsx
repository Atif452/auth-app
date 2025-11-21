import React, { useState } from 'react';
import { Loader2 } from 'lucide-react';
import './App.css';

export default function App() {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  const handleAuth = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    const endpoint = isLogin 
      ? 'http://localhost:8081/login' 
      : 'http://localhost:8081/register';

    const payload = isLogin 
      ? { email, password } 
      : { name, email, password };

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await response.json();
      setIsLoading(false);

      if (data.Status === "Success") {
        if (isLogin) {
          setCurrentUser(data.User);
        } else {
          alert("Account created successfully! Please log in now.");
          setIsLogin(true); 
          setError('');
        }
      } else {
        setError(data.Error || "Authentication failed");
      }

    } catch (err) {
      setIsLoading(false);
      console.error(err);
      setError("Server not responding. Make sure 'node server.js' is running.");
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setEmail('');
    setPassword('');
    setName('');
    setError('');
  };

  if (currentUser) {
    return (
      <div className="app-container">
        <div className="card welcome-card">
          <h1>Welcome, {currentUser.name}!</h1>
          <p>You are logged in as {currentUser.email}</p>
          <button onClick={handleLogout} className="btn logout-btn">Logout</button>
        </div>
      </div>
    );
  }

  return (
    <div className="app-container">
      <div className="card">
        
        <div className="header">
          <h2>{isLogin ? 'Authorization' : 'Create New Account'}</h2>
        </div>

        <form onSubmit={handleAuth}>
          {!isLogin && (
            <div className="input-group">
              <input 
                type="text" 
                placeholder="Full Name" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                required={!isLogin}
              />
            </div>
          )}

          <div className="input-group">
            <input 
              type="email" 
              placeholder="Email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <input 
              type="password" 
              placeholder="Password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {error && <div className="error-msg">{error}</div>}

          <button type="submit" className="btn" disabled={isLoading}>
            {isLoading ? (
              <Loader2 className="spin" size={20} />
            ) : (
              isLogin ? 'Sign In' : 'Sign Up'
            )}
          </button>
        </form>

        <div className="footer">
          <p>
            {isLogin ? "Don't have account? " : "Have account? "}
            <button 
              type="button" 
              className="link-btn" 
              onClick={() => {
                setIsLogin(!isLogin);
                setError('');
              }}
            >
              {isLogin ? 'SignUp' : 'Login'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}