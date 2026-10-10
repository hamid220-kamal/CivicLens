# CivicLens Frontend Assets

Complete asset library for CivicLens UI/UX mockups and design reference.

## Folder Structure

```
public/assets/
├── mockups/              # UI Mockups for all pages
│   ├── home/            # Landing page mockups
│   ├── citizen-report/  # Citizen report flow
│   ├── incident-tracking/ # Tracking interface
│   ├── authority-dashboard/ # Authority dashboard
│   ├── ai-workflow/     # AI triage workflow
│   └── components/      # Reusable UI components
├── icons/               # SVG & PNG icons
└── README.md            # This file
```

---

## 1. HOME PAGE (`mockups/home/`)

Landing page introducing the CivicLens platform to new users.

### Files:
- **home-desktop-hero.png** - Full desktop hero section with navigation
- **home-features.png** - Feature cards: Citizen Flow & Authority Dashboard
- **home-cta-section.png** - Call-to-action buttons and links
- **home-mobile.png** - Mobile responsive view
- **home-tablet.png** - Tablet responsive view

### Page Flow:
```
Navigation Bar
    ↓
Hero Section (CivicLens branding + description)
    ↓
Feature Overview (2 main flows)
    ↓
Get Started CTA
    ↓
Footer
```

### Key Components:
- Navigation: Logo, Links (Report, Track, Dashboard, Login)
- Hero: Large headline, subtext, hero image
- Feature Cards: Icons, titles, descriptions
- Buttons: Primary (Get Started), Secondary (Learn More)

