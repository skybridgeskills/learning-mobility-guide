# Design: Badge Interoperability Profiles — CTDL Alignment & TCP/LER-RS

**Date:** 2026-03-02

---

## Design Approach

Two new profiles are added to the `/profiles/` directory, each following the established dual-format pattern (Markdown documentation + YAML structured requirements). Both are explicitly framed as *additive* to the existing core exchange profiles rather than replacements or alternatives.

### Profile 1: CTDL Alignment Content Profile (`ob3-ctdl-alignment`)

**Character:** Content profile — describes what goes *inside* an Open Badge credential.

**Applies to:** Any issuer using any of the three core exchange profiles (OID4-ECDSA, VCALM-EdDSA, OB3-Direct-Delivery).

**Core requirement:** Issuers publish their credential definition to the Credential Engine Registry (getting a CTID), then populate the `achievement.alignment` array in the issued Open Badge with a correctly structured CTDL alignment object pointing to the credentialfinder.org resource URL.

**Role coverage:**
- *Issuer* — primary role; publishes to registry, structures alignment block
- *Holder* — preserve alignment data when storing and presenting
- *Verifier* — optionally dereference credentialfinder.org URL for enriched metadata

**Examples included:**
- One sample `achievement.alignment` JSON block (Open Badges 3.0 format)

---

### Profile 2: TCP/LER-RS Packaging Profile (`ob3-ler-rs`)

**Character:** Packaging/delivery profile — describes how Open Badges are assembled into an LER-RS résumé document and delivered. Mirrors the structural pattern of OB3-Direct-Delivery.

**Reference scenario:** A résumé builder platform that issues/verifies credentials for a user and packages them into a structured résumé for downstream use (job applications, ATS systems, etc.).

**Workflow (download → assemble → upload):**
1. Platform retrieves Open Badge credentials on behalf of user (from wallet or direct delivery)
2. Platform assembles credentials into an LER-RS JSON document per the HR Open Standards 4.5 schema
3. Platform delivers the assembled LER-RS document to a receiving system (file download, upload to ATS, etc.)
4. *(Optional)* Platform wraps the LER-RS document as a Verifiable Credential signed by the platform

**Role coverage:**
- *Issuer/Platform* — assembles and optionally signs the LER-RS package
- *Holder/Subject* — authorizes assembly; may self-sign in future (noted as out of scope for v1)
- *Verifier/Receiver* — ingests and validates the LER-RS package; verifies platform signature if present

**Examples included:**
- One LER-RS JSON snippet showing embedded Open Badge credential in the education/skills section
- One VC wrapper example showing platform-signed LER-RS envelope

---

## Files Proposed

```
learning-mobility-guide/
│
├── Docs/
│   └── plans/
│       └── 2026-03-02-badge-interop-profiles/
│           ├── 00-overview.md          [NEW] Q&A and request summary
│           ├── 00-design.md            [NEW] This file
│           └── 00-phases.md            [NEW] Phase plan with success criteria
│
├── profiles/
│   ├── oid4-ecdsa.md                   [existing, no change]
│   ├── oid4-ecdsa-profile.yaml         [existing, no change]
│   ├── vcalm-eddsa.md                  [existing, no change]
│   ├── vcalm-eddsa-profile.yaml        [existing, no change]
│   ├── ob-3.0-direct-delivery.md       [existing, no change]
│   ├── ob3-direct-delivery-profile.yaml [existing, no change]
│   ├── ob3-ctdl-alignment.md           [NEW] CTDL content profile documentation
│   ├── ob3-ctdl-alignment-profile.yaml [NEW] CTDL profile structured requirements
│   ├── ob3-ler-rs.md                   [NEW] TCP/LER-RS packaging profile documentation
│   └── ob3-ler-rs-profile.yaml         [NEW] LER-RS profile structured requirements
│
├── _includes/
│   └── header.html                     [UPDATE] Add navigation tiles for 2 new profiles
│
└── index.md                            [UPDATE] Add entries for 2 new profiles in the
                                                 Interoperability Profiles section and
                                                 reference them in relevant workflow sections
```

---

## Naming Conventions

| Profile | File Slug | Profile ID | Display Name |
|---|---|---|---|
| CTDL Alignment | `ob3-ctdl-alignment` | `OB3-CTDL-Alignment-v1` | OB3 CTDL Alignment |
| TCP / LER-RS | `ob3-ler-rs` | `OB3-LER-RS-v1` | OB3 LER-RS (Trusted Career Profile) |

The `ob3-` prefix signals that both profiles are grounded in Open Badges 3.0, consistent with existing naming (e.g., `ob3-direct-delivery`).

---

## Key Design Decisions

1. **Additive framing** — Both new profiles open with explicit language stating they are additive extensions to the core exchange profiles, not standalone delivery mechanisms. This prevents readers from treating them as alternatives to OID4-ECDSA, VCALM-EdDSA, or OB3-Direct-Delivery.

2. **Consistent dual format** — Each new profile gets a paired `.md` + `.yaml` file, matching the established pattern. The YAML file uses the same workflow-based structure (issuance, acceptance, presentation, verification) but with sections scoped to what is relevant for each profile type.

3. **CTDL profile is issuer-focused** — Because the Credential Engine publishing step is entirely an issuer-side action, the issuer requirements carry the most weight. Holder and verifier requirements are lighter (preserve data; optionally dereference).

4. **LER-RS VC signing scoped to platform-signed only** — Learner self-signing is noted as a future direction but not specified as a requirement in v1, keeping the profile focused and implementable.

5. **Examples are purposeful, not exhaustive** — Each profile includes only the examples needed to make the critical data structure unambiguous (one alignment block; one LER-RS snippet + one VC wrapper).

6. **Navigation updated** — `header.html` gets two new tiles for the new profiles, maintaining visual consistency with existing profile tiles.

---

## Overall Success Criteria

- [ ] Both new profile pages (`.md`) render correctly in the Jekyll site with proper front matter, headings, and formatting consistent with existing profiles
- [ ] Both new YAML files (`-profile.yaml`) are valid YAML and follow the same structural conventions as existing profile YAML files
- [ ] The CTDL profile clearly conveys the Credential Engine publishing workflow and the exact `alignment` data structure required
- [ ] The LER-RS profile clearly conveys the download-assemble-upload workflow and the platform-signing pattern, with the résumé builder scenario as the reference example
- [ ] Both profiles include a purposeful, correct, minimal set of JSON examples
- [ ] Both profiles are explicitly framed as additive to the existing core profiles
- [ ] `index.md` references both new profiles in the appropriate section(s)
- [ ] `header.html` navigation includes tiles for both new profiles
- [ ] All new content is consistent in voice, terminology, and structure with existing profiles
