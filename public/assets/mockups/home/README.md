# Home Page Mockups

## Desktop View: `home-desktop-hero.png`

**Dimensions**: 1440x1200px

### Layout Structure:
```
┌─────────────────────────────────────────────────────────────────┐
│                      NAVIGATION BAR (80px)                       │
│  CivicLens Logo    |    Report  |  Track  |  Dashboard  |  Login │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│                    HERO SECTION (400px)                          │
│                                                                   │
│      ┌────────────────────────────────────────┐                 │
│      │  Civic Intelligence Platform (Badge)   │                 │
│      └────────────────────────────────────────┘                 │
│                                                                   │
│              CivicLens (Large Heading)                           │
│                                                                   │
│   AI-assisted civic issue classification & routing              │
│                                                                   │
├─────────────────────────────────────────────────────────────────┤
│                   FEATURE CARDS SECTION                          │
│                                                                   │
│   ┌──────────────────────┐    ┌──────────────────────┐          │
│   │ 📸 Citizen Flow      │    │ 📊 Authority Dash   │          │
│   │                      │    │                      │          │
│   │ Photo capture, GPS   │    │ Deduplicated issues,│          │
│   │ tagging, AI triage   │    │ priority scoring    │          │
│   │                      │    │                      │          │
│   │  [Get Started]       │    │  [Access Dashboard] │          │
│   └──────────────────────┘    └──────────────────────┘          │
│                                                                   │
└─────────────────────────────────────────────────────────────────┘
```

### Visual Design:
- **Background**: Dark navy (#0F172A)
- **Navigation**: Slightly lighter surface (#1E293B)
- **Accent Color**: Blue (#3B82F6)
- **Text**: Light gray (#E2E8F0)

### Typography:
- Main Logo: Bold, 32px, Blue
- Heading: Bold, 48px, Light Gray
- Subheading: Regular, 18px, Medium Gray
- Card Titles: Bold, 20px, Light Gray
- Button Text: Bold, 14px, White

### Responsive Variants:

#### Tablet (768px):
- Feature cards stack with reduced margin
- Heading reduces to 36px
- Navigation items remain visible

#### Mobile (375px):
- Single column layout
- Feature cards full width, stacked vertically
- Hamburger menu for navigation
- Heading: 28px
- Smaller padding/margins

---

## Tablet View: `home-tablet.png`

**Dimensions**: 768x1200px

Same content as desktop but optimized for tablet viewing with adjusted spacing and font sizes.

---

## Mobile View: `home-mobile.png`

**Dimensions**: 375x1400px

Fully responsive mobile layout with:
- Collapsed navigation (hamburger menu icon)
- Single column layout
- Full-width feature cards
- Larger touch targets

---

## Component Details

### Navigation Bar
```
Height: 80px
Background: #1E293B
Border-bottom: 1px solid #334155

Left Side:
  Logo: "CivicLens" (32px, Bold, Blue)

Right Side (Desktop):
  Report | Track | Dashboard | Login
  (14px, Regular, Medium Gray)

Mobile:
  ≡ (Hamburger menu icon)
```

### Hero Badge
```
Background: rgba(59, 130, 246, 0.1)
Border: 1px solid rgba(59, 130, 246, 0.2)
Padding: 8px 16px
Border-radius: 24px
Text: "CIVIC INTELLIGENCE PLATFORM" (12px, uppercase, Blue)
```

### Feature Cards
```
Width: 300px (desktop), full width (mobile)
Height: 200px
Background: #1E293B
Border: 1px solid #334155
Border-radius: 8px
Padding: 24px

Card Content:
  Icon: 32px emoji or SVG
  Title: 20px, Bold, Light Gray
  Description: 14px, Regular, Medium Gray
  Button: 14px, Bold, Blue

Hover State (Desktop):
  Background: #0F172A
  Border-color: #475569
  Transition: 200ms
```

### Buttons

#### Primary Button (Get Started / Access Dashboard)
```
Width: 280px
Height: 40px
Background: #3B82F6
Border: none
Border-radius: 6px
Color: White
Font: 14px, Bold
Cursor: pointer

Hover:
  Background: #60A5FA
  Transition: 150ms

Active:
  Background: #1E40AF
  Box-shadow: inset 0 2px 4px rgba(0,0,0,0.2)
```

#### Secondary Button (Learn More)
```
Width: 280px
Height: 40px
Background: transparent
Border: 1px solid #475569
Border-radius: 6px
Color: #94A3B8
Font: 14px, Bold

Hover:
  Background: rgba(100, 116, 139, 0.1)
  Border-color: #64748B
```

### Color Palette Reference
```
Dark Background: #0F172A
Surface: #1E293B
Border: #334155
Text Primary: #E2E8F0
Text Secondary: #94A3B8
Primary (Blue): #3B82F6
Blue Light: #60A5FA
Blue Dark: #1E40AF
```

---

## Implementation Example

```tsx
// React/Next.js implementation
export default function HomePage() {
  return (
    <main className="min-h-screen bg-slate-950">
      {/* Navigation */}
      <nav className="bg-slate-900 border-b border-slate-800 h-20 px-6 flex items-center justify-between">
        <span className="text-blue-500 font-bold text-2xl">CivicLens</span>
        <div className="hidden md:flex gap-8 text-slate-400">
          <a href="#report">Report</a>
          <a href="#track">Track</a>
          <a href="#dashboard">Dashboard</a>
          <a href="#login">Login</a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-20 pb-20 px-6 text-center">
        <div className="inline-block rounded-full bg-blue-500/10 px-4 py-2 text-xs font-semibold uppercase text-blue-400 border border-blue-500/20 mb-8">
          Civic Intelligence Platform
        </div>
        
        <h1 className="text-5xl md:text-6xl font-bold text-slate-100 mb-6">
          CivicLens
        </h1>
        
        <p className="text-xl text-slate-400 mb-12 max-w-2xl mx-auto">
          AI-assisted civic issue classification and routing
        </p>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-2xl mx-auto">
          <div className="border border-slate-800 bg-slate-900/50 p-6 rounded-lg hover:bg-slate-800 transition">
            <h3 className="text-lg font-semibold text-slate-200 mb-3">📸 Citizen Flow</h3>
            <p className="text-sm text-slate-400 mb-6">Photo capture, GPS tagging, AI-powered triage</p>
            <button className="w-full bg-blue-500 text-white py-2 rounded font-semibold hover:bg-blue-600">
              Get Started
            </button>
          </div>

          <div className="border border-slate-800 bg-slate-900/50 p-6 rounded-lg hover:bg-slate-800 transition">
            <h3 className="text-lg font-semibold text-slate-200 mb-3">📊 Authority Dashboard</h3>
            <p className="text-sm text-slate-400 mb-6">Deduplicated incidents, priority scoring</p>
            <button className="w-full bg-blue-500 text-white py-2 rounded font-semibold hover:bg-blue-600">
              Access Dashboard
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
```

---

**Last Updated**: October 10, 2026
**Design Version**: 1.0
**Status**: Reference Mockup
