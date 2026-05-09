'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navItems = [
  { label: 'Dashboard', href: '/', icon: '▦' },
  { label: 'Campañas', href: '/campaigns', icon: '✉', badge: '3' },
  { label: 'Usuarios', href: '/users', icon: '◎' },
  { label: 'Templates', href: '/templates', icon: '▣' },
  { label: 'Estadísticas', href: '/stats', icon: '▲' },
  { label: 'Reportes PDF', href: '/reports', icon: '▤' },
]

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <aside style={{
      width: '220px',
      minHeight: '100vh',
      background: 'var(--bg2)',
      borderRight: '1px solid var(--border)',
      display: 'flex',
      flexDirection: 'column',
      position: 'fixed',
      top: 0, left: 0, bottom: 0,
    }}>
      {/* Logo */}
      <div style={{ padding: '24px 20px', borderBottom: '1px solid var(--border)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{
            width: '32px', height: '32px',
            background: 'var(--accent)',
            borderRadius: '6px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '16px'
          }}>🛡</div>
          <div>
            <div style={{ fontSize: '16px', fontWeight: 700 }}>PhishGuard</div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: 'var(--text3)', letterSpacing: '0.1em' }}>SECURITY TRAINING</div>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav style={{ padding: '16px 12px', flex: 1 }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: 'var(--text3)', letterSpacing: '0.12em', textTransform: 'uppercase', padding: '0 8px', marginBottom: '8px' }}>Principal</div>
        {navItems.map((item) => {
          const active = pathname === item.href
          return (
            <Link key={item.href} href={item.href} style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              padding: '9px 10px',
              borderRadius: '8px',
              fontSize: '13px',
              fontWeight: 500,
              color: active ? 'var(--accent)' : 'var(--text2)',
              background: active ? 'var(--accent-dim)' : 'transparent',
              border: active ? '1px solid rgba(0,255,135,0.15)' : '1px solid transparent',
              marginBottom: '2px',
              textDecoration: 'none',
              transition: 'all 0.15s',
            }}>
              <span>{item.icon}</span>
              {item.label}
              {item.badge && (
                <span style={{
                  marginLeft: 'auto',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '10px',
                  background: 'var(--red-dim)',
                  color: 'var(--red)',
                  padding: '1px 6px',
                  borderRadius: '10px',
                }}>{item.badge}</span>
              )}
            </Link>
          )
        })}
      </nav>

      {/* User */}
      <div style={{ padding: '16px 12px', borderTop: '1px solid var(--border)' }}>
        <div style={{
          display: 'flex', alignItems: 'center', gap: '10px',
          padding: '10px', borderRadius: '8px',
          background: 'var(--bg3)', border: '1px solid var(--border)'
        }}>
          <div style={{
            width: '30px', height: '30px', borderRadius: '50%',
            background: 'var(--accent-dim)', border: '1px solid var(--accent)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--accent)'
          }}>AD</div>
          <div>
            <div style={{ fontSize: '12px', fontWeight: 600 }}>Admin</div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--text3)' }}>Superadmin</div>
          </div>
        </div>
      </div>
    </aside>
  )
}