# Project UI/UX & Design Guidelines

This project uses modern interactive UI standards to look like a designer-made website.

## Required Libraries
- **GSAP**: For scroll animations and timeline effects (`gsap` + `ScrollTrigger`).
- **Lenis**: For smooth scrolling (`lenis`).
- **React Bits**: For animated UI components (Blur Text, Light Rays, Star Border, etc.).

## Setup Rules
1. **Lenis Integration**: Always connect Lenis smooth scroll ticker with GSAP's ticker for seamless performance.
2. **Accessibility**: Always respect `prefers-reduced-motion`. Disable or soften animations if enabled.

## Design & Component Rules
- **Hero Section**: 
  - Main heading should use `Blur Text` (React Bits style).
  - Background should have a subtle `Light Rays` or animated effect matching project colors.
- **Scroll Entry**: Each section should have a smooth, subtle fade/slide animation as it enters the viewport.
- **Numbers/Metrics**: Auto-increment counter animations when scrolled into view.
- **Buttons / CTAs**: Primary buttons should use special glowing/border effects (e.g., `Star Border`).
- **Subtlety**: Maximum **1 prominent animation per section** to avoid overwhelming the user.
- **Content Policy**: Keep original text and brand colors unchanged unless instructed.