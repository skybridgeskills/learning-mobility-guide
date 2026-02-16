---
title: OB 3.0 Direct Delivery Profile
description: An Open Badges 3.0 interoperability profile using EdDSA cryptographic signatures with Open Badges 3.0 schema for direct credential issuance and verification.
---

{{ page.description }}


**Profile ID:** `ob3-direct-delivery-v1`  
**Version:** `1.0.0`  
**Assessment Date:** [DATE]  
**Vendor/Organization:** [VENDOR_NAME]  
**Assessor:** [ASSESSOR_NAME]  

---

## Instructions

This checklist assesses vendor capabilities against the OB 3.0 Direct Delivery Profile. This profile uses EdDSA cryptographic signatures with Open Badges 3.0 schema for direct credential issuance and verification. It supports direct-download/copy JSON and upload/paste workflows without protocol-based delivery, using email address-based identifiers for recipients in credentialSubject.

Requirements are organized by workflow to clarify which capabilities can be tested via interoperability workflows versus those that are internal implementation details.

For each requirement:
- **MUST** requirements are mandatory for profile conformance
- **SHOULD** requirements are recommended for best practices
- **MAY** requirements are optional capabilities

---

## Workflow Assessment

**Please indicate which workflows your system participates in:**
- [ ] Direct Credential Issuance (Issuer role)
- [ ] Direct Credential Verification (Verifier role)

---

## Workflow Requirements

### Direct Credential Issuance Workflow

**Participating Role:** Issuer

This workflow focuses on the issuer's ability to create, sign, and deliver credentials directly as downloadable files or copy-paste JSON without protocol-based delivery.

#### Interoperability Requirements

##### Credential Creation

**Description:** Create W3C Verifiable Credentials with Open Badges 3.0 schema

**Requirements:**
- [ ] MUST generate W3C Verifiable Credentials Data Model 2.0 compliant credentials
- [ ] MUST use Open Badges 3.0 credential schema
- [ ] MUST include all mandatory Open Badges 3.0 fields
- [ ] MUST support credential expiration dates
- [ ] MUST implement credential versioning
- [ ] MUST use email address-based identifiers for credentialSubject (per Open Badges 3.0 spec)

**Implementation Details:**
```
[Please provide detailed technical information about your credential creation implementation]
```

##### Cryptographic Signing

**Description:** Sign credentials using EdDSA with RDF Dataset Canonicalization

**Requirements:**
- [ ] MUST use eddsa-rdfc-2022 cryptographic suite
- [ ] MUST use Ed25519 signature algorithm
- [ ] MUST include proof creation date in Data Integrity proof
- [ ] MUST include verification method reference in proof

**Implementation Details:**
```
[Please provide detailed technical information about your cryptographic signing implementation]
```

##### Credential Delivery

**Description:** Provide credentials as downloadable files or copy-paste JSON

**Requirements:**
- [ ] MUST provide credential as downloadable file (JSON format)
- [ ] MUST provide credential as copy-paste JSON text
- [ ] MUST ensure credential can be saved and shared by recipients
- [ ] MUST implement proper file format validation

**Implementation Details:**
```
[Please provide detailed technical information about your credential delivery implementation]
```

##### Status Management

**Description:** Implement Bitstring Status List for credential status

**Requirements:**
- [ ] MUST maintain current Bitstring Status List
- [ ] MUST sign status list with issuer key
- [ ] MUST provide status list endpoint

**Implementation Details:**
```
[Please provide detailed technical information about your status management implementation]
```

##### DID Management

**Description:** Manage issuer identity using supported DID methods

**Requirements:**
- [ ] MUST support did:web or did:key DID methods
- [ ] MUST maintain current DID document
- [ ] MUST include verification methods for Ed25519 keys
- [ ] MUST support DID resolution
- [ ] MAY support DID documents with multiple verification methods

**Implementation Details:**
```
[Please provide detailed technical information about your DID management implementation]
```

#### Internal Practices

