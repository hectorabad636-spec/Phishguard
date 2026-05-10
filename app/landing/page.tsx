export default function Landing() {
  return (
    <div style={{
      minHeight: '100vh',
      background: '#0a0c0f',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'sans-serif',
      padding: '20px'
    }}>
      <div style={{
        maxWidth: '600px',
        width: '100%',
        background: '#0f1217',
        border: '1px solid rgba(255,255,255,0.07)',
        borderTop: '3px solid #ff4444',
        borderRadius: '12px',
        padding: '40px',
        textAlign: 'center'
      }}>
        <div style={{ fontSize: '60px', marginBottom: '20px' }}>⚠️</div>
        
        <h1 style={{
          fontSize: '24px',
          fontWeight: 700,
          color: '#ff4444',
          marginBottom: '16px'
        }}>
          Esto era una simulación de phishing
        </h1>

        <p style={{
          fontSize: '15px',
          color: '#8890a0',
          lineHeight: 1.6,
          marginBottom: '24px'
        }}>
          Has hecho clic en un enlace de un email de phishing simulado. 
          En un ataque real, esto podría haber comprometido tu cuenta o datos personales.
        </p>

        <div style={{
          background: '#141820',
          border: '1px solid rgba(255,255,255,0.07)',
          borderRadius: '8px',
          padding: '20px',
          marginBottom: '24px',
          textAlign: 'left'
        }}>
          <h2 style={{ fontSize: '14px', fontWeight: 600, color: '#e8eaf0', marginBottom: '12px' }}>
            ¿Cómo detectar un email de phishing?
          </h2>
          <ul style={{ fontSize: '13px', color: '#8890a0', lineHeight: 2, paddingLeft: '20px' }}>
            <li>Verifica siempre el dominio del remitente</li>
            <li>Desconfía de mensajes con urgencia extrema</li>
            <li>No hagas clic en enlaces sin verificar la URL</li>
            <li>Las empresas legítimas nunca piden contraseñas por email</li>
            <li>Reporta emails sospechosos a tu equipo de IT</li>
          </ul>
        </div>

        <div style={{
          display: 'flex',
          gap: '12px',
          justifyContent: 'center'
        }}>
          <div style={{
            padding: '10px 20px',
            background: 'rgba(0,255,135,0.08)',
            border: '1px solid rgba(0,255,135,0.2)',
            borderRadius: '8px',
            fontSize: '13px',
            color: '#00ff87'
          }}>
            ✓ Formación completada
          </div>
        </div>
      </div>
    </div>
  )
}