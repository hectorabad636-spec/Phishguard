'use client'

import Sidebar from '@/components/layout/Sidebar'
import CampaignChart from '@/components/dashboard/CampaignChart'
import { useEffect, useState } from 'react'

const stats = [
  { label: 'Campañas activas', value: '3', change: '↑ 1 esta semana', color: 'var(--accent)', borderColor: 'var(--accent)' },
  { label: 'Tasa de click', value: '34%', change: '↑ 8% vs mes anterior', color: 'var(--red)', borderColor: 'var(--red)' },
  { label: 'Usuarios en riesgo', value: '47', change: 'De 138 totales', color: 'var(--amber)', borderColor: 'var(--amber)' },
  { label: 'Emails enviados', value: '891', change: '↑ 214 este mes', color: 'var(--blue)', borderColor: 'var(--blue)' },
]

const activity = [
  { user: 'j.garcia@empresa.com', action: 'cayó', campaign: 'Microsoft 365', browser: 'Chrome', location: 'Madrid', time: '2m', type: 'click' },
  { user: 'm.lopez@empresa.com', action: 'reportó', campaign: 'DHL Falso', browser: 'Firefox', location: '', time: '5m', type: 'report' },
  { user: 'a.martin@empresa.com', action: 'abrió', campaign: 'Google Drive', browser: 'Mobile', location: '', time: '12m', type: 'open' },
  { user: 'r.sanchez@empresa.com', action: 'cayó', campaign: 'Microsoft 365', browser: 'Edge', location: 'BCN', time: '18m', type: 'click' },
]

const campaigns = [
  { name: 'Microsoft 365 — Expiración', template: 'MS365', sent: 142, rate: 34, reported: 12, status: 'Activa', date: 'Hoy' },
  { name: 'DHL — Paquete pendiente', template: 'DHL', sent: 98, rate: 21, reported: 28, status: 'Pausada', date: 'Hace 3d' },
  { name: 'Google Drive — Archivo compartido', template: 'GOOGLE', sent: 75, rate: 8, reported: 41, status: 'Completada', date: 'Hace 1sem' },
]

