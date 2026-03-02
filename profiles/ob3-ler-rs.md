---
title: OB3 TCP (Trusted Career Profile) Packaging Profile
description: An Open Badges 3.0 packaging profile for assembling credentials into an HR Open Standards Learning and Employment Record – Résumé Standard (LER-RS) Trusted Career Profile (TCP) document, with optional platform-signed Verifiable Credential wrapping.
updated: 2026-03-02
---

{{ page.description }}

**Profile ID:** `ob3-ler-rs-v1`
**Version:** `0.1`
**Status:** Editor's Draft
**Last Updated:** {{ page.updated | date: "%B %d, %Y" }}
**Editors:** Nate Otto ([Skybridge Skills](https://skybridgeskills.com))

---

## OB3 TCP (Trusted Career Profile) Packaging Profile

This document defines a *packaging profile* — a specification for assembling Open Badges 3.0 credentials into an [HR Open Standards Trusted Career Profile (TCP)](https://hropenstandards.org/), the Learning and Employment Record – Résumé Standard (LER-RS). It does not define a new credential exchange protocol. Open Badge credentials assembled into a TCP document must have been obtained using one of the three core exchange profiles: [VCALM-EdDSA]({{ "/profiles/vcalm-eddsa/" | relative_url }}), [OID4-ECDSA]({{ "/profiles/oid4-ecdsa/" | relative_url }}), or [OB3 Direct Delivery]({{ "/profiles/ob-3.0-direct-delivery/" | relative_url }}).

### Purpose and Scope

The OB3 TCP Packaging Profile enables résumé builder platforms and similar applications to collect Open Badge credentials on behalf of a learner and assemble them into a structured résumé document that employer systems and applicant tracking systems (ATS) can ingest. Optionally, the assembled TCP document can be wrapped as a Verifiable Credential signed by the platform, providing downstream verifiability for the entire package.

**Reference Scenario:** A résumé builder platform authenticates a learner, retrieves their Open Badge credentials from one or more issuers (using any of the core exchange protocols), assembles those credentials into a TCP (LER-RS) JSON document following the HR Open Standards 4.5 schema, and delivers the document to a downstream receiver — either as a direct file download, or wrapped as a platform-signed Verifiable Credential. The receiver (employer system, ATS, transcript service) ingests the document and validates its contents.

This profile is designed for use cases including:

- Assembling Open Badge credentials into structured résumé documents for job applications
- Delivering verified skill and learning records to employer systems and applicant tracking software
- Creating platform-attested learning portfolios from distributed credential sources
- Supporting cross-platform credential portability in hiring and talent development workflows

Conformance with this profile is not tested or certified by any official body at this time.

### Limitations and Considerations

**Platform Signing vs. Learner Signing**

This profile defines requirements for *platform-signed* TCP Verifiable Credentials, where the résumé builder platform is the `issuer` of the VC wrapper and signs it with its own key. This is the most common deployment pattern. Learner self-signing (where the credential subject signs the VC wrapper with their own DID key) is a future direction and is out of scope for version 1.

**Underlying Credential Trust**

The TCP document embeds Open Badge credentials in their original signed form. Receivers should independently verify each embedded credential against its original issuer, not rely solely on the platform's wrapping signature for trust in the individual credentials.

### Specifications Used

This packaging profile builds on the following specifications:

#### HR Open Standards Trusted Career Profile (LER-RS) 4.5

**Purpose:** Defines the structure of the TCP résumé document that serves as the packaging container for Open Badge credentials.

**Version:** [HR Open Standards TCP (LER-RS) 4.5](https://hropenstandards.org/)

**Schema Reference:** `https://schema.hropenstandards.org/4.5/recruiting/json/VerifiableCredentialLER-RSType.json`

**Profile Requirements:**
- MUST produce TCP documents conforming to the HR Open Standards LER-RS 4.5 schema
- MUST include embedded credentials in the `educationAndLearning` section as `verifiableCredential` entries
- MUST preserve each embedded Open Badge credential in its original signed form

#### Open Badges 3.0

**Purpose:** Credential schema and data model for the credentials embedded in the LER-RS document.

**Version:** [Open Badges 3.0](https://www.imsglobal.org/spec/ob/v3p0/)

**Profile Requirements:**
- Embedded credentials MUST be `OpenBadgeCredential` type
- Embedded credentials MUST retain all original fields, proofs, and signatures as issued

#### W3C Verifiable Credentials Data Model 2.0

**Purpose:** Used for the platform-signed VC wrapper when the LER-RS document is delivered as a Verifiable Credential.

**Version:** [W3C Verifiable Credentials Data Model 2.0](https://www.w3.org/TR/vc-data-model/)

**Profile Requirements (VC wrapping only):**
- MUST generate a W3C Verifiable Credentials Data Model 2.0 compliant VC envelope when wrapping is used
- MUST include the LER-RS document structure as the `credentialSubject`

#### W3C Verifiable Credentials Data Integrity

**Purpose:** Cryptographic proof mechanism for the platform-signed VC wrapper.

**Version:** [Verifiable Credential Data Integrity 1.0](https://www.w3.org/TR/vc-data-integrity/)

**Profile Requirements (VC wrapping only):**
- MUST use Data Integrity Proof with the `eddsa-rdfc-2022` cryptographic suite for the platform signature
- MUST use a `did:web` or `did:key` platform identifier that includes an Ed25519 verification method
- MUST include proof creation date and verification method reference in the platform proof

---

### Profile Requirements by Role

#### Platform / Issuer Requirements

- [ ] MUST retrieve Open Badge credentials for the learner using any conformant base OB3 exchange profile
- [ ] MUST preserve each retrieved credential in its original signed form — no modification of credential data or proofs
- [ ] MUST assemble credentials into a TCP (LER-RS) JSON document conforming to the HR Open Standards LER-RS 4.5 schema
- [ ] MUST include each credential as a `verifiableCredential` entry within the `educationAndLearning` section
- [ ] MUST obtain explicit learner authorization before assembling credentials into a TCP document
- [ ] MUST deliver the assembled TCP document to the receiver as either a plain JSON file download or a platform-signed VC (see below)
- [ ] **When delivering as a platform-signed VC:** MUST wrap the TCP document as a W3C Verifiable Credential with the platform as issuer, signed using `eddsa-rdfc-2022` with an Ed25519 key from a `did:web` or `did:key` DID
- [ ] **When delivering as a platform-signed VC:** MUST maintain a Bitstring Status List for issued TCP VCs, signed with the platform's key

#### Verifier / Receiver Requirements

- [ ] MUST accept TCP (LER-RS) documents as JSON files or via HTTP delivery
- [ ] MUST validate the TCP document structure against the HR Open Standards LER-RS 4.5 schema
- [ ] MUST extract and independently verify each embedded Open Badge credential using the credential's original issuer proof, not relying solely on the platform wrapper signature
- [ ] **When receiving a platform-signed VC:** MUST verify the platform's `eddsa-rdfc-2022` signature on the TCP VC wrapper
- [ ] **When receiving a platform-signed VC:** MUST resolve the platform's DID to obtain the platform's verification key
- [ ] **When receiving a platform-signed VC:** MUST check the TCP VC wrapper's Bitstring Status List entry
- [ ] SHOULD report to the learner when embedded credential verification fails rather than silently rejecting the package

#### Holder / Wallet Note

A wallet that is conformant with either of the wallet-supporting base exchange profiles (VCALM-EdDSA or OID4-ECDSA) SHOULD be able to accept a platform-signed `LERRSCredential` VC and respond to a presentation request for that credential type without error. The interoperability test for the holder role is pass-through: accept and re-present the credential without modification or error. No additional cryptographic operations specific to the LER-RS format are required of the holder.

---

## Examples

### TCP Document with Embedded Open Badge

The following shows a minimal LER-RS JSON document with one embedded Open Badge credential in the `educationAndLearning` section. The `verifiableCredential` value is an abbreviated representation of the full signed `OpenBadgeCredential`.

```json
{
  "person": {
    "name": {
      "formattedName": "Jordan Smith"
    },
    "communication": {
      "email": [
        {
          "address": "jordan.smith@example.com",
          "useCode": "Personal"
        }
      ]
    }
  },
  "educationAndLearning": [
    {
      "education": {
        "name": "Digital Literacy Certificate",
        "institution": {
          "name": "Community College"
        }
      },
      "verifiableCredential": {
        "@context": [
          "https://www.w3.org/2018/credentials/v1",
          "https://purl.imsglobal.org/spec/ob/v3p0/context-3.0.3.json"
        ],
        "type": ["VerifiableCredential", "OpenBadgeCredential"],
        "issuer": {
          "id": "did:web:college.example.edu",
          "type": "Profile",
          "name": "Community College"
        },
        "issuanceDate": "2025-06-15T00:00:00Z",
        "credentialSubject": {
          "type": "AchievementSubject",
          "identifier": [
            {
              "type": "IdentityObject",
              "identityHash": "jordan.smith@example.com",
              "identityType": "email"
            }
          ],
          "achievement": {
            "id": "https://college.example.edu/achievements/digital-literacy",
            "type": ["Achievement"],
            "name": "Digital Literacy Certificate"
          }
        },
        "proof": {
          "type": "DataIntegrityProof",
          "cryptosuite": "eddsa-rdfc-2022",
          "created": "2025-06-15T00:00:00Z",
          "verificationMethod": "did:web:college.example.edu#key-1",
          "proofPurpose": "assertionMethod",
          "proofValue": "z..."
        }
      }
    }
  ]
}
```

---

### Platform-Signed TCP Verifiable Credential

The following shows a TCP document wrapped as a platform-signed Verifiable Credential. The `credentialSubject` contains the TCP (LER-RS) content; the outer `proof` is the platform's signature over the entire package.

```json
{
  "@context": [
    "https://www.w3.org/2018/credentials/v1",
    "https://schema.hropenstandards.org/4.5/"
  ],
  "type": ["VerifiableCredential", "LERRSCredential"],
  "issuer": {
    "id": "did:web:resumebuilder.example.com",
    "name": "Example Résumé Builder"
  },
  "issuanceDate": "2026-03-02T00:00:00Z",
  "credentialSubject": {
    "id": "did:key:z6MkpTHR8VNsBxYAAWHut2Geadd9jSwuias8sisDArDJF",
    "person": {
      "name": {
        "formattedName": "Jordan Smith"
      }
    },
    "educationAndLearning": [
      {
        "verifiableCredential": { }
      }
    ]
  },
  "credentialStatus": {
    "id": "https://resumebuilder.example.com/status/1#42",
    "type": "BitstringStatusListEntry",
    "statusPurpose": "revocation",
    "statusListIndex": "42",
    "statusListCredential": "https://resumebuilder.example.com/status/1"
  },
  "proof": {
    "type": "DataIntegrityProof",
    "cryptosuite": "eddsa-rdfc-2022",
    "created": "2026-03-02T00:00:00Z",
    "verificationMethod": "did:web:resumebuilder.example.com#key-1",
    "proofPurpose": "assertionMethod",
    "proofValue": "z..."
  }
}
```

*The `educationAndLearning[0].verifiableCredential` value above would contain the full signed `OpenBadgeCredential` as shown in the first example.*

---

## Workflows

### TCP Assembly Workflow

**Primary Role:** Platform

This workflow covers how a résumé builder platform retrieves credentials and assembles a TCP document on behalf of a learner.

#### Step 1: Authenticate Learner and Obtain Authorization

**Platform Actions:**
- Authenticate the learner via the platform's user account system
- Present a clear consent flow explaining which credentials will be retrieved and how they will be packaged
- Obtain explicit learner authorization before proceeding

**Requirements Checklist:**
- [ ] MUST obtain explicit learner authorization before assembling credentials

#### Step 2: Retrieve Open Badge Credentials

**Platform Actions:**
- Using the applicable base exchange profile (VCALM-EdDSA or OID4-ECDSA), retrieve the learner's Open Badge credentials from one or more issuers or wallets
- Preserve each credential in its original signed form; do not modify any field, proof, or signature

**Requirements Checklist:**
- [ ] MUST retrieve credentials using any conformant base OB3 exchange profile
- [ ] MUST preserve each credential in its original signed form

#### Step 3: Assemble LER-RS Document

**Platform Actions:**
- Construct an LER-RS JSON document conforming to the HR Open Standards LER-RS 4.5 schema
- Populate `person` with the learner's identifying information
- Place each retrieved Open Badge credential as a `verifiableCredential` entry within the relevant `educationAndLearning` item

**Requirements Checklist:**
- [ ] MUST produce TCP documents conforming to HR Open Standards LER-RS 4.5 schema
- [ ] MUST include embedded credentials as `verifiableCredential` entries in `educationAndLearning`

---

### TCP Delivery Workflow

**Primary Role:** Platform

This workflow covers the two delivery options for the assembled TCP document: plain JSON and platform-signed VC.

#### Option A: Plain JSON File Delivery

**Platform Actions:**
- Offer the assembled LER-RS JSON document as a downloadable file
- Deliver via direct file download, email attachment, or API endpoint as appropriate

**Requirements Checklist:**
- [ ] MUST deliver the assembled TCP document as a valid JSON file

#### Option B: Platform-Signed VC Delivery

**Platform Actions:**
- Wrap the LER-RS document as a W3C Verifiable Credential with the platform as `issuer`
- Sign with `eddsa-rdfc-2022` using the platform's Ed25519 key from a `did:web` or `did:key` DID
- Allocate an index in the platform's Bitstring Status List and include `credentialStatus` in the VC
- Deliver the signed VC as a JSON file or via the applicable exchange protocol

**Requirements Checklist:**
- [ ] MUST wrap as W3C Verifiable Credentials Data Model 2.0 compliant VC
- [ ] MUST sign using `eddsa-rdfc-2022` with Ed25519 key from platform's `did:web` or `did:key` DID
- [ ] MUST include `credentialStatus` entry pointing to platform's Bitstring Status List

---

### TCP Ingestion and Verification Workflow

**Primary Role:** Verifier / Receiver

This workflow describes how a receiver (employer system, ATS, transcript service) ingests and validates a TCP package.

#### Step 1: Receive and Parse LER-RS Document

**Receiver Actions:**
- Accept the LER-RS as a JSON file or VC
- Validate document structure against HR Open Standards LER-RS 4.5 schema
- Extract embedded `verifiableCredential` entries from `educationAndLearning`

**Requirements Checklist:**
- [ ] MUST accept TCP (LER-RS) documents as JSON files or via HTTP delivery
- [ ] MUST validate TCP document structure against HR Open Standards LER-RS 4.5 schema

#### Step 2: Verify Platform VC Wrapper (if applicable)

**Receiver Actions:**
- If delivered as a platform-signed VC: resolve the platform's DID, verify `eddsa-rdfc-2022` signature, check Bitstring Status List entry

**Requirements Checklist:**
- [ ] **When receiving a platform-signed VC:** MUST verify the platform's `eddsa-rdfc-2022` signature on the TCP VC
- [ ] **When receiving a platform-signed VC:** MUST resolve the platform DID and check TCP VC Bitstring Status List

#### Step 3: Verify Embedded Open Badge Credentials

**Receiver Actions:**
- For each embedded `OpenBadgeCredential`, perform independent verification against the original issuer:
  - Resolve issuer DID
  - Verify credential signature and status
  - Validate credential structure and expiration

**Requirements Checklist:**
- [ ] MUST extract and independently verify each embedded Open Badge credential using the credential's original issuer proof

---

### Wallet Acceptance and Presentation Workflow

**Primary Role:** Holder / Wallet

This workflow covers the holder wallet's behavior when a platform-signed LER-RS VC is offered for acceptance and later requested for presentation.

#### Step 1: Accept LER-RS Credential

**Holder Actions:**
- Receive a platform-signed `LERRSCredential` via the applicable base exchange protocol
- Store the credential without modification, preserving all proofs

**Requirements Checklist:**
- [ ] SHOULD accept a platform-signed `LERRSCredential` without error via any conformant base exchange protocol

#### Step 2: Respond to Presentation Request

**Holder Actions:**
- Receive a presentation request asking for credentials of type `LERRSCredential`
- Present the stored credential in a Verifiable Presentation following the base exchange protocol

**Requirements Checklist:**
- [ ] SHOULD respond to a presentation request for `LERRSCredential` type by presenting the credential without error
- [ ] MUST preserve original credential proofs and signatures when including in a Verifiable Presentation
