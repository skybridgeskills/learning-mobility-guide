---
title: OID4 ECDSA Profile
description: An Open Badges 3.0 interoperability profile using OpenID for Verifiable Credentials (OID4VCI/OID4VP) for credential exchange with ECDSA signatures.
updated: 2026-02-15
---

{{ page.description }}

**Profile ID:** `oid4-ecdsa-v1`  
**Version:** `0.1`  
**Status:** Editor's Draft  
**Last Updated:** {{ page.updated | date: "%B %d, %Y" }}  
**Editors:** Nate Otto ([Skybridge Skills](https://skybridgeskills.com))

---

## OID4-ECDSA Open Badges 3.0 Interoperability Profile

This document defines an interoperability profile for digital credentials in learning mobility ecosystems. An interoperability profile specifies a particular combination of standards-based technology choices that work together to provide complete end-to-end workflows for credential issuance, acceptance, presentation, and verification.

**WARNING:** This profile is a discussion draft, it is not yet implemented fully by any vendors. Components may change before the profile is finalized to match actual market adoption.

### Purpose and Scope

The OID4-ECDSA Profile enables OAuth 2.0-based credential exchange workflows optimized for enterprise credential management systems and mobile wallet applications. This profile is designed for use cases including:

- OAuth 2.0-based credential exchange
- Enterprise credential management systems
- Mobile wallet applications
- Government-issued credentials

This profile ensures that when different vendors' systems—whether issuer platforms, holder wallets, or verifier systems—all conform to this profile, they can exchange credentials without requiring custom integrations or direct agreements between every individual pairing of organizations.

Conformance with this profile is not tested or certified by any official body at this time.

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
- MUST use Data Integrity Proof with the `ecdsa-rdfc-2019` cryptographic suite
- MUST use P-256 signature algorithm
- MUST use a `assertionMethod` proofPurpose.
- MUST use did:web or did:key issuer identifier that includes a P-256 public key as verification method.
- MUST include proof creation date in Data Integrity proof
- MUST include verification method reference in proof with a key identifier included in the issuer's DID document.
- MUST verify ecdsa-rdfc-2019 signatures during credential verification

**References:**
- See [VC Data Integrity - Cryptographic Suites](https://www.w3.org/TR/vc-data-integrity/#cryptographic-suites) for details on cryptographic suite requirements.

#### OpenID for Verifiable Credential Issuance (OID4VCI)

**Purpose:** OAuth 2.0-based protocol for credential issuance workflows.

**Version:** [OID4VCI v1.0](https://openid.net/specs/openid-4-verifiable-credential-issuance-1_0.html)

**Profile Requirements:**
- MUST implement OID4VCI v1.0 specification
- MUST support authorization code flow
- MUST support pre-authorized code flow
- MUST provide credential issuer metadata endpoint
- MUST implement OAuth 2.0 protected credential endpoint
- MUST handle credential request processing
- MUST implement proper error handling and status codes

**References:**
- See [OID4VCI v1.0 Specification](https://openid.net/specs/openid-4-verifiable-credential-issuance-1_0.html) for protocol details.

#### OpenID for Verifiable Presentations (OID4VP)

**Purpose:** OAuth 2.0-based protocol for credential presentation request/response workflows.

**Version:** [OID4VP v1.0](https://openid.net/specs/openid-4-verifiable-presentations-1_0.html)

**Profile Requirements:**
- MUST implement OID4VP v1.0 specification
- MUST support authorization code flow
- MUST generate presentation requests with proper scopes
- MUST provide presentation request endpoint
- MUST handle presentation responses
- MUST implement proper error handling and status codes

**References:**
- See [OID4VP v1.0 Specification](https://openid.net/specs/openid-4-verifiable-presentations-1_0.html) for protocol details.

#### Bitstring Status List

**Purpose:** Status management mechanism for credential revocation and status checking.

**Version:** [Bitstring Status List 1.0](https://www.w3.org/TR/vc-bitstring-status-list/)

**Profile Requirements:**
- MUST maintain current Bitstring Status List
- MUST sign status list with a key included in the credential issuer's resolved DID document. No shared status lists across issuers.
- MUST implement BitStringStatusList and include a list as a status method in credentials.
- MUST provide real-time status verification
- MUST handle status service unavailability
- MUST check credential status upon acceptance and verification
- MUST validate status list signature and freshness
- SHOULD cache status information appropriately

The requirement that the status list key be owned by the credential issuer avoids complicated authorization relationship verification work. If a DID method is used that supports multiple keys (i.e. `did:web`), the credential key and status list key MAY be different.

#### Decentralized Identifiers (DIDs)

**Purpose:** Identity management for issuers and credential subjects.

**Profile Requirements:**
- **Issuer Identifiers:** MUST support both `did:web` and `did:key` DID methods
- **Credential Subject Identifiers:** MUST support `did:key` DID methods
- MUST include verification methods for P-256 curve keys.
- MUST support DID resolution for `did:web` and `did:key` (for the P-256 keys used in the profile).
- Issuers MAY use and Verifiers MUST support DID documents with multiple verification methods

**References:** 
- See [DID Core Specification 1.0](https://www.w3.org/TR/did-core/) for DID method details.
- See [did:web Method Specification 0.7](https://w3c-ccg.github.io/did-method-web/) for did:web method details.
- See [did:key Method Specification 0.9](https://w3c-ccg.github.io/did-key-spec/) for did:key method details.

### Profile Requirements by Role

#### Issuer Requirements

- [ ] MUST generate W3C Verifiable Credentials Data Model 2.0 compliant credentials
- [ ] MUST use `OpenBadgeCredential` credential type and comply with Open Badges 3.0 schema, including all mandatory fields
- [ ] MUST use Data Integrity Proof with the `ecdsa-rdfc-2019` cryptographic suite, including proof creation date and verification method reference (see Data Integrity specification requirements above)
- [ ] MUST implement OID4VCI v1.0 specification with authorization code flow and pre-authorized code flow support
- [ ] MUST provide credential issuer metadata endpoint
- [ ] MUST implement OAuth 2.0 protected credential endpoint
- [ ] MUST maintain current Bitstring Status List signed with issuer key and implement BitStringStatusList as status method in credentials
- [ ] MUST use did:web or did:key issuer identifier with P-256 verification method, supporting resolution of current DID document
- [ ] MUST implement data encryption on web service endpoints (at least TLS 1.2)
- [ ] SHOULD support credential expiration date with `validUntil`
- [ ] SHOULD update status list when credentials are revoked

#### Holder Requirements

- [ ] MUST implement OID4VCI v1.0 specification with authorization code flow and pre-authorized code flow support
- [ ] MUST handle credential issuer metadata discovery
- [ ] MUST implement OAuth 2.0 client functionality
- [ ] MUST process credential responses
- [ ] MUST implement OID4VP v1.0 specification with authorization code flow support
- [ ] MUST handle presentation requests from verifiers
- [ ] MUST implement user consent mechanisms (applies to both issuance and presentation workflows)
- [ ] MUST verify ecdsa-rdfc-2019 signatures (see Data Integrity specification requirements above) in credentials received from issuers
- [ ] MUST resolve issuer DIDs of type `did:web` or `did:key` to DID Documents including P-256 public key verification method
- [ ] MUST validate proof creation dates and credential expiration dates
- [ ] MUST implement Bitstring Status List checking
- [ ] MUST support credential export in standard formats
- [ ] MUST preserve original credential proofs and signatures
- [ ] MUST support did:web or did:key DID methods for credential subject identity
- [ ] MUST generate and manage P-256 key pairs for credential subjects and support resolution of current DID documents as `did:key` or `did:web` identifiers containing keys used in Verifiable Presentations
- [ ] MUST require secure transport (SSL/TLS) for OID4VCI and OID4VP endpoints
- [ ] MUST provide credential presentation interface
- [ ] MUST create verifiable presentations with ECDSA signatures
- [ ] MUST store credentials for later presentation
- [ ] SHOULD store credentials securely and allow user management of stored data
- [ ] SHOULD render Open Badges 3.0 credentials required fields
- [ ] SHOULD display credential evidence if available
- [ ] SHOULD show credential status and expiration
- [ ] SHOULD handle status service unavailability and other errors gracefully
- [ ] SHOULD cache status information appropriately

#### Verifier Requirements

- [ ] MUST implement OID4VP v1.0 specification with authorization code flow support
- [ ] MUST generate presentation requests with proper scopes asking for specific credential types and attributes
- [ ] MUST provide presentation request endpoint
- [ ] MUST handle presentation responses from wallets
- [ ] MUST validate presentation structure and format
- [ ] MUST extract credentials from presentations
- [ ] MUST validate W3C Verifiable Credentials Data Model 2.0 compliance, verify Open Badges 3.0 schema compliance, check required fields and data types, and validate credential expiration dates
- [ ] MUST implement comprehensive validation error handling
- [ ] MUST verify ecdsa-rdfc-2019 signatures (see Data Integrity specification requirements above)
- [ ] MUST resolve issuer DIDs to obtain verification keys
- [ ] MUST validate proof creation dates and expiration
- [ ] MUST handle signature verification failures gracefully
- [ ] MUST implement Bitstring Status List verification
- [ ] MUST validate status list signature and freshness
- [ ] MUST handle status service unavailability
- [ ] MUST cache status information appropriately
- [ ] MUST integrate with trust registries to query issuer authorization, validate issuer credentials and accreditation, check for issuer revocation or suspension, and implement trust registry query protocols
- [ ] MUST implement protection against replay attacks, credential forgery, and status list manipulation
- [ ] MUST implement data encryption in transit
- [ ] SHOULD implement proper error logging and reporting
- [ ] SHOULD maintain current trust registry data

---

## Workflows

This section provides step-by-step implementation guidance for each workflow supported by this profile. Each workflow focuses on the primary role's requirements while referencing the mirror role's actions.

### Credential Issuance Workflow

**Primary Role:** Issuer

This workflow enables issuers to create, sign, and deliver credentials to holders using OID4VCI protocol. The workflow pairs with the Credential Acceptance workflow, where holders receive and accept credentials.

#### Step 1: Provide Credential Offer

**Issuer Actions:**
- Create credential offer when user has earned a badge
- Provide credential offer via QR code, deep link, or copy-paste interface containing credential issuer metadata endpoint URL or pre-authorized code
- Support both authorization code flow and pre-authorized code flow
- Expose credential issuer metadata endpoint with OID4VCI configuration

**Holder Actions (see Credential Acceptance Workflow, Step 1):**
The holder wallet scans, copies, or clicks the credential offer from the issuer system and processes it to discover the credential issuer metadata endpoint.

**Requirements Checklist:**
- [ ] MUST provide credential issuer metadata endpoint
- [ ] MUST support authorization code flow
- [ ] MUST support pre-authorized code flow
- [ ] MUST implement data encryption on web service endpoints (at least TLS 1.2)

#### Step 2: Handle Authorization Request

**Issuer Actions:**
- Receive authorization request from holder wallet
- For authorization code flow: authenticate holder and obtain authorization
- For pre-authorized code flow: validate pre-authorized code
- Issue authorization code or access token based on flow type

**Holder Actions (see Credential Acceptance Workflow, Step 2):**
The holder wallet discovers credential issuer metadata, initiates OAuth 2.0 authorization flow (authorization code or pre-authorized code), and exchanges authorization for access token.

**Requirements Checklist:**
- [ ] MUST implement OAuth 2.0 protected authorization endpoint
- [ ] MUST support authorization code flow
- [ ] MUST support pre-authorized code flow
- [ ] MUST implement proper error handling and status codes

#### Step 3: Process Credential Request

**Issuer Actions:**
- Receive credential request from holder wallet at OAuth 2.0 protected credential endpoint
- Validate access token
- Authorize credential issuance based on holder's achievements/qualifications (determined before offer creation)
- Generate W3C Verifiable Credential with Open Badges 3.0 schema, including all mandatory fields
- Set credential subject identifier using verified holder identity from authorization
- Create Data Integrity proof using ecdsa-rdfc-2019 cryptographic suite with P-256 signature algorithm
- Include proof creation date and verification method reference pointing to issuer's DID
- Update Bitstring Status List to include allocated index for new credential. Include `statusListCredential` and `statusListIndex` in the issued credential's `credentialStatus` entry
- Respond with credential response containing the verifiable credential(s)
- Ensure secure transmission using encryption in transit

**Holder Actions (see Credential Acceptance Workflow, Step 3):**
The holder wallet receives the credential response, extracts credentials, verifies them, prompts the user to accept, and stores them.

**Requirements Checklist:**
- [ ] MUST generate W3C Verifiable Credentials Data Model 2.0 compliant credentials
- [ ] MUST use `OpenBadgeCredential` credential type and comply with Open Badges 3.0 schema, including all mandatory fields
- [ ] MUST use Data Integrity Proof with the `ecdsa-rdfc-2019` cryptographic suite, including proof creation date and verification method reference (see Data Integrity specification requirements above)
- [ ] MUST maintain current Bitstring Status List signed with issuer key and implement BitStringStatusList as status method in credentials
- [ ] MUST implement OAuth 2.0 protected credential endpoint
- [ ] MUST implement proper error handling and status codes
- [ ] MUST implement data encryption on web service endpoints (at least TLS 1.2)
- [ ] SHOULD support credential expiration date with `validUntil`

---

### Credential Acceptance Workflow

**Primary Role:** Holder

This workflow enables holders to receive, verify, and accept credentials from issuers using OID4VCI protocol. The workflow pairs with the Credential Issuance workflow, where issuers create and deliver credentials.

#### Step 1: Process Credential Offer

**Holder Actions:**
- Scan QR code, copy-paste, or click deep link to access credential offer from issuer system
- Discover credential issuer metadata endpoint from offer
- Fetch credential issuer metadata from within wallet app
- The credential offer is provided by the issuer when the user has earned a badge (see Credential Issuance Workflow, Step 1)

**Issuer Actions (see Credential Issuance Workflow, Step 1):**
The issuer creates a credential offer and exposes it to the user via QR code, deep link, or copy-paste interface.

**Requirements Checklist:**
- [ ] MUST implement OID4VCI v1.0 specification
- [ ] MUST handle credential issuer metadata discovery
- [ ] MUST require secure transport (SSL/TLS) for OID4VCI endpoints

#### Step 2: Complete Authorization and Token Exchange

**Holder Actions:**
- For authorization code flow: initiate OAuth 2.0 authorization request, obtain authorization code, exchange authorization code for access token
- For pre-authorized code flow: exchange pre-authorized code for access token
- Implement user consent mechanisms to obtain holder authorization

**Issuer Actions (see Credential Issuance Workflow, Step 2):**
The issuer handles authorization request, authenticates holder, and issues authorization code or validates pre-authorized code.

**Requirements Checklist:**
- [ ] MUST implement OAuth 2.0 client functionality
- [ ] MUST support authorization code flow
- [ ] MUST support pre-authorized code flow
- [ ] MUST implement user consent mechanisms

#### Step 3: Request and Receive Credential

**Holder Actions:**
- Send credential request to issuer's OAuth 2.0 protected credential endpoint with access token
- Receive credential response containing credential(s)
- Extract credentials from response
- Validate presentation structure and format
- Verify ecdsa-rdfc-2019 signatures in credentials (see Data Integrity specification requirements above)
- Resolve issuer DIDs of type `did:web` or `did:key` to DID Documents including P-256 public key verification method
- Validate proof creation dates and credential expiration dates
- Handle signature verification failures gracefully
- Implement Bitstring Status List checking
- Validate status list signature and freshness
- Handle status service unavailability gracefully

**Issuer Actions (see Credential Issuance Workflow, Step 3):**
The issuer receives the credential request, validates access token, creates the credential with Open Badges 3.0 schema, signs it with ecdsa-rdfc-2019, updates the status list, and responds with credential response containing the credential(s).

**Requirements Checklist:**
- [ ] MUST process credential responses
- [ ] MUST verify ecdsa-rdfc-2019 signatures (see Data Integrity specification requirements above) in credentials received from issuers
- [ ] MUST resolve issuer DIDs of type `did:web` or `did:key` to DID Documents including P-256 public key verification method
- [ ] MUST validate proof creation dates and credential expiration dates
- [ ] MUST implement Bitstring Status List checking
- [ ] MUST validate status list signature and freshness
- [ ] SHOULD handle status service unavailability and other errors gracefully
- [ ] SHOULD cache status information appropriately

#### Step 4: Accept and Store Credential

**Holder Actions:**
- Prompt user to accept credentials after successful verification
- Store credentials securely preserving original proofs and signatures
- Support credential export in standard formats
- Generate and manage P-256 key pairs for credential subject (if using did:key)
- Maintain current DID document for credential subjects
- Support DID resolution for credential subject DIDs

**Issuer Actions (see Credential Issuance Workflow, Step 3):**
The issuer has already delivered the credential(s) in Step 3. No further action is required from the issuer at this step.

**Requirements Checklist:**
- [ ] MUST support credential export in standard formats
- [ ] MUST preserve original credential proofs and signatures, storing credentials for later presentation
- [ ] MUST support `did:web` or `did:key` DID methods for credential subject identity
- [ ] MUST generate and manage P-256 key pairs for credential subjects and support resolution of current DID documents as `did:key` or `did:web` identifiers containing keys used in Verifiable Presentations
- [ ] MUST store credentials for later presentation
- [ ] SHOULD store credentials securely and allow user management of stored data

---

### Credential Request and Verification Workflow

**Primary Role:** Verifier

This workflow enables verifiers to request credentials from holders and verify received credentials using OID4VP protocol. The workflow pairs with the Credential Presentation workflow, where holders present credentials to verifiers.

#### Step 1: Create Presentation Request

**Verifier Actions:**
- Create presentation request asking for specific credential types and attributes (e.g., credentials of type `OpenBadgeCredential`)
- Generate presentation request with proper scopes
- Provide presentation request endpoint
- Expose presentation request to holder via QR code, deep link, or copy-paste interface

**Holder Actions (see Credential Presentation Workflow, Step 1):**
The holder wallet scans, copies, or clicks the presentation request from the verifier system and processes it.

**Requirements Checklist:**
- [ ] MUST implement OID4VP v1.0 specification
- [ ] MUST generate presentation requests with proper scopes asking for specific credential types and attributes
- [ ] MUST provide presentation request endpoint
- [ ] MUST implement data encryption on web service endpoints (at least TLS 1.2)

#### Step 2: Handle Authorization Request

**Verifier Actions:**
- Receive authorization request from holder wallet
- Authenticate holder and obtain authorization
- Issue authorization code

**Holder Actions (see Credential Presentation Workflow, Step 2):**
The holder wallet initiates OAuth 2.0 authorization flow and exchanges authorization for access token.

**Requirements Checklist:**
- [ ] MUST implement OAuth 2.0 protected authorization endpoint
- [ ] MUST support authorization code flow
- [ ] MUST implement proper error handling and status codes

#### Step 3: Receive Presentation Response

**Verifier Actions:**
- Receive presentation response from holder wallet at OAuth 2.0 protected endpoint
- Validate access token
- Extract verifiable presentation from response
- Validate presentation structure and format for VCDM 2.0 data model compliance
- Resolve holder DIDs of type `did:key` or `did:web` to DID Documents including P-256 public key verification method
- Validate presentation proof signature, creation date, and expiration if present
- Extract credentials from presentation
- Validate W3C Verifiable Credentials Data Model 2.0 compliance, verify Open Badges 3.0 schema compliance, check required fields and data types, and validate credential expiration dates
- Verify ecdsa-rdfc-2019 signatures in credentials (see Data Integrity specification requirements above)
- Resolve issuer DIDs to obtain verification keys
- Validate proof creation dates and expiration
- Handle signature verification failures gracefully
- Implement Bitstring Status List verification
- Validate status list signature and freshness
- Handle status service unavailability
- Integrate with trust registries to query issuer authorization, validate issuer credentials and accreditation, check for issuer revocation or suspension, and implement trust registry query protocols
- Cache status information appropriately

**Holder Actions (see Credential Presentation Workflow, Step 3):**
The holder wallet has already delivered the presentation response containing credentials. No further action is required from the holder at this step.

**Requirements Checklist:**
- [ ] MUST handle presentation responses from wallets
- [ ] MUST validate presentation structure and format
- [ ] MUST extract credentials from presentations
- [ ] MUST validate W3C Verifiable Credentials Data Model 2.0 compliance, verify Open Badges 3.0 schema compliance, check required fields and data types, and validate credential expiration dates
- [ ] MUST implement comprehensive validation error handling
- [ ] MUST verify ecdsa-rdfc-2019 signatures (see Data Integrity specification requirements above)
- [ ] MUST resolve issuer DIDs to obtain verification keys
- [ ] MUST validate proof creation dates and expiration
- [ ] MUST handle signature verification failures gracefully
- [ ] MUST implement Bitstring Status List verification
- [ ] MUST validate status list signature and freshness
- [ ] MUST handle status service unavailability
- [ ] MUST cache status information appropriately
- [ ] MUST integrate with trust registries to query issuer authorization, validate issuer credentials and accreditation, check for issuer revocation or suspension, and implement trust registry query protocols
- [ ] MUST implement data encryption on web service endpoints (at least TLS 1.2)
- [ ] SHOULD implement proper error logging and reporting
- [ ] SHOULD maintain current trust registry data

---

### Credential Presentation Workflow

**Primary Role:** Holder

This workflow enables holders to present credentials to verifiers using OID4VP protocol. The workflow pairs with the Credential Request and Verification workflow, where verifiers request and verify credentials.

#### Step 1: Process Presentation Request

**Holder Actions:**
- Scan QR code, copy-paste, or click deep link to access presentation request from verifier system
- Process presentation request to identify matching credentials from stored credentials
- The presentation request is created by the verifier when requesting credentials (see Credential Request and Verification Workflow, Step 1)

**Verifier Actions (see Credential Request and Verification Workflow, Step 1):**
The verifier creates a presentation request and exposes it to the holder via QR code, deep link, or copy-paste interface.

**Requirements Checklist:**
- [ ] MUST implement OID4VP v1.0 specification
- [ ] MUST handle presentation requests from verifiers
- [ ] MUST require secure transport (SSL/TLS) for OID4VP endpoints

#### Step 2: Complete Authorization

**Holder Actions:**
- Initiate OAuth 2.0 authorization request
- Implement user consent mechanisms to obtain holder authorization
- Select credentials that match the request
- Obtain authorization code
- Exchange authorization code for access token

**Verifier Actions (see Credential Request and Verification Workflow, Step 2):**
The verifier handles authorization request, authenticates holder, and issues authorization code.

**Requirements Checklist:**
- [ ] MUST implement OAuth 2.0 client functionality
- [ ] MUST support authorization code flow
- [ ] MUST implement user consent mechanisms
- [ ] MUST provide credential presentation interface

#### Step 3: Create and Send Presentation Response

**Holder Actions:**
- Create verifiable presentation containing:
  - Requested credentials
  - Presentation proof with signature using ECDSA
- Send presentation response to verifier's OAuth 2.0 protected endpoint with access token
- Ensure presentation includes proper cryptographic signatures

**Verifier Actions (see Credential Request and Verification Workflow, Step 3):**
The verifier receives the presentation response, validates access token, extracts and verifies the presentation and credentials.

**Requirements Checklist:**
- [ ] MUST create verifiable presentations with ECDSA signatures
- [ ] MUST generate and manage P-256 key pairs for credential subjects and support resolution of current DID documents as `did:key` or `did:web` identifiers containing keys used in Verifiable Presentations
- [ ] MUST preserve original credential proofs and signatures when including credentials in presentations

#### Step 4: Complete Presentation Delivery

**Holder Actions:**
- Ensure presentation response has been successfully delivered to verifier
- The verifier will verify the presentation and credentials (see Credential Request and Verification Workflow, Step 3)

**Verifier Actions (see Credential Request and Verification Workflow, Step 3):**
The verifier receives the presentation response, validates it, verifies the credentials, checks status, and validates issuer authorization through trust registries.

**Requirements Checklist:**
- [ ] MUST create verifiable presentations with ECDSA signatures
- [ ] MUST preserve original credential proofs and signatures when including credentials in presentations
