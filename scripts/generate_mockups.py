#!/usr/bin/env python3
"""
Generate realistic UI mockup images for CivicLens frontend
Uses PIL/Pillow to create high-fidelity mockups
"""

from PIL import Image, ImageDraw, ImageFont
import os
from datetime import datetime
import json

# Color palette
COLORS = {
    'dark_bg': '#0F172A',
    'surface': '#1E293B',
    'border': '#334155',
    'text_primary': '#E2E8F0',
    'text_secondary': '#94A3B8',
    'blue': '#3B82F6',
    'blue_light': '#60A5FA',
    'blue_dark': '#1E40AF',
    'green': '#10B981',
    'yellow': '#F59E0B',
    'red': '#EF4444',
    'purple': '#8B5CF6',
    'gray': '#6B7280',
}

def hex_to_rgb(hex_color):
    """Convert hex color to RGB tuple"""
    hex_color = hex_color.lstrip('#')
    return tuple(int(hex_color[i:i+2], 16) for i in (0, 2, 4))

def create_home_page():
    """Create home page mockup"""
    img = Image.new('RGB', (1440, 1200), color=hex_to_rgb(COLORS['dark_bg']))
    draw = ImageDraw.Draw(img)
    
    # Navigation bar
    draw.rectangle([(0, 0), (1440, 80)], fill=hex_to_rgb(COLORS['surface']), outline=hex_to_rgb(COLORS['border']), width=1)
    
    # Logo text
    draw.text((40, 25), "CivicLens", fill=hex_to_rgb(COLORS['blue']), font=None)
    
    # Nav links
    nav_items = ['Report', 'Track', 'Dashboard', 'Login']
    for i, item in enumerate(nav_items):
        x = 1200 - (i * 100)
        draw.text((x, 28), item, fill=hex_to_rgb(COLORS['text_secondary']), font=None)
    
    # Hero section
    hero_y = 120
    draw.rectangle([(0, hero_y), (1440, hero_y + 400)], fill=hex_to_rgb(COLORS['surface']))
    
    # Badge
    draw.rectangle([(560, hero_y + 40), (880, hero_y + 70)], outline=hex_to_rgb(COLORS['blue']), width=2)
    draw.text((580, hero_y + 48), "Civic Intelligence Platform", fill=hex_to_rgb(COLORS['blue']), font=None)
    
    # Main heading
    draw.text((220, hero_y + 100), "CivicLens", fill=hex_to_rgb(COLORS['blue']), font=None)
    
    # Subtitle
    draw.text((200, hero_y + 180), "AI-assisted civic issue classification & routing", fill=hex_to_rgb(COLORS['text_secondary']), font=None)
    
    # Feature cards section
    cards_y = hero_y + 450
    
    # Card 1 - Citizen Flow
    card1_x = 100
    draw.rectangle([(card1_x, cards_y), (card1_x + 300, cards_y + 200)], 
                   outline=hex_to_rgb(COLORS['border']), width=2, 
                   fill=hex_to_rgb(COLORS['surface']))
    draw.text((card1_x + 20, cards_y + 20), "Citizen Flow", fill=hex_to_rgb(COLORS['text_primary']), font=None)
    draw.text((card1_x + 20, cards_y + 60), "Photo capture, GPS tagging,", fill=hex_to_rgb(COLORS['text_secondary']), font=None)
    draw.text((card1_x + 20, cards_y + 85), "and AI-powered triage.", fill=hex_to_rgb(COLORS['text_secondary']), font=None)
    draw.rectangle([(card1_x + 20, cards_y + 140), (card1_x + 150, cards_y + 170)], 
                   fill=hex_to_rgb(COLORS['blue']))
    draw.text((card1_x + 40, cards_y + 145), "Get Started", fill=hex_to_rgb(COLORS['text_primary']), font=None)
    
    # Card 2 - Authority Dashboard
    card2_x = 1040
    draw.rectangle([(card2_x, cards_y), (card2_x + 300, cards_y + 200)], 
                   outline=hex_to_rgb(COLORS['border']), width=2, 
                   fill=hex_to_rgb(COLORS['surface']))
    draw.text((card2_x + 20, cards_y + 20), "Authority Dashboard", fill=hex_to_rgb(COLORS['text_primary']), font=None)
    draw.text((card2_x + 20, cards_y + 60), "Deduplicated incidents,", fill=hex_to_rgb(COLORS['text_secondary']), font=None)
    draw.text((card2_x + 20, cards_y + 85), "priority scoring & routing.", fill=hex_to_rgb(COLORS['text_secondary']), font=None)
    draw.rectangle([(card2_x + 20, cards_y + 140), (card2_x + 150, cards_y + 170)], 
                   fill=hex_to_rgb(COLORS['blue']))
    draw.text((card2_x + 40, cards_y + 145), "Access Dashboard", fill=hex_to_rgb(COLORS['text_primary']), font=None)
    
    return img

