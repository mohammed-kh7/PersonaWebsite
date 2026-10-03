# N8n Integration Guide

## 📘 Overview

This portfolio includes N8n automation integration for the contact form. N8n is a powerful workflow automation tool that can receive webhooks and trigger actions like sending emails, Slack notifications, database updates, and more.

## 🔧 Setup Instructions

### 1. Create N8n Account

- Sign up at [n8n.cloud](https://n8n.cloud) (free tier available)
- Or self-host N8n with Docker: `docker run -it --rm --name n8n -p 5678:5678 n8nio/n8n`

### 2. Create Workflow

1. **Create New Workflow**
   - Click "+ Create New Workflow"
   - Name it "Portfolio Contact Form"

2. **Add Webhook Node (Trigger)**
   - Search for "Webhook" in nodes
   - Drag to canvas
   - Configure:
     - Method: `POST`
     - Path: `portfolio-contact` (or custom)
     - Response Mode: `Immediately`
     - Response Code: `200`
   - Copy the **Webhook URL** (you'll need this)

3. **Add Set Node (Optional - Data Transformation)**
   - Clean/format the incoming data
   - Example transformations:
     ```javascript
     {
       "fullName": "{{$json.name}}",
       "emailAddress": "{{$json.email}}",
       "inquirySubject": "{{$json.subject}}",
       "inquiryMessage": "{{$json.message}}",
       "receivedAt": "{{$json.timestamp}}",
       "source": "{{$json.source}}"
     }
     ```

4. **Add Email Node (Action)**
   
   **Option A: Gmail**
   - Add "Gmail" node
   - Click "Create New Credential"
   - Authenticate with Google
   - Configure:
     - To: `your-email@gmail.com`
     - Subject: `New Contact from Portfolio: {{$json.subject}}`
     - Email Type: `HTML`
     - Message (HTML):
       ```html
       <h2>New Contact Form Submission</h2>
       <p><strong>Name:</strong> {{$json.name}}</p>
       <p><strong>Email:</strong> {{$json.email}}</p>
       <p><strong>Subject:</strong> {{$json.subject}}</p>
       <p><strong>Message:</strong></p>
       <p>{{$json.message}}</p>
       <hr>
       <p><small>Received: {{$json.timestamp}}</small></p>
       ```

   **Option B: SMTP (Any Email Provider)**
   - Add "Email Send" node
   - Configure SMTP settings
   - Use same HTML template above

5. **Optional: Add Slack Node**
   - Send notifications to Slack channel
   - Add "Slack" node after Email
   - Configure:
     - Channel: `#inquiries` or DM
     - Message:
       ```
       🎯 New Portfolio Contact!
       
       **Name:** {{$json.name}}
       **Email:** {{$json.email}}
       **Subject:** {{$json.subject}}
       
       **Message:**
       {{$json.message}}
       ```

6. **Optional: Add Google Sheets Node**
   - Log all contacts to spreadsheet
   - Add "Google Sheets" node
   - Operation: `Append`
   - Configure columns to match form data

### 3. Test Workflow

1. Click **"Execute Workflow"** button
2. Click **"Listen for Test Event"** on Webhook node
3. Use webhook URL in browser or Postman:

```bash
curl -X POST https://your-n8n-instance.com/webhook/portfolio-contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "subject": "Test Subject",
    "message": "This is a test message",
    "timestamp": "2026-09-22T10:00:00.000Z",
    "source": "portfolio-website"
  }'
```

4. Verify email/Slack notification received
5. Click **"Save"** and **"Activate"** workflow

### 4. Configure Portfolio Website

> ⚠️ **Security — do not use a `VITE_` prefixed variable here.**
> Vite inlines every `VITE_*` value into the client bundle at build time. If
> the webhook URL is a `VITE_` variable it ships to every visitor, is readable
> in DevTools, and turns this workflow into a public unauthenticated endpoint
> that anyone can POST to (spam relay, quota burn, billing abuse).

1. Set these as **server-side** environment variables in your hosting provider's
   dashboard. For local development copy `.env.example` to `.env.local`:

```env
N8N_WEBHOOK_URL=https://your-n8n-instance.com/webhook/portfolio-contact
N8N_WEBHOOK_SECRET=choose-a-long-random-value
ALLOWED_ORIGINS=https://your-domain.com,http://localhost:3000
```

2. (Recommended) On the N8n Webhook node, enable **Header Auth** and set the same
   `N8N_WEBHOOK_SECRET`. `api/contact.ts` forwards it as `x-webhook-secret`,
   so only your own function can trigger the workflow.

3. Restart development server:
```bash
npm run dev
```

4. Deploy with a host that supports serverless functions (Vercel, Netlify
   Functions, Cloudflare Workers). Static-only hosts such as GitHub Pages
   cannot host `api/contact.ts`.

5. Test contact form submission

### 5. Verify the secret is not public

After a production build, confirm the bundle contains no webhook URL:

```bash
npm run build
grep -R "n8n.cloud\|/webhook/" dist/assets/   # must return nothing
```

The form posts to `/api/contact`, never to N8n directly.

## 🔄 Example Workflows

### Basic: Email Only

```
Webhook → Email (Gmail/SMTP)
```

### Advanced: Multi-Channel + Logging

```
                   ┌─→ Email (Gmail)
Webhook → Set Data ├─→ Slack Notification
                   └─→ Google Sheets (Log)
```

### Enterprise: CRM Integration

```
                   ┌─→ Email
Webhook → Set Data ├─→ Slack
                   ├─→ Google Sheets
                   ├─→ HubSpot/Salesforce (Create Contact)
                   └─→ Notion (Create Task)
```

## 🛡️ Security Best Practices

1. **Use Authentication** (N8n Pro)
   - Add "Basic Auth" to webhook
   - Update portfolio code to include credentials

2. **Rate Limiting**
   - N8n Cloud includes rate limiting
   - For self-hosted, use nginx rate limiting

3. **Data Validation**
   - Add "Code" node after webhook
   - Validate email format, sanitize inputs

4. **CORS Configuration**
   - N8n Cloud handles CORS automatically
   - Self-hosted: configure CORS in settings

## 🐛 Troubleshooting

### Webhook Not Receiving Data

1. **Check Webhook URL**
   - Ensure `.env` has correct URL
   - Verify no trailing slash

2. **Check Workflow Status**
   - Workflow must be **Active** (toggle on)
   - Check execution history in N8n

3. **Check Browser Console**
   - Look for CORS errors
   - Check network tab for request details

### Emails Not Sending

1. **Gmail Node**
   - Verify Google OAuth credentials
   - Check Gmail security settings
   - Enable "Less secure app access" if needed

2. **SMTP Node**
   - Verify SMTP credentials
   - Check port (587 for TLS, 465 for SSL)
   - Test with email client first

### Rate Limiting Issues

- N8n Cloud: Free tier = 5,000 executions/month
- Implement client-side throttling
- Add honeypot field to prevent spam

## 📊 Monitoring

### N8n Execution History

- View all workflow executions
- Check success/failure rates
- Debug failed submissions

### Email Notifications for Errors

Add "Error Trigger" node:
```
On Error → Email (Alert Admin)
```

## 🚀 Production Checklist

- [ ] Webhook URL configured in `.env`
- [ ] Workflow saved and activated
- [ ] Email delivery tested
- [ ] Form validation working
- [ ] Error handling in place
- [ ] Success message displays
- [ ] Spam protection implemented
- [ ] Rate limiting configured

## 📚 Additional Resources

- [N8n Documentation](https://docs.n8n.io/)
- [N8n Community](https://community.n8n.io/)
- [N8n Workflow Templates](https://n8n.io/workflows)
- [Webhook Security Best Practices](https://docs.n8n.io/hosting/security/)

---

**Need Help?**  
Contact: mohammedkhudair123@gmail.com
