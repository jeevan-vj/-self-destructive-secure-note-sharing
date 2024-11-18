import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendNoteAccessEmail(
  to: string,
  noteId: string,
  accessDetails: {
    timestamp: number;
    ipAddress: string;
    userAgent: string;
  }
) {
  try {
    await resend.emails.send({
      from: 'SecureShare <notifications@secureshare.com>',
      to,
      subject: 'Your secure note has been accessed',
      html: `
        <h2>Note Access Notification</h2>
        <p>Your secure note (ID: ${noteId}) was accessed:</p>
        <ul>
          <li>Time: ${new Date(accessDetails.timestamp).toLocaleString()}</li>
          <li>IP Address: ${accessDetails.ipAddress}</li>
          <li>Device: ${accessDetails.userAgent}</li>
        </ul>
        <p>If this wasn't you, please contact support immediately.</p>
      `,
    });
  } catch (error) {
    console.error('Failed to send email:', error);
  }
}