export default function Dashboard() {
  const [liveEvents, setLiveEvents] = useState(activity)

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8000/ws')

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data)
      setLiveEvents(prev => [{
        user: data.email,
        action: 'cayó',
        campaign: `Campaña ${data.campaign_id}`,
        browser: 'Chrome',
        location: data.ip,
        time: 'ahora',
        type: 'click'
      }, ...prev.slice(0, 3)])
    }

    return () => ws.close()
  }, [])

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
            <div style={{ fontSize: '16px', fontWeight: 700 }}>Dashboard</div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--text3)' }}>ÚLTIMA ACTUALIZACIÓN: HACE 30s</div>
          </div>
          <div style={{ display: 'flex', gap: '12px' }}>
            <button style={{ padding: '8px 14px', borderRadius: '8px', border: '1px solid var(--border2)', background: 'transparent', color: 'var(--text2)', fontSize: '12px', fontWeight: 600, cursor: 'pointer' }}>
              Exportar PDF
            </button>
            <button style={{ padding: '8px 14px', borderRadius: '8px', border: 'none', background: 'var(--accent)', color: '#000', fontSize: '12px', fontWeight: 600, cursor: 'pointer' }}>
              + Nueva campaña
            </button>
          </div>
        </header>

        <div style={{ padding: '28px' }}>

          <div style={{
            display: 'flex', alignItems: 'center', gap: '10px',
            padding: '10px 16px', background: 'var(--accent-dim)',
            border: '1px solid rgba(0,255,135,0.2)', borderRadius: '8px',
            marginBottom: '24px', fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--accent)'
          }}>
            <div style={{ width: '7px', height: '7px', borderRadius: '50%', background: 'var(--accent)', animation: 'pulse 2s infinite' }}/>
            CAMPAÑA ACTIVA — &quot;Microsoft 365 Phishing&quot; — 142 emails enviados · 23 clicks detectados en tiempo real
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '24px' }}>
            {stats.map((s) => (
              <div key={s.label} style={{
                background: 'var(--bg2)', border: '1px solid var(--border)',
                borderTop: `2px solid ${s.borderColor}`,
                borderRadius: '12px', padding: '20px'
              }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--text3)', textTransform: 'uppercase', marginBottom: '10px' }}>{s.label}</div>
                <div style={{ fontSize: '32px', fontWeight: 700, color: s.color, marginBottom: '6px' }}>{s.value}</div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text3)' }}>{s.change}</div>
              </div>
            ))}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '16px', marginBottom: '24px' }}>

            <div style={{ background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: '12px' }}>
              <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ fontSize: '13px', fontWeight: 600 }}>Actividad en tiempo real</div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--accent)' }}>● LIVE</div>
              </div>
              <div style={{ padding: '8px 16px' }}>
                {liveEvents.map((a, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 0', borderBottom: i < liveEvents.length - 1 ? '1px solid var(--border)' : 'none' }}>
                    <div style={{
                      width: '28px', height: '28px', borderRadius: '50%', flexShrink: 0,
                      display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px',
                      background: a.type === 'click' ? 'var(--red-dim)' : a.type === 'report' ? 'var(--accent-dim)' : 'var(--amber-dim)',
                    }}>
                      {a.type === 'click' ? '🔗' : a.type === 'report' ? '✓' : '👁'}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: '12px', fontWeight: 500 }}>{a.user} <span style={{ color: 'var(--text3)' }}>{a.action}</span></div>
                      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--text3)' }}>{a.campaign} · {a.browser} {a.location}</div>
                    </div>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--text3)' }}>{a.time}</div>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: '12px' }}>
              <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--border)' }}>
                <div style={{ fontSize: '13px', fontWeight: 600 }}>Resumen del mes</div>
              </div>
              <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {[
                  { label: 'Click rate promedio', value: '34%', color: 'var(--red)' },
                  { label: 'Usuarios formados', value: '91', color: 'var(--accent)' },
                  { label: 'Emails reportados', value: '81', color: 'var(--blue)' },
                  { label: 'Campañas completadas', value: '2', color: 'var(--amber)' },
                ].map((item) => (
                  <div key={item.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text3)' }}>{item.label}</div>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '14px', fontWeight: 600, color: item.color }}>{item.value}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <CampaignChart />

          {/* Campaigns table */}
          <div style={{ background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: '12px', overflow: 'hidden' }}>
            <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ fontSize: '13px', fontWeight: 600 }}>Campañas recientes</div>
              <button style={{ padding: '6px 12px', borderRadius: '6px', border: '1px solid var(--border2)', background: 'transparent', color: 'var(--text2)', fontSize: '11px', cursor: 'pointer' }}>Ver todas</button>
            </div>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
              <thead>
                <tr>
                  {['Campaña', 'Estado', 'Enviados', 'Click rate', 'Reportados', 'Fecha', ''].map((h) => (
                    <th key={h} style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--text3)', textTransform: 'uppercase', padding: '10px 16px', textAlign: 'left', borderBottom: '1px solid var(--border)', fontWeight: 400 }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {campaigns.map((c) => (
                  <tr key={c.name} style={{ borderBottom: '1px solid var(--border)', cursor: 'pointer' }}>
                    <td style={{ padding: '14px 16px' }}>
                      <div style={{ fontWeight: 600 }}>{c.name}</div>
                      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--text3)' }}>TEMPLATE: {c.template} · {c.sent} destinatarios</div>
                    </td>
                    <td style={{ padding: '14px 16px' }}>
                      <span style={{
                        padding: '3px 8px', borderRadius: '4px',
                        fontFamily: 'var(--font-mono)', fontSize: '10px', fontWeight: 500,
                        background: c.status === 'Activa' ? 'var(--accent-dim)' : c.status === 'Pausada' ? 'var(--amber-dim)' : 'var(--bg3)',
                        color: c.status === 'Activa' ? 'var(--accent)' : c.status === 'Pausada' ? 'var(--amber)' : 'var(--text3)',
                      }}>{c.status}</span>
                    </td>
                    <td style={{ padding: '14px 16px', fontFamily: 'var(--font-mono)', fontSize: '12px' }}>{c.sent}</td>
                    <td style={{ padding: '14px 16px' }}>
                      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', fontWeight: 500, color: c.rate > 25 ? 'var(--red)' : c.rate > 15 ? 'var(--amber)' : 'var(--accent)' }}>{c.rate}%</div>
                      <div style={{ height: '4px', background: 'var(--bg4)', borderRadius: '2px', marginTop: '4px', width: '80px' }}>
                        <div style={{ height: '100%', borderRadius: '2px', width: `${c.rate}%`, background: c.rate > 25 ? 'var(--red)' : c.rate > 15 ? 'var(--amber)' : 'var(--accent)' }}/>
                      </div>
                    </td>
                    <td style={{ padding: '14px 16px', fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--accent)' }}>{c.reported}</td>
                    <td style={{ padding: '14px 16px', fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text3)' }}>{c.date}</td>
                    <td style={{ padding: '14px 16px' }}>
                      <button style={{ padding: '5px 10px', borderRadius: '5px', border: '1px solid var(--border2)', background: 'transparent', color: 'var(--text2)', fontFamily: 'var(--font-mono)', fontSize: '10px', cursor: 'pointer' }}>Ver →</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>
      </main>
    </div>
  )
}