### Design Guidelines:
- **Colors**: Dark theme (bg: #0F172A, text: #E2E8F0)
- **Accent**: Blue (#3B82F6)
- **Typography**: Large headlines (48px), readable body text (16px)
- **Responsive**: Mobile-first approach

---

## 2. CITIZEN REPORT FLOW (`mockups/citizen-report/`)

Multi-step workflow for citizens to report civic issues.

### Files:
- **step-1-camera-upload.png** - Photo capture/gallery selection
- **step-2-issue-details.png** - Issue description & category form
- **step-3-location-tagging.png** - GPS location picker
- **step-4-ai-classification.png** - AI triage suggestions
- **step-5-deduplication.png** - Similar incidents found (if any)
- **step-6-review-submit.png** - Final confirmation before submit
- **step-7-confirmation.png** - Success screen with incident ID

### Workflow Diagram:
```
Start
  ↓
[Camera Upload] ← Select photo from camera or gallery
  ↓
[GPS Location] ← Auto-detect or manual selection
  ↓
[Issue Details] ← Category, description, type
  ↓
[AI Triage] ← System analyzes and suggests
  ↓
[Deduplication] ← Check for similar incidents
  ↓
[Review] ← Confirm all details
  ↓
[Submit] → Incident created
  ↓
[Confirmation] ← Get tracking ID
```

### Key Components:
1. **Photo Upload Card**
   - Camera icon
   - "Take Photo" button
   - "Choose from Gallery" option
   - Image preview

2. **Issue Form**
   - Category dropdown
   - Description textarea
   - Issue type selector
   - Grounded RAG guidance panel (shows relevant policies)

3. **AI Triage Card**
   - AI-suggested category (with confidence %)
   - Priority level (Low/Medium/High/Critical)
   - Department routing suggestion
   - "This makes sense" / "Adjust" buttons

4. **Deduplication Alert** (if duplicate found)
   - "Similar incident found" message
   - Link to existing incident
   - Option to: Reference existing or Create new

5. **Review Checklist**
   - Photo preview
   - Category & description summary
   - Location confirmation
   - Submit button

6. **Success Screen**
   - ✓ Checkmark animation
   - Incident ID (e.g., "INC-2026-10-001234")
   - "Track Your Incident" link
   - "Back to Home" button

### Mobile Adaptations:
- **mobile-report-flow.png** - Stacked vertical layout
- Larger touch targets (44x44px minimum)
- Single-column layout
- Swipe navigation between steps

---

## 3. INCIDENT TRACKING (`mockups/incident-tracking/`)

Interface for citizens to track their submitted incidents.

### Files:
- **tracking-search.png** - Search by incident ID
- **tracking-details-full.png** - Complete incident view
- **tracking-status-timeline.png** - Status progression
- **tracking-comments.png** - Comments and updates section
- **tracking-related.png** - Related/deduplicated incidents
- **tracking-mobile.png** - Mobile view
- **tracking-notifications.png** - Notification preferences

### Page Layout:
```
Search Bar (Find by Incident ID)
    ↓
Incident Header (ID, Date, Status Badge)
    ↓
Photo Gallery / Incident Details
    ↓
Status Timeline
    ├── Submitted (✓)
    ├── Assigned to Dept (✓)
    ├── In Progress (→)
    └── Resolved (pending)
    ↓
Comments & Updates
    ↓
Related Incidents (if deduplicated)
    ↓
Share / Report Issue Button
```

### Key Components:
1. **Search Box**
   - Placeholder: "Enter incident ID (e.g., INC-2026-10-001234)"
   - Search button / Enter key
   - Recent searches

2. **Incident Status Card**
   - ID, submission date/time
   - Current status badge (color-coded)
   - Authority assigned to
   - Last update timestamp

3. **Photo/Media Section**
   - Gallery of submitted photos
   - Option to add comments to specific photos

4. **Timeline**
   - Step indicators with timestamps
   - Each step shows: Status, Department, Officer name
   - Collapsible detail sections

5. **Comments Section**
   - Citizen can add comments
   - Authority responses visible
   - Notification for new updates

6. **Related Incidents**
   - If incident was deduplicated
   - Shows link to "parent" incident
   - "View combined report" button

### Status Colors:
- **Submitted**: Blue (#3B82F6)
- **Assigned**: Purple (#8B5CF6)
- **In Progress**: Yellow (#F59E0B)
- **Resolved**: Green (#10B981)
- **Closed**: Gray (#6B7280)

---

## 4. AUTHORITY DASHBOARD (`mockups/authority-dashboard/`)

Comprehensive dashboard for municipal authorities to manage incidents.

### Files:
- **dashboard-overview.png** - Main dashboard with KPIs
- **dashboard-queue.png** - Incident queue/list view
- **dashboard-queue-mobile.png** - Mobile queue view
- **incident-detail-modal.png** - Incident detail popup
- **dashboard-analytics.png** - Analytics & reports
- **dashboard-heatmap.png** - Geographic incident distribution
- **dashboard-settings.png** - Configuration panel

### Dashboard Overview:
```
Top Navigation Bar
├── Logo / Department Name
├── Search
├── Notifications
└── User Profile
    ↓
KPI Cards Row (Quick Stats)
├── Pending: 45
├── Assigned: 23
├── In Progress: 15
├── Resolved (Today): 8
└── Response Time Avg: 2.3h
    ↓
Main Content (Tabbed Interface)
├── [Queue] [Analytics] [Settings] [Reports]
    ↓
Queue/List/Details (based on tab)
```

### Key Components:

#### 1. KPI Cards
```
┌─────────────────────┐
│  Pending Incidents  │
│        45           │
│    ↑ 2 from yesterday
└─────────────────────┘
```
- Pending, Assigned, In Progress, Resolved counts
- Daily change indicator
- Color-coded icons

#### 2. Incident Queue Table
```
ID       | Category      | Priority | Assigned | Status      | Updated
INC-1234 | Pothole       | HIGH     | John     | In Progress | 1h ago
INC-1233 | Flooding      | CRITICAL | Sarah    | Assigned    | 30m ago
INC-1232 | Streetlight   | LOW      | —        | Pending     | 2h ago
```
- Sortable columns
- Color-coded priority badges
- Quick action buttons (Assign, Close, View)
- Filter panel (Category, Priority, Status, Date range)

#### 3. Incident Detail Modal/Panel
```
Incident: INC-1234
Category: Pothole | Priority: HIGH
Status: In Progress

Photos:
[Image 1] [Image 2] [Image 3]

Location: [Map showing GPS pin]

Description:
Large pothole on Main Street causing traffic congestion...

Deduplication:
3 other similar reports found
├── INC-1225 (1.2 km away)
├── INC-1210 (500m away)
└── INC-1195 (800m away)

Assignment:
Currently: John Smith (john.smith@city.gov)
[Change Assignment] [Close Incident]

Comments:
City Officer: "Work order submitted..."
Citizen: "Any timeline?"
```

#### 4. Analytics Dashboard
- **Response Time Chart**: Line graph showing average response times by day
- **Category Breakdown**: Pie chart (Roads 40%, Utilities 25%, Other 35%)
- **Priority Distribution**: Bar chart (Low, Medium, High, Critical)
- **Department Performance**: Table with metrics per dept
- **Heatmap**: Geographic visualization of incidents
- **Trends**: Week-over-week comparison

#### 5. Settings Panel
- Department configuration (name, contact, hours)
- Team management (add/remove officers)
- Category mapping (custom categories)
- Notification preferences
- Integration settings

### Mobile Adaptations:
- Card-based layout instead of table
- Swipe actions (left: close, right: assign)
- Collapsible filters
- Simplified analytics (key metrics only)

---

## 5. AI WORKFLOW (`mockups/ai-workflow/`)

Visualization of the AI triage and classification system.

### Files:
- **workflow-step-1-input.png** - Issue input processing
- **workflow-step-2-classification.png** - Category classification
- **workflow-step-3-priority.png** - Priority scoring
- **workflow-step-4-dedup.png** - Deduplication check
- **workflow-step-5-routing.png** - Department routing
- **workflow-complete.png** - Complete flow diagram
- **rag-guidance.png** - RAG knowledge base panel

### AI Processing Flow:
```
┌─────────────────────────────────────────────────────────────┐
│ INPUT: User-submitted issue data                            │
│ • Photo, GPS location, description, category hint           │
└───────────────────┬─────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────────────────────────┐
│ CLASSIFICATION: AI analyzes and suggests category           │
│ • Pothole (confidence: 92%)                                 │
│ • Road Damage (confidence: 78%)                             │
│ • Other (confidence: 5%)                                    │
└───────────────────┬─────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────────────────────────┐
│ PRIORITY SCORING: Risk assessment using RAG knowledge       │
│ • Severity: HIGH (affects traffic, safety hazard)           │
│ • Urgency: MEDIUM (weather dependent)                       │
│ • Impact: HIGH (affects main road)                          │
│ → Priority Score: 85/100 = HIGH                             │
└───────────────────┬─────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────────────────────────┐
│ DEDUPLICATION: Check existing incident database             │
│ • Found 3 similar incidents within 500m                     │
│ • Suggested merge or reference                              │
└───────────────────┬─────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────────────────────────┐
│ ROUTING: Assign to responsible department                   │
│ • Department: Public Works                                  │
│ • Team Lead: Sarah Johnson                                  │
│ • Estimated time: 2-4 hours for inspection                  │
└───────────────────┬─────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────────────────────────┐
│ GROUNDED RAG GUIDANCE: Provide relevant policies             │
│ • Related Policy: "Road Maintenance Schedule Q4"            │
│ • Procedure: "Pothole Repair Standard Process"              │
│ • Similar Cases: "5 recent pothole repairs in area"         │
└─────────────────────────────────────────────────────────────┘
```

### Step-by-Step Visualizations:

**Step 1: Input Processing**
- Input box with issue description
- Extracted metadata (GPS, photo count, category hint)
- Processing indicator

**Step 2: Classification**
- AI thinking animation
- Multiple category options with confidence bars
- Top suggestion highlighted

**Step 3: Priority Scoring**
- Score breakdown (Severity, Urgency, Impact)
- Final priority level badge
- Reasoning explanation

**Step 4: Deduplication**
- List of similar incidents
- Distance/similarity percentage
- Action options: Reference, Merge, Create New

**Step 5: Routing**
- Department card with info
- Officer assignment
- Response time estimate

**RAG Guidance Panel**
- Knowledge base sources
- Relevant policies/procedures
- Similar past cases
- Citation/reference links

---

## 6. COMPONENTS (`mockups/components/`)

Reusable UI components library.

### Files:
- **buttons.png** - Button variants (Primary, Secondary, Danger, Disabled)
- **badges.png** - Status badges and tags
- **cards.png** - Card component variations
- **modals.png** - Modal/dialog variations
- **forms.png** - Form controls (input, select, textarea)
- **alerts.png** - Alert/notification messages
- **loading-states.png** - Spinners and skeleton screens
- **avatars.png** - User avatars and icons

### Component Specifications:

#### Buttons
```
Primary Button (Blue)
┌─────────────────┐
│  Get Started    │ Background: #3B82F6, Text: White
└─────────────────┘

Secondary Button (Gray)
┌─────────────────┐
│  Learn More     │ Background: transparent, Border: #6B7280
└─────────────────┘

Danger Button (Red)
┌─────────────────┐
│  Delete         │ Background: #EF4444, Text: White
└─────────────────┘

States: Normal, Hover, Active, Disabled
```

#### Status Badges
- **Pending**: Blue badge (#3B82F6)
- **Assigned**: Purple badge (#8B5CF6)
- **In Progress**: Yellow badge (#F59E0B)
- **Resolved**: Green badge (#10B981)
- **Closed**: Gray badge (#6B7280)

#### Cards
- Standard card with shadow
- Elevated card (more prominent)
- Outlined card (less prominent)
- Hoverable state
- Click states

#### Forms
- Text input fields
- Email inputs with validation
- Phone number inputs
- Textarea for long descriptions
- Select dropdowns
- Checkboxes
- Radio buttons
- Date pickers
- Multi-select

#### Modals
- Alert modal (icon + title + message + button)
- Confirmation modal (question + Cancel/Confirm buttons)
- Form modal (title + form fields + action buttons)
- Info modal (detailed information display)

---

## 7. ICONS (`icons/`)

SVG and PNG icons used throughout the application.

### Icon Categories:
- **Navigation**: Home, Dashboard, Settings, Notifications
- **Actions**: Plus, Edit, Delete, Save, Share
- **Status**: Checkmark, Alert, Error, Info
- **Categories**: Pothole, Flooding, Streetlight, Waste, etc.
- **Media**: Camera, Gallery, Map, Phone
- **Social**: GitHub, Twitter, Facebook

---

## Usage Guidelines

### Image Formats
- **Mockups**: PNG with transparency (ideal for documentation)
- **Production Assets**: Optimized PNG or WebP
- **Icons**: SVG (scalable, small file size)

### Responsive Sizes
- **Desktop**: 1440px wide (full width at standard resolution)
- **Tablet**: 768px wide (iPad size)
- **Mobile**: 375px wide (iPhone size)

### Color Values
```
Primary: #3B82F6 (Blue)
Success: #10B981 (Green)
Warning: #F59E0B (Yellow)
Danger: #EF4444 (Red)
Gray: #6B7280
Dark BG: #0F172A
Surface: #1E293B
Text Light: #E2E8F0
```

### Typography
- **Headlines**: 48px / 42px / 36px (h1, h2, h3)
- **Body**: 16px, 14px, 12px
- **Font Stack**: Inter, system fonts, sans-serif

### Spacing
- **Base unit**: 4px (multiples: 8, 12, 16, 24, 32, 48, 64)
- **Padding**: 16px (standard), 24px (large), 8px (small)
- **Margins**: 24px (between sections), 16px (between components)
- **Gaps**: 12px (between small items), 16px (between medium items)

---

## Implementation

### Import in Components
```tsx
// Home page hero image
import Image from 'next/image'

<Image
  src="/assets/mockups/home/home-desktop-hero.png"
  alt="CivicLens Hero"
  width={1440}
  height={600}
  priority
/>
```

### CSS Classes (Tailwind)
```tsx
// Common patterns
className="bg-slate-900 text-slate-200 rounded-lg border border-slate-800"
className="bg-blue-500/10 border border-blue-500/20 text-blue-400"
className="hover:bg-slate-800 transition-colors duration-200"
```

---

## Design Principles

1. **Clarity**: Information hierarchy makes content scannable
2. **Consistency**: Repeated patterns for recognition
3. **Contrast**: Good visibility for all users
4. **Responsiveness**: Works on all device sizes
5. **Accessibility**: WCAG 2.1 AA compliant
6. **Performance**: Optimized images, lazy loading

---

**Last Updated**: October 10, 2026
**Version**: 1.0
**Maintained by**: CivicLens Team
