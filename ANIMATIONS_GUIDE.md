# 🎬 Animation & Interaction Guide

## Overview

This guide covers all the modern animations and interactions implemented in the NEPSE Stock Screener.

## 🎨 Animation Types

### 1. Entrance Animations

#### Fade In
```html
<div class="fade-in">Content</div>
```
- Fades in with upward movement
- Triggers on scroll

#### Slide In (Left/Right)
```html
<div class="slide-in-left">Content</div>
<div class="slide-in-right">Content</div>
```
- Slides in from left or right
- Smooth entrance effect

#### Scale In
```html
<div class="scale-in">Content</div>
```
- Zooms in from smaller size
- Great for cards and modals

#### Zoom
```html
<div class="animate-zoom">Content</div>
```
- Quick zoom animation
- Used for success messages

#### Flip
```html
<div class="animate-flip">Content</div>
```
- 3D flip effect
- Perspective-based animation

### 2. Continuous Animations

#### Bounce
```html
<button class="animate-bounce">Click Me</button>
```
- Continuous bouncing effect
- Draws attention to CTAs

#### Float
```html
<div class="animate-float">Floating Element</div>
```
- Gentle up/down movement
- Subtle, elegant effect

#### Rotate
```html
<div class="animate-rotate">Loading...</div>
```
- Continuous rotation
- Perfect for loading indicators

#### Glow
```html
<button class="animate-glow">Important</button>
```
- Pulsing glow effect
- Highlights important elements

#### Shake
```html
<input class="animate-shake">
```
- Shake animation
- Used for error feedback

### 3. Hover Effects

#### Lift
```html
<div class="hover-lift">Card</div>
```
- Lifts up on hover
- Adds depth to cards

#### Scale
```html
<button class="hover-scale">Button</button>
```
- Scales up on hover
- Interactive feedback

#### Glow
```html
<div class="hover-glow">Element</div>
```
- Glows on hover
- Attention-grabbing

#### Rotate
```html
<div class="hover-rotate">Icon</div>
```
- Rotates on hover
- Playful interaction

### 4. Loading States

#### Skeleton Loading
```html
<div class="skeleton-table">
    <div class="skeleton-header"></div>
    <div class="skeleton-row">
        <div class="skeleton-cell"></div>
        <div class="skeleton-cell"></div>
    </div>
</div>
```
- Shimmer effect while loading
- Better UX than blank screens

#### Loading Dots
```html
<div class="loading-dots">
    <span></span>
    <span></span>
    <span></span>
</div>
```
- Animated dots
- Indicates processing

#### Progress Bar
```html
<div class="progress-bar">
    <div class="progress-bar-fill" style="width: 50%"></div>
</div>
```
- Shows progress visually
- Animated shine effect

#### Spinner
```html
<div class="loading-spinner">
    <div class="spinner"></div>
</div>
```
- Classic loading spinner
- Smooth rotation

### 5. Success/Error Feedback

#### Success Checkmark
```html
<div class="success-checkmark">
    <div class="check-icon">
        <span class="icon-line line-tip"></span>
        <span class="icon-line line-long"></span>
    </div>
</div>
```
- Animated checkmark
- Confirms successful actions

## 🎯 JavaScript Animation Functions

### Available Functions

```javascript
// Show loading dots
const dots = AnimationUtils.showLoadingDots(container);

// Show progress bar
const progress = AnimationUtils.showProgressBar(container, 50);

// Update progress
AnimationUtils.updateProgress(progress, 75);

// Show success animation
AnimationUtils.showSuccessAnimation(container);

// Shake element (error feedback)
AnimationUtils.shakeElement(element);

// Bounce element
AnimationUtils.bounceElement(element);

// Add glow effect
AnimationUtils.glowElement(element, 2000);

// Create particle effect
AnimationUtils.createParticles(x, y, '#667eea');

// Smooth scroll to element
AnimationUtils.smoothScrollTo(element, 100);
```

### Usage Examples