def create_citizen_report_flow():
    """Create citizen report flow mockup"""
    images = []
    
    # Step 1: Camera Upload
    img = Image.new('RGB', (1440, 900), color=hex_to_rgb(COLORS['dark_bg']))
    draw = ImageDraw.Draw(img)
    
    # Header
    draw.rectangle([(0, 0), (1440, 60)], fill=hex_to_rgb(COLORS['surface']))
    draw.text((40, 18), "Report Civic Issue - Step 1 of 7", fill=hex_to_rgb(COLORS['text_primary']), font=None)
    
    # Progress bar
    draw.rectangle([(40, 80), (1400, 100)], outline=hex_to_rgb(COLORS['border']), width=1)
    draw.rectangle([(40, 80), (240, 100)], fill=hex_to_rgb(COLORS['blue']))
    
    # Upload card
    card_x, card_y = 470, 250
    draw.rectangle([(card_x, card_y), (card_x + 500, card_y + 300)], 
                   outline=hex_to_rgb(COLORS['blue']), width=2,
                   fill=hex_to_rgb(COLORS['surface']))
    
    draw.text((card_x + 150, card_y + 50), "📷", fill=hex_to_rgb(COLORS['blue']), font=None)
    draw.text((card_x + 100, card_y + 120), "Take Photo or Upload", fill=hex_to_rgb(COLORS['text_primary']), font=None)
    draw.rectangle([(card_x + 100, card_y + 180), (card_x + 400, card_y + 220)], fill=hex_to_rgb(COLORS['blue']))
    draw.text((card_x + 140, card_y + 190), "Choose from Gallery", fill=hex_to_rgb(COLORS['text_primary']), font=None)
    draw.rectangle([(card_x + 100, card_y + 240), (card_x + 400, card_y + 280)], 
                   outline=hex_to_rgb(COLORS['blue']), width=2)
    draw.text((card_x + 150, card_y + 250), "Take New Photo", fill=hex_to_rgb(COLORS['blue']), font=None)
    
    images.append(('step-1-camera-upload.png', img))
    
    # Step 2: Issue Details
    img = Image.new('RGB', (1440, 1000), color=hex_to_rgb(COLORS['dark_bg']))
    draw = ImageDraw.Draw(img)
    
    draw.rectangle([(0, 0), (1440, 60)], fill=hex_to_rgb(COLORS['surface']))
    draw.text((40, 18), "Report Civic Issue - Step 2 of 7: Issue Details", fill=hex_to_rgb(COLORS['text_primary']), font=None)
    draw.rectangle([(40, 80), (1400, 100)], outline=hex_to_rgb(COLORS['border']), width=1)
    draw.rectangle([(40, 80), (420, 100)], fill=hex_to_rgb(COLORS['blue']))
    
    # Form fields
    form_y = 150
    
    # Category label
    draw.text((100, form_y), "Category", fill=hex_to_rgb(COLORS['text_primary']), font=None)
    draw.rectangle([(100, form_y + 30), (600, form_y + 70)], outline=hex_to_rgb(COLORS['border']), width=1)
    draw.text((120, form_y + 40), "Select category... ▼", fill=hex_to_rgb(COLORS['text_secondary']), font=None)
    
    # Description label
    draw.text((100, form_y + 120), "Description", fill=hex_to_rgb(COLORS['text_primary']), font=None)
    draw.rectangle([(100, form_y + 150), (900, form_y + 300)], outline=hex_to_rgb(COLORS['border']), width=1)
    draw.text((120, form_y + 165), "Describe the issue in detail...", fill=hex_to_rgb(COLORS['text_secondary']), font=None)
    
    # Continue button
    draw.rectangle([(100, form_y + 350), (300, form_y + 400)], fill=hex_to_rgb(COLORS['blue']))
    draw.text((130, form_y + 360), "Continue", fill=hex_to_rgb(COLORS['text_primary']), font=None)
    
    images.append(('step-2-issue-details.png', img))
    
    # Step 7: Confirmation
    img = Image.new('RGB', (1440, 900), color=hex_to_rgb(COLORS['dark_bg']))
    draw = ImageDraw.Draw(img)
    
    draw.rectangle([(0, 0), (1440, 60)], fill=hex_to_rgb(COLORS['surface']))
    draw.text((40, 18), "Report Submitted Successfully!", fill=hex_to_rgb(COLORS['green']), font=None)
    
    # Success card
    card_x, card_y = 400, 200
    draw.rectangle([(card_x, card_y), (card_x + 640, card_y + 400)], 
                   outline=hex_to_rgb(COLORS['green']), width=3,
                   fill=hex_to_rgb(COLORS['surface']))
    
    draw.text((card_x + 280, card_y + 40), "✓", fill=hex_to_rgb(COLORS['green']), font=None)
    draw.text((card_x + 150, card_y + 120), "Your incident has been submitted", fill=hex_to_rgb(COLORS['text_primary']), font=None)
    
    draw.rectangle([(card_x + 100, card_y + 180), (card_x + 540, card_y + 220)], 
                   fill=hex_to_rgb(COLORS['surface']), outline=hex_to_rgb(COLORS['border']), width=1)
    draw.text((card_x + 120, card_y + 190), "Incident ID: INC-2026-10-001234", fill=hex_to_rgb(COLORS['blue']), font=None)
    
    draw.text((card_x + 100, card_y + 260), "Keep this ID to track your incident progress", fill=hex_to_rgb(COLORS['text_secondary']), font=None)
    
    draw.rectangle([(card_x + 150, card_y + 320), (card_x + 350, card_y + 370)], fill=hex_to_rgb(COLORS['blue']))
    draw.text((card_x + 180, card_y + 330), "Track Incident", fill=hex_to_rgb(COLORS['text_primary']), font=None)
    
    images.append(('step-7-confirmation.png', img))
    
    return images

