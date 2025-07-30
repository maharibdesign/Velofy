import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { Resend } from 'npm:resend'

// These will be loaded from the secrets you set
const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY')
const NOTIFICATION_EMAIL = Deno.env.get('NOTIFICATION_EMAIL')

serve(async (req) => {
  if (req.method !== 'POST') {
    return new Response('Method Not Allowed', { status: 405 })
  }
  
  try {
    const payload = await req.json()
    const record = payload.record

    if (!RESEND_API_KEY || !NOTIFICATION_EMAIL) {
        console.error('Missing RESEND_API_KEY or NOTIFICATION_EMAIL env vars');
        return new Response('Server configuration error', { status: 500 });
    }
    
    const resend = new Resend(RESEND_API_KEY)
    
    const telegramHandle = (record.telegram_handle || '').replace('@', '');

    const subject = `🚀 New Lead from Velofy: ${record.full_name}`
    const emailHtml = `
      <h1>New Service Request</h1>
      <p>A new lead has just submitted a request through the Velofy agency website.</p>
      <ul>
        <li><strong>Name:</strong> ${record.full_name}</li>
        <li><strong>Telegram:</strong> <a href="https://t.me/${telegramHandle}">@${telegramHandle}</a></li>
        <li><strong>Business Type:</strong> ${record.business_type}</li>
        <li><strong>Budget:</strong> ${record.budget}</li>
      </ul>
      <hr>
      <h3>Message:</h3>
      <p style="white-space: pre-wrap;">${record.message}</p>
    `

    await resend.emails.send({
      // ================== THIS IS THE FIX ==================
      // Using a valid email format with your verified domain.
      from: 'leads@velofy.com',
      // ======================================================

      to: NOTIFICATION_EMAIL,
      subject: subject,
      html: emailHtml,
    })

    return new Response(JSON.stringify({ success: true }), {
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (error) {
    console.error('Error processing request:', error)
    return new Response(JSON.stringify({ error: error.message }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    })
  }
})