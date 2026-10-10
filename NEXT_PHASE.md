# CivicLens - Next Phase Implementation Plan

**Phase**: Task 2-6 (Supabase Integration + Report Form + API Connection + Dashboard)  
**Status**: Ready to Start  
**Development Server**: ✅ Running on http://localhost:3000

---

## 🎯 Overview

You've completed the design system and UI foundation. Now we need to build the functional features that connect the frontend to the backend APIs and Supabase.

---

## 📋 Detailed Next Tasks

### Task 2: Supabase Browser Client & Storage Upload Helper

**Files to Create/Modify:**
- `src/lib/supabaseClient.ts` (NEW)
- Update `.env.local` with your credentials

**What to Build:**
```typescript
// src/lib/supabaseClient.ts should export:
- createClient() with your NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY
- uploadToStorage(file, bucket, path) → returns public URL
- getReports() → fetches from reports table
- saveReport(reportData) → saves to reports table
```

**Verification:**
- Test upload in browser console
- Confirm public URL is accessible
- Verify file appears in Supabase Storage dashboard

**Estimated Time**: 30 minutes

---

### Task 3: Citizen Report Form UI with GPS

**Files to Create/Modify:**
- `src/app/report/page.tsx` (NEW)
- `src/components/ReportForm.tsx` (NEW)
- `src/app/report/layout.tsx` (NEW, optional)

**What to Build:**
1. Report form page wrapper
2. Photo upload component:
   - Camera input (mobile)
   - File picker (desktop)
   - Live preview thumbnail
3. GPS capture:
   - "Capture Location" button
   - Uses `navigator.geolocation`
   - Shows coordinates or "Getting location..."
4. Description field:
   - Optional text area
   - Character counter
5. Form validation:
   - Photo required
   - GPS required
   - Description optional
6. Submit button:
   - Disabled while loading
   - Shows progress

**Verification:**
- Click location button → coordinates populate
- Select photo → preview displays
- Form validates before submit
- Mobile camera picker works on device

**Estimated Time**: 1 hour

---

### Task 4: Connect Triage API & Display Receipt

**Files to Create/Modify:**
- `src/components/TriageReceipt.tsx` (NEW)
- Modify `src/app/report/page.tsx` to:
  - Upload photo to Supabase Storage
  - Call `POST /api/triage` with image URL + coordinates
  - Save report to `reports` table
  - Display receipt

**What to Build:**
1. On form submit:
   ```
   Step 1: Upload photo → get public URL
   Step 2: Call POST /api/triage(imageUrl, lat, lng)
   Step 3: Save report to Supabase
   Step 4: Display TriageReceipt component
   ```

2. Receipt component displays:
   - Issue type (e.g., "Pothole")
   - Severity badge (low/medium/high/critical)
   - Priority score (1-10)
   - Recommended department
   - SLA hours
   - AI explanation
   - Clickable citations with source links

3. Error handling:
   - Upload failures
   - API errors
   - Network timeouts
   - Toast notifications

**Verification:**
- Submit real photo with location
- See receipt with AI classification
- Citations are clickable and link to sources
- Report appears in Supabase `reports` table

**Estimated Time**: 1.5 hours

---

### Task 5: Authority Dashboard View

**Files to Create/Modify:**
- `src/app/dashboard/page.tsx` (NEW)
- `src/components/IncidentCard.tsx` (NEW, or modify existing)
- `src/components/DashboardFilters.tsx` (NEW, optional)

**What to Build:**
1. Dashboard layout:
   - Header with title
   - Filter section (status, priority, date)
   - Reports grid/list view

2. Fetch logic:
   ```typescript
   - Get all reports from Supabase
   - Filter by status (open, in_review, resolved)
   - Sort by priority score
   - Paginate if needed
   ```

3. Incident card displays:
   - Thumbnail photo
   - Issue type + severity badge
   - Priority score
   - Location
   - Submitted time
   - Status
   - "Related Incidents" count (from /api/match)

4. Interactivity:
   - Click card → view full details
   - Filter by status
   - Sort by priority
   - Empty state message

**Verification:**
- New reports appear on dashboard
- Filters work correctly
- Cards show all relevant info
- Related incidents count updates

**Estimated Time**: 1.5 hours

---

### Task 6: Duplicate Candidate Badges

**Files to Modify:**
- `src/components/IncidentCard.tsx`

**What to Build:**
1. When displaying a card, call `POST /api/match`:
   ```typescript
   POST /api/match
   {
     issueType: "Pothole",
     latitude: 17.4399,
     longitude: 78.4983,
     reportId: "report-123"
   }
   ```

2. If `hasCandidates: true`:
   - Show alert badge: "Possible Duplicate (Nearby)"
   - Display candidate IDs
   - Show distances

3. If `hasCandidates: false`:
   - Show nothing (or optional badge: "No duplicates")

**Verification:**
- Submit two similar reports nearby
- Second report shows duplicate candidate badge
- Shows first report ID and distance

**Estimated Time**: 45 minutes

---

## 🔄 Recommended Workflow

1. **Start with Task 2** (Supabase setup)
   - This is the foundation
   - Everything else depends on it

2. **Build Task 3** (Report form)
   - Visual component, easy to test
   - No backend dependencies yet

3. **Connect Task 4** (Triage API)
   - Now connect to Hamid's backend
   - Verify API contract works

4. **Build Task 5** (Dashboard)
   - Fetch from Supabase
   - Display reports

5. **Add Task 6** (Duplicates)
   - Polish with duplicate detection

---

## 🧪 Testing Strategy

### Local Testing
1. Open http://localhost:3000
2. Navigate to `/report` page
3. Submit a test report
4. Verify receipt displays correctly
5. Check Supabase dashboard for new report
6. Go to `/dashboard`
7. Verify report appears in list

### With Real APIs
1. Get Supabase credentials
2. Get Gemini API key
3. Test full flow end-to-end
4. Verify citations are real

---

## 📚 Key Reference Files

- **API Contract**: `docs/SYED_TASKS.md` (Section 3)
- **Frontend Spec**: `docs/FRONTEND_PAGES.md`
- **Types**: `src/lib/types/api.ts` (check for interfaces)
- **Design System**: `public/assets/README.md`
- **Existing Components**: `src/components/` (reuse patterns)

---

## ⚡ Quick Start Commands

```bash
# Dev server already running
# Just open http://localhost:3000

# If you need to restart:
npm run dev

# To build for production:
npm run build

# To check TypeScript:
npm run lint
```

---

## 📝 Git Workflow

As you complete each task:

```bash
# Make your changes in src/app or src/components

# Stage your changes
git add src/

# Commit with descriptive message
git commit -m "feat: add report form with GPS capture"

# Push to feat/frontend-ui branch
git push origin feat/frontend-ui
```

---

## ✅ Completion Criteria

**MVP Requirements** (from SYED_TASKS.md Section 6):
- ✅ Citizen submits photo + location + description
- ✅ Image stored in Supabase
- ✅ Report saved in database
- ✅ Backend analyzes with Gemini AI
- ✅ RAG retrieves civic sources
- ✅ Receipt displays classification + citations
- ✅ Duplicate detection shows candidates
- ✅ Dashboard displays all reports
- ✅ Proper error handling
- ✅ Real data, not fabricated output

---

## 🚀 Ready to Start?

Everything is set up:
- ✅ Design system complete
- ✅ Dev server running
- ✅ Dependencies installed
- ✅ Git branch ready
- ✅ Documentation available

**Next Step**: Start Task 2 (Supabase Client) and work through each task sequentially.

Let me know when you're ready to begin! 💪