def create_incident_tracking():
    """Create incident tracking page mockup"""
    img = Image.new('RGB', (1440, 1200), color=hex_to_rgb(COLORS['dark_bg']))
    draw = ImageDraw.Draw(img)
    
    # Header
    draw.rectangle([(0, 0), (1440, 80)], fill=hex_to_rgb(COLORS['surface']))
    draw.text((40, 28), "Track Your Incident", fill=hex_to_rgb(COLORS['text_primary']), font=None)
    
    # Search bar
    search_y = 120
    draw.rectangle([(100, search_y), (1340, search_y + 50)], 
                   outline=hex_to_rgb(COLORS['border']), width=1,
                   fill=hex_to_rgb(COLORS['surface']))
    draw.text((120, search_y + 15), "Enter Incident ID (e.g., INC-2026-10-001234)", 
              fill=hex_to_rgb(COLORS['text_secondary']), font=None)
    
    # Incident card
    card_y = 220
    draw.rectangle([(100, card_y), (1340, card_y + 400)], 
                   outline=hex_to_rgb(COLORS['border']), width=1,
                   fill=hex_to_rgb(COLORS['surface']))
    
    # Incident header
    draw.text((120, card_y + 20), "Incident INC-2026-10-001234", 
              fill=hex_to_rgb(COLORS['blue']), font=None)
    draw.text((120, card_y + 60), "Category: Pothole | Submitted: Oct 10, 2026 at 2:45 PM", 
              fill=hex_to_rgb(COLORS['text_secondary']), font=None)
    
    # Status badge
    draw.rectangle([(120, card_y + 100), (250, card_y + 130)], fill=hex_to_rgb(COLORS['yellow']))
    draw.text((130, card_y + 108), "IN PROGRESS", fill=hex_to_rgb(COLORS['dark_bg']), font=None)
    
    # Timeline
    timeline_y = card_y + 160
    steps = [
        ("Submitted", "Oct 10, 2:45 PM", True),
        ("Assigned to Public Works", "Oct 10, 3:20 PM", True),
        ("In Progress", "Oct 10, 4:00 PM", True),
        ("Resolved", "Pending", False),
    ]
    
    for i, (step, time, completed) in enumerate(steps):
        color = hex_to_rgb(COLORS['green']) if completed else hex_to_rgb(COLORS['gray'])
        draw.text((140, timeline_y + (i * 50)), f"✓ {step}", fill=color, font=None)
        draw.text((160, timeline_y + (i * 50) + 25), time, 
                  fill=hex_to_rgb(COLORS['text_secondary']), font=None)
    
    return [('tracking-details.png', img)]