**Note:** These requirements cannot be tested via interoperability workflows but may be important for procurement.

- [ ] SHOULD implement key rotation policies
- [ ] SHOULD implement secure key backup and recovery
- [ ] SHOULD support hardware security module integration
- [ ] SHOULD handle status list versioning
- [ ] SHOULD update status list when credentials are revoked
- [ ] SHOULD implement secure user authentication (SSO/login)
- [ ] SHOULD verify user identity before credential issuance

---

### Direct Credential Verification Workflow

**Participating Role:** Verifier

This workflow focuses on the verifier's ability to validate credentials received as files or copy-paste JSON, including signature verification, status checking, and trust registry integration.

#### Interoperability Requirements

##### Credential Import

**Description:** Import credentials from files or copy-paste JSON

**Requirements:**
- [ ] MUST accept credentials as JSON files
- [ ] MUST accept credentials as copy-paste JSON text
- [ ] MUST validate JSON structure before processing
- [ ] MUST handle malformed credentials gracefully

**Implementation Details:**
```
[Please provide detailed technical information about your credential import implementation]
```

##### Credential Validation

**Description:** Validate received verifiable credentials

**Requirements:**
- [ ] MUST validate W3C Verifiable Credentials Data Model 2.0 compliance
- [ ] MUST verify Open Badges 3.0 schema compliance
- [ ] MUST check required fields and data types
- [ ] MUST validate credential expiration dates
- [ ] MUST implement comprehensive validation error handling

**Implementation Details:**
```
[Please provide detailed technical information about your credential validation implementation]
```

##### Signature Verification

**Description:** Verify EdDSA signatures on received credentials

**Requirements:**
- [ ] MUST verify eddsa-rdfc-2022 signatures
- [ ] MUST resolve issuer DIDs to obtain verification keys
- [ ] MUST validate proof creation dates and expiration
- [ ] MUST handle signature verification failures gracefully

**Implementation Details:**
```
[Please provide detailed technical information about your signature verification implementation]
```

##### Status Verification

**Description:** Verify credential status using Bitstring Status List

**Requirements:**
- [ ] MUST implement Bitstring Status List verification
- [ ] MUST check credential status before acceptance
- [ ] MUST validate status list signature and freshness
- [ ] MUST handle status service unavailability
- [ ] MUST cache status information appropriately

**Implementation Details:**
```
[Please provide detailed technical information about your status verification implementation]
```

##### Trust Registry Integration

**Description:** Integrate with trust registries for issuer validation

**Requirements:**
- [ ] MUST query trust registries for issuer authorization
- [ ] MUST validate issuer credentials and accreditation
- [ ] MUST check for issuer revocation or suspension
- [ ] MUST implement trust registry query protocols

**Implementation Details:**
```
[Please provide detailed technical information about your trust registry integration implementation]
```

##### Threat Mitigation

**Description:** Protect against common attacks

**Requirements:**
- [ ] MUST implement protection against replay attacks
- [ ] MUST implement protection against credential forgery
- [ ] MUST implement protection against status list manipulation

**Implementation Details:**
```
[Please provide detailed technical information about your threat mitigation implementation]
```

#### Internal Practices

**Note:** These requirements cannot be tested via interoperability workflows but may be important for procurement.

- [ ] SHOULD implement proper error logging and reporting
- [ ] SHOULD maintain current trust registry data

---

## Internal Operation Requirements

**Note:** These requirements cannot be tested via interoperability workflows but may be important for procurement and internal system quality.

### Issuer Internal Requirements

- [ ] SHOULD support key rotation and revocation policies
- [ ] SHOULD implement secure key backup and recovery
- [ ] SHOULD support hardware security module integration
- [ ] SHOULD update status list when credentials are revoked
- [ ] SHOULD handle status list versioning
- [ ] SHOULD implement data encryption at rest
- [ ] SHOULD implement proper access controls
- [ ] SHOULD implement audit logging

### Verifier Internal Requirements

