from fastapi import APIRouter, Depends
from fastapi.responses import FileResponse
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.core.security import require_admin
from app.models.campaign import Campaign
from app.models.email_event import EmailEvent
from reportlab.lib.pagesizes import A4
from reportlab.lib import colors
from reportlab.platypus import SimpleDocTemplate, Table, TableStyle, Paragraph, Spacer
from reportlab.lib.styles import getSampleStyleSheet
import tempfile
import os

router = APIRouter(prefix="/reports", tags=["reports"])

@router.get("/campaigns/{id}/pdf")
def export_campaign_pdf(id: int, db: Session = Depends(get_db), current_user = Depends(require_admin)):
    campaign = db.query(Campaign).filter(Campaign.id == id).first()
    if not campaign:
        from fastapi import HTTPException
        raise HTTPException(status_code=404, detail="Campaña no encontrada")

    events = db.query(EmailEvent).filter(EmailEvent.campaign_id == id).all()
    clicks = [e for e in events if e.event_type == "click"]
    opens = [e for e in events if e.event_type == "open"]

    tmp = tempfile.NamedTemporaryFile(delete=False, suffix=".pdf")
    doc = SimpleDocTemplate(tmp.name, pagesize=A4)
    styles = getSampleStyleSheet()
    elements = []

    elements.append(Paragraph(f"Reporte de Campaña: {campaign.name}", styles['Title']))
    elements.append(Spacer(1, 20))

    summary_data = [
        ["Métrica", "Valor"],
        ["Template", campaign.template],
        ["Estado", campaign.status],
        ["Total clicks", str(len(clicks))],
        ["Total aperturas", str(len(opens))],
        ["Click rate", f"{round(len(clicks) / max(len(events), 1) * 100)}%"],
    ]

    table = Table(summary_data, colWidths=[200, 200])
    table.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), colors.HexColor('#0a0c0f')),
        ('TEXTCOLOR', (0, 0), (-1, 0), colors.white),
        ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
        ('FONTSIZE', (0, 0), (-1, -1), 10),
        ('ROWBACKGROUNDS', (0, 1), (-1, -1), [colors.white, colors.HexColor('#f5f5f5')]),
        ('GRID', (0, 0), (-1, -1), 0.5, colors.grey),
        ('PADDING', (0, 0), (-1, -1), 8),
    ]))
    elements.append(table)
    elements.append(Spacer(1, 20))

    if clicks:
        elements.append(Paragraph("Usuarios que hicieron clic", styles['Heading2']))
        elements.append(Spacer(1, 10))
        click_data = [["Email", "IP", "Navegador", "Fecha"]]
        for c in clicks:
            click_data.append([
                c.user_email,
                c.ip_address or "N/A",
                (c.user_agent or "N/A")[:30],
                str(c.created_at)[:19] if c.created_at else "N/A"
            ])
        click_table = Table(click_data, colWidths=[150, 80, 150, 120])
        click_table.setStyle(TableStyle([
            ('BACKGROUND', (0, 0), (-1, 0), colors.HexColor('#0a0c0f')),
            ('TEXTCOLOR', (0, 0), (-1, 0), colors.white),
            ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
            ('FONTSIZE', (0, 0), (-1, -1), 8),
            ('GRID', (0, 0), (-1, -1), 0.5, colors.grey),
            ('PADDING', (0, 0), (-1, -1), 6),
        ]))
        elements.append(click_table)

    doc.build(elements)

    return FileResponse(
        tmp.name,
        media_type="application/pdf",
        filename=f"reporte_{campaign.name}.pdf"
    )