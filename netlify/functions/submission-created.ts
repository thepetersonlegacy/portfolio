import { Handler, HandlerEvent } from '@netlify/functions';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

// IMPORTANT: Update this after verifying your domain in Resend
// Until then, use: 'onboarding@resend.dev' for testing
const FROM_EMAIL = process.env.FROM_EMAIL || 'onboarding@resend.dev';
const OWNER_EMAIL = process.env.OWNER_EMAIL || 'eldonpeterson@icloud.com';

interface NetlifyFormEvent {
  payload: {
    form_name: string;
    data: Record<string, string>;
    human_fields: Record<string, string>;
  };
}

// Email templates
const getIntakeFormEmail = (data: Record<string, string>) => ({
  subject: `Thanks for reaching out, ${data.name}!`,
  html: `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <h1 style="color: #1a1a1a; font-weight: 400;">Thanks for reaching out, ${data.name}!</h1>
      <p style="color: #666;">Your project inquiry has been received.</p>
      
      <div style="background: #f8f9fa; border-radius: 12px; padding: 24px; margin: 24px 0;">
        <h2 style="color: #1a1a1a; font-size: 18px; margin-top: 0;">What happens next?</h2>
        <ol style="color: #555; padding-left: 20px;">
          <li style="margin-bottom: 12px;"><strong>I'll review your submission</strong> within 24 hours</li>
          <li style="margin-bottom: 12px;"><strong>You'll receive a personalized response</strong></li>
          <li style="margin-bottom: 12px;"><strong>We'll schedule a call</strong> to discuss your project</li>
        </ol>
      </div>
      
      <div style="background: #fff3e0; border-left: 4px solid #ff9800; padding: 16px; margin: 24px 0;">
        <p style="margin: 0; color: #e65100; font-weight: 500;">⚡ Need something sooner?</p>
        <p style="margin: 8px 0 0 0; color: #666;">Call or text me at <a href="tel:+14096567142" style="color: #dc2626;">(409) 656-7142</a></p>
      </div>
      
      <p style="color: #888; font-size: 14px; margin-top: 32px;">— Eldon Peterson</p>
    </div>
  `
});

const getFastQuoteEmail = (data: Record<string, string>) => ({
  subject: `Got it, ${data.name}! Your quote request is in.`,
  html: `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <h1 style="color: #1a1a1a; font-weight: 400;">Got it, ${data.name}!</h1>
      <p style="color: #666;">Your quote request is in my inbox.</p>
      
      <div style="background: #1a1a1a; border-radius: 12px; padding: 24px; margin: 24px 0; color: white;">
        <h2 style="font-size: 18px; margin-top: 0;">📋 What you requested:</h2>
        <p style="opacity: 0.9;"><strong>Service:</strong> ${data.serviceNeeded || 'Not specified'}</p>
        <p style="opacity: 0.9;"><strong>Business Type:</strong> ${data.businessType || 'Not specified'}</p>
      </div>
      
      <div style="background: #f0fdf4; border-radius: 12px; padding: 24px; margin: 24px 0;">
        <h2 style="color: #166534; font-size: 18px; margin-top: 0;">✅ What to expect:</h2>
        <ul style="color: #15803d; padding-left: 20px;">
          <li>Personalized quote within <strong>24-48 hours</strong></li>
          <li>No obligation, no pressure</li>
        </ul>
      </div>
      
      <p style="color: #666;">Need it faster? Call <a href="tel:+14096567142" style="color: #dc2626;">(409) 656-7142</a></p>
      <p style="color: #888; font-size: 14px; margin-top: 32px;">— Eldon Peterson</p>
    </div>
  `
});

