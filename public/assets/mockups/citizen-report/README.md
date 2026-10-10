# Citizen Report Flow Mockups

Complete multi-step workflow for citizens to report civic issues with AI-powered triage.

---

## Step 1: Camera Upload

**File**: `step-1-camera-upload.png` | **Dimensions**: 1440x900px

### Layout:
```
┌────────────────────────────────────────────────────────────────┐
│ Report Civic Issue - Step 1 of 7          [Progress: 14%]     │
├────────────────────────────────────────────────────────────────┤
│                                                                  │
│                  📷 Upload Photo                                │
│                                                                  │
│         ┌─────────────────────────────┐                        │
│         │  Choose from Gallery         │                        │
│         │  (or take new photo)         │                        │
│         └─────────────────────────────┘                        │
│                                                                  │
│         ┌─────────────────────────────┐                        │
│         │  Take New Photo              │                        │
│         │  (or select multiple)        │                        │
│         └─────────────────────────────┘                        │
│                                                                  │
│  Permission required: Camera access and photo library         │
│                                                                  │
└────────────────────────────────────────────────────────────────┘
```

### Components:
- **Header**: "Report Civic Issue - Step 1 of 7"
- **Progress Bar**: 14% filled (1/7)
- **Icon**: Large camera emoji (📷)
- **Primary Button**: "Choose from Gallery" - Blue (#3B82F6)
- **Secondary Button**: "Take New Photo" - Blue border, transparent bg

### States:
- **Initial**: Both buttons enabled
- **On Click Gallery**: Opens file picker
- **On Click Camera**: Requests camera permission
- **Image Selected**: Shows preview and next button

### Mobile Adaptation:
- Buttons stack vertically, full width
- Centered layout
- Larger touch targets (48px height)

---

## Step 2: Issue Details

**File**: `step-2-issue-details.png` | **Dimensions**: 1440x1000px

### Layout:
```
┌────────────────────────────────────────────────────────────────┐
│ Report Civic Issue - Step 2 of 7          [Progress: 29%]     │
├────────────────────────────────────────────────────────────────┤
│                                                                  │
│ Category                                                         │
│ ┌──────────────────────────────────────────┐                  │
│ │ Select category...                    ▼ │ ← Dropdown       │
│ └──────────────────────────────────────────┘                  │
│                                                                  │
│ Description                                                      │
│ ┌──────────────────────────────────────────┐                  │
│ │ Describe the issue in detail...          │                  │
│ │                                          │                  │
│ │ (Multi-line text input)                  │                  │
│ │                                          │                  │
│ └──────────────────────────────────────────┘                  │
│                                                                  │
│ Photo Preview:                                                   │
│ ┌─────────────────────────────────────────┐                   │
│ │ [Image Thumbnail]                       │                   │
│ └─────────────────────────────────────────┘                   │
│                                                                  │
│                                                                  │
│  [← Back]                              [Continue →]            │
│                                                                  │
└────────────────────────────────────────────────────────────────┘
```

### Form Fields:

#### Category Dropdown
```
Label: "Category"
Placeholder: "Select category..."
Options:
  • Pothole/Road Damage
  • Flooding/Water Issues
  • Streetlight/Lighting
  • Waste Management
  • Public Amenity
  • Other
Default: None (required)
```

#### Description Textarea
```
Label: "Description"
Placeholder: "Describe the issue in detail..."
Min Height: 120px
Max Length: 1000 characters
Character Counter: "450/1000"
Validation: Required, min 20 characters
```

#### Photo Preview
```
Thumbnail: 300x200px
Option: Click to change photo
Badge: "1/1 photo"
```

### Navigation:
- **Back Button**: Returns to Step 1
- **Continue Button**: Validates and goes to Step 3
- **Validation**: Category and description required

### Mobile Adaptation:
- Full-width inputs
- Stacked layout
- Larger textarea (taller)
- Buttons full width

---

## Step 3: Location Tagging

**File**: `step-3-location-tagging.png` | **Dimensions**: 1440x900px

### Layout:
```
┌────────────────────────────────────────────────────────────────┐
│ Report Civic Issue - Step 3 of 7          [Progress: 43%]     │
├────────────────────────────────────────────────────────────────┤
│                                                                  │
│ Select Location                                                  │
│                                                                  │
│ ┌────────────────────────────────────────────────────────────┐ │
│ │                                                              │ │
│ │               MAP VIEW (Google Maps)                        │ │
│ │                                                              │ │
│ │                    📍 Current Location                      │ │
│ │                      (Marker Pin)                           │ │
│ │                                                              │ │
│ └────────────────────────────────────────────────────────────┘ │
│                                                                  │
│ Coordinates: 40.7128° N, 74.0060° W                            │
│ Address: Main Street, New York, NY 10001                       │
│                                                                  │
│ ┌─ [✓] Auto-detected GPS                                      │
│ ├─ [  ] Manual selection                                       │
│                                                                  │
│  [← Back]                              [Continue →]            │
│                                                                  │
└────────────────────────────────────────────────────────────────┘
```

### Components:
- **Map**: Google Maps embedded (600x400px)
- **Marker**: Pin showing current location
- **GPS Permission**: Request if not granted
- **Coordinates Display**: Lat/Long with address lookup
- **Options**: Auto-detected toggle or manual selection

### Functionality:
- Auto-detect GPS coordinates on load
- Show address using reverse geocoding
- Allow manual pin placement on map
- Show address field for manual entry
- Save coordinates with issue

### Mobile Adaptation:
- Full-width map
- Smaller height (300px)
- Touch-friendly marker controls

---

## Step 4: AI Classification

**File**: `step-4-ai-classification.png` | **Dimensions**: 1440x1000px

### Layout:
```
┌────────────────────────────────────────────────────────────────┐
│ Report Civic Issue - Step 4 of 7          [Progress: 57%]     │
├────────────────────────────────────────────────────────────────┤
│                                                                  │
│ AI Classification Results                                        │
│                                                                  │
│ ⚙️ Analyzing your report...                                    │
│                                                                  │
│ Category Suggestions:                                            │
│                                                                  │
│ ┌─ Primary Suggestion ─────────────────────────────────────┐  │
│ │                                                            │  │
│ │ 🛣️  Pothole/Road Damage                                 │  │
│ │ Confidence: 92%                                          │  │
│ │ ████████████░░░░░ 92%                                   │  │
│ │                                                            │  │
│ │ Based on: Photo analysis, GPS location, description     │  │
│ │                                                            │  │
│ │ [✓] This looks correct   [✏️ Adjust]                    │  │
│ └─────────────────────────────────────────────────────────┘  │
│                                                                  │
│ Alternative Suggestions:                                         │
│ • Road Surface Damage (84%)                                     │
│ • Traffic Hazard (76%)                                          │
│                                                                  │
│ Priority Assessment: HIGH (Safety Risk)                         │
│                                                                  │
│  [← Back]                              [Continue →]            │
│                                                                  │
└────────────────────────────────────────────────────────────────┘
```

### AI Results Display:

#### Primary Suggestion Card
```
Background: Blue tint (#3B82F6 with 0.1 opacity)
Border: Blue (#3B82F6)
Padding: 24px
Border-radius: 8px

Content:
  Icon: Category emoji (🛣️)
  Title: "Pothole/Road Damage" (Bold, 18px)
  Confidence: "92%"
  Confidence Bar: Visual bar with %
  Explanation: "Based on: Photo analysis, GPS location, description"
  Actions: "This looks correct" | "Adjust"
```

#### Priority Badge
```
Background: Color-coded by priority
HIGH: #EF4444 (Red)
MEDIUM: #F59E0B (Yellow)
LOW: #10B981 (Green)
Icon: ⚠️
Text: "Priority Assessment: HIGH (Safety Risk)"
```

### User Actions:
- **"This looks correct"**: Accept AI suggestion, go to next step
- **"Adjust"**: Show alternative categories to choose from
- **Back**: Return to Step 3

### Loading State:
- Animation: "Analyzing your report..."
- Spinner or skeleton cards

---

## Step 5: Deduplication Check

**File**: `step-5-deduplication.png` | **Dimensions**: 1440x900px

### Layout (If Duplicates Found):
```
┌────────────────────────────────────────────────────────────────┐
│ Report Civic Issue - Step 5 of 7          [Progress: 71%]     │
├────────────────────────────────────────────────────────────────┤
│                                                                  │
│ ⚠️  Similar Incidents Found                                   │
│                                                                  │
│ We found 3 incidents similar to your report:                   │
│                                                                  │
│ 1. INC-1225 (Oct 8, 1.2 km away)                              │
│    Pothole on Main Street                                       │
│    Status: In Progress (Est. 24h repair)                       │
│    [View Details]                                               │
│                                                                  │
│ 2. INC-1210 (Oct 5, 500 m away)                               │
│    Road damage near intersection                                │
│    Status: Assigned to Public Works                            │
│    [View Details]                                               │
│                                                                  │
│ 3. INC-1195 (Sep 30, 800 m away)                              │
│    Surface damage - Main St section                             │
│    Status: Resolved (Repaired Oct 9)                           │
│    [View Details]                                               │
│                                                                  │
│ What would you like to do?                                      │
│                                                                  │
│ ◯ Reference existing incident (link to INC-1225)              │
│ ◯ Create new incident (separate report)                        │
│                                                                  │
│  [← Back]                              [Continue →]            │
│                                                                  │
└────────────────────────────────────────────────────────────────┘
```

### Layout (No Duplicates):
```
┌────────────────────────────────────────────────────────────────┐
│ Report Civic Issue - Step 5 of 7          [Progress: 71%]     │
├────────────────────────────────────────────────────────────────┤
│                                                                  │
│ ✓ No Similar Incidents Found                                  │
│                                                                  │
│ Your report appears to be unique.                              │
│ We're ready to submit your incident!                           │
│                                                                  │
│  [← Back]                              [Continue →]            │
│                                                                  │
└────────────────────────────────────────────────────────────────┘
```

### Duplicate Cards:
```
Each card shows:
  - Incident ID
  - Date submitted
  - Distance from current location
  - Brief description
  - Current status
  - "View Details" link
  - Merge/Reference option radio button
```

### User Choices:
- **Reference**: Link to existing incident, don't create new
- **Create New**: Submit as separate report despite similarity

---

## Step 6: Review & Confirm

**File**: `step-6-review-submit.png` | **Dimensions**: 1440x1000px

### Layout:
```
┌────────────────────────────────────────────────────────────────┐
│ Report Civic Issue - Step 6 of 7          [Progress: 86%]     │
├────────────────────────────────────────────────────────────────┤
│                                                                  │
│ Review Your Report                                               │
│                                                                  │
│ ┌─ Photo ──────────────────────────────────────────────────┐   │
│ │  [Photo Thumbnail - 300x200]                             │   │
│ │  [✓] Photo uploaded successfully                         │   │
│ └──────────────────────────────────────────────────────────┘   │
│                                                                  │
│ ┌─ Details ────────────────────────────────────────────────┐   │
│ │ Category: Pothole/Road Damage                            │   │
│ │ Location: Main Street, New York, NY                      │   │
│ │ Coordinates: 40.7128° N, 74.0060° W                      │   │
│ │ Description: Large pothole causing traffic issues        │   │
│ │ Priority: HIGH                                            │   │
│ └──────────────────────────────────────────────────────────┘   │
│                                                                  │
│ ┌─ Confirmation ───────────────────────────────────────────┐   │
│ │                                                            │   │
│ │ ☑ I confirm this information is accurate                 │   │
│ │ ☑ I authorize this report to be shared with authorities  │   │
│ │                                                            │   │
│ └──────────────────────────────────────────────────────────┘   │
│                                                                  │
│  [← Back]                              [Submit Report →]       │
│                                                                  │
└────────────────────────────────────────────────────────────────┘
```

### Summary Section:
```
Photo Preview:
  - Thumbnail with option to change
  - Size/quality indicators

Details Summary:
  - Category with icon
  - Location with address
  - GPS coordinates
  - Description preview
  - Priority level badge

Confirmation Checkboxes:
  - Accuracy confirmation
  - Data sharing consent
  - Required before submission
```

### Buttons:
- **Back**: Return to previous step
- **Submit Report**: Submit and go to confirmation
- Submit button disabled until checkboxes checked

---

## Step 7: Confirmation

**File**: `step-7-confirmation.png` | **Dimensions**: 1440x900px

### Layout:
```
┌────────────────────────────────────────────────────────────────┐
│ Report Submitted Successfully!         [Progress: 100%] ✓      │
├────────────────────────────────────────────────────────────────┤
│                                                                  │
│                                                                  │
│                    ✓ Success!                                   │
│                                                                  │
│         Your incident has been submitted                        │
│                                                                  │
│                                                                  │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │ Incident ID: INC-2026-10-001234                           │  │
│  │                                                             │  │
│  │ Save this ID to track your report                         │  │
│  │                                                             │  │
│  │ [Copy ID]                                                 │  │
│  └───────────────────────────────────────────────────────────┘  │
│                                                                  │
│                                                                  │
│ What's next?                                                     │
│ • Our team will review your report (1-2 hours)                │
│ • You'll receive updates via email and SMS                    │
│ • Track your incident: [Track Incident →]                    │
│                                                                  │
│                                                                  │
│              [Back to Home]        [Track Incident]            │
│                                                                  │
└────────────────────────────────────────────────────────────────┘
```

### Success Section:
```
Large checkmark: ✓ (Green color #10B981)
Heading: "Success!" (Bold, 36px)
Subheading: "Your incident has been submitted"

Incident ID Card:
  - ID: "INC-2026-10-001234" (monospace font)
  - Instructions: "Save this ID to track your report"
  - Copy button: Click to copy to clipboard

Next Steps:
  - Timeline info
  - Notification options
  - Quick access to tracking
```

### Navigation:
- **Track Incident**: Go to tracking page with pre-filled ID
- **Back to Home**: Return to home page
- **Share**: Option to share incident on social media

### Post-Submission:
- Offer subscription to updates
- Show FAQ or helpful links
- Suggestion: "Report another issue"

---

## Mobile Optimization

### Full Mobile Flow
All steps adapt to 375px width:
- Single column layout
- Full-width inputs and buttons
- Enlarged form fields
- Touch-friendly (44px minimum)
- Swipe navigation between steps

### Key Changes:
- Buttons stack vertically
- Text input larger
- Thumbnails smaller but tappable
- Map takes full width
- Progress indicator styled for mobile

---

## Accessibility Features

- **ARIA Labels**: All inputs have proper labels
- **Keyboard Navigation**: Tab through form fields
- **Error Messages**: Clear, visible, color + icon
- **Loading States**: Descriptive text + spinner
- **Focus Indicators**: Clear blue outline
- **Color Contrast**: WCAG AA compliant

---

## Validation Rules

### Category
- Required field
- Minimum 1 option selected

### Description
- Required
- Min 20 characters
- Max 1000 characters
- Real-time character counter

### Photo
- Required
- Accepted formats: JPG, PNG, WebP
- Max size: 10MB
- Min resolution: 800x600px
- Max resolution: 4000x3000px

### Location
- GPS coordinates required (auto or manual)
- Valid format: ±lat,±lon

### Confirmation
- Both checkboxes required before submit

---

**Last Updated**: October 10, 2026
**Version**: 1.0
**Status**: Complete Reference Mockup
