# Mohammed Khudair - Professional Portfolio

A modern, performant portfolio website built with React, TypeScript, and Tailwind CSS. Features a clean design with dark mode support, smooth animations, and full accessibility compliance.

## 🚀 **Tech Stack**

- **Frontend:** React 18.3 + TypeScript
- **Styling:** Tailwind CSS
- **Build Tool:** Vite
- **Routing:** React Router v6
- **Animations:** Framer Motion
- **Icons:** React Icons
- **Code Quality:** ESLint + Prettier

## ✨ **Features**

- ⚡ Lightning-fast performance with Vite
- 🎨 Beautiful UI with Tailwind CSS
- 🌓 Dark/Light mode toggle
- 📱 Fully responsive design
- ♿ WCAG 2.1 AA accessibility compliant
- 🔄 Smooth page transitions and animations
- 📬 Contact form with validation
- 🤖 N8n automation integration ready
- 🎯 SEO optimized
- 🎭 Component-driven architecture

## 📦 **Installation**

### Prerequisites
- Node.js 18+ and npm/yarn

### Setup

```bash
# Navigate to project directory
cd C:\Users\moham\Desktop\mohammed-portfolio

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🛠️ **Development**

### Available Scripts

```bash
npm run dev          # Start dev server at http://localhost:3000
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
npm run format       # Format code with Prettier
npm run type-check   # Check TypeScript types
```

### Project Structure

```
src/
├── components/
│   ├── common/           # Reusable components (Button, Card, Input)
│   ├── layout/           # Layout components (Navbar, Footer, Layout)
│   └── sections/         # Page sections (Hero, Contact, etc.)
├── pages/                # Page components
├── context/              # React context (Theme)
├── hooks/                # Custom hooks
├── utils/                # Utility functions
├── types/                # TypeScript types
├── App.tsx              # Main app component
├── main.tsx             # Entry point
└── index.css            # Global styles
```

## 🎨 **Customization**

### Replace Placeholder Assets

1. **Profile Photo:**
   - Replace `/public/images/profile.jpg` with your professional headshot
   - Recommended size: 800x800px (square)
   - Format: JPG or WebP

2. **Favicon:**
   - Replace `/public/favicon.ico`
   - Generate favicons at [realfavicongenerator.net](https://realfavicongenerator.net/)

3. **Update Content:**
   - Edit `src/components/sections/Hero.tsx` for hero content
   - Edit `src/pages/Home.tsx` for about section
   - Update social links in `src/components/layout/Footer.tsx`

### Color Theme

Edit `tailwind.config.js` to customize colors:

```javascript
theme: {
  extend: {
    colors: {
      primary: { /* Your primary color shades */ },
      secondary: { /* Your secondary color shades */ },
    }
  }
}
```

## 🔌 **N8n Integration**

### Setup N8n Webhook

> ⚠️ **Never put the webhook URL in a `VITE_` variable.** Vite inlines every
> `VITE_*` value into the client bundle, which publishes the URL to every
> visitor and turns your workflow into a public, unauthenticated, spam-able
> endpoint. It must live in a **server-side** variable only.

1. Create a workflow in [N8n](https://n8n.io)
2. Add "Webhook" node → Set method to POST
3. Copy the webhook URL
4. Set these as **server-side** environment variables in your host's dashboard
   (Vercel / Netlify / Cloudflare). Copy `.env.example` to `.env.local` for
   local development:

```env
N8N_WEBHOOK_URL=https://your-n8n-instance.com/webhook/your-id
N8N_WEBHOOK_SECRET=choose-a-long-random-value
ALLOWED_ORIGINS=https://your-domain.com,http://localhost:3000
```

5. Add Email/Slack node after webhook to process form data
6. Optionally set the same secret on the Webhook node's **header auth** so only
   `api/contact.ts` can trigger it

The browser posts to `/api/contact` (`api/contact.ts`), which validates,
rate-limits and forwards to N8n. That function requires a host that supports
serverless functions — GitHub Pages and plain static hosting cannot run it.

### Example N8n Workflow

```
Webhook (POST) → Set Data → Gmail/SMTP → Success Response
```

The contact form automatically sends data to your N8n webhook in this format:

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "subject": "Project Inquiry",
  "message": "Hello...",
  "timestamp": "2026-09-22T10:00:00.000Z",
  "source": "portfolio-website"
}
```

## 📱 **Responsive Design**

The site is fully responsive with breakpoints:
- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px

## ♿ **Accessibility**

- Semantic HTML5 elements
- ARIA labels on all interactive elements
- Keyboard navigation support
- Focus states visible
- Alt text on all images
- Color contrast WCAG 2.1 AA compliant

## 🚀 **Deployment**

### GitHub Pages

```bash
npm run build
# Deploy 'dist' folder to GitHub Pages
```

### Netlify

```bash
# Build command: npm run build
# Publish directory: dist
```

### Vercel

```bash
vercel --prod
```

## 🎯 **Performance**

Expected Lighthouse scores:
- Performance: 90-100
- Accessibility: 95-100
- Best Practices: 90-100
- SEO: 95-100

## 📄 **License**

MIT License - feel free to use this template for your own portfolio!

## 👤 **Author**

**Mohammed Khudair**
- Email: mohammedkhudair123@gmail.com
- GitHub: [@hamoodkh7](https://github.com/hamoodkh7)
- Instagram: [@hamood.kh7](https://www.instagram.com/hamood.kh7/)

---

Built with ❤️ using React + TypeScript + Tailwind CSS
