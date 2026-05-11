from celery import Celery
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

celery_app = Celery(
    "phishguard",
    broker="redis://localhost:6379/0",
    backend="redis://localhost:6379/0"
)

@celery_app.task
def send_phishing_email(
    recipient_email: str,
    campaign_id: int,
    template: str,
    tracking_base_url: str = "http://localhost:8000"
):
    tracking_link = f"{tracking_base_url}/track/click/{campaign_id}/{recipient_email}"
    pixel_url = f"{tracking_base_url}/track/open/{campaign_id}/{recipient_email}"

    templates = {
        "MS365": {
            "subject": "Tu cuenta de Microsoft 365 expirará hoy",
            "body": f"""
            <html><body>
            <img src="{pixel_url}" width="1" height="1"/>
            <h2>Microsoft 365</h2>
            <p>Tu cuenta expirará en 24 horas.</p>
            <a href="{tracking_link}">Verificar cuenta</a>
            </body></html>
            """
        },
        "GOOGLE": {
            "subject": "Alguien ha compartido un archivo contigo",
            "body": f"""
            <html><body>
            <img src="{pixel_url}" width="1" height="1"/>
            <h2>Google Drive</h2>
            <p>Se ha compartido un documento contigo.</p>
            <a href="{tracking_link}">Abrir en Drive</a>
            </body></html>
            """
        },
        "DHL": {
            "subject": "Tu paquete está pendiente de entrega",
            "body": f"""
            <html><body>
            <img src="{pixel_url}" width="1" height="1"/>
            <h2>DHL Express</h2>
            <p>Tu paquete está pendiente. Confirma tu dirección.</p>
            <a href="{tracking_link}">Confirmar dirección</a>
            </body></html>
            """
        }
    }

    email_data = templates.get(template, templates["MS365"])

    print(f"[CELERY] Enviando email a {recipient_email}")
    print(f"[CELERY] Asunto: {email_data['subject']}")
    print(f"[CELERY] Link de tracking: {tracking_link}")

    return {
        "status": "sent",
        "recipient": recipient_email,
        "campaign_id": campaign_id,
        "template": template
    }