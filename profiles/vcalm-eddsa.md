---
title: VCALM EdDSA Profile
description: An Open Badges 3.0 interoperability profile using VCALM Exchanges for credential issuance and presentation with EdDSA signatures.
updated: 2026-02-15
---

{{ page.description }}

**Profile ID:** `vcalm-eddsa-v1`  
**Version:** `0.1`  
**Status:** Editor's Draft
**Last Updated:** {{ page.updated | date: "%B %d, %Y" }}
**Editors:** Nate Otto ([Skybridge Skills](https://skybridgeskills.com))

---

## VCALM-EdDSA Open Badges 3.0 Interoperability Profile

This document defines an interoperability profile for digital credentials in learning mobility ecosystems. An interoperability profile specifies a particular combination of standards-based technology choices that work together to provide complete end-to-end workflows for credential issuance, acceptance, presentation, and verification.

### Purpose and Scope

The VCALM-EdDSA Profile enables browser-based credential exchange workflows optimized for educational credential issuance and verification. This profile is designed for use cases including:

- Browser-based credential exchange between issuers, holder wallets, and verifier systems
- Educational credential issuance and verification
- Skills-based hiring workflows
- Cross-institutional credential transfer

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

#### VCALM Exchanges

**Purpose:** Exchange protocol for credential issuance and presentation request/response workflows.

**Version:** W3C Credentials Community Group[Standards-track draft v0.9](https://w3c-ccg.github.io/vcalm/)

**Profile Requirements:**
- MUST implement VCALM Exchanges exchange participation endpoint
- MUST support interaction URL format with `https://` scheme
- MUST support Interaction Protocols response including `vcapi` protocol
- MUST support `QueryByExample` presentation request format.
- MUST return errors as object with `errors` key that is an array of ProblemDetails objects.
- MUST request and support `DIDAuthentication` in presentation requests and responses for issuance and verification.

When constructing exchange responses with errors, each ProblemDetails object must include a type that is a URL. Some useful error codes exist in the VCDM 2.0 spec ([Problem Details](https://www.w3.org/TR/vc-data-model-2.0/#problem-details)), e.g. `https://www.w3.org/TR/vc-data-model#MALFORMED_VALUE_ERROR`. Listed error codes SHOULD be used if relevant. If error code doesn't match a listed value or a known URL, implementer MAY invent their own code like `https://www.w3.org/TR/vc-data-model#HTTP_NOT_FOUND_ERROR` as if it existed in this vocabulary. Verifiers that encounter unknown type URLs should treat the error as a generic or unknown error.

When constructing presentation requests, use `QueryByExample` format to request specific credential types and attributes. It is recommended to use a generic query for credentials of type `OpenBadgeCredential` and no other fields unless direct coordination with one or more expected issuers calls for more specific queries. Verifiers and Holder wallets do not yet broadly support more specific queries, and the query format may change before VCALM 1.0 is finalized. 

**References:** 
- See [Verifiable Presentation Request](https://w3c-ccg.github.io/vcalm/#verifiable-presentation-request) for request syntax.
- See [Interaction URL format](https://w3c-ccg.github.io/vcalm/#interaction-url-format) for how to express available exchange protocols.
- See [Error Handling](https://w3c-ccg.github.io/vcalm/#error-handling) for example of ProblemDetails object.
- See [Problem Details](https://www.w3.org/TR/vc-data-model-2.0/#problem-details) for list of known error codes.
- See [Query By Example](https://w3c-ccg.github.io/vcalm/#query-by-example) for details about the `QueryByExample` presentation request format.

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
- [ ] MUST use Data Integrity Proof with the `eddsa-rdfc-2022` cryptographic suite, including proof creation date and verification method reference (see Data Integrity specification requirements above)
- [ ] MUST implement VCALM Exchanges exchange participation endpoint with proper error handling using ProblemDetails objects
- [ ] MUST maintain current Bitstring Status List signed with issuer key and implement BitStringStatusList as status method in credentials
- [ ] MUST use did:web or did:key issuer identifier with Ed25519 verification method, supporting resolution of current DID document
- [ ] MUST implement data encryption on web service endpoints (at least TLS 1.2)
- [ ] SHOULD support credential expiration date with `validUntil`
- [ ] SHOULD update status list when credentials are revoked

#### Holder Requirements

- [ ] MUST implement VCALM Exchanges specification interaction URLs and process `vcapi` protocol URL
- [ ] MUST support VCALM Exchanges participation endpoint with empty `presentationRequest` and `redirectUrl` responses
- [ ] MUST handle `DIDAuthentication` queries in credential issuance and presentation exchanges by responding with signed Verifiable Presentations using VCDM 2.0 data model.
- [ ] MUST implement user consent mechanisms (applies to both issuance and presentation workflows)
- [ ] MUST verify eddsa-rdfc-2022 signatures (see Data Integrity specification requirements above) in credentials received from issuers
- [ ] MUST resolve issuer DIDs of type `did:web` or `did:key` to DID Documents including Ed25519 public key verification method
- [ ] MUST validate proof creation dates and credential expiration dates
- [ ] MUST implement Bitstring Status List checking
- [ ] MUST support credential export in standard formats
- [ ] MUST preserve original credential proofs and signatures
- [ ] MUST support did:web or did:key DID methods for credential subject identity
- [ ] MUST generate and manage Ed25519 key pairs for credential subjects and support resolution of current DID documents as `did:key` or `did:web` identifiers containing keys used in Verifiable Presentations
- [ ] MUST require secure transport (SSL/TLS) for VCALM Exchange endpoints and interaction URLs
- [ ] MUST process credential requests from verifiers
- [ ] MUST provide credential presentation interface
- [ ] MUST create verifiable presentations with EdDSA signatures (see VCALM Exchanges specification for presentation protocol details)
- [ ] MUST store credentials for later presentation
- [ ] SHOULD store credentials securely and allow user management of stored data
- [ ] SHOULD render Open Badges 3.0 credentials required fields
- [ ] SHOULD display credential evidence if available
- [ ] SHOULD show credential status and expiration
- [ ] SHOULD handle status service unavailability and other errors gracefully
- [ ] SHOULD cache status information appropriately

#### Verifier Requirements

- [ ] MUST implement VCALM Exchanges specification exchange participation endpoint
- [ ] MUST report exchange errors using ProblemDetails objects (see VCALM Exchanges section for protocol details)
- [ ] MUST generate `verifiablePresentationRequest` request using `QueryByExample` format and a challenge value.
- [ ] MUST support `DIDAuthentication` queries in credential issuance and presentation exchanges by responding with signed Verifiable Presentations
- [ ] MUST verify Verifiable Presentation data structure for VCDM 2.0 data model. 
- [ ] MUST resolve holder DIDs of type `did:key` or `did:web` to DID Documents including Ed25519 public key verification method.
- [ ] MUST validate presentation proof signature, creation date, challenge and `expires` if present.
- [ ] MUST extract credentials from presentations and validate W3C Verifiable Credentials Data Model 2.0 compliance, verify Open Badges 3.0 schema compliance, check required fields and data types, and validate credential expiration dates
- [ ] MUST support `eddsa-rdfc-2022` proofs (see Data Integrity specification requirements above)
- [ ] MUST implement Bitstring Status List verification
- [ ] MUST validate status list signature and freshness
- [ ] MUST handle status service unavailability
- [ ] MUST integrate with trust registries to query issuer authorization, validate issuer credentials and accreditation, check for issuer revocation or suspension, and implement trust registry query protocols
- [ ] MUST implement data encryption on web service endpoints (at least TLS 1.2)
- [ ] SHOULD cache status information appropriately

---

## Workflows

This section provides step-by-step implementation guidance for each workflow supported by this profile. Each workflow focuses on the primary role's requirements while referencing the mirror role's actions.

### Credential Issuance Workflow

**Primary Role:** Issuer

This workflow enables issuers to create, sign, and deliver credentials to holders using VCALM Exchanges protocol. The workflow pairs with the Credential Acceptance workflow, where holders receive and accept credentials.

#### Step 1: Create Exchange and Expose Interaction URL

**Issuer Actions:**
- Create VCALM exchange when user has earned a badge (exchange is typically time-limited and created when the issuer system knows the user has earned the badge)
- Expose interaction URL to user via QR code, deep link, or copy-paste interface. Support interaction URL format with `https://` scheme.
- The interaction URL may be accessed when user requests a credential or when viewing a claim page for an invitation previously sent to them

**Holder Actions (see Credential Acceptance Workflow, Step 1):**
The holder wallet scans, copies, or clicks the interaction URL from the issuer system and fetches it (GET request).

**Requirements Checklist:**
- [ ] MUST generate interaction URL and expose it to the user as a QR code for cross-device exchanges and a copyable URL for same-device exchanges
- [ ] MUST implement VCALM Exchanges exchange participation endpoint handling
- [ ] MUST implement data encryption on web service endpoints (at least TLS 1.2)

#### Step 2: Respond to Interaction URL Fetch

**Issuer Actions:**
- Respond to holder's GET request to interaction URL. Return protocols list including `vcapi` protocol interaction URL

**Holder Actions (see Credential Acceptance Workflow, Step 2):**
The holder wallet receives the protocols list with `vcapi` interaction URL and requests the exchange by POSTing `{}` (empty body object) to the `vcapi` URL.

**Requirements Checklist:**
- [ ] MUST implement VCALM Exchanges exchange participation endpoint with proper error handling using ProblemDetails objects
- [ ] MUST support Interaction Protocols response including `vcapi` protocol

#### Step 3: Handle Empty POST Request and Request DIDAuthentication

**Issuer Actions:**
- Receive POST `{}` (empty body object) to exchange participation URL
- Respond with `{verifiablePresentationRequest}` for `DIDAuthentication`, which asks the holder to present and prove control of their DID

**Holder Actions (see Credential Acceptance Workflow, Step 3):**
The holder wallet receives the `{verifiablePresentationRequest}` with a `QueryByExample` query of type `DIDAuthentication`, asks the user for permission, and creates and posts a `{verifiablePresentation}` proving control of their DID.

**Requirements Checklist:**
- [ ] MUST implement VCALM Exchanges exchange participation endpoint
- [ ] MUST include `DIDAuthentication` query type in `verifiablePresentationRequest` query of type `QueryByExample`
- [ ] MUST express any errors using ProblemDetails objects

#### Step 4: Receive DIDAuthentication Presentation, Create Credential, and Deliver it

**Issuer Actions:**
- Receive `{verifiablePresentation}` from holder proving DID control
- Validate presentation structure and DIDAuthentication proof
- Authorize credential issuance based on holder's achievements/qualifications (determined before exchange creation)
- Generate W3C Verifiable Credential with Open Badges 3.0 schema, including all mandatory fields
- Set credential subject identifier using verified holder DID from verifiable presentation
- Create Data Integrity proof using eddsa-rdfc-2022 cryptographic suite with Ed25519 signature algorithm
- Include proof creation date and verification method reference pointing to issuer's DID
- Update Bitstring Status List to include allocated index for new credential. Include `statusListCredential` and `statusListIndex` in the issued credential's `credentialStatus` entry
- Respond with `{verifiablePresentation}` containing the verifiable credential(s) that are issued
- Ensure secure transmission using encryption in transit

**Holder Actions (see Credential Acceptance Workflow, Step 4):**
The holder wallet receives the `{verifiablePresentation}` containing credential(s), extracts credentials, verifies them, prompts the user to accept, and stores them.

**Requirements Checklist:**
- [ ] MUST generate W3C Verifiable Credentials Data Model 2.0 compliant credentials
- [ ] MUST use `OpenBadgeCredential` credential type and comply with Open Badges 3.0 schema, including all mandatory fields
- [ ] MUST use Data Integrity Proof with the `eddsa-rdfc-2022` cryptographic suite, including proof creation date and verification method reference (see Data Integrity specification requirements above)
- [ ] MUST maintain current Bitstring Status List signed with issuer key and implement BitStringStatusList as status method in credentials
- [ ] MUST implement VCALM Exchanges exchange participation endpoint with proper error handling using ProblemDetails objects
- [ ] MUST implement data encryption on web service endpoints (at least TLS 1.2)
- [ ] SHOULD support credential expiration date with `validUntil`

---

### Credential Acceptance Workflow

**Primary Role:** Holder

This workflow enables holders to receive, verify, and accept credentials from issuers using VCALM Exchanges protocol. The workflow pairs with the Credential Issuance workflow, where issuers create and deliver credentials.

#### Step 1: Access Interaction URL

**Holder Actions:**
- Scan QR code, copy-paste, or click deep link to access interaction URL from issuer system
- Fetch interaction URL (GET request) from within wallet app
- The interaction URL is exposed by the issuer when the user has earned a badge (see Credential Issuance Workflow, Step 1)

**Issuer Actions (see Credential Issuance Workflow, Step 1):**
The issuer creates a VCALM exchange and exposes the interaction URL to the user via QR code, deep link, or copy-paste interface.

**Requirements Checklist:**
- [ ] MUST implement VCALM Exchanges specification interaction URLs and process `vcapi` protocol URL
- [ ] MUST require secure transport (SSL/TLS) for VCALM Exchange endpoints and interaction URLs

#### Step 2: Discover Protocol and Request Exchange

**Holder Actions:**
- Receive protocols list response from issuer including `vcapi` interaction URL
- Request exchange by POSTing `{}` (empty body object) to the interaction URL

**Issuer Actions (see Credential Issuance Workflow, Step 2):**
The issuer responds to the GET request with a protocols list including `vcapi` interaction URL, then receives the POST `{}` request.

**Requirements Checklist:**
- [ ] MUST implement VCALM Exchanges specification interaction URLs and process `vcapi` protocol URL
- [ ] MUST initiate VCALM Exchange at the participation endpoint with empty request body.

#### Step 3: Respond to DIDAuthentication Request

**Holder Actions:**
- Receive `{verifiablePresentationRequest}` for `DIDAuthentication` from issuer
- Implement user consent mechanisms to obtain holder authorization
- Create `{verifiablePresentation}` proving control of holder's DID using EdDSA proof
- Post `{verifiablePresentation}` to issuer

**Issuer Actions (see Credential Issuance Workflow, Step 3):**
The issuer responds to the empty POST request with a `{verifiablePresentationRequest}` for `DIDAuthentication`, then receives the holder's `{verifiablePresentation}` proving DID control.

**Requirements Checklist:**
- [ ] MUST handle `DIDAuthentication` queries in credential issuance and presentation exchanges by responding with signed Verifiable Presentations using VCDM 2.0 data model
- [ ] MUST implement user consent mechanisms
- [ ] MUST create verifiable presentations with EdDSA signatures (see VCALM Exchanges specification for presentation protocol details)
- [ ] MUST generate and manage Ed25519 key pairs for credential subjects and support resolution of current DID documents as `did:key` or `did:web` identifiers containing keys used in Verifiable Presentations

#### Step 4: Receive and Verify Credential

**Holder Actions:**
- Receive `{verifiablePresentation}` containing credential(s) from issuer
- Extract credentials from presentation
- Validate presentation structure and format
- Verify eddsa-rdfc-2022 signatures in credentials (see Data Integrity specification requirements above)
- Resolve issuer DIDs of type `did:web` or `did:key` to DID Documents including Ed25519 public key verification method
- Validate proof creation dates and credential expiration dates
- Handle signature verification failures gracefully
- Implement Bitstring Status List checking
- Validate status list signature and freshness
- Handle status service unavailability gracefully

**Issuer Actions (see Credential Issuance Workflow, Step 4):**
The issuer receives the DIDAuthentication presentation, validates it, creates the credential with Open Badges 3.0 schema, signs it with eddsa-rdfc-2022, updates the status list, and responds with `{verifiablePresentation}` containing the credential(s).

**Requirements Checklist:**
- [ ] MUST verify eddsa-rdfc-2022 signatures (see Data Integrity specification requirements above) in credentials received from issuers
- [ ] MUST resolve issuer DIDs of type `did:web` or `did:key` to DID Documents including Ed25519 public key verification method
- [ ] MUST validate proof creation dates and credential expiration dates
- [ ] MUST implement Bitstring Status List checking
- [ ] MUST validate status list signature and freshness
- [ ] SHOULD handle status service unavailability and other errors gracefully
- [ ] SHOULD cache status information appropriately

#### Step 5: Accept and Store Credential

**Holder Actions:**
- Prompt user to accept credentials after successful verification
- Store credentials securely preserving original proofs and signatures
- Support credential export in standard formats
- Generate and manage Ed25519 key pairs for credential subject (if using did:key)
- Maintain current DID document for credential subjects
- Support DID resolution for credential subject DIDs

**Issuer Actions (see Credential Issuance Workflow, Step 4):**
The issuer has already delivered the credential(s) in Step 4. No further action is required from the issuer at this step.

**Requirements Checklist:**
- [ ] MUST support credential export in standard formats
- [ ] MUST preserve original credential proofs and signatures, storing credentials for later presentation
- [ ] MUST support `did:web` or `did:key` DID methods for credential subject identity
- [ ] MUST generate and manage Ed25519 key pairs for credential subjects and support resolution of current DID documents as `did:key` or `did:web` identifiers containing keys used in Verifiable Presentations
- [ ] MUST store credentials for later presentation
- [ ] SHOULD store credentials securely and allow user management of stored data

---

### Credential Request and Verification Workflow

**Primary Role:** Verifier

This workflow enables verifiers to request credentials from holders and verify received credentials using VCALM Exchanges protocol. The workflow pairs with the Credential Presentation workflow, where holders present credentials to verifiers.

#### Step 1: Create Exchange and Expose Interaction URL

**Verifier Actions:**
- Create VCALM exchange for credential request
- Generate `verifiablePresentationRequest` using `QueryByExample` format requesting credentials of type `OpenBadgeCredential` (or more specific queries if coordinated with expected issuers)
- Include challenge value in presentation request
- Expose interaction URL to holder via QR code, deep link, or copy-paste interface. Support interaction URL format with `https://` scheme.

**Holder Actions (see Credential Presentation Workflow, Step 1):**
The holder wallet scans, copies, or clicks the interaction URL from the verifier system and fetches it (GET request).

**Requirements Checklist:**
- [ ] MUST implement VCALM Exchanges specification exchange participation endpoint
- [ ] MUST generate `verifiablePresentationRequest` request using `QueryByExample` format and a challenge value
- [ ] MUST implement data encryption on web service endpoints (at least TLS 1.2)

#### Step 2: Respond to Interaction URL Fetch

**Verifier Actions:**
- Respond to holder's GET request to interaction URL. Return protocols list including `vcapi` protocol interaction URL

**Holder Actions (see Credential Presentation Workflow, Step 2):**
The holder wallet receives the protocols list with `vcapi` interaction URL and requests the exchange by POSTing `{}` (empty body object) to the `vcapi` URL.

**Requirements Checklist:**
- [ ] MUST implement VCALM Exchanges exchange participation endpoint with proper error handling using ProblemDetails objects
- [ ] MUST support Interaction Protocols response including `vcapi` protocol
- [ ] MUST report exchange errors using ProblemDetails objects

#### Step 3: Handle Empty POST Request and Request DIDAuthentication

**Verifier Actions:**
- Receive POST `{}` (empty body object) to exchange participation URL
- Respond with `{verifiablePresentationRequest}` containing the credential request query and `DIDAuthentication` query

**Holder Actions (see Credential Presentation Workflow, Step 3):**
The holder wallet receives the `{verifiablePresentationRequest}`, processes the credential request query, asks the user for permission, and creates and posts a `{verifiablePresentation}` containing the requested credentials and proving control of their DID.

**Requirements Checklist:**
- [ ] MUST implement VCALM Exchanges exchange participation endpoint
- [ ] MUST include `DIDAuthentication` query type in `verifiablePresentationRequest` query of type `QueryByExample`
- [ ] MUST express any errors using ProblemDetails objects

#### Step 4: Receive Presentation and Verify Credentials

**Verifier Actions:**
- Receive `{verifiablePresentation}` from holder containing credentials and DIDAuthentication proof
- Validate presentation structure and format for VCDM 2.0 data model compliance
- Resolve holder DIDs of type `did:key` or `did:web` to DID Documents including Ed25519 public key verification method
- Validate presentation proof signature, creation date, challenge and `expires` if present
- Extract credentials from presentation
- Validate W3C Verifiable Credentials Data Model 2.0 compliance, verify Open Badges 3.0 schema compliance, check required fields and data types, and validate credential expiration dates
- Verify eddsa-rdfc-2022 signatures in credentials (see Data Integrity specification requirements above)
- Resolve issuer DIDs to obtain verification keys
- Validate proof creation dates and expiration
- Handle signature verification failures gracefully
- Implement Bitstring Status List verification
- Validate status list signature and freshness
- Handle status service unavailability
- Integrate with trust registries to query issuer authorization, validate issuer credentials and accreditation, check for issuer revocation or suspension, and implement trust registry query protocols
- Cache status information appropriately

**Holder Actions (see Credential Presentation Workflow, Step 4):**
The holder wallet has already delivered the `{verifiablePresentation}` containing credentials. No further action is required from the holder at this step.

**Requirements Checklist:**
- [ ] MUST verify Verifiable Presentation data structure for VCDM 2.0 data model
- [ ] MUST resolve holder DIDs of type `did:key` or `did:web` to DID Documents including Ed25519 public key verification method
- [ ] MUST validate presentation proof signature, creation date, challenge and `expires` if present
- [ ] MUST extract credentials from presentations and validate W3C Verifiable Credentials Data Model 2.0 compliance, verify Open Badges 3.0 schema compliance, check required fields and data types, and validate credential expiration dates
- [ ] MUST support `eddsa-rdfc-2022` proofs (see Data Integrity specification requirements above)
- [ ] MUST implement Bitstring Status List verification
- [ ] MUST validate status list signature and freshness
- [ ] MUST handle status service unavailability
- [ ] MUST integrate with trust registries to query issuer authorization, validate issuer credentials and accreditation, check for issuer revocation or suspension, and implement trust registry query protocols
- [ ] MUST implement data encryption on web service endpoints (at least TLS 1.2)
- [ ] SHOULD cache status information appropriately

---

### Credential Presentation Workflow

**Primary Role:** Holder

This workflow enables holders to present credentials to verifiers using VCALM Exchanges protocol. The workflow pairs with the Credential Request and Verification workflow, where verifiers request and verify credentials.

#### Step 1: Access Interaction URL

**Holder Actions:**
- Scan QR code, copy-paste, or click deep link to access interaction URL from verifier system
- Fetch interaction URL (GET request) from within wallet app
- The interaction URL is exposed by the verifier when requesting credentials (see Credential Request and Verification Workflow, Step 1)

**Verifier Actions (see Credential Request and Verification Workflow, Step 1):**
The verifier creates a VCALM exchange and exposes the interaction URL to the holder via QR code, deep link, or copy-paste interface.

**Requirements Checklist:**
- [ ] MUST implement VCALM Exchanges specification interaction URLs and process `vcapi` protocol URL
- [ ] MUST require secure transport (SSL/TLS) for VCALM Exchange endpoints and interaction URLs

#### Step 2: Discover Protocol and Request Exchange

**Holder Actions:**
- Receive protocols list response from verifier including `vcapi` interaction URL
- Request exchange by POSTing `{}` (empty body object) to the interaction URL

**Verifier Actions (see Credential Request and Verification Workflow, Step 2):**
The verifier responds to the GET request with a protocols list including `vcapi` interaction URL, then receives the POST `{}` request.

**Requirements Checklist:**
- [ ] MUST implement VCALM Exchanges specification interaction URLs and process `vcapi` protocol URL
- [ ] MUST initiate VCALM Exchange at the participation endpoint with empty request body

#### Step 3: Process Presentation Request and Create Presentation

**Holder Actions:**
- Receive `{verifiablePresentationRequest}` from verifier containing credential request query and `DIDAuthentication` query
- Process credential request query to identify matching credentials from stored credentials
- Implement user consent mechanisms to obtain holder authorization
- Select credentials that match the request
- Create `{verifiablePresentation}` containing:
  - Requested credentials
  - DIDAuthentication proof proving control of holder's DID using EdDSA proof
  - Presentation proof with challenge from request
- Post `{verifiablePresentation}` to verifier

**Verifier Actions (see Credential Request and Verification Workflow, Step 3):**
The verifier responds to the empty POST request with a `{verifiablePresentationRequest}`, then receives the holder's `{verifiablePresentation}` containing credentials and DIDAuthentication proof.

**Requirements Checklist:**
- [ ] MUST process credential requests from verifiers
- [ ] MUST provide credential presentation interface
- [ ] MUST handle `DIDAuthentication` queries in credential issuance and presentation exchanges by responding with signed Verifiable Presentations using VCDM 2.0 data model
- [ ] MUST implement user consent mechanisms
- [ ] MUST create verifiable presentations with EdDSA signatures (see VCALM Exchanges specification for presentation protocol details)
- [ ] MUST generate and manage Ed25519 key pairs for credential subjects and support resolution of current DID documents as `did:key` or `did:web` identifiers containing keys used in Verifiable Presentations

#### Step 4: Complete Presentation Delivery

**Holder Actions:**
- Ensure `{verifiablePresentation}` has been successfully delivered to verifier
- The verifier will verify the presentation and credentials (see Credential Request and Verification Workflow, Step 4)

**Verifier Actions (see Credential Request and Verification Workflow, Step 4):**
The verifier receives the `{verifiablePresentation}`, validates it, verifies the credentials, checks status, and validates issuer authorization through trust registries.

**Requirements Checklist:**
- [ ] MUST create verifiable presentations with EdDSA signatures (see VCALM Exchanges specification for presentation protocol details)
- [ ] MUST preserve original credential proofs and signatures when including credentials in presentations
