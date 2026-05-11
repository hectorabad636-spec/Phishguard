'use client'

import Sidebar from '@/components/layout/Sidebar'
import { useState } from 'react'

const templates = [
  {
    id: 'ms365',
    name: 'Microsoft 365',
    category: 'Corporativo',
    difficulty: 'Alto',
    description: 'Email falso de expiración de cuenta Microsoft 365',
    color: '#0078d4',
    subject: 'Tu cuenta de Microsoft 365 expirará hoy',
    preview: `Estimado usuario,

Tu cuenta de Microsoft 365 expirará en las próximas 24 horas.
Para evitar la pérdida de acceso, verifica tu cuenta ahora.

[Verificar cuenta]

Microsoft Support Team`
  },
  {
    id: 'google',
    name: 'Google Drive',
    category: 'Corporativo',
    difficulty: 'Medio',
    description: 'Notificación falsa de archivo compartido en Google Drive',
    color: '#4285f4',
    subject: 'Alguien ha compartido un archivo contigo',
    preview: `Hola,

John Smith ha compartido un documento contigo:

"Informe Q4 2026 - Confidencial"

[Abrir en Google Drive]

Google Drive`
  },
  {
    id: 'dhl',
    name: 'DHL Express',
    category: 'Paquetería',
    difficulty: 'Medio',
    description: 'Email falso de paquete pendiente de entrega',
    color: '#ffcc00',
    subject: 'Tu paquete está pendiente de entrega',
    preview: `Estimado cliente,

Tu paquete #DHL8472910 está pendiente de entrega.
Se requiere confirmación de dirección para proceder.

[Confirmar dirección]

DHL Express`
  },
  {
    id: 'bank',
    name: 'Banco Simulado',
    category: 'Financiero',
    difficulty: 'Alto',
    description: 'Alerta falsa de actividad sospechosa en cuenta bancaria',
    color: '#00ff87',
    subject: 'Actividad sospechosa detectada en tu cuenta',
    preview: `Estimado cliente,

Hemos detectado actividad inusual en tu cuenta.
Por seguridad, tu cuenta ha sido temporalmente bloqueada.

[Desbloquear cuenta]

Servicio de Seguridad`
  },
]

export default function Templates() {
  const [selected, setSelected] = useState<string | null>(null)
  const [search, setSearch] = useState('')

  const filtered = templates.filter(t =>
    t.name.toLowerCase().includes(search.toLowerCase()) ||
    t.category.toLowerCase().includes(search.toLowerCase())
  )

  const selectedTemplate = templates.find(t => t.id === selected)

  return (
    <div style={{ display: 'flex' }}>
      <Sidebar />
      <main style={{ marginLeft: '220px', flex: 1, minHeight: '100vh' }}>

        <header style={{
          padding: '0 28px', height: '60px',
          borderBottom: '1px solid var(--border)',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          position: 'sticky', top: 0, background: 'var(--bg)', zIndex: 50,
        }}>
          <div>
            <div style={{ fontSize: '16px', fontWeight: 700 }}>Templates</div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--text3)' }}>PLANTILLAS DE PHISHING SIMULADO</div>
          </div>
          <input
            placeholder="Buscar template..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{
              padding: '8px 14px', borderRadius: '8px',
              border: '1px solid var(--border2)', background: 'var(--bg3)',
              color: 'var(--text)', fontSize: '12px', outline: 'none', width: '200px'
            }}
          />
        </header>

        <div style={{ padding: '28px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>

          {/* Lista de templates */}
          <div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--text3)', marginBottom: '12px', textTransform: 'uppercase' }}>
              {filtered.length} templates disponibles
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {filtered.map(t => (
                <div
                  key={t.id}
                  onClick={() => setSelected(t.id)}
                  style={{
                    background: selected === t.id ? 'var(--bg3)' : 'var(--bg2)',
                    border: `1px solid ${selected === t.id ? t.color : 'var(--border)'}`,
                    borderRadius: '10px', padding: '16px',
                    cursor: 'pointer', transition: 'all 0.15s'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                    <div style={{
                      width: '36px', height: '36px', borderRadius: '8px',
                      background: t.color + '20', border: `1px solid ${t.color}40`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: '16px'
                    }}>
                      {t.id === 'ms365' ? '🪟' : t.id === 'google' ? '🔵' : t.id === 'dhl' ? '📦' : '🏦'}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text)' }}>{t.name}</div>
                      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--text3)' }}>{t.category}</div>
                    </div>
                    <span style={{
                      fontFamily: 'var(--font-mono)', fontSize: '10px',
                      padding: '2px 8px', borderRadius: '4px',
                      background: t.difficulty === 'Alto' ? 'var(--red-dim)' : 'var(--amber-dim)',
                      color: t.difficulty === 'Alto' ? 'var(--red)' : 'var(--amber)'
                    }}>{t.difficulty}</span>
                  </div>
                  <div style={{ fontSize: '12px', color: 'var(--text2)' }}>{t.description}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Preview del template */}
          <div>
            {selectedTemplate ? (
              <div style={{ background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: '12px', overflow: 'hidden' }}>
                <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ fontSize: '13px', fontWeight: 600 }}>Preview del email</div>
                  <button style={{
                    padding: '7px 14px', borderRadius: '6px',
                    border: 'none', background: 'var(--accent)',
                    color: '#000', fontSize: '11px', fontWeight: 700, cursor: 'pointer'
                  }}>
                    Usar en campaña →
                  </button>
                </div>
                <div style={{ padding: '20px' }}>
                  <div style={{ marginBottom: '16px' }}>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--text3)', marginBottom: '4px' }}>ASUNTO</div>
                    <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text)' }}>{selectedTemplate.subject}</div>
                  </div>
                  <div style={{
                    background: 'var(--bg3)', border: '1px solid var(--border)',
                    borderRadius: '8px', padding: '16px',
                    fontFamily: 'monospace', fontSize: '12px',
                    color: 'var(--text2)', lineHeight: 1.8,
                    whiteSpace: 'pre-wrap'
                  }}>
                    {selectedTemplate.preview}
                  </div>
                  <div style={{ marginTop: '16px', display: 'flex', gap: '8px' }}>
                    <span style={{
                      fontFamily: 'var(--font-mono)', fontSize: '10px',
                      padding: '3px 8px', borderRadius: '4px',
                      background: 'var(--accent-dim)', color: 'var(--accent)'
                    }}>Pixel tracking incluido</span>
                    <span style={{
                      fontFamily: 'var(--font-mono)', fontSize: '10px',
                      padding: '3px 8px', borderRadius: '4px',
                      background: 'var(--blue-dim)', color: 'var(--blue)'
                    }}>Link tracking incluido</span>
                  </div>
                </div>
              </div>
            ) : (
              <div style={{
                background: 'var(--bg2)', border: '1px solid var(--border)',
                borderRadius: '12px', padding: '40px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: 'var(--text3)', fontFamily: 'var(--font-mono)', fontSize: '12px',
                height: '300px'
              }}>
                Selecciona un template para ver el preview
              </div>
            )}
          </div>

        </div>
      </main>
    </div>
  )
}