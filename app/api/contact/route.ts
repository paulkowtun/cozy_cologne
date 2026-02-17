import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  const { name, email, phone, message, listing } = await request.json();

  if (!name || !email || !message) {
    return NextResponse.json(
      { error: 'Name, email, and message are required' },
      { status: 400 }
    );
  }

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT) || 465,
    secure: Number(process.env.SMTP_PORT) === 465,
    auth: {
      user: 'p.kowtun@pk-immobilien.de',
      pass: process.env.SMTP_PASSWORD,
    },
  });

  const subject = listing
    ? `Neue Anfrage: ${listing}`
    : 'Neue Kontaktanfrage — cozy! cologne';

  let text = `Name: ${name}\nE-Mail: ${email}\n`;
  if (phone) text += `Telefon: ${phone}\n`;
  if (listing) text += `Objekt: ${listing}\n`;
  text += `\nNachricht:\n${message}`;

  try {
    await transporter.sendMail({
      from: 'p.kowtun@pk-immobilien.de',
      to: 'paul.kowtun@gmail.com',
      replyTo: `${name} <${email}>`,
      subject,
      text,
    });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    );
  }
}
