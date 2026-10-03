import type { Dictionary } from './types'

export const en: Dictionary = {
  meta: {
    title: 'Mohammed Khudair - Frontend Developer | React & AI Automation Specialist',
    description:
      'Mohammed Khudair - Frontend Developer & AI Automation Specialist. React, JavaScript, N8n workflows, and modern web technologies.',
  },
  brand: {
    first: 'Mohammed',
    last: 'Khudair',
  },
  nav: {
    label: 'Main navigation',
    items: {
      home: 'Home',
      about: 'About',
      skills: 'Skills',
      projects: 'Projects',
      services: 'Services',
      contact: 'Contact',
    },
    themeToggle: 'Switch to {theme} mode',
    toggleMenu: 'Toggle menu',
    scrollToTop: 'Scroll to top',
    switchLanguage: 'Switch to Arabic',
  },
  common: {
    liveDemo: 'Live Demo',
    visitDemo: 'Visit Live Demo',
    github: 'GitHub',
    previousSlide: 'Previous slide',
    nextSlide: 'Next slide',
    slideOf: '{current} of {total}',
    goToSlide: 'Go to slide {index}',
    backToTop: 'Back to top',
    sending: 'Sending...',
    sendMessage: 'Send Message',
  },
  hero: {
    greeting: "Hi there, I'm",
    descriptionLead: 'Frontend Developer & AI Automation Specialist, working with',
    descriptionTail: ', and AI-powered interfaces.',
    ctaPrimary: 'View My Work',
    ctaSecondary: 'Get In Touch',
    stats: [
      { value: '5+', label: 'Technologies' },
      { value: '10+', label: 'Projects' },
      { value: '100%', label: 'Dedication' },
    ],
    profileAlt: 'Mohammed Khudair — Frontend Developer & AI Automation Specialist',
    scrollIndicator: 'Scroll to about section',
  },
  about: {
    title: 'About',
    highlight: 'Me',
    subtitle:
      'I build modern, performant web applications that deliver exceptional user experiences.',
    bioLead: "I'm a",
    bioRole: 'Frontend Developer & AI Automation Specialist',
    bioTail:
      'passionate about crafting clean, responsive user interfaces with React and JavaScript. I focus on building seamless digital experiences that combine thoughtful design with well-structured code.',
    paragraphTwo:
      "My expertise spans React component architecture, N8n workflow automation, and AI-powered interface solutions. I'm dedicated to delivering frontend implementations that drive engagement and business results.",
    highlights: [
      {
        id: 'code',
        title: 'Frontend Development',
        description: 'Building modern, responsive UIs with React and JavaScript',
      },
      {
        id: 'zap',
        title: 'AI & Automation',
        description: 'Integrating N8n workflows and AI-powered interfaces',
      },
    ],
    techStack: ['React', 'JavaScript', 'Tailwind CSS', 'Git', 'AI Automation', 'N8n'],
  },
  skills: {
    title: 'My',
    highlight: 'Skills',
    subtitle: 'Technologies and tools I work with to build modern web experiences.',
    categories: [
      { key: 'frontend', label: '🎨 Frontend' },
      { key: 'tools', label: '🛠️ Tools & Workflow' },
      { key: 'automation', label: '🤖 Automation & AI' },
    ],
    items: [
      { id: 'react', label: 'React', category: 'frontend' },
      { id: 'javascript', label: 'JavaScript', category: 'frontend' },
      { id: 'html-css', label: 'HTML5 / CSS3', category: 'frontend' },
      { id: 'tailwind', label: 'Tailwind CSS', category: 'frontend' },
      { id: 'responsive-design', label: 'Responsive Design', category: 'frontend' },
      { id: 'git-github', label: 'Git / GitHub', category: 'tools' },
      { id: 'figma', label: 'Figma', category: 'tools' },
      { id: 'vscode', label: 'VS Code', category: 'tools' },
      { id: 'n8n-workflows', label: 'N8n Workflows', category: 'automation' },
      { id: 'ai-integration', label: 'AI Integration', category: 'automation' },
      { id: 'api-automation', label: 'API Automation', category: 'automation' },
      { id: 'webhook-design', label: 'Webhook Design', category: 'automation' },
    ],
  },
  projects: {
    title: 'My',
    highlight: 'Projects',
    subtitle:
      'A collection of web applications, interactive games, and management tools built with JavaScript, HTML5, and CSS3.',
    items: [
      {
        id: '1',
        title: 'Personal Portfolio Site',
        description:
          'Developer portfolio website featuring modern dark UI, personal bio, skills showcase, interactive navigation, and full-stack project highlights.',
      },
      {
        id: '2',
        title: 'CRUDS Product Management System',
        description:
          'Product management dashboard featuring full Create, Read, Update, Delete functionality, automatic price/tax/discount calculation, and dual-mode search.',
      },
      {
        id: '3',
        title: 'XO Game (Tic-Tac-Toe)',
        description:
          'Interactive Tic-Tac-Toe web game featuring custom dark themes, turn-by-turn state management, and real-time winner determination logic.',
      },
      {
        id: '4',
        title: 'Hangman Word Game',
        description:
          'Engaging word-guessing game with category selection (People/Words), dynamic hangman drawing updates, and an interactive virtual keyboard.',
      },
      {
        id: '5',
        title: 'Currency Converter (محول العملات)',
        description:
          'Clean currency conversion tool supporting live calculations between US Dollar ($), Israeli Shekel (₪), and exchange rates with responsive UI.',
      },
    ],
  },
  services: {
    title: 'My',
    highlight: 'Services',
    subtitle: 'What I can do to help you build great digital products.',
    items: [
      {
        id: '1',
        title: 'React Development',
        description:
          'Custom React applications with TypeScript, modern hooks patterns, and component-driven architecture.',
        features: [
          'Single Page Applications',
          'Component Libraries',
          'State Management',
          'Performance Optimization',
        ],
      },
      {
        id: '2',
        title: 'Frontend Architecture',
        description:
          'Scalable frontend systems with clean code, design systems, and best practices baked in.',
        features: [
          'Design Systems',
          'Responsive Design',
          'Accessibility (a11y)',
          'Cross-Browser Support',
        ],
      },
      {
        id: '3',
        title: 'AI & Automation',
        description:
          'N8n workflow automation and AI-powered interfaces that streamline operations and boost productivity.',
        features: [
          'N8n Workflows',
          'AI Chat Integration',
          'Webhook Automation',
          'Data Pipeline Design',
        ],
      },
      {
        id: '4',
        title: 'Web Consulting',
        description:
          'Technical guidance on architecture, stack selection, and implementation strategy for web projects.',
        features: [
          'Technical Audits',
          'Stack Selection',
          'Code Reviews',
          'Mentorship',
        ],
      },
    ],
  },
  contact: {
    title: 'Get In',
    highlight: 'Touch',
    subtitle: "Have a project in mind? Let's work together to create something amazing.",
    connectTitle: "Let's Connect",
    connectText:
      "I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.",
    emailLabel: 'Email',
    responseTimeLabel: 'Response Time',
    responseTimeValue: 'Within 24 hours',
    talkLabel: "Let's Talk",
    talkValue: 'Open for freelance & collaboration',
    form: {
      name: 'Your Name',
      email: 'Email Address',
      subject: 'Subject',
      message: 'Message',
      namePlaceholder: 'John Doe',
      emailPlaceholder: 'john@example.com',
      subjectPlaceholder: 'Project Inquiry',
      messagePlaceholder: 'Tell me about your project...',
      submit: 'Send Message',
      successTitle: 'Message Sent!',
      successText: "Thank you for reaching out. I'll get back to you soon!",
      errorText: 'Failed to send message. Please try again or email directly.',
    },
  },
  footer: {
    tagline: 'Frontend Developer specializing in React, JavaScript, and AI Automation.',
    rights: 'All rights reserved.',
  },
  validation: {
    required: '{field} is required',
    email: 'Please enter a valid email address',
    minLength: 'Minimum {count} characters required',
    maxLength: 'Maximum {count} characters allowed',
    pattern: 'Invalid format',
  },
}