const getExitIntentEmail = (data: Record<string, string>) => ({
  subject: 'Your Free Website Audit Checklist',
  html: `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <h1 style="color: #1a1a1a; font-weight: 400;">Welcome aboard!</h1>
      <p style="color: #666;">Here's the free website audit checklist you requested.</p>
      
      <div style="background: #dc2626; border-radius: 12px; padding: 24px; margin: 24px 0; text-align: center;">
        <a href="https://petersonproservices.com/10-website-mistakes-guide.pdf" style="display: inline-block; background: white; color: #dc2626; padding: 14px 28px; border-radius: 8px; text-decoration: none; font-weight: 600;">
          📥 Download Your Checklist
        </a>
      </div>
      
      <div style="background: #fef3c7; border-radius: 12px; padding: 20px; margin: 24px 0; text-align: center;">
        <p style="margin: 0 0 12px 0; color: #92400e; font-weight: 500;">🎯 Want me to audit YOUR site for free?</p>
        <a href="https://petersonproservices.com/#contact" style="display: inline-block; background: #f59e0b; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: 600;">
          Book a Free 15-Min Review
        </a>
      </div>
      
      <p style="color: #888; font-size: 14px; margin-top: 32px;">— Eldon Peterson<br>Peterson Pro Services</p>
    </div>
  `
});

// Notification email to owner
const getOwnerNotification = (formName: string, data: Record<string, string>) => ({
  subject: `🔔 New ${formName} submission from ${data.name || data.email}`,
  html: `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <h1 style="color: #1a1a1a;">New ${formName} Submission</h1>
      <table style="width: 100%; border-collapse: collapse;">
        ${Object.entries(data).map(([key, value]) => `
          <tr>
            <td style="padding: 8px; border-bottom: 1px solid #eee; color: #888; width: 30%;">${key}</td>
            <td style="padding: 8px; border-bottom: 1px solid #eee;">${value}</td>
          </tr>
        `).join('')}
      </table>
    </div>
  `
});

export const handler: Handler = async (event: HandlerEvent) => {
  // This function is triggered automatically by Netlify on form submission
  // The event name "submission-created" is a special Netlify event

  try {
    const body: NetlifyFormEvent = JSON.parse(event.body || '{}');
    const { form_name, data } = body.payload;

    if (!form_name || !data) {
      console.log('Missing form data in payload');
      return { statusCode: 200, body: 'Missing form data' };
    }

    console.log(`Processing submission for form: ${form_name}`);

    const recipientEmail = data.email;
    if (!recipientEmail) {
      console.log('No email provided, skipping auto-reply');
      // Still send notification to owner
    }

    // Get the right email template
    let emailContent;
    switch (form_name) {
      case 'intake-form':
        emailContent = getIntakeFormEmail(data);
        break;
      case 'fast-quote':
        emailContent = getFastQuoteEmail(data);
        break;
      case 'exit-intent-leads':
        emailContent = getExitIntentEmail(data);
        break;
      default:
        console.log(`Unknown form: ${form_name}, sending owner notification only`);
        emailContent = null;
    }

    // Send auto-reply to user (if email provided and template exists)
    if (recipientEmail && emailContent) {
      try {
        await resend.emails.send({
          from: FROM_EMAIL,
          to: recipientEmail,
          subject: emailContent.subject,
          html: emailContent.html,
        });
        console.log(`Auto-reply sent to ${recipientEmail}`);
      } catch (err) {
        console.error('Error sending auto-reply:', err);
      }
    }

    // Send notification to owner
    try {
      const ownerEmail = getOwnerNotification(form_name, data);
      await resend.emails.send({
        from: FROM_EMAIL,
        to: OWNER_EMAIL,
        subject: ownerEmail.subject,
        html: ownerEmail.html,
      });
      console.log(`Owner notification sent to ${OWNER_EMAIL}`);
    } catch (err) {
      console.error('Error sending owner notification:', err);
    }

    return { statusCode: 200, body: 'Form submission processed' };
  } catch (error) {
    console.error('Error processing submission:', error);
    return { statusCode: 500, body: 'Error processing submission' };
  }
};
