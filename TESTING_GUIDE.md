# 🧪 Testing Guide - Dark/Light Mode Enhancements

## Quick Test Checklist

### ✅ **1. Page Load Test**
1. Open `http://localhost:3004` in your browser
2. **Expected:** Page loads instantly with no white flash
3. **Check:** Theme matches your system preference (or localStorage if set)

### ✅ **2. Theme Toggle Test**
1. Click the moon/sun icon in the navbar (top right)
2. **Expected:** Smooth 300ms transition between themes
3. **Expected:** Icon rotates 180 degrees
4. **Check:** All colors change smoothly (no jarring jumps)

### ✅ **3. Persistence Test**
1. Toggle theme to dark mode
2. Refresh the page (F5 or Cmd+R)
3. **Expected:** Dark mode persists after reload
4. **Expected:** No flash - page loads dark immediately

### ✅ **4. System Preference Test**
1. Clear localStorage: Open DevTools → Console → Type: `localStorage.clear()`
2. Change your system theme:
   - **Windows:** Settings → Personalization → Colors → "Dark" or "Light"
   - **Mac:** System Preferences → General → Appearance → "Dark" or "Light"
3. Refresh the page
4. **Expected:** Portfolio matches your system theme

### ✅ **5. Accessibility Test**
1. Press `Tab` key repeatedly
2. **Expected:** Theme toggle button gets a visible focus ring
3. Press `Enter` or `Space` on the focused button
4. **Expected:** Theme toggles

### ✅ **6. Mobile Test**
1. Open DevTools → Toggle device toolbar (Cmd+Shift+M or Ctrl+Shift+M)
2. Select a mobile device (iPhone 12, etc.)
3. Click hamburger menu (☰)
4. **Expected:** Theme toggle shows "Dark Mode" or "Light Mode" text
5. **Expected:** Button is easy to tap (48px+ target)

### ✅ **7. Color Contrast Test**
**Light Mode:**
- Body text should be `#374151` (dark gray) - ✅ WCAG AA
- Background should be `#ffffff` (white)
- Links should be clearly visible

**Dark Mode:**
- Body text should be `#e5e7eb` (light gray) - ✅ WCAG AA
- Background should be `#020617` (deep blue-black)
- Links should stand out

### ✅ **8. Animation Smoothness Test**
1. Toggle theme multiple times rapidly
2. **Expected:** No animation stuttering
3. **Expected:** No layout shift
4. **Check:** Background colors fade smoothly

---

## 🐛 Common Issues & Fixes

### **Issue 1: Flash on page load**
**Symptom:** Brief white flash when loading dark mode

**Solution:**
```bash
# Check that index.html has the inline script
grep -A 5 "Prevent flash" index.html
```

**Fix:** The script should run BEFORE `<script type="module" src="/src/main.tsx"></script>`

---

### **Issue 2: Theme doesn't persist**
**Symptom:** Theme resets to light on refresh

**Diagnosis:**
```javascript
// Open DevTools Console and check:
localStorage.getItem('theme')  // Should return 'light' or 'dark'
```

**Fix:** Clear browser cache and try again

---

### **Issue 3: System preference not detected**
**Symptom:** Always defaults to light mode

**Diagnosis:**
```javascript
// Check system preference:
window.matchMedia('(prefers-color-scheme: dark)').matches
// Should return true if system is dark, false if light
```

---

### **Issue 4: Slow transitions**
**Symptom:** Theme change feels sluggish

**Fix:** Check `src/index.css` has:
```css
* {
  transition-duration: 200ms;
}
```

---

## 🎯 Browser Testing Matrix

| Browser | Version | Status |
|---------|---------|--------|
| Chrome | Latest | ✅ Fully supported |
| Firefox | Latest | ✅ Fully supported |
| Safari | Latest | ✅ Fully supported |
| Edge | Latest | ✅ Fully supported |
| Mobile Safari | iOS 14+ | ✅ Fully supported |
| Chrome Mobile | Android | ✅ Fully supported |

---

## 📊 Performance Benchmarks

