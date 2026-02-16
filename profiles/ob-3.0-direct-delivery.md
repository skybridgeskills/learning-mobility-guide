---
title: OB 3.0 Direct Delivery Profile
description: An Open Badges 3.0 interoperability profile using EdDSA cryptographic signatures with Open Badges 3.0 schema for direct credential issuance and verification.
updated: 2026-02-15
---

{{ page.description }}

**Profile ID:** `ob3-direct-delivery-v1`  
**Version:** `0.1`  
**Status:** Editor's Draft
**Last Updated:** {{ page.updated | date: "%B %d, %Y" }}
**Editors:** Nate Otto ([Skybridge Skills](https://skybridgeskills.com))

---

## Open Badges 3.0 Direct Delivery Interoperability Profile

This document defines an interoperability profile for digital credentials in learning mobility ecosystems. An interoperability profile specifies a particular combination of standards-based technology choices that work together to provide complete end-to-end workflows for credential issuance and verification.

### Purpose and Scope

The OB 3.0 Direct Delivery Profile enables direct credential issuance and verification workflows without protocol-based delivery. This profile supports direct-download/copy JSON and upload/paste workflows, using email address-based identifiers for recipients in credentialSubject. This profile is designed for use cases including:

- Direct credential download and file sharing
- Email-based credential delivery
- Copy-paste credential workflows
- Simple credential issuance without wallet integration

This profile ensures that when different vendors' systems—whether issuer platforms or verifier systems—all conform to this profile, they can exchange credentials without requiring custom integrations or direct agreements between every individual pairing of organizations.

Conformance with this profile is not tested or certified by any official body at this time.

### Limitations and Considerations

**Email Address Control Limitations**

Users may no longer have control over email addresses that appear in their credentials. This is a common scenario that affects credential verification:

- **Institutional Email Addresses**: College and university email addresses are often deactivated within 6 months after graduation. Credentials issued to these addresses cannot be verified through email confirmation once access is lost.
- **Former Employer Email Addresses**: Email addresses at former employers may no longer be accessible to users after employment ends. Credentials issued to these addresses may not support strong proof of control verification.

**Implications for Verification**

When email addresses in credentials are no longer accessible to users, strong proof of control verification may not be possible using this profile. Verifiers implementing this profile should:

- Accept that email verification may fail for legitimate credentials with older identifiers
- Provide clear guidance to users when email verification cannot be completed
- Consider alternative verification methods when email confirmation is not possible

If strong proof of control verification is required, consider switching to profiles that use verifiable presentations. These protocol-based profiles enable verifiers to cryptographically verify that the presenter controls the DID associated with the credential, providing stronger assurance than email-based verification alone.

### Specifications Used

This interoperability profile builds on the following specifications:

#### Open Badges 3.0

**Purpose:** Primary credential schema and data model for representing achievements and competencies.

**Version:** [Open Badges 3.0](https://www.imsglobal.org/spec/ob/v3p0/)

**Profile Requirements:**
- MUST use Open Badges 3.0 credential schema
- MUST include all mandatory Open Badges 3.0 fields
- MUST support credential expiration dates
- MUST implement credential versioning
- MUST use email address-based identifiers for credentialSubject (per Open Badges 3.0 spec)

#### W3C Verifiable Credentials Data Model 2.0

**Purpose:** Base credential format providing the foundational structure for verifiable credentials.

**Version:** [W3C Verifiable Credentials Data Model 2.0](https://www.w3.org/TR/vc-data-model/)

**Profile Requirements:**
- MUST generate W3C Verifiable Credentials Data Model 2.0 compliant credentials
- MUST validate W3C Verifiable Credentials Data Model 2.0 compliance during verification

#### W3C Verifiable Credentials Data Integrity

**Purpose:** Cryptographic proof mechanism for securing credential data and ensuring authenticity.

**Version:** [Verifiable Credential Data Integrity 1.0](https://www.w3.org/TR/vc-data-integrity/)

**Profile Requirements:**
- MUST use Data Integrity Proof with the `eddsa-rdfc-2022` cryptographic suite
- MUST use [Multikey format from Controlled Identifiers 1.0 spec](https://www.w3.org/TR/cid-1.0/#example-an-ed25519-public-key-encoded-as-a-multikey)
- MUST use a `assertionMethod` proofPurpose.
- MUST use did:web or did:key issuer identifier that includes a Ed25519 256-bit public key as verification method.
- MUST include proof creation date in Data Integrity proof
- MUST include verification method reference in proof with a key identifier included in the issuer's DID document.
- MUST verify eddsa-rdfc-2022 signatures during credential verification

**References:**
- See [VC Data Integrity - Cryptographic Suites](https://www.w3.org/TR/vc-data-integrity/#cryptographic-suites) for details on cryptographic suite requirements.
- See [Data Integrity EdDSA Cryptosuites v1.0](https://www.w3.org/TR/vc-di-eddsa/) for EdDSA cryptosuite requirements.

#### Bitstring Status List

**Purpose:** Status management mechanism for credential revocation and status checking.

**Version:** [Bitstring Status List 1.0](https://www.w3.org/TR/vc-bitstring-status-list/)

**Profile Requirements:**
- MUST maintain current Bitstring Status List
- MUST sign status list with a key included in the credential issuer's resolved DID document. No shared status lists across issuers.
- MUST implement BitStringStatusList and include a list as a status method in credentials.
- MUST provide real-time status verification
- MUST handle status service unavailability
- MUST check credential status upon verification
- MUST validate status list signature and freshness
- SHOULD cache status information appropriately

The requirement that the status list key be owned by the credential issuer avoids complicated authorization relationship verification work. If a DID method is used that supports multiple keys (i.e. `did:web`), the credential key and status list key MAY be different.

#### Decentralized Identifiers (DIDs)

**Purpose:** Identity management for issuers.

**Profile Requirements:**
- **Issuer Identifiers:** MUST support both `did:web` and `did:key` DID methods
- **Credential Subject Identifiers:** MUST use email address-based identifiers (per Open Badges 3.0 spec)
- MUST include verification methods for Ed25519 curve keys.
- MUST support DID resolution for `did:web` and `did:key` (for the Ed25519 keys used in the profile).
- Issuers MAY use and Verifiers MUST support DID documents with multiple verification methods
- SHOULD use [Multikey representations](https://www.w3.org/TR/cid-1.0/#example-an-ed25519-public-key-encoded-as-a-multikey) for Ed25519 keys when expressing keys in the DID document. 

**References:** 
- See [DID Core Specification 1.0](https://www.w3.org/TR/did-core/) for DID method details.
- See [did:web Method Specification 0.7](https://w3c-ccg.github.io/did-method-web/) for did:web method details.
- See [did:key Method Specification 0.9](https://w3c-ccg.github.io/did-key-spec/) for did:key method details.
- See [Multikey format from Controlled Identifiers 1.0 spec](https://www.w3.org/TR/cid-1.0/#example-an-ed25519-public-key-encoded-as-a-multikey) for Multikey representation of Ed25519 keys.

### Profile Requirements by Role

#### Issuer Requirements

- [ ] MUST generate W3C Verifiable Credentials Data Model 2.0 compliant credentials
- [ ] MUST use `OpenBadgeCredential` credential type and comply with Open Badges 3.0 schema, including all mandatory fields
- [ ] MUST use email address-based identifiers for credentialSubject (per Open Badges 3.0 spec)
- [ ] MUST use Data Integrity Proof with the `eddsa-rdfc-2022` cryptographic suite, including proof creation date and verification method reference (see Data Integrity specification requirements above)
- [ ] MUST maintain current Bitstring Status List signed with issuer key and implement BitStringStatusList as status method in credentials
- [ ] MUST use did:web or did:key issuer identifier with Ed25519 verification method, supporting resolution of current DID document
- [ ] MUST provide credential as downloadable file (JSON format)
- [ ] MUST provide credential as copy-paste JSON text
- [ ] MUST ensure credential can be saved and shared by recipients
- [ ] MUST implement proper file format validation
- [ ] SHOULD support credential expiration date with `validUntil`
- [ ] SHOULD update status list when credentials are revoked
- [ ] SHOULD implement secure user authentication (SSO/login)
- [ ] SHOULD verify user identity before credential issuance

#### Verifier Requirements

- [ ] MUST accept credentials as JSON files
- [ ] MUST accept credentials as copy-paste JSON text
- [ ] MUST validate JSON structure before processing
- [ ] MUST handle malformed credentials gracefully
- [ ] MUST validate W3C Verifiable Credentials Data Model 2.0 compliance, verify Open Badges 3.0 schema compliance, check required fields and data types, and validate credential expiration dates
- [ ] MUST implement comprehensive validation error handling
- [ ] MUST verify eddsa-rdfc-2022 signatures (see Data Integrity specification requirements above)
- [ ] MUST resolve issuer DIDs to obtain verification keys
- [ ] MUST validate proof creation dates and expiration
- [ ] MUST handle signature verification failures gracefully
- [ ] MUST implement Bitstring Status List verification
- [ ] MUST validate status list signature and freshness
- [ ] MUST handle status service unavailability
- [ ] MUST cache status information appropriately
- [ ] MUST integrate with trust registries to query issuer authorization, validate issuer credentials and accreditation, check for issuer revocation or suspension, and implement trust registry query protocols
- [ ] MUST implement protection against replay attacks, credential forgery, and status list manipulation
- [ ] SHOULD implement proper error logging and reporting
- [ ] SHOULD maintain current trust registry data

---

## Workflows

This section provides step-by-step implementation guidance for each workflow supported by this profile. This profile does not use exchange protocols, so workflows focus on direct file/copy-paste operations.

### Direct Credential Issuance Workflow

**Primary Role:** Issuer

This workflow enables issuers to create, sign, and deliver credentials directly as downloadable files or copy-paste JSON without protocol-based delivery.

#### Step 1: Authenticate User and Authorize Issuance

**Issuer Actions:**
- User authenticates via SSO/login to issuer platform (not wallet presentation)
- Verify user identity and achievements/qualifications
- Authorize credential issuance based on user's achievements/qualifications

**Requirements Checklist:**
- [ ] SHOULD implement secure user authentication (SSO/login)
- [ ] SHOULD verify user identity before credential issuance

#### Step 2: Create and Sign Credential

**Issuer Actions:**
- Generate W3C Verifiable Credential with Open Badges 3.0 schema, including all mandatory fields
- Set credential subject identifier using email address-based identifier (per Open Badges 3.0 spec)
- Create Data Integrity proof using eddsa-rdfc-2022 cryptographic suite with Ed25519 signature algorithm
- Include proof creation date and verification method reference pointing to issuer's DID
- Update Bitstring Status List to include allocated index for new credential. Include `statusListCredential` and `statusListIndex` in the issued credential's `credentialStatus` entry
- Optionally set credential expiration date with `validUntil`

**Requirements Checklist:**
- [ ] MUST generate W3C Verifiable Credentials Data Model 2.0 compliant credentials
- [ ] MUST use `OpenBadgeCredential` credential type and comply with Open Badges 3.0 schema, including all mandatory fields
- [ ] MUST use email address-based identifiers for credentialSubject (per Open Badges 3.0 spec)
- [ ] MUST use Data Integrity Proof with the `eddsa-rdfc-2022` cryptographic suite, including proof creation date and verification method reference (see Data Integrity specification requirements above)
- [ ] MUST maintain current Bitstring Status List signed with issuer key and implement BitStringStatusList as status method in credentials
- [ ] MUST use did:web or did:key issuer identifier with Ed25519 verification method, supporting resolution of current DID document
- [ ] SHOULD support credential expiration date with `validUntil`
- [ ] SHOULD update status list when credentials are revoked

#### Step 3: Deliver Credential as File or Copy-Paste Text

**Issuer Actions:**
- Provide credential as downloadable file (JSON format)
- Provide credential as copy-paste JSON text
- Ensure credential can be saved and shared by recipients
- Validate file format before delivery

**Requirements Checklist:**
- [ ] MUST provide credential as downloadable file (JSON format)
- [ ] MUST provide credential as copy-paste JSON text
- [ ] MUST ensure credential can be saved and shared by recipients
- [ ] MUST implement proper file format validation

---

### Direct Credential Verification Workflow

**Primary Role:** Verifier

This workflow enables verifiers to validate credentials received as files or copy-paste JSON.

#### Step 1: Import Credential

**Verifier Actions:**
- Receive credential as JSON file or copy-paste JSON text
- Validate JSON structure before processing
- Handle malformed credentials gracefully

**Requirements Checklist:**
- [ ] MUST accept credentials as JSON files
- [ ] MUST accept credentials as copy-paste JSON text
- [ ] MUST validate JSON structure before processing
- [ ] MUST handle malformed credentials gracefully

#### Step 2: Validate Credential Structure

**Verifier Actions:**
- Validate W3C Verifiable Credentials Data Model 2.0 compliance
- Verify Open Badges 3.0 schema compliance
- Check required fields and data types
- Validate credential expiration dates
- Implement comprehensive validation error handling

**Requirements Checklist:**
- [ ] MUST validate W3C Verifiable Credentials Data Model 2.0 compliance, verify Open Badges 3.0 schema compliance, check required fields and data types, and validate credential expiration dates
- [ ] MUST implement comprehensive validation error handling

#### Step 3: Verify Signature

**Verifier Actions:**
- Extract proof from credential
- Resolve issuer DID to obtain verification key
- Verify eddsa-rdfc-2022 signature (see Data Integrity specification requirements above)
- Validate proof creation date and expiration
- Handle signature verification failures gracefully

**Requirements Checklist:**
- [ ] MUST verify eddsa-rdfc-2022 signatures (see Data Integrity specification requirements above)
- [ ] MUST resolve issuer DIDs to obtain verification keys
- [ ] MUST validate proof creation dates and expiration
- [ ] MUST handle signature verification failures gracefully

#### Step 4: Verify Status

**Verifier Actions:**
- Retrieve current status list from issuer
- Check credential status using Bitstring Status List
- Validate status list signature and freshness
- Handle status service unavailability
- Cache status information appropriately

**Requirements Checklist:**
- [ ] MUST implement Bitstring Status List verification
- [ ] MUST validate status list signature and freshness
- [ ] MUST handle status service unavailability
- [ ] MUST cache status information appropriately

#### Step 5: Verify Recipient Identity

**Verifier Actions:**
- Extract identifiers from credential (email addresses from credentialSubject)
- Compare extracted identifiers to authenticated identifiers for the user submitting the credential
- Send email confirmation codes if necessary for verification
- Handle cases where email verification is not possible

**Requirements Checklist:**
- [ ] MUST extract identifiers from credential credentialSubject
- [ ] MUST compare credential identifiers to authenticated user identifiers
- [ ] SHOULD send email confirmation codes when email verification is required
- [ ] SHOULD handle cases where email addresses in credentials are no longer accessible to users
- [ ] SHOULD provide clear guidance when strong proof of control verification cannot be achieved

#### Step 6: Validate Issuer Authorization

**Verifier Actions:**
- Query trust registries for issuer authorization
- Validate issuer credentials and accreditation
- Check for issuer revocation or suspension
- Implement trust registry query protocols

**Requirements Checklist:**
- [ ] MUST integrate with trust registries to query issuer authorization, validate issuer credentials and accreditation, check for issuer revocation or suspension, and implement trust registry query protocols
- [ ] MUST implement protection against replay attacks, credential forgery, and status list manipulation
- [ ] SHOULD implement proper error logging and reporting
- [ ] SHOULD maintain current trust registry data