- [ ] SHOULD implement data encryption at rest
- [ ] SHOULD implement proper access controls
- [ ] SHOULD implement proper error logging and reporting
- [ ] SHOULD maintain current trust registry data
- [ ] SHOULD implement data minimization
- [ ] SHOULD comply with applicable privacy regulations

---

## Technical Specifications

### Credential Format Support

**Data Model:** W3C Verifiable Credentials Data Model 2.0
- [ ] Full compliance with specification
- [ ] Partial compliance (please specify limitations)
- [ ] Custom extensions (please describe)

**Credential Schema:** Open Badges 3.0
- [ ] Full compliance with specification
- [ ] Partial compliance (please specify limitations)
- [ ] Custom extensions (please describe)

**Credential Subject Identifiers:**
- [ ] Email address-based identifiers (required)
- [ ] Other identifier types (please specify)

### Cryptographic Support

**Signature Algorithm:** EdDSA (Ed25519)
- [ ] Full implementation
- [ ] Partial implementation (please specify limitations)
- [ ] Planned implementation

**Key Management:**
- [ ] Key generation
- [ ] Key storage
- [ ] Key rotation (internal practice)
- [ ] Key revocation (internal practice)
- [ ] Hardware security module support (internal practice)

### DID Support

**Supported DID Methods:**
- [ ] did:web
- [ ] did:key
- [ ] Other (please specify)

**DID Resolution:**
- [ ] Full DID resolution support
- [ ] Partial DID resolution support
- [ ] Planned implementation

**DID Document Structure:**
- [ ] MAY support DID documents with multiple verification methods

### Status Management

**Status Method:** Bitstring Status List
- [ ] Full implementation
- [ ] Partial implementation (please specify limitations)
- [ ] Planned implementation

**Status Checking:**
- [ ] Real-time status verification
- [ ] Cached status information
- [ ] Offline status handling

---

## Security and Compliance

### Data Protection

**Interoperability-Testable:**
- [ ] Credential file format validation
- [ ] JSON structure validation

**Internal Practices:**
- [ ] Encryption at rest
- [ ] Access controls

### Privacy

**Interoperability-Testable:**
- [ ] Email identifier validation

**Internal Practices:**
- [ ] Data minimization
- [ ] Privacy regulation compliance

### Threat Mitigation

**Interoperability-Testable:**
- [ ] Replay attack protection
- [ ] Credential forgery protection
- [ ] Status list manipulation protection

**Internal Practices:**
- [ ] Key compromise protection

---

## Testing and Validation

### Conformance Testing
- [ ] Profile-specific conformance tests
- [ ] Interoperability testing with other systems
- [ ] Test results documentation

---

## Trust Infrastructure

### Trust Registry Integration

**Interoperability-Testable:**
- [ ] Trust registry query support
- [ ] Issuer authorization validation
- [ ] Trust registry protocols support

**Internal Practices:**
- [ ] Trust registry data maintenance

---

## Additional Information

### Custom Extensions
```
[Please describe any custom extensions or additional capabilities]
```

### Integration Requirements
```
[Please describe any specific integration requirements or dependencies]
```

### Support and Documentation
```
[Please provide information about support availability and documentation]
```

### References
```
[Please provide links to relevant documentation, specifications, or examples]
```

---

## Assessment Summary

**Overall Conformance Level:**
- [ ] Full Conformance (all MUST requirements met)
- [ ] Partial Conformance (most MUST requirements met, some limitations)
- [ ] Planned Conformance (implementation planned within specified timeline)
- [ ] Non-Conformant (significant gaps in MUST requirements)

**Key Strengths:**
```
[Please describe the key strengths of your implementation]
```

**Key Limitations:**
```
[Please describe any key limitations or gaps]
```

**Recommendations:**
```
[Please provide any recommendations for achieving full conformance]
```

---

**Assessment Completed By:** [ASSESSOR_NAME]  
**Date:** [DATE]  
**Signature:** [SIGNATURE]
