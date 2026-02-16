---
title: OID4 ECDSA Profile
description: An Open Badges 3.0 interoperability profile using OpenID for Verifiable Credentials (OID4VCI/OID4VP) for credential exchange with ECDSA signatures.
---

{{ page.description }}

**Profile ID:** `oid4-ecdsa-v1`  
**Version:** `1.0.0`  
**Assessment Date:** [DATE]  
**Vendor/Organization:** [VENDOR_NAME]  
**Assessor:** [ASSESSOR_NAME]  

---

## Instructions

This checklist assesses vendor capabilities against the OID4 ECDSA Profile. This profile uses OpenID for Verifiable Credentials (OID4VCI/OID4VP) for credential exchange with ECDSA signatures, optimized for OAuth 2.0-based credential exchange workflows.

Requirements are organized by workflow to clarify which capabilities can be tested via interoperability workflows versus those that are internal implementation details.

For each requirement:
- **MUST** requirements are mandatory for profile conformance
- **SHOULD** requirements are recommended for best practices
- **MAY** requirements are optional capabilities

---

## Workflow Assessment

**Please indicate which workflows your system participates in:**
- [ ] Credential Issuance (Issuer role)
- [ ] Credential Acceptance (Holder role)
- [ ] Credential Request and Verification (Verifier role)
- [ ] Credential Presentation (Holder role)

---

## Workflow Requirements

### Credential Issuance Workflow

**Participating Role:** Issuer

This workflow focuses on the issuer's ability to create, sign, and deliver credentials using OID4VCI protocol.

#### Interoperability Requirements

##### Credential Creation

**Description:** Create W3C Verifiable Credentials with Open Badges 3.0 schema

**Requirements:**
- [ ] MUST generate W3C Verifiable Credentials Data Model 2.0 compliant credentials
- [ ] MUST use Open Badges 3.0 credential schema
- [ ] MUST include all mandatory Open Badges 3.0 fields
- [ ] MUST support credential expiration dates
- [ ] MUST implement credential versioning

**Implementation Details:**
```
[Please provide detailed technical information about your credential creation implementation]
```

##### Cryptographic Signing

**Description:** Sign credentials using ECDSA with RDF Dataset Canonicalization

**Requirements:**
- [ ] MUST use ecdsa-rdfc-2019 cryptographic suite
- [ ] MUST use P-256 signature algorithm
- [ ] MUST include proof creation date in Data Integrity proof
- [ ] MUST include verification method reference in proof

**Implementation Details:**
```
[Please provide detailed technical information about your cryptographic signing implementation]
```

##### OID4VCI

**Description:** Implement OID4VCI v1.0 for credential issuance

**Requirements:**
- [ ] MUST implement OID4VCI v1.0 specification
- [ ] MUST support authorization code flow
- [ ] MUST support pre-authorized code flow
- [ ] MUST provide credential issuer metadata endpoint
- [ ] MUST implement OAuth 2.0 protected credential endpoint
- [ ] MUST handle credential request processing
- [ ] MUST implement proper error handling and status codes

