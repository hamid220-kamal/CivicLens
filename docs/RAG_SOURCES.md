# Civic Knowledge Base Sources (Hyderabad & Telangana)

CivicLens grounds AI triage, issue classification, priority scoring, and department routing using authentic, publicly verifiable citizen charters and service manuals from Hyderabad/Telangana civic authorities.

---

## 1. Verified Official Municipal Sources

| Source Title | Authority / Publisher | Official URL | Scope & Issue Types Handled |
| :--- | :--- | :--- | :--- |
| **GHMC Citizen Charter & Service Delivery Guidelines** | Greater Hyderabad Municipal Corporation (GHMC) | [https://www.ghmc.gov.in](https://www.ghmc.gov.in) | Potholes, road surface damages, open stormwater drains, missing manhole covers on roads, stray animal menace, park maintenance, illegal building debris. |
| **GHMC Solid Waste Management Operational Framework** | GHMC Health & Sanitation Wing | [https://www.ghmc.gov.in](https://www.ghmc.gov.in) | Garbage dump clearing, overflowing dumper bins, road sweeping, dead animal lifting, public toilet hygiene. |
| **HMWSSB Water & Sewerage Citizen Charter** | Hyderabad Metropolitan Water Supply and Sewerage Board (HMWSSB) | [https://www.hyderabadwater.gov.in](https://www.hyderabadwater.gov.in) | Drinking water pipe bursts, water contamination/low pressure, sewage overflows, missing sewerage manhole lids, stormwater-in-sewer mixing. |
| **TGSPDCL Electric Safety & Distribution Manual** | Telangana State Southern Power Distribution Co. Ltd. (TGSPDCL) | [https://www.tgspdcl.in](https://www.tgspdcl.in) | Dangling live wires, sparking transformers, tilted electric poles, exposed junction boxes, localized power outages. |
| **HYDRAA Disaster Response & Waterbody Protection Charter** | MA&UD Dept, Govt. of Telangana | [https://maud.telangana.gov.in](https://maud.telangana.gov.in) | Severe waterlogging, lake/NALA encroachments, major storm drain blockages causing localized inundation. |
| **Hyderabad Traffic Police Civic Traffic Redressal** | Hyderabad City Police | [https://www.htp.gov.in](https://www.htp.gov.in) | Non-functioning traffic lights, road blockage due to fallen trees/breakdowns, hazardous road obstructions. |

---

## 2. Retrieval & Grounding Rules for CivicLens

1. **Deterministic Citations**: Every triage recommendation MUST reference the specific `source_title`, `department`, and `sla_hours` retrieved from the knowledge base.
2. **Strict Non-Hallucination**: If an issue does not match any documented municipal department (e.g. private property dispute, general query), the AI must classify the department as `unclassified_review` with clear reasons.
3. **Source Transparency**: The frontend citizen receipt and authority dashboard will show an expandable *"Grounding Source"* card displaying the exact cited excerpt and publisher link.

