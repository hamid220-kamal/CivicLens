/**
 * TEMPORARY PLACEHOLDER DATA
 * Delete this file when connecting to real API endpoints
 * 
 * This file serves as the single source of truth for all static/demo data
 * displayed across CivicLens pages. Once backend integration is complete,
 * import real data from API responses and pass via props.
 */

export const metricsData = {
  avgTriageTime: '3.4',
  avgTriageUnit: 'min',
  gpsPinAccuracy: '99.1%',
  activeWards: '42',
  totalResolved: '18,400',
  totalMunicipalDistricts: '42',
};

export const processSteps = [
  {
    id: 1,
    icon: 'camera',
    title: 'Snap a Photo',
    description: 'Capture clear photo evidence of potholes, dumped waste, or broken infrastructure with tap-to-focus.',
    cta: 'Instant Autofocus',
    iconBg: 'bg-surface-container-highest',
    iconColor: 'text-primary-container',
  },
  {
    id: 2,
    icon: 'my_location',
    title: 'Auto Location',
    description: 'Cryptographic EXIF metadata automatically extracts precise GPS coordinates without manual typing.',
    cta: 'Zero-Touch Geotagging',
    iconBg: 'bg-secondary-container/50',
    iconColor: 'text-secondary',
  },
  {
    id: 3,
    icon: 'psychology',
    title: 'AI Triage & Codes',
    description: 'Autonomous image classification tags severity tiers against local municipal repair codes.',
    cta: 'Charter Grounded (Demo)',
    iconBg: 'bg-tertiary-fixed',
    iconColor: 'text-tertiary',
  },
  {
    id: 4,
    icon: 'track_changes',
    title: 'Track Progress',
    description: 'Receive automated dispatch updates via SMS and live civic map tracking until issue closure.',
    cta: 'Live Dispatch Link',
    iconBg: 'bg-surface-container-high',
    iconColor: 'text-primary',
  },
];

export const trustBadges = [
  { emoji: '🏛️', label: 'GHMC Charter', description: 'Municipal Service Delivery Standards' },
  { emoji: '📐', label: 'Municipal Norms', description: 'Roadway Maintenance Standards' },
  { emoji: '🔒', label: 'Encrypted Vault', description: 'Secure Storage Protocol' },
  { emoji: '♿', label: 'WCAG 2.1 AA', description: 'Certified Public Accessibility' },
  { emoji: '🌐', label: 'Open311 Format', description: 'Standard Civic Data Protocol' },
  { emoji: '📋', label: 'GHMC Ward Wing', description: 'Service Level Agreement' },
];

export interface IncidentItem {
  id: string;
  status: 'resolved' | 'inprogress' | 'dispatched';
  statusLabel: string;
  location: string;
  title: string;
  description: string;
  timestamp: string;
  footer: string;
  footerColor: string;
  imageUrl: string;
  imageAlt: string;
}

export const incidentsData: IncidentItem[] = [
  {
    id: 'CV-8491',
    status: 'resolved',
    statusLabel: 'Resolved in 4h',
    location: '5th Ave & Elm St, Ward 2',
    title: 'Deep Arterial Pothole Repaired',
    description: 'Grade 3 cavity asphalt milled, filled with high-temp bitumen, and roller-compacted by DPW Crew 09.',
    timestamp: 'Closed Today, 11:20 AM',
    footer: 'Verified by Inspector',
    footerColor: 'text-primary',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAoJUHgrTPlPUrVGHTjo3fQSs1dk2fLR8eP3g6C9xPWnEBUWlXnoK9__-ipQSSHCAWbsPq71gIZ8wMXaS9a-ntqvKVi5ndrB2dd-5z3rLhtQnFYdCE2-eELXxtSjKHdjaX_o-SRG_73q_3vX1MgYhvnRVNS-rgHmI8bbxheHVZXTJ0oChKkqUKLdLpGxFvkjeqj8VkUbo3ldiUzPrm8ny1o2CdQRtoinmVVu33-qdd2z-abymGP8VNL1w',
    imageAlt: 'Asphalt road restoration showing smooth freshly patched tar square surface on two lane road with bright yellow lane markings in suburban district, clean sunny day',
  },
  {
    id: 'CV-8504',
    status: 'inprogress',
    statusLabel: 'In Progress',
    location: 'Cloverly Blvd & 12th Way',
    title: 'Storm Drain Backflow Cleared',
    description: 'Hydro-vacuum truck dispatched. Heavy seasonal obstruction extracted; pipe flow restored to 95% capacity.',
    timestamp: 'Hydro Vac On-Site',
    footer: 'Water Dept Ward 3',
    footerColor: 'text-secondary',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAfszrHQTNT-pdVPQxnSBQnVLb6rir9t3RdjZjUb5xl_cxl1QZiFR3n7p_n1r_zhdIQMekTrFFScVt76VnjXS-0UsEZWzPyHxfqpMGnYf_j9OrSlPVKXq7_azQ7qK5Kkglm8vSGI1xm75WaZtr1xZ2YS3PFxNnzVQA1CwcTw7qOZWljXI_WyioQbjfDNAHH_lMkiZ9hI53OvRjAy9rVgAOMjRHVGlKMUfBptPkhQpTinqbaaJAb7uGMjQ',
    imageAlt: 'Heavy storm drain grate cleared of leaves and suburban debris with water flowing cleanly during rainy morning municipal inspection photography',
  },
  {
    id: 'CV-8512',
    status: 'dispatched',
    statusLabel: 'Dispatched',
    location: 'Park Avenue Crosswalk',
    title: 'Streetlight Luminaire Failure',
    description: 'Optical sensor replaced with high-efficiency 70W LED head fixture. Pedestrian intersection lighting verified.',
    timestamp: 'ETA 45 Mins',
    footer: 'City Power Division',
    footerColor: 'text-primary',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCa8ZG8JPWbkeOtUzOOwnWSpzqs0Z705sC86X9zr8VZTbjLBz1qIprxd3ynuN9BKq5uQQPqlJQQHSi8hqmy5-B7rYmgDxSEgRkizvRexDuPtOCSHB6te4cmbGo2q96u1qTc-eDvtcEOZtjQQbQbWTSNGe2kSUaMxFJjJXEQIM3aFkjQMBKeoj0ZZgz32JS04TD2v-JgFSQKvOPGqDPn9BL6rKzVKXCPUxvoLnKNz8U9vDb29LwubKXpKg',
    imageAlt: 'Modern high efficiency LED civic streetlight illuminated against twilight sky with utility technician bucket truck parked safely below on sidewalk',
  },
];

export const footerLinks = {
  platform: [
    { label: 'Civic Overview', path: '/' },
    { label: 'File Incident', path: '/report' },
    { label: 'Case Tracking', path: '/track' },
    { label: 'Municipal Analytics', path: '/dashboard' },
  ],
  governance: [
    { label: 'Partner Cities', path: '/partners' },
    { label: 'Open Data Policy', path: '/data-policy' },
    { label: 'Security & CJIS', path: '/security' },
    { label: 'Resolution Audits', path: '/audits' },
  ],
  community: [
    { label: 'Resident Handbook', path: '/handbook' },
    { label: 'Service SLAs', path: '/slas' },
    { label: 'Accessibility Notice', path: '/accessibility' },
    { label: 'Civic Support', path: '/support' },
  ],
  legal: [
    { label: 'Privacy Statement', path: '/privacy' },
    { label: 'Terms of Service', path: '/terms' },
    { label: 'Accessibility', path: '/accessibility' },
  ],
};