#### Loading Data
```javascript
// Show loading
const loading = AnimationUtils.showLoadingDots(container);

// Fetch data
fetch('/api/stocks')
    .then(response => response.json())
    .then(data => {
        loading.remove();
        AnimationUtils.showSuccessAnimation(container);
    })
    .catch(error => {
        loading.remove();
        AnimationUtils.shakeElement(container);
    });
```

#### Progress Tracking
```javascript
const progress = AnimationUtils.showProgressBar(container, 0);

for (let i = 0; i <= 100; i += 10) {
    setTimeout(() => {
        AnimationUtils.updateProgress(progress, i);
    }, i * 100);
}
```

#### Error Feedback
```javascript
if (error) {
    AnimationUtils.shakeElement(inputField);
    inputField.classList.add('error');
}
```

## 🎨 Advanced Features

### 1. Scroll-Triggered Animations
- Automatically triggers animations when elements enter viewport
- Uses Intersection Observer API
- Configurable threshold and margins

### 2. Stagger Animations
```html
<div class="fade-in">
    <div data-stagger>Item 1</div>
    <div data-stagger>Item 2</div>
    <div data-stagger>Item 3</div>
</div>
```
- Children animate in sequence
- 100ms delay between each

### 3. Tilt Effect on Cards
- 3D tilt based on mouse position
- Automatically applied to cards
- Smooth perspective transform

### 4. Magnetic Buttons
- Buttons follow mouse slightly
- Subtle attraction effect
- Enhances interactivity

### 5. Particle Effects
- Click particles on important buttons
- Configurable color
- Automatic cleanup

### 6. Parallax Header
- Header moves slower than scroll
- Fades out gradually
- Creates depth

### 7. Ripple Effect
- Material Design-style ripple
- Applied to all buttons
- Click feedback

## 🎭 Animation Best Practices

### Performance
- Use `transform` and `opacity` for smooth animations
- Avoid animating `width`, `height`, `top`, `left`
- Use `will-change` sparingly
- Keep animations under 300ms for interactions

### Accessibility
- Respect `prefers-reduced-motion`
- Provide alternative feedback
- Don't rely solely on animation

### UX Guidelines
- Use animations purposefully
- Keep them subtle and smooth
- Provide immediate feedback
- Don't overdo it

## 🔧 Customization

### Timing Functions
```css
/* Available in CSS variables */
--transition-fast: 150ms cubic-bezier(0.4, 0, 0.2, 1);
--transition-base: 200ms cubic-bezier(0.4, 0, 0.2, 1);
--transition-slow: 300ms cubic-bezier(0.4, 0, 0.2, 1);
```

### Animation Durations
- Micro-interactions: 150-200ms
- Transitions: 200-300ms
- Entrance animations: 400-600ms
- Loading animations: 1-2s (infinite)

### Easing Functions
- `ease-out`: Entrances
- `ease-in`: Exits
- `ease-in-out`: Transitions
- `cubic-bezier`: Custom curves

## 📱 Responsive Behavior

### Mobile Optimizations
- Reduced animation complexity
- Faster durations
- Disabled parallax effects
- Simplified hover states (tap)

### Performance Monitoring
```javascript
// Check if animations are supported
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    // Disable or simplify animations
}
```

## 🎬 Animation Showcase

### Dashboard Elements
- ✅ Header: Glassmorphism + parallax
- ✅ Navigation: Slide-in menu
- ✅ Cards: Tilt + lift effect
- ✅ Buttons: Ripple + magnetic
- ✅ Tables: Stagger rows
- ✅ Forms: Focus animations
- ✅ Messages: Slide down
- ✅ Loading: Multiple states

### Advanced Chart Page
- ✅ Sidebar: Slide-in
- ✅ Controls: Smooth transitions
- ✅ Chart: Fade-in
- ✅ Indicators: Toggle animations
- ✅ Tooltips: Pop-in

## 🚀 Future Enhancements

Potential additions:
- [ ] Page transition animations
- [ ] Confetti effect for milestones
- [ ] Animated charts/graphs
- [ ] Gesture-based interactions
- [ ] Voice feedback animations
- [ ] AR/VR ready animations

---

**Animation System Version**: 2.0  
**Last Updated**: November 2025  
**Performance**: Optimized ⚡  
**Accessibility**: WCAG 2.1 AA ♿