def create_authority_dashboard():
    """Create authority dashboard mockup"""
    img = Image.new('RGB', (1440, 1600), color=hex_to_rgb(COLORS['dark_bg']))
    draw = ImageDraw.Draw(img)
    
    # Header
    draw.rectangle([(0, 0), (1440, 70)], fill=hex_to_rgb(COLORS['surface']))
    draw.text((40, 22), "Authority Dashboard - Public Works Department", 
              fill=hex_to_rgb(COLORS['text_primary']), font=None)
    
    # KPI Cards
    kpi_y = 100
    kpis = [
        ("Pending", "45", "#3B82F6"),
        ("Assigned", "23", "#8B5CF6"),
        ("In Progress", "15", "#F59E0B"),
        ("Resolved Today", "8", "#10B981"),
    ]
    
    for i, (label, value, color) in enumerate(kpis):
        card_x = 100 + (i * 300)
        draw.rectangle([(card_x, kpi_y), (card_x + 280, kpi_y + 120)],
                       outline=hex_to_rgb(COLORS['border']), width=1,
                       fill=hex_to_rgb(COLORS['surface']))
        draw.text((card_x + 20, kpi_y + 20), label, 
                  fill=hex_to_rgb(COLORS['text_secondary']), font=None)
        draw.text((card_x + 20, kpi_y + 60), value, 
                  fill=hex_to_rgb(color), font=None)
    
    # Queue table
    table_y = kpi_y + 180
    draw.rectangle([(100, table_y), (1340, table_y + 400)],
                   outline=hex_to_rgb(COLORS['border']), width=1,
                   fill=hex_to_rgb(COLORS['surface']))
    
    # Table header
    headers = ["ID", "Category", "Priority", "Assigned", "Status", "Updated"]
    header_x = 120
    for header in headers:
        draw.text((header_x, table_y + 20), header, 
                  fill=hex_to_rgb(COLORS['text_primary']), font=None)
        header_x += 190
    
    # Sample rows
    rows = [
        ("INC-1234", "Pothole", "HIGH", "John", "In Progress", "1h ago"),
        ("INC-1233", "Flooding", "CRITICAL", "Sarah", "Assigned", "30m ago"),
        ("INC-1232", "Streetlight", "LOW", "—", "Pending", "2h ago"),
    ]
    
    for row_idx, row in enumerate(rows):
        row_y = table_y + 80 + (row_idx * 80)
        col_x = 120
        for cell in row:
            draw.text((col_x, row_y), cell, 
                      fill=hex_to_rgb(COLORS['text_secondary']), font=None)
            col_x += 190
    
    return [('dashboard-queue.png', img)]

def create_ai_workflow():
    """Create AI workflow visualization"""
    img = Image.new('RGB', (1440, 1400), color=hex_to_rgb(COLORS['dark_bg']))
    draw = ImageDraw.Draw(img)
    
    # Title
    draw.text((40, 30), "AI Triage & Classification Workflow", 
              fill=hex_to_rgb(COLORS['text_primary']), font=None)
    
    # Workflow steps
    steps = [
        ("Input Processing", "Extracting metadata from issue..."),
        ("Classification", "Category: Pothole (92% confidence)"),
        ("Priority Scoring", "Priority: HIGH (85/100)"),
        ("Deduplication", "3 similar incidents found"),
        ("Department Routing", "Assigned to: Public Works"),
    ]
    
    step_y = 120
    for i, (title, detail) in enumerate(steps):
        step_x = 200
        
        # Step box
        draw.rectangle([(step_x, step_y), (step_x + 400, step_y + 120)],
                       outline=hex_to_rgb(COLORS['blue']), width=2,
                       fill=hex_to_rgb(COLORS['surface']))
        
        # Step number
        draw.text((step_x + 20, step_y + 20), f"Step {i+1}", 
                  fill=hex_to_rgb(COLORS['blue']), font=None)
        draw.text((step_x + 20, step_y + 50), title, 
                  fill=hex_to_rgb(COLORS['text_primary']), font=None)
        draw.text((step_x + 20, step_y + 80), detail, 
                  fill=hex_to_rgb(COLORS['text_secondary']), font=None)
        
        # Arrow
        if i < len(steps) - 1:
            draw.text((step_x + 180, step_y + 140), "↓", 
                      fill=hex_to_rgb(COLORS['blue']), font=None)
        
        step_y += 200
    
    return [('workflow-complete.png', img)]