**Implementation Details:**
```
[Please provide detailed technical information about your OID4VCI implementation]
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
- [ ] MUST include verification methods for P-256 keys
- [ ] MUST support DID resolution
- [ ] MAY support DID documents with multiple verification methods

**Implementation Details:**
```
[Please provide detailed technical information about your DID management implementation]
```

##### Encryption in Transit

**Description:** Ensure secure transmission of credentials

**Requirements:**
- [ ] MUST implement data encryption in transit

**Implementation Details:**
```
[Please provide detailed technical information about your encryption implementation]
```

#### Internal Practices

**Note:** These requirements cannot be tested via interoperability workflows but may be important for procurement.

- [ ] SHOULD implement key rotation policies
- [ ] SHOULD implement secure key backup and recovery
- [ ] SHOULD support hardware security module integration
- [ ] SHOULD handle status list versioning
- [ ] SHOULD update status list when credentials are revoked

---

### Credential Acceptance Workflow

**Participating Role:** Holder

This workflow focuses on the holder's ability to receive, verify, and accept credentials from issuers.

#### Interoperability Requirements

##### Credential Reception

**Description:** Receive credentials via OID4VCI protocol

**Requirements:**
- [ ] MUST implement OID4VCI v1.0 specification
- [ ] MUST support authorization code flow
- [ ] MUST support pre-authorized code flow
- [ ] MUST handle credential issuer metadata discovery
- [ ] MUST implement OAuth 2.0 client functionality
- [ ] MUST process credential responses
- [ ] MUST implement proper error handling
- [ ] MUST implement user consent mechanisms

**Implementation Details:**
```
[Please provide detailed technical information about your credential reception implementation]
```

##### Signature Verification

**Description:** Verify ECDSA signatures on received credentials

**Requirements:**
- [ ] MUST verify ecdsa-rdfc-2019 signatures
- [ ] MUST resolve issuer DIDs to obtain verification keys
- [ ] MUST validate proof creation dates and expiration
- [ ] MUST handle signature verification failures gracefully

**Implementation Details:**
```
[Please provide detailed technical information about your signature verification implementation]
```

##### Status Checking

**Description:** Check credential status using Bitstring Status List

**Requirements:**
- [ ] MUST implement Bitstring Status List checking
- [ ] MUST provide real-time status verification
- [ ] MUST cache status information appropriately
- [ ] MUST handle status service unavailability

**Implementation Details:**
```
[Please provide detailed technical information about your status checking implementation]
```

##### Credential Export

**Description:** Export credentials in standard formats

**Requirements:**
- [ ] MUST support credential export in standard formats
- [ ] MUST preserve original credential proofs and signatures

**Implementation Details:**
```
[Please provide detailed technical information about your credential export implementation]
```

##### DID Management

**Description:** Manage holder identity using supported DID methods

**Requirements:**
- [ ] MUST support did:web or did:key DID methods
- [ ] MUST generate and manage P-256 key pairs
- [ ] MUST maintain current DID document
- [ ] MUST support DID resolution

**Implementation Details:**
```
[Please provide detailed technical information about your DID management implementation]
```

##### Encryption in Transit

**Description:** Ensure secure transmission of credentials

**Requirements:**
- [ ] MUST implement data encryption in transit

**Implementation Details:**
```
[Please provide detailed technical information about your encryption implementation]
```

#### Internal Practices

**Note:** These requirements cannot be tested via interoperability workflows but may be important for procurement.

- [ ] SHOULD provide secure storage for W3C Verifiable Credentials
- [ ] SHOULD support credential organization and categorization
- [ ] SHOULD provide credential sharing controls
- [ ] SHOULD render Open Badges 3.0 credentials with proper formatting
- [ ] SHOULD display credential metadata and evidence
- [ ] SHOULD show credential status and expiration
- [ ] SHOULD provide credential sharing interface

---

### Credential Request and Verification Workflow

**Participating Role:** Verifier

This workflow focuses on the verifier's complete end-to-end role in requesting credentials from holders and validating received credentials, including request creation, presentation reception, credential verification, and trust registry integration.

#### Interoperability Requirements

##### Request Creation

**Description:** Create and send presentation requests

**Requirements:**
- [ ] MUST implement OID4VP v1.0 specification
- [ ] MUST support authorization code flow
- [ ] MUST generate presentation requests with proper scopes
- [ ] MUST provide presentation request endpoint
- [ ] MUST implement proper error handling and status codes
- [ ] MUST construct presentation requests asking for specific credential types and attributes

**Implementation Details:**
```
[Please provide detailed technical information about your presentation request implementation]
```

##### Presentation Reception

**Description:** Receive verifiable presentations from holders

**Requirements:**
- [ ] MUST handle credential presentations from wallets
- [ ] MUST validate presentation structure and format
- [ ] MUST extract credentials from presentations

**Implementation Details:**
```
[Please provide detailed technical information about your presentation reception implementation]
```

##### Credential Verification

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

**Description:** Verify ECDSA signatures on received credentials

**Requirements:**
- [ ] MUST verify ecdsa-rdfc-2019 signatures
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

##### Encryption in Transit

**Description:** Ensure secure transmission of requests and credentials

**Requirements:**
- [ ] MUST implement data encryption in transit

**Implementation Details:**
```
[Please provide detailed technical information about your encryption implementation]
```

#### Internal Practices

**Note:** These requirements cannot be tested via interoperability workflows but may be important for procurement.

- [ ] SHOULD implement proper error logging and reporting
- [ ] SHOULD maintain current trust registry data

---

### Credential Presentation Workflow

**Participating Role:** Holder

This workflow focuses on the holder's ability to create and send credential presentations to verifiers.

#### Interoperability Requirements

##### Presentation Creation

**Description:** Create and send credential presentations

**Requirements:**
- [ ] MUST implement OID4VP v1.0 specification
- [ ] MUST support authorization code flow
- [ ] MUST handle presentation requests from verifiers
- [ ] MUST provide credential presentation interface
- [ ] MUST implement user consent mechanisms
- [ ] MUST create verifiable presentations with ECDSA signatures

**Implementation Details:**
```
[Please provide detailed technical information about your credential presentation implementation]
```

##### DID Management

**Description:** Manage holder identity for presentations

**Requirements:**
- [ ] MUST support did:web or did:key DID methods
- [ ] MUST generate and manage P-256 key pairs for presentations
- [ ] MUST maintain current DID document
- [ ] MUST support DID resolution

**Implementation Details:**
```
[Please provide detailed technical information about your DID management implementation]
```

##### Encryption in Transit

**Description:** Ensure secure transmission of presentations

**Requirements:**
- [ ] MUST implement data encryption in transit

**Implementation Details:**
```
[Please provide detailed technical information about your encryption implementation]
```

#### Internal Practices

**Note:** These requirements cannot be tested via interoperability workflows but may be important for procurement.

None specified for this workflow.

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

### Holder Internal Requirements

- [ ] SHOULD provide secure storage for W3C Verifiable Credentials
- [ ] SHOULD support credential organization and categorization
- [ ] SHOULD provide credential sharing controls
- [ ] SHOULD render Open Badges 3.0 credentials with proper formatting
- [ ] SHOULD display credential metadata and evidence
- [ ] SHOULD show credential status and expiration
- [ ] SHOULD provide credential sharing interface
- [ ] SHOULD implement data encryption at rest
- [ ] SHOULD implement proper access controls
- [ ] SHOULD implement data minimization
- [ ] SHOULD comply with applicable privacy regulations

### Verifier Internal Requirements

- [ ] SHOULD implement data encryption at rest
- [ ] SHOULD implement proper access controls
- [ ] SHOULD implement proper error logging and reporting
- [ ] SHOULD maintain current trust registry data
- [ ] SHOULD implement data minimization
- [ ] SHOULD comply with applicable privacy regulations

---

## Protocol Support

### OID4VCI v1.0

**Specification:** https://openid.net/specs/openid-4-verifiable-credential-issuance-1_0.html

**Supported Capabilities:**
- [ ] Authorization code flow
- [ ] Pre-authorized code flow
- [ ] Credential issuer metadata discovery
- [ ] OAuth 2.0 client functionality
- [ ] Credential request processing
- [ ] Credential response handling

**Implementation Details:**
```
[Please provide detailed information about your OID4VCI implementation]
```

**Endpoints/Interfaces:**
```
[Please list relevant endpoints or interfaces]
```

### OID4VP v1.0

**Specification:** https://openid.net/specs/openid-4-verifiable-presentations-1_0.html

**Supported Capabilities:**
- [ ] Authorization code flow
- [ ] Presentation request generation
- [ ] Credential presentation interface
- [ ] User consent mechanisms
- [ ] Presentation response handling

**Implementation Details:**
```
[Please provide detailed information about your OID4VP implementation]
```

**Endpoints/Interfaces:**
```
[Please list relevant endpoints or interfaces]
```

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

### Cryptographic Support

**Signature Algorithm:** ECDSA (P-256)
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
- [ ] Encryption in transit

**Internal Practices:**
- [ ] Encryption at rest
- [ ] Access controls

### Privacy

**Interoperability-Testable:**
- [ ] User consent mechanisms (via protocol flow)

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
