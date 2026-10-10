# CivicLens Frontend Testing Guide

## 🚀 Dev Server Status

**Server Running:** ✅ http://localhost:3001  
**Port:** 3001 (3000 was in use)  
**Build Status:** Compiling...

---

## 🔧 Design Issues Fixed This Session

### Issue #1: Dark Background Override
**Problem:** Layout.tsx had `bg-slate-950 text-slate-50` which forced dark mode on the entire app, overriding the light Stitch design system.

**Fix Applied:**
```tsx
// BEFORE: ❌ Dark theme override
<body className="antialiased bg-slate-950 text-slate-50 min-h-screen">

// AFTER: ✅ Light theme from Stitch design tokens
<body className="antialiased bg-background text-on-surface min-h-screen">
```

**Result:** Now uses the proper light-theme colors from Tailwind config:
- Background: `#faf8ff` (light purple-white)
- On-Surface: `#131b2e` (dark navy text)
- All semantic tokens properly applied

### Issue #2: Dark Mode Config
**Status:** ✅ Already Fixed
- Tailwind `darkMode: false` ensures no class-based dark mode CSS variants
- Light theme is the only theme in the design system

---

## 📋 What You're Currently Seeing

### Pages Available to View:

1. **Home Page** (`http://localhost:3001/`)
   - ✅ Hero section with phone mockup
   - ✅ 4-step process flow
   - ✅ Trust badges (FHWA, Municipal Code, AASHTO)
   - ✅ Recent incidents showcase
   - ✅ CTA banner
   - ✅ Footer with links

2. **Track Incident Page** (`http://localhost:3001/track`)
   - ✅ Incident timeline (5 lifecycle stages)
   - ✅ Compliance accordion (FHWA/Municipal/AASHTO standards)
   - ✅ Evidence gallery with photo preview
   - ✅ Incident metrics (priority gauge, SLA countdown)
   - ✅ Department assignment
   - ✅ Community upvote system
   - ✅ Duplicate incident banner

3. **Style Guide** (`http://localhost:3001/style-guide`)
   - ✅ Color system showcase (all design tokens)
   - ✅ Typography specimens (all font sizes/weights)
   - ✅ Component examples
   - ✅ Interactive color swatches

---

## 🎨 Design System Verified

### Colors (All Light Theme):
- **Primary:** `#00288e` (Navy Blue)
- **Secondary:** `#006a61` (Teal)
- **Tertiary:** `#611e00` (Brown/Orange)
- **Error:** `#ba1a1a` (Red)
- **Surface:** `#faf8ff` (Light Purple-White)
- **Background:** `#faf8ff` (Light Purple-White)

### Typography:
- **Headlines:** Inter Bold, sizes 18px → 36px
- **Body:** Inter Regular/Semibold, 14px-18px
- **Labels:** Inter Semibold/Medium, 12px-14px

### Spacing System:
- **xs:** 0.25rem
- **sm:** 0.5rem
- **md:** 1rem
- **lg:** 1.5rem
- **xl:** 2.5rem

### Border Radius:
- **DEFAULT:** 0.25rem
- **lg:** 0.5rem
- **xl:** 0.75rem
- **full:** 9999px

---

## 📊 Current Frontend Status

### ✅ Complete (Pushed to `feat/frontend-ui`):
- Home page (full design, responsive)
- Track incident page (full design, responsive)
- Style guide page (design tokens showcase)
- 13+ UI components
- Tailwind design system configuration
- WCAG 2.1 AA compliance setup
- Mobile-first responsive design (390px → desktop)

### ❌ Still Missing (Required for MVP):
- Citizen report form (`/report`) - NO photo upload or GPS
- Authority dashboard (`/dashboard`) - NO incident queue
- Supabase integration - NO storage or database
- API integration - Forms don't connect to triage endpoints
- Authentication - NO login/signup pages
- Real data - Everything uses mock/placeholder data

---

## 🧪 Testing Recommendations

1. **Visual Check:**
   - Visit http://localhost:3001/
   - Check colors match light theme (NOT dark)
   - Verify text is readable (dark navy on light purple-white)
   - Test on mobile (responsive grid should stack)

2. **Component Check:**
   - Timeline renders 5 stages correctly
   - Compliance accordion expands/collapses (client-side)
   - Badge styling is consistent
   - Cards have proper shadows and spacing

3. **Navigation:**
   - Click "Track Incident" button from home
   - Breadcrumbs work and navigate properly
   - Links in footer work

4. **Responsive:**
   - Open DevTools (F12)
   - Test at 390px (mobile) and desktop
   - Grids should reflow correctly
   - Text should be readable at all sizes

---

## 🐛 Known Issues & Workarounds

### Port Conflict
- **Issue:** Port 3000 was already in use
- **Solution:** Dev server auto-fallback to 3001
- **Access:** http://localhost:3001 ✅

### Placeholder Data
- All incidents, timelines, and metrics use mock data
- Real data integration requires Supabase connection (Task #4)

---

## 📝 Next Steps

To complete the MVP frontend:

1. **Build `/report` page** - Citizen submission form with:
   - Photo upload with camera picker
   - GPS geolocation capture
   - Issue categorization
   - Form submission state management

2. **Build `/dashboard` page** - Authority management with:
   - Real incidents from Supabase
   - Priority sorting
   - Status filters
   - Batch operations

3. **Add authentication** - Login/signup for citizen & authority roles

4. **Connect APIs** - Link to Hamid's endpoints:
   - `POST /api/triage` - AI classification
   - `POST /api/match` - Duplicate detection

---

## 🛠 Build & Dev Commands

```bash
# Start dev server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linter
npm run lint

# Format code
npm run format
```

---

**Last Updated:** October 10, 2026 at context initialization  
**Branch:** `feat/frontend-ui` (all changes committed and pushed)  
**Next Session:** Complete remaining pages + API integration
