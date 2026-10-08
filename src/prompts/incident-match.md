# Incident Matching Prompt Specification

Given a new civic report and a set of nearby/recent reports, determine whether the new report is:

- `new_incident`
- `possible_duplicate`
- `same_incident`

Use visual/description similarity, location proximity, issue type and time context.
Do not claim certainty when evidence is weak.
Return structured JSON with a short explanation and matched report IDs.
