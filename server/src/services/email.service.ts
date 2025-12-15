import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendApprovalEmail = async (to: string, name: string) => {
  if (!process.env.RESEND_API_KEY) {
    console.warn('RESEND_API_KEY is not set. Email not sent.');
    return;
  }

  try {
    const { data, error } = await resend.emails.send({
      from: 'Algerie Telecom <onboarding@resend.dev>',
      to: [to],
      subject: 'Registration Approved - Algerie Telecom',
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h2>Hello ${name},</h2>
          <p>We are pleased to inform you that your registration request for Algerie Telecom services has been <strong>APPROVED</strong>.</p>
          <p>You can now access our services.</p>
          <br/>
          <p>Best regards,</p>
          <p>The Algerie Telecom Team</p>
        </div>
      `,
    });

    if (error) {
      console.error('Error sending email:', error);
      throw error;
    }

    return data;
  } catch (err) {
    console.error('Failed to send approval email:', err);
  }
};
