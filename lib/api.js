const API_URL = 'http://localhost:8000'

export async function getCampaigns() {
  const res = await fetch(`${API_URL}/campaigns/`)
  if (!res.ok) throw new Error('Error al obtener campañas')
  return res.json()
}

export async function createCampaign(data) {
  const res = await fetch(`${API_URL}/campaigns/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })
  if (!res.ok) throw new Error('Error al crear campaña')
  return res.json()
}

export async function login(email, password) {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  })
  if (!res.ok) throw new Error('Credenciales incorrectas')
  return res.json()
}