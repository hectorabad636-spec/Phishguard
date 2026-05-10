'use client'

import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer
} from 'recharts'

const monthlyData = [
  { mes: 'Ene', enviados: 120, clicks: 45, reportados: 18 },
  { mes: 'Feb', enviados: 180, clicks: 82, reportados: 30 },
  { mes: 'Mar', enviados: 95, clicks: 28, reportados: 40 },
  { mes: 'Abr', enviados: 210, clicks: 95, reportados: 55 },
  { mes: 'May', enviados: 160, clicks: 52, reportados: 70 },
  { mes: 'Jun', enviados: 240, clicks: 110, reportados: 65 },
]

const riskData = [
  { depto: 'RRHH', riesgo: 72 },
  { depto: 'Ventas', riesgo: 58 },
  { depto: 'IT', riesgo: 12 },
  { depto: 'Legal', riesgo: 45 },
  { depto: 'Finanzas', riesgo: 63 },
]
const CustomTooltip = ({ active, payload, label }: { active?: boolean, payload?: {name: string, value: number, color: string}[], label?: string }) => {
  if (active && payload && payload.length) {
    return (
      <div style={{
        background: '#141820',
        border: '1px solid #1c2230',
        borderRadius: '8px',
        padding: '10px 14px',
        fontSize: '12px',
        fontFamily: 'monospace'
      }}>
        <div style={{ color: '#8890a0', marginBottom: '6px' }}>{label}</div>
        {payload.map((p) => (
          <div key={p.name} style={{ color: p.color, marginBottom: '2px' }}>
            {p.name}: {p.value}
          </div>
        ))}
      </div>
    )
  }
  return null
}

export default function CampaignChart() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '24px' }}>

      <div style={{
        background: '#0f1217',
        border: '1px solid #1c2230',
        borderRadius: '12px',
        padding: '20px'
      }}>
        <div style={{ fontSize: '13px', fontWeight: 600, color: '#e8eaf0', marginBottom: '4px' }}>
          Actividad mensual
        </div>
        <div style={{ fontFamily: 'monospace', fontSize: '10px', color: '#4a5060', marginBottom: '16px' }}>
          Enviados · Clicks · Reportados
        </div>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={monthlyData} barSize={8} barGap={2}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1c2230" />
            <XAxis dataKey="mes" tick={{ fill: '#4a5060', fontSize: 11 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: '#4a5060', fontSize: 11 }} axisLine={false} tickLine={false} />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="enviados" fill="#4488ff" opacity={0.5} radius={[3,3,0,0]} name="Enviados" />
            <Bar dataKey="clicks" fill="#ff4444" radius={[3,3,0,0]} name="Clicks" />
            <Bar dataKey="reportados" fill="#00ff87" radius={[3,3,0,0]} name="Reportados" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div style={{
        background: '#0f1217',
        border: '1px solid #1c2230',
        borderRadius: '12px',
        padding: '20px'
      }}>
        <div style={{ fontSize: '13px', fontWeight: 600, color: '#e8eaf0', marginBottom: '4px' }}>
          Riesgo por departamento
        </div>
        <div style={{ fontFamily: 'monospace', fontSize: '10px', color: '#4a5060', marginBottom: '16px' }}>
          Puntuación de vulnerabilidad 0-100
        </div>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={riskData} layout="vertical" barSize={12}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1c2230" horizontal={false} />
            <XAxis type="number" tick={{ fill: '#4a5060', fontSize: 11 }} axisLine={false} tickLine={false} domain={[0, 100]} />
            <YAxis dataKey="depto" type="category" tick={{ fill: '#8890a0', fontSize: 11 }} axisLine={false} tickLine={false} width={60} />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="riesgo" radius={[0,3,3,0]} name="Riesgo" fill="#ff4444"
              background={{ fill: '#1c2230' }}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

    </div>
  )
}