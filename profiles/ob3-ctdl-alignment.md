---
title: OB3 CTDL Alignment Profile
description: An additive Open Badges 3.0 content profile that links issued credentials to records in the Credential Engine Registry using the Credential Transparency Description Language (CTDL) alignment schema.
updated: 2026-03-02
---

{{ page.description }}

**Profile ID:** `ob3-ctdl-alignment-v1`
**Version:** `0.1`
**Status:** Editor's Draft
**Last Updated:** {{ page.updated | date: "%B %d, %Y" }}
**Editors:** Nate Otto ([Skybridge Skills](https://skybridgeskills.com))

---

## OB3 CTDL Alignment Content Profile

This document defines a *content profile* — an additive specification that governs what data appears inside an Open Badges 3.0 credential. It does not define a new exchange protocol. Issuers may apply this profile alongside any of the three core exchange profiles: [VCALM-EdDSA]({{ "/profiles/vcalm-eddsa/" | relative_url }}), [OID4-ECDSA]({{ "/profiles/oid4-ecdsa/" | relative_url }}), or [OB3 Direct Delivery]({{ "/profiles/ob-3.0-direct-delivery/" | relative_url }}).

### Purpose and Scope

The OB3 CTDL Alignment Profile enables issuers to link each credential they issue to a corresponding record in the [Credential Engine Registry](https://credentialengine.org/), the largest open registry of credentials, courses, and competencies in the United States. By embedding a CTDL alignment object in the `achievement.alignment` field of an Open Badge, issuers connect their issued credentials to rich metadata about learning outcomes, competencies, quality assurance, and more — all accessible to verifiers through a stable, dereferenceable URL.

This profile is designed for use cases including:

- Connecting issued credentials to registry records that carry quality assurance and accreditation signals
- Enabling verifiers to retrieve extended credential metadata from the Credential Engine Registry
- Supporting ecosystem-wide credential discovery and comparability through shared registry identifiers

Conformance with this profile is not tested or certified by any official body at this time.

### How This Profile Works

Embedding CTDL alignment in an Open Badge requires three steps on the issuer's side:

1. **Publish to the Credential Engine Registry.** The issuer submits a description of their credential (learning outcomes, prerequisites, quality assurance, etc.) to the Credential Engine Registry at [credentialengine.org](https://credentialengine.org/). Upon successful publication, the Registry assigns a **CTID** (Credential Transparency Identifier) — a globally unique identifier in the form `ce-XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX`.

2. **Obtain the credential's registry URL.** The published credential is accessible at `https://credentialfinder.org/resources/<CTID>`. This URL serves as the canonical reference to the registry record.

3. **Embed the alignment object in issued Open Badges.** When issuing an `OpenBadgeCredential`, the issuer populates the `achievement.alignment` array with an object pointing to the registry record (see example below).

### Specifications Used

This content profile builds on the following specifications:

#### Open Badges 3.0

**Purpose:** Provides the `achievement.alignment` schema used to embed the CTDL link.

**Version:** [Open Badges 3.0](https://www.imsglobal.org/spec/ob/v3p0/)

**Profile Requirements:**
- MUST use the Open Badges 3.0 `Alignment` type within `achievement.alignment`
- MUST include `targetName`, `targetUrl`, `targetDescription`, `targetFramework`, and `targetCode` in the alignment object

#### Credential Engine Registry

**Purpose:** External registry that assigns CTIDs and hosts credential metadata accessible via credentialfinder.org URLs.

**Reference:** [Credential Engine](https://credentialengine.org/) / [Credential Finder](https://credentialfinder.org/)

**Profile Requirements:**
- MUST publish the credential definition to the Credential Engine Registry prior to issuance
- MUST use the CTID-based `credentialfinder.org/resources/<CTID>` URL as the `targetUrl`

---

### Profile Requirements by Role

#### Issuer Requirements

- [ ] MUST publish the credential definition to the Credential Engine Registry and obtain a CTID before issuing credentials under this profile
- [ ] MUST include an `alignment` array in the `achievement` object of each issued `OpenBadgeCredential`
- [ ] MUST include an alignment entry of type `Alignment` with the following fields:
  - `targetName` — the credential name as it appears in the Credential Engine Registry
  - `targetUrl` — `https://credentialfinder.org/resources/<CTID>`
  - `targetDescription` — `"Additional information powered by the Credential Registry."`
  - `targetFramework` — `"Credential Transparency Description Language"`
  - `targetCode` — the CTID value (e.g., `ce-abc12345-6789-0def-abcd-ef0123456789`)
- [ ] MUST keep the registry record current; major changes to the credential's learning outcomes or award criteria SHOULD result in an updated registry record
- [ ] SHOULD include only one CTDL alignment entry per credential; multiple entries may be used only if the credential maps to multiple distinct registry records

#### Verifier Requirements

- [ ] MUST accept and validate `OpenBadgeCredential` credentials that include a CTDL alignment entry in `achievement.alignment`
- [ ] SHOULD dereference the `targetUrl` to retrieve the full credential metadata from the Credential Engine Registry when richer metadata is needed for trust or compliance decisions
- [ ] SHOULD treat a resolvable `credentialfinder.org` URL as a positive signal that the issuer has published credential metadata to a public registry

#### Holder / Wallet Note

A wallet or holder system that satisfies the requirements of any base Open Badges 3.0 exchange profile handles CTDL alignment data automatically — the alignment object travels inside the credential and requires no special wallet logic. No additional interoperability requirements are defined for the holder role in this profile.

---

## Example

### CTDL Alignment Object in an Open Badge Achievement

The following excerpt shows the relevant `achievement` structure for an issued `OpenBadgeCredential` conforming to this profile. Fields outside `achievement` follow whichever base exchange profile is in use.

```json
{
  "achievement": {
    "id": "https://example.edu/achievements/digital-literacy",
    "type": ["Achievement"],
    "name": "Digital Literacy Certificate",
    "description": "Demonstrates foundational skills in digital communication, data literacy, and online safety.",
    "alignment": [
      {
        "type": ["Alignment"],
        "targetName": "Digital Literacy Certificate",
        "targetUrl": "https://credentialfinder.org/resources/ce-3b8f12a4-7c21-4e0d-b9f3-8a62d10e5c47",
        "targetDescription": "Additional information powered by the Credential Registry.",
        "targetFramework": "Credential Transparency Description Language",
        "targetCode": "ce-3b8f12a4-7c21-4e0d-b9f3-8a62d10e5c47"
      }
    ]
  }
}
```

---

## Workflows

### Credential Issuance with CTDL Alignment

**Primary Role:** Issuer

This workflow extends any base OB3 credential issuance workflow by requiring registry publication before credential issuance begins. All exchange-protocol steps remain unchanged.

#### Step 1: Publish Credential Definition to Credential Engine Registry

**Issuer Actions:**
- Create or update a credential description in the Credential Engine Registry including learning outcomes, award criteria, and quality assurance information
- Submit the record and receive a CTID from the Registry
- Note the canonical `credentialfinder.org/resources/<CTID>` URL for the published record

**Requirements Checklist:**
- [ ] MUST publish credential definition to the Credential Engine Registry before issuing credentials under this profile
- [ ] MUST retain the assigned CTID for use in issued credentials

#### Step 2: Issue Open Badge with Alignment Embedded

**Issuer Actions:**
- Follow the credential creation steps for the applicable base exchange profile (VCALM-EdDSA, OID4-ECDSA, or OB3 Direct Delivery)
- Populate `achievement.alignment` with the CTDL alignment object using the CTID and credentialfinder.org URL obtained in Step 1

**Requirements Checklist:**
- [ ] MUST include `achievement.alignment` array with a conforming CTDL alignment entry in every issued credential (see Profile Requirements above)
- [ ] MUST use `targetUrl` value matching the credential's published `credentialfinder.org` URL
- [ ] MUST use `targetCode` matching the credential's CTID exactly

---

### Credential Verification with CTDL Enrichment

**Primary Role:** Verifier

This workflow extends any base OB3 verification workflow. After standard signature and status verification, the verifier optionally dereferences the registry URL to retrieve enriched metadata.

#### Step 1: Perform Standard Credential Verification

**Verifier Actions:**
- Follow all verification steps defined by the applicable base exchange profile
- Extract the `achievement.alignment` array from the verified credential
- Locate any entry with `targetFramework` value of `"Credential Transparency Description Language"`

**Requirements Checklist:**
- [ ] MUST accept credentials containing a CTDL alignment entry in `achievement.alignment`

#### Step 2: Optionally Retrieve Registry Metadata

**Verifier Actions:**
- Dereference the `targetUrl` (credentialfinder.org URL) using an HTTPS GET request
- Use the returned registry data to evaluate issuer quality signals, learning outcome descriptions, or accreditation status as relevant to the verification use case

**Requirements Checklist:**
- [ ] SHOULD dereference `targetUrl` when richer credential metadata is needed for trust or compliance decisions
- [ ] SHOULD handle cases where the registry URL is temporarily unavailable without blocking overall verification
