import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import type SMTPTransport from 'nodemailer/lib/smtp-transport';

export const runtime = 'nodejs';

export async function POST(request: Request) {
  const { name, email, phone, message, listing } = await request.json();

  if (!name || !email || !phone || !message) {
    return NextResponse.json(
      { error: 'Name, email, phone, and message are required' },
      { status: 400 }
    );
  }

  const port = Number(process.env.SMTP_PORT) || 465;
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port,
    secure: port === 465,
    auth: {
      type: 'LOGIN',
      user: 'kontakt-formular-cozy-cologne@zentrasoftware.com',
      pass: process.env.SMTP_PASSWORD,
    },
    tls: { rejectUnauthorized: false },
  } as SMTPTransport.Options);

  const subject = listing
    ? `Neue Anfrage: ${listing}`
    : 'Neue Kontaktanfrage — cozy! cologne';

  let text = `Name: ${name}\nE-Mail: ${email}\nTelefon: ${phone}\n`;
  if (listing) text += `Objekt: ${listing}\n`;
  text += `\nNachricht:\n${message}`;

  try {
    const info = await transporter.sendMail({
      from: 'kontakt-formular-cozy-cologne@zentrasoftware.com',
      to: 'a.cossmann@immobilien-pk.de',
      bcc: 'kontakt-formular-cozy-cologne@zentrasoftware.com',
      replyTo: `${name} <${email}>`,
      subject,
      text,
    });
    console.log('Mail sent:', { messageId: info.messageId, response: info.response });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('SMTP error:', err);
    const message = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json(
      { error: 'Failed to send email', detail: message },
      { status: 500 }
    );
  }
}
