'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { login } from '@/lib/api'

export default function Login() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleLogin = async () => {
    setLoading(true)
    setError('')
    try {
      const data = await login(email, password)
      localStorage.setItem('token', data.access_token)
      router.push('/')
    } catch (e) {
      setError('Email o contraseña incorrectos')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: '#0a0c0f',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'sans-serif'
    }}>
      <div style={{
        width: '380px',
        background: '#0f1217',
        border: '1px solid rgba(255,255,255,0.07)',
        borderTop: '2px solid #00ff87',
        borderRadius: '12px',
        padding: '36px'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
          <div style={{
            width: '40px', height: '40px',
            background: '#00ff87',
            borderRadius: '8px',
            display: 'flex', alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 12px',
            fontSize: '20px'
          }}>🛡</div>
          <div style={{ fontSize: '20px', fontWeight: 700, color: '#e8eaf0' }}>PhishGuard</div>
          <div style={{ fontSize: '12px', color: '#4a5060', marginTop: '4px', fontFamily: 'monospace' }}>SECURITY TRAINING PLATFORM</div>
        </div>

        <div style={{ marginBottom: '16px' }}>
          <label style={{ fontSize: '12px', color: '#8890a0', display: 'block', marginBottom: '6px' }}>EMAIL</label>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="admin@phishguard.com"
            style={{
              width: '100%',
              padding: '10px 12px',
              background: '#141820',
              border: '1px solid rgba(255,255,255,0.07)',
              borderRadius: '8px',
              color: '#e8eaf0',
              fontSize: '13px',
              outline: 'none',
              boxSizing: 'border-box'
            }}
          />
        </div>

        <div style={{ marginBottom: '24px' }}>
          <label style={{ fontSize: '12px', color: '#8890a0', display: 'block', marginBottom: '6px' }}>CONTRASEÑA</label>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="••••••••"
            style={{
              width: '100%',
              padding: '10px 12px',
              background: '#141820',
              border: '1px solid rgba(255,255,255,0.07)',
              borderRadius: '8px',
              color: '#e8eaf0',
              fontSize: '13px',
              outline: 'none',
              boxSizing: 'border-box'
            }}
          />
        </div>

        {error && (
          <div style={{
            padding: '10px 12px',
            background: 'rgba(255,68,68,0.1)',
            border: '1px solid rgba(255,68,68,0.2)',
            borderRadius: '8px',
            fontSize: '12px',
            color: '#ff4444',
            marginBottom: '16px'
          }}>{error}</div>
        )}

        <button
          onClick={handleLogin}
          disabled={loading}
          style={{
            width: '100%',
            padding: '12px',
            background: '#00ff87',
            border: 'none',
            borderRadius: '8px',
            color: '#000',
            fontSize: '13px',
            fontWeight: 700,
            cursor: 'pointer'
          }}
        >
          {loading ? 'Entrando...' : 'Iniciar sesión'}
        </button>
      </div>
    </div>
  )
}