def create_components_showcase():
    """Create UI components showcase"""
    img = Image.new('RGB', (1440, 1000), color=hex_to_rgb(COLORS['dark_bg']))
    draw = ImageDraw.Draw(img)
    
    draw.text((40, 30), "UI Components Library", 
              fill=hex_to_rgb(COLORS['text_primary']), font=None)
    
    # Buttons section
    draw.text((40, 100), "Buttons", fill=hex_to_rgb(COLORS['blue']), font=None)
    
    buttons = [
        ("Primary", COLORS['blue']),
        ("Secondary", COLORS['gray']),
        ("Danger", COLORS['red']),
        ("Success", COLORS['green']),
    ]
    
    btn_x = 40
    for label, color in buttons:
        draw.rectangle([(btn_x, 150), (btn_x + 120, 190)],
                       fill=hex_to_rgb(color))
        draw.text((btn_x + 20, 160), label, 
                  fill=hex_to_rgb(COLORS['text_primary']), font=None)
        btn_x += 150
    
    # Badges section
    draw.text((40, 300), "Status Badges", fill=hex_to_rgb(COLORS['blue']), font=None)
    
    badges = [
        ("Pending", COLORS['blue']),
        ("Assigned", COLORS['purple']),
        ("In Progress", COLORS['yellow']),
        ("Resolved", COLORS['green']),
        ("Closed", COLORS['gray']),
    ]
    
    badge_x = 40
    for label, color in badges:
        draw.rectangle([(badge_x, 350), (badge_x + 100, 380)],
                       outline=hex_to_rgb(color), width=2)
        draw.text((badge_x + 10, 358), label, 
                  fill=hex_to_rgb(color), font=None)
        badge_x += 130
    
    # Input fields section
    draw.text((40, 500), "Form Inputs", fill=hex_to_rgb(COLORS['blue']), font=None)
    
    inputs = [
        ("Text Input", "Enter text..."),
        ("Email Input", "your@email.com"),
        ("Select", "Choose option... ▼"),
        ("Textarea", "Multi-line text..."),
    ]
    
    input_y = 550
    for label, placeholder in inputs:
        draw.text((40, input_y), label, 
                  fill=hex_to_rgb(COLORS['text_secondary']), font=None)
        draw.rectangle([(40, input_y + 25), (400, input_y + 55)],
                       outline=hex_to_rgb(COLORS['border']), width=1)
        draw.text((50, input_y + 32), placeholder, 
                  fill=hex_to_rgb(COLORS['text_secondary']), font=None)
        input_y += 80
    
    return [('components-showcase.png', img)]

def save_all_mockups():
    """Generate and save all mockups"""
    output_dir = "public/assets/mockups"
    
    print("Generating mockups...")
    
    # Home page
    home_mockups = [
        ("home/home-desktop-hero.png", create_home_page()),
    ]
    
    # Citizen report
    citizen_mockups = create_citizen_report_flow()
    citizen_mockups = [(f"citizen-report/{name}", img) for name, img in citizen_mockups]
    
    # Incident tracking
    tracking_mockups = create_incident_tracking()
    tracking_mockups = [(f"incident-tracking/{name}", img) for name, img in tracking_mockups]
    
    # Authority dashboard
    dashboard_mockups = create_authority_dashboard()
    dashboard_mockups = [(f"authority-dashboard/{name}", img) for name, img in dashboard_mockups]
    
    # AI workflow
    ai_mockups = create_ai_workflow()
    ai_mockups = [(f"ai-workflow/{name}", img) for name, img in ai_mockups]
    
    # Components
    component_mockups = create_components_showcase()
    component_mockups = [(f"components/{name}", img) for name, img in component_mockups]
    
    # Combine all
    all_mockups = home_mockups + citizen_mockups + tracking_mockups + dashboard_mockups + ai_mockups + component_mockups
    
    # Save images
    for rel_path, img in all_mockups:
        full_path = os.path.join(output_dir, rel_path)
        os.makedirs(os.path.dirname(full_path), exist_ok=True)
        img.save(full_path, "PNG")
        print(f"✓ Created: {rel_path}")
    
    print(f"\n✓ Generated {len(all_mockups)} mockup images!")
    print(f"✓ Location: {output_dir}/")

if __name__ == "__main__":
    save_all_mockups()
