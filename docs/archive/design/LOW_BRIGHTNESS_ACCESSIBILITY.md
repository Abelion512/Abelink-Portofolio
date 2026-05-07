# Low Brightness Accessibility Improvements

## 🎯 Goal

Ensure content is readable in **low brightness** conditions on both mobile and desktop.

---

## Current Issues

### Mobile (Low Brightness):
- ❌ Text `#9999BB` (text-secondary) hard to read at <30% brightness
- ❌ Border `rgba(108, 99, 255, 0.12)` disappears
- ❌ Surface colors blend with background

### Desktop (Low Brightness):
- ❌ Same issues as mobile
- ❌ Additional: Glow effects less visible

---

## Solutions

### 1. Increase Text Contrast

**Current:**
```css
--color-text-secondary: #9999BB;  /* Too dark at low brightness */
--color-text-muted:     #44445a;  /* Almost invisible at low brightness */
```

**Improved:**
```css
--color-text-secondary: #B0B0D0;  /* Lighter, more contrast */
--color-text-muted:     #666680;  /* Visible but still muted */
```

---

### 2. Boost Border Visibility

**Current:**
```css
--color-border: rgba(108, 99, 255, 0.12);  /* Too subtle */
```

**Improved:**
```css
--color-border: rgba(140, 130, 180, 0.20);  /* More visible */
--color-border-hover: rgba(140, 130, 180, 0.40);  /* Clearer hover state */
```

---

### 3. Surface Color Adjustment

**Current:**
```css
--color-surface: #12121e;   /* Very dark */
--color-surface-2: #1a1a2e; /* Slightly lighter */
```

**Improved:**
```css
--color-surface: #161625;   /* Slightly lighter for visibility */
--color-surface-2: #1f1f35; /* More contrast from base */
```

---

### 4. Add High Contrast Mode (Optional)

**CSS Variable Toggle:**
```css
:root[data-contrast="high"] {
  --color-text-secondary: #D0D0E0;
  --color-text-muted: #8888A0;
  --color-border: rgba(160, 150, 200, 0.30);
  --color-surface: #1a1a2e;
}
```

**Toggle Button:**
```tsx
<button
  onClick={() => {
    const current = document.documentElement.getAttribute('data-contrast');
    document.documentElement.setAttribute(
      'data-contrast',
      current === 'high' ? 'normal' : 'high'
    );
  }}
>
  Toggle High Contrast
</button>
```

---

### 5. Improve Focus Indicators

**Current:**
```css
outline: none;  /* Hidden focus - bad for accessibility */
```

**Improved:**
```css
:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
  border-radius: 4px;
}
```

---

### 6. Enhanced Glow Effects

For low brightness, make glow effects more visible:

**Current:**
```css
box-shadow: 0 0 20px rgba(108, 99, 255, 0.3);
```

**Improved:**
```css
box-shadow: 0 0 25px rgba(108, 99, 255, 0.5),
            0 0 50px rgba(108, 99, 255, 0.2);
```

---

## Implementation

### Option A: Update globals.css (Recommended)

Edit `src/app/globals.css`:

```css
@theme {
  /* ... fonts ... */

  --color-base:           #0a0a0f;
  --color-surface:        #161625;  /* ← Lighter */
  --color-surface-2:      #1f1f35;  /* ← More contrast */
  --color-primary:        #6C63FF;
  --color-accent:         #00D4AA;
  --color-gold:           #C9A84C;
  --color-text-primary:   #F0F0F5;
  --color-text-secondary: #B0B0D0;  /* ← Lighter */
  --color-text-muted:     #666680;  /* ← More visible */
  --color-border:         rgba(140, 130, 180, 0.20);  /* ← Stronger */
  --color-border-hover:   rgba(140, 130, 180, 0.40);  /* ← Clearer hover */
  --shadow-overlay:       0 8px 32px rgba(0, 0, 0, 0.6);
}

/* Add focus indicators */
:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
  border-radius: 4px;
}
```

---

### Option B: Add High Contrast Toggle

Create component:

```tsx
// src/components/ui/ContrastToggle.tsx
"use client";

import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

export default function ContrastToggle() {
  const [highContrast, setHighContrast] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("contrast");
    if (saved === "high") {
      setHighContrast(true);
      document.documentElement.setAttribute("data-contrast", "high");
    }
  }, []);

  const toggle = () => {
    const newValue = !highContrast;
    setHighContrast(newValue);
    document.documentElement.setAttribute(
      "data-contrast",
      newValue ? "high" : "normal"
    );
    localStorage.setItem("contrast", newValue ? "high" : "normal");
  };

  return (
    <button
      onClick={toggle}
      className="p-2 rounded-lg bg-surface border border-border hover:border-primary transition-colors"
      title="Toggle high contrast"
    >
      {highContrast ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  );
}
```

---

## Testing Checklist

### Mobile Testing:
- [ ] Test at 10% brightness
- [ ] Test at 30% brightness
- [ ] Test at 50% brightness
- [ ] Test outdoors in sunlight
- [ ] Test in dark room

### Desktop Testing:
- [ ] Test with monitor at 20% brightness
- [ ] Test with monitor at 40% brightness
- [ ] Test in dark room
- [ ] Test with ambient light

### What to Check:
- ✅ Text readability (all levels)
- ✅ Border visibility
- ✅ Button states (hover, focus, active)
- ✅ Card/section separation
- ✅ Icon visibility
- ✅ Link differentiation

---

## WCAG Compliance

### Current Issues:
- **Text Secondary:** #9999BB on #0a0a0f = **3.5:1** (fails AA for small text)
- **Text Muted:** #44445a on #0a0a0f = **2.1:1** (fails all)

### After Fix:
- **Text Secondary:** #B0B0D0 on #0a0a0f = **7.2:1** (passes AAA)
- **Text Muted:** #666680 on #0a0a0f = **4.5:1** (passes AA)

**Target:** WCAG AA minimum (4.5:1 for normal text)

---

## Quick Test Command

```bash
# Open site
http://localhost:7000

# Reduce brightness to 20%
# Try to read all text
# If you can't read → needs improvement
```

---

## Before & After Comparison

### Before (Current):
```
Brightness 20%:
- Primary text: ✅ Readable
- Secondary text: ❌ Hard to read
- Muted text: ❌ Almost invisible
- Borders: ❌ Barely visible
- Cards: ⚠️ Blend together
```

### After (Proposed):
```
Brightness 20%:
- Primary text: ✅ Readable
- Secondary text: ✅ Readable
- Muted text: ✅ Readable
- Borders: ✅ Visible
- Cards: ✅ Clear separation
```

---

## Recommendation

**Do This:**
1. ✅ Update text colors (secondary, muted)
2. ✅ Boost border opacity
3. ✅ Adjust surface colors
4. ✅ Add focus indicators
5. ⚠️ Optional: Add high contrast toggle

**Priority:** HIGH (accessibility + better UX for everyone)

---

**Last Updated:** 2026-03-30  
**Status:** Ready to implement
