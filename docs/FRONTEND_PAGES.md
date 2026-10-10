# CivicLens Frontend Pages & Workflows

## Overview
Complete frontend specification for CivicLens including all pages, components, workflows, and UI sections.

---

## 1. HOME PAGE (`/`)
**Purpose:** Landing page introducing CivicLens platform

### Key Sections:
- Hero banner with platform description
- Feature cards (Citizen Flow, Authority Dashboard)
- Call-to-action buttons
- Platform benefits overview

**Mockup Location:** `docs/mockups/01-home/`
**Components:** Hero, FeatureCard, CTAButton

---

## 2. CITIZEN FLOW - INCIDENT REPORTING (`/report`)
**Purpose:** Allow citizens to submit civic issues with photo, location, and description

### Key Sections:
- Photo upload with camera integration
- GPS location tagging
- Issue category selection
- Description input
- Issue type classification (with AI-powered triage)
- Preview before submission
- Confirmation screen

**Workflow:**
1. User clicks "Report Issue"
2. Camera/Gallery photo selection
3. Auto GPS detection
4. Issue categorization (AI-suggested)
5. Description with grounded RAG guidance
6. Review and submit
7. Get incident ID for tracking

**Mockup Location:** `docs/mockups/02-citizen-report/`
**Components:** PhotoUpload, LocationPicker, CategorySelect, AITriage, ConfirmationPage

---

## 3. INCIDENT TRACKING (`/track`)
**Purpose:** Citizens can track their submitted incidents

### Key Sections:
- Incident search by ID
- Status timeline
- Authority assignment
- Community comments
- Related incidents (deduplicated)
- Push notifications status

**Mockup Location:** `docs/mockups/03-incident-tracking/`
**Components:** IncidentCard, StatusTimeline, Comments, RelatedIncidents

---

## 4. AUTHORITY DASHBOARD (`/authority`)
**Purpose:** Dashboard for municipal authorities to manage incidents

### Key Sections:
- Deduplicated incident queue
- Priority scoring
- Filtering & sorting
- Incident routing to departments
- Batch operations
- Analytics & metrics

**Sub-pages:**
### 4.1 Incident Queue (`/authority/queue`)
- List view with priority badges
- Quick-view details modal
- Bulk assign/close operations
- Filter by: category, priority, assigned_to, status

### 4.2 Incident Details (`/authority/incident/:id`)
- Full incident information
- Attached photos
- Deduplication info (related incidents)
- Comment/update history
- Assignment workflow
- Resolution tracking

### 4.3 Analytics & Reports (`/authority/analytics`)
- Response time metrics
- Category-wise breakdown
- Geographic heatmap
- Department performance
- Trend analysis

### 4.4 Settings (`/authority/settings`)
- Department configuration
- Team management
- Category mapping
- Notification preferences

**Mockup Location:** `docs/mockups/04-authority-dashboard/`
**Components:** IncidentCard, PriorityBadge, QueueTable, DetailModal, AnalyticsChart, MapView

---

## 5. AI TRIAGE WORKFLOW
**Purpose:** Intelligent classification and routing

### Steps:
1. **Input Processing:** Extract issue description + metadata
2. **Category Classification:** AI assigns category
3. **Priority Scoring:** Risk assessment using RAG knowledge
4. **Deduplication Check:** Find similar incidents
5. **Department Routing:** Suggest responsible authority
6. **Grounded Guidance:** Provide relevant policy/procedure references

**Mockup Location:** `docs/mockups/05-ai-workflow/`

---

## 6. DEDUPLICATION WORKFLOW
**Purpose:** Prevent duplicate incident submissions

### Process:
1. User submits new incident
2. System checks against existing incidents
3. If similar found: Show prompt to reference existing incident
4. Update existing incident with new report data
5. Link citizen comment to existing incident

**Mockup Location:** `docs/mockups/06-deduplication/`

---

## 7. NOTIFICATION CENTER (`/notifications`)
**Purpose:** Manage all notifications for citizens and authorities

### Sections:
- Unread notifications list
- Notification preferences
- Push notification settings
- Email digest options
- Archive

**Mockup Location:** `docs/mockups/07-notifications/`

---

## 8. ADMIN PANEL (`/admin`)
**Purpose:** System administration and configuration

### Sections:
- User management
- Authority/Department management
- Category & severity configuration
- RAG knowledge base management
- System logs & monitoring
- Data export

**Mockup Location:** `docs/mockups/08-admin/`

---

## AUTHENTICATION PAGES

### 8.1 Login (`/login`)
- Email/password login
- Social login (Google, etc.)
- Role-based access (Citizen/Authority/Admin)

**Mockup Location:** `docs/mockups/09-auth/login/`

### 8.2 Signup (`/signup`)
- Registration form
- Role selection
- Email verification
- Department/Authority association (for staff)

**Mockup Location:** `docs/mockups/09-auth/signup/`

### 8.3 Password Reset (`/reset-password`)
- Email-based reset flow
- Token validation
- New password form

**Mockup Location:** `docs/mockups/09-auth/reset/`

---

## COMPONENT LIBRARY

### Common Components:
- **Button:** Primary, Secondary, Danger variants
- **Card:** Standard, Elevated, Outlined
- **Modal:** Alert, Confirmation, Form
- **Input:** Text, Email, Phone, Number, TextArea
- **Select:** Dropdown, Multi-select
- **DatePicker:** Date & time selection
- **Badge:** Status badges (Pending, Active, Resolved, etc.)
- **Avatar:** User profile pictures
- **Tabs:** Tab navigation
- **Breadcrumb:** Navigation path
- **Toast/Alert:** Notifications
- **Spinner/Loader:** Loading states

**Mockup Location:** `docs/mockups/10-components/`

---

## RESPONSIVE DESIGN

### Breakpoints:
- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

### Key Responsive Behaviors:
- Sidebar collapse on mobile
- Stack cards vertically on small screens
- Hamburger menu on mobile
- Touch-friendly button sizes (min 44x44px)

---

## COLOR SCHEME & THEME

**Primary Colors:**
- Blue: `#3B82F6`
- Green (Success): `#10B981`
- Red (Danger): `#EF4444`
- Yellow (Warning): `#F59E0B`
- Gray (Neutral): `#6B7280`

**Dark Theme:**
- Background: `#0F172A`
- Surface: `#1E293B`
- Text: `#E2E8F0`

---

## ACCESSIBILITY

- WCAG 2.1 AA compliance
- Keyboard navigation support
- Screen reader compatibility
- High contrast mode support
- Focus indicators

---

## PERFORMANCE OPTIMIZATION

- Code splitting per page
- Image optimization & lazy loading
- Caching strategies
- API response optimization
- Bundle size monitoring

---

**Last Updated:** October 10, 2026
**Mockups Location:** `docs/mockups/`
**All mockup images organized by page section**