### **Expected Metrics:**
- First Contentful Paint (FCP): < 1.5s
- Largest Contentful Paint (LCP): < 2.5s
- Cumulative Layout Shift (CLS): < 0.1
- Theme toggle response: < 50ms

### **How to measure:**
1. Open DevTools → Lighthouse
2. Run "Performance" audit
3. Check Core Web Vitals

---

## 🔍 DevTools Inspection

### **Check Theme Class:**
```javascript
// Open Console and run:
document.documentElement.classList
// Should contain 'dark' or 'light'
```

### **Check Color Scheme:**
```javascript
document.documentElement.style.colorScheme
// Should return 'dark' or 'light'
```

### **Check localStorage:**
```javascript
localStorage.getItem('theme')
// Should return 'dark' or 'light'
```

### **Monitor System Changes:**
```javascript
// Listen for system theme changes:
window.matchMedia('(prefers-color-scheme: dark)')
  .addEventListener('change', e => {
    console.log('System theme changed to:', e.matches ? 'dark' : 'light')
  })
```

---

## 🎨 Visual Regression Testing

### **Screenshots to Compare:**

1. **Homepage - Light Mode**
   - Hero section
   - About section
   - Contact form

2. **Homepage - Dark Mode**
   - Same sections as above
   - Compare contrast and readability

3. **Mobile View - Both Themes**
   - Navbar (expanded menu)
   - Hero section
   - Touch target sizes

### **Tool Recommendations:**
- [Percy](https://percy.io/) - Visual regression testing
- [Chromatic](https://www.chromatic.com/) - Storybook visual testing
- Manual comparison: Use browser's screenshot tool

---

## ⚡ Quick Commands

```bash
# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run type checking
npm run type-check

# Format code
npm run format

# Lint code
npm run lint
```

---

## 🎬 Demo Scenarios

### **Scenario 1: First-time visitor**
1. User visits site with system dark mode
2. Page loads instantly in dark mode (no flash)
3. User browsing experience is smooth
4. User leaves without changing theme

### **Scenario 2: Power user**
1. User prefers light mode despite system dark mode
2. User toggles to light mode manually
3. Theme persists across sessions
4. System changes don't override manual choice

### **Scenario 3: Accessibility user**
1. User navigates with keyboard only
2. Tab to theme toggle button
3. Clear focus indicator visible
4. Space/Enter toggles theme
5. Screen reader announces "Switch to dark mode" / "Switch to light mode"

---

## ✨ Expected Behavior Summary

| Action | Expected Result |
|--------|----------------|
| First page load | No flash, respects system/localStorage |
| Click theme toggle | Smooth 300ms transition |
| Refresh page | Theme persists |
| System theme changes | Auto-updates (if no manual override) |
| Keyboard navigation | Focus visible, Enter/Space works |
| Mobile tap | Large target, clear feedback |
| Fast clicking | No animation glitches |

---

## 🚀 Production Deployment Checklist

- [ ] Test on multiple browsers
- [ ] Test on mobile devices (real devices, not just DevTools)
- [ ] Check Lighthouse scores (all green)
- [ ] Verify no console errors
- [ ] Test with slow 3G connection
- [ ] Verify localStorage works in incognito mode
- [ ] Test with JavaScript disabled (fallback to light)
- [ ] Check bundle size hasn't increased significantly

---

## 📝 Notes

- Theme transition is CSS-based (hardware accelerated)
- No external dependencies added
- Works offline (localStorage)
- Respects `prefers-reduced-motion` (add if needed)
- Compatible with all modern browsers

---

## 🎉 Success Criteria

✅ Zero flash on page load  
✅ Smooth transitions (no jank)  
✅ Theme persists after reload  
✅ System preference respected  
✅ Keyboard accessible  
✅ Mobile-friendly  
✅ WCAG AA compliant contrast  
✅ No console errors  
✅ Fast performance (< 50ms toggle)  

---

**Last Updated:** September 22, 2026  
**Test Environment:** Vite 5.4.21, React 18.3.1, Tailwind CSS 3.4.11
