# Phases: Badge Interoperability Profiles — CTDL Alignment & TCP/LER-RS

**Date:** 2026-03-02

---

## Phase 1 — CTDL Alignment Content Profile
*Create the CTDL content profile documenting requirements for embedding Credential Engine Registry alignment data in Open Badges.*

### Deliverables
- `profiles/ob3-ctdl-alignment.md` — Markdown documentation including:
  - Purpose and scope (additive content profile; applies across all exchange profiles)
  - Explanation of Credential Engine publishing workflow (publish → CTID → alignment)
  - Role-based requirements: Issuer (primary), Holder, Verifier
  - One purposeful JSON example: `achievement.alignment` block
- `profiles/ob3-ctdl-alignment-profile.yaml` — Structured YAML requirements following existing profile conventions

### Success Criteria
- [ ] Markdown page renders in Jekyll with correct front matter and structure matching existing profiles
- [ ] YAML is valid and follows existing profile YAML conventions
- [ ] The three-step Credential Engine workflow (publish, get CTID, add alignment) is clearly explained
- [ ] The alignment JSON example is accurate and matches Open Badges 3.0 `alignment` schema
- [ ] Profile explicitly states it is additive to the three core exchange profiles
- [ ] Issuer, Holder, and Verifier requirements are clearly separated with checkbox lists

---

## Phase 2 — TCP/LER-RS Packaging Profile
*Create the LER-RS packaging profile documenting how Open Badges are assembled into a Trusted Career Profile résumé document, with optional platform-signed VC wrapping.*

### Deliverables
- `profiles/ob3-ler-rs.md` — Markdown documentation including:
  - Purpose and scope (packaging profile; résumé builder reference scenario)
  - Reference to HR Open Standards LER-RS 4.5 schema
  - Four workflows: credential retrieval, LER-RS assembly, document delivery, platform-signed VC wrapping
  - Role-based requirements: Platform/Issuer, Subject/Holder, Receiver/Verifier
  - Two purposeful JSON examples: LER-RS snippet with embedded badge; platform-signed VC wrapper
  - Note on learner self-signing as future direction (out of scope v1)
- `profiles/ob3-ler-rs-profile.yaml` — Structured YAML requirements following existing profile conventions

### Success Criteria
- [ ] Markdown page renders in Jekyll with correct front matter and structure
- [ ] YAML is valid and follows existing profile YAML conventions
- [ ] The résumé builder scenario is clearly articulated as the reference use case
- [ ] The download-assemble-upload workflow pattern is clearly documented
- [ ] Platform-signed VC wrapping requirements are clearly separated from base packaging requirements
- [ ] The two JSON examples are accurate and minimal (not exhaustive)
- [ ] Reference to HR Open Standards LER-RS 4.5 schema URL is included
- [ ] Profile explicitly states it is additive to the core exchange profiles

---

## Phase 3 — Integration
*Update site navigation and the main guide index to incorporate both new profiles.*

### Deliverables
- `_includes/header.html` — Two new navigation tiles (OB3 CTDL Alignment, OB3 LER-RS), visually consistent with existing tiles
- `index.md` — Updates to the Interoperability Profiles section:
  - Entries for both new profiles (name, purpose, target use case)
  - Cross-references in relevant workflow sections (e.g., note in issuance workflows that CTDL alignment may be added; note in credential delivery workflows that LER-RS packaging is an option)

### Success Criteria
- [ ] Both new profile tiles appear in site navigation and link to correct pages
- [ ] `index.md` Interoperability Profiles section describes all five profiles consistently
- [ ] Cross-references in workflow sections are accurate and do not disrupt the main narrative flow
- [ ] Site builds without errors (`jekyll build` clean)
- [ ] All internal links resolve correctly
