# LER Ecosystem Implementation Coordination Guide

## Table of Contents

1. [Introduction and Purpose](#introduction-and-purpose)
2. [Core Concepts](#core-concepts)
3. [Workflow Sections](#workflow-sections)
   - [Credential Issuance Workflow](#credential-issuance-workflow)
   - [Credential Storage and Management Workflow](#credential-storage-and-management-workflow)
   - [Credential Presentation Workflow](#credential-presentation-workflow)
   - [Credential Verification Workflow](#credential-verification-workflow)
4. [Component Specifications](#component-specifications)
5. [Interoperability Profiles](#interoperability-profiles)
6. [Implementation Guidance](#implementation-guidance)

---

## Introduction and Purpose

This LER Ecosystem Implementation Coordination Guide provides procurement-ready specifications for interoperable Learning and Employment Records (LER) systems. The guide defines standardized interoperability profiles that ensure seamless credential exchange across different vendors and platforms.

### Purpose

This guide serves as a technical specification that can be directly incorporated into Request for Proposals (RFPs) and procurement documents. It enables funders and implementing organizations to specify exact technical requirements that ensure interoperability across the entire LER ecosystem.

### Interoperability Profiles

An interoperability profile defines a specific combination of standards-based technology choices that work together to provide complete end-to-end LER workflows. Each profile specifies:

- Credential formats and schemas
- Cryptographic proof mechanisms
- Exchange protocols for issuance and presentation
- Status verification methods
- Trust infrastructure requirements

When a solution or product is compatible with a particular profile, it means that for the roles it occupies (e.g., holder credential management/wallet, issuer system, verifier system), it supports all required operations defined in the interoperability profile for that role.

### Using This Guide

1. **For Procurement**: Copy relevant sections directly into RFPs to specify exact technical requirements
2. **For Vendor Assessment**: Use the provided checklists to evaluate vendor capabilities
3. **For Network Growth**: Document your system's supported profiles to enable organic, permissionless network expansion
4. **For Implementation**: Follow the detailed specifications to ensure conformance with chosen profiles

---

## Core Concepts

### Learning and Employment Records Ecosystem

The LER ecosystem consists of three primary roles:

- **Issuers**: Organizations that create and issue verifiable credentials (educational institutions, certification bodies, employers)
- **Holders**: Individuals who receive, store, and present their credentials (learners, workers, job seekers)
- **Verifiers**: Organizations that request and verify credentials (employers, educational institutions, licensing boards)

### Interoperability Profiles

Interoperability profiles solve the challenge of ensuring that different systems can work together seamlessly. Rather than requiring all systems to support every possible standard and protocol combination, profiles define specific, tested combinations that are known to work together. The two initial profiles included in this guide are based on patterns seen in the real world among leading implementers of the W3C Verifiable Credentials and Open Badges standards for LER purposes.

Each profile includes:
- **Mandatory requirements**: Features that MUST be implemented for conformance
- **Optional extensions**: Features that MAY be implemented for enhanced functionality
- **Deprecated features**: Features that SHOULD NOT be used in new implementations

As the ecosystem matures, more interoperability profiles will be created to cover specific use cases and requirements as well as to take advantage of new standards and protocols that are developed, such as cryptographic signatures with more advanced protections against quantum computing attacks. 

### Conformance vs. Compatibility

- **Conformance**: A system that implements all mandatory requirements of a profile
- **Compatibility**: A system that can interoperate with conformant systems but may not implement all profile requirements itself

This guide focuses on conformance requirements to ensure reliable interoperability. Conformance is sometimes relative to a specific specification and is sometimes measured by an official body related to that standard. For example, the 1EdTech Consortium provides a conformance certification program for Open Badges 3.0 and CLR 2.0. The interoperability profiles here build on these certification programs by going deeper in to the details of the combinations of specifications that may be chosen for the various implementation options within OB and CLR to better ensure end-to-end interoperability across all the implementation roles necessary within a specific LER ecosystem that implements one of the included profiles.

---

## Workflow Sections

### Credential Issuance Workflow

The credential issuance workflow defines how credentials are created and delivered to holders.

#### Overall Protocol Options

Two primary protocols are supported across the defined profiles:

1. **VCALM Exchanges** (Profile 1): Browser-based credential exchange protocol
2. **OpenID for Verifiable Credential Issuance (OID4VCI)** (Profile 2): OAuth 2.0-based credential issuance protocol

#### Issuer System Requirements

**For Profile 1 (VCALM-EdDSA):**
- MUST implement VCALM Exchanges protocol for credential delivery
- MUST support EdDSA cryptographic signatures (eddsa-rdfc-2022)
- MUST generate W3C Verifiable Credentials Data Model 2.0 compliant credentials
- MUST use Open Badges 3.0 credential schema
- MUST implement Bitstring Status List for credential status management
- MUST support did:web or did:key DID methods for issuer identification

**For Profile 2 (OID4-ECDSA):**
- MUST implement OID4VCI v1.0 for credential issuance
- MUST support ECDSA cryptographic signatures (ecdsa-rdfc-2019)
- MUST generate W3C Verifiable Credentials Data Model 2.0 compliant credentials
- MUST use Open Badges 3.0 credential schema
- MUST implement Bitstring Status List for credential status management
- MUST support did:web or did:key DID methods for issuer identification

#### Holder Wallet Requirements

**For Profile 1 (VCALM-EdDSA):**
- MUST implement VCALM Exchanges protocol for credential reception
- MUST support EdDSA signature verification (eddsa-rdfc-2022)
- MUST store W3C Verifiable Credentials Data Model 2.0 credentials
- MUST support Open Badges 3.0 credential display and management
- MUST implement Bitstring Status List checking for credential status
- MUST support did:web or did:key DID methods for holder identification

**For Profile 2 (OID4-ECDSA):**
- MUST implement OID4VCI v1.0 for credential reception
- MUST support ECDSA signature verification (ecdsa-rdfc-2019)
- MUST store W3C Verifiable Credentials Data Model 2.0 credentials
- MUST support Open Badges 3.0 credential display and management
- MUST implement Bitstring Status List checking for credential status
- MUST support did:web or did:key DID methods for holder identification

#### Step-by-Step Process Flow

1. **Credential Request Initiation**
   - Holder initiates credential request through wallet interface
   - Wallet establishes connection with issuer using profile-specific protocol

2. **Authentication and Authorization**
   - Issuer authenticates holder identity
   - Issuer authorizes credential issuance based on holder's achievements/qualifications

3. **Credential Generation**
   - Issuer creates credential with required schema and proof mechanisms
   - Issuer signs credential using profile-specific cryptographic suite
   - Issuer updates status list if applicable

4. **Credential Delivery**
   - Issuer delivers credential to holder using profile-specific protocol
   - Holder wallet receives and validates credential
   - Holder wallet stores credential securely

### Credential Storage and Management Workflow

This workflow defines how holders store, organize, and manage their credentials.

#### Holder Wallet Requirements

**Universal Requirements (Both Profiles):**
- MUST provide secure storage for verifiable credentials
- MUST support credential organization and categorization
- MUST implement credential backup and recovery mechanisms
- MUST provide credential sharing controls and privacy settings
- MUST support credential expiration monitoring and notifications

#### Data Model Requirements

- MUST store credentials in W3C Verifiable Credentials Data Model 2.0 format
- MUST preserve original credential proofs and signatures
- MUST maintain credential metadata for display and management
- MUST support credential versioning and updates

#### Status Checking Requirements

- MUST implement Bitstring Status List checking
- MUST provide real-time status verification capabilities
- MUST cache status information appropriately for performance
- MUST handle status service unavailability gracefully

### Credential Presentation Workflow

The credential presentation workflow defines how holders share credentials with verifiers.

#### Presentation Protocol Options

1. **VCALM Exchanges** (Profile 1): Browser-based credential presentation
2. **OpenID for Verifiable Presentations (OID4VP)** (Profile 2): OAuth 2.0-based credential presentation

#### Holder Wallet Requirements

**For Profile 1 (VCALM-EdDSA):**
- MUST implement VCALM Exchanges protocol for credential presentation
- MUST support selective disclosure of credential information
- MUST provide user consent mechanisms for credential sharing
- MUST support presentation of EdDSA-signed credentials

**For Profile 2 (OID4-ECDSA):**
- MUST implement OID4VP v1.0 for credential presentation
- MUST support selective disclosure of credential information
- MUST provide user consent mechanisms for credential sharing
- MUST support presentation of ECDSA-signed credentials

#### Verifier System Requirements

**For Profile 1 (VCALM-EdDSA):**
- MUST implement VCALM Exchanges protocol for credential reception
- MUST support EdDSA signature verification (eddsa-rdfc-2022)
- MUST validate W3C Verifiable Credentials Data Model 2.0 credentials
- MUST support Open Badges 3.0 credential schema validation
- MUST implement Bitstring Status List verification

**For Profile 2 (OID4-ECDSA):**
- MUST implement OID4VP v1.0 for credential reception
- MUST support ECDSA signature verification (ecdsa-rdfc-2019)
- MUST validate W3C Verifiable Credentials Data Model 2.0 credentials
- MUST support Open Badges 3.0 credential schema validation
- MUST implement Bitstring Status List verification

#### Step-by-Step Process Flow

1. **Presentation Request**
   - Verifier initiates credential request using profile-specific protocol
   - Verifier specifies required credential types and attributes

2. **Holder Consent**
   - Holder wallet presents available credentials matching request
   - Holder reviews and selects credentials to share
   - Holder provides consent for credential presentation

3. **Credential Presentation**
   - Holder wallet creates verifiable presentation
   - Holder wallet delivers presentation to verifier using profile-specific protocol

4. **Verification Process**
   - Verifier receives and validates presentation (see Credential Verification Workflow)

### Credential Verification Workflow

The credential verification workflow is a sub-process of credential presentation that defines how verifiers validate received credentials.

#### Verifier System Requirements

**Universal Requirements (Both Profiles):**
- MUST implement cryptographic signature verification
- MUST validate credential schema compliance
- MUST check credential status using Bitstring Status List
- MUST verify issuer identity and authorization
- MUST implement trust registry integration
- MUST provide audit logging for verification activities

#### Cryptographic Verification Steps

1. **Signature Verification**
   - Extract proof from credential
   - Resolve issuer DID to obtain verification key
   - Verify cryptographic signature using profile-specific suite
   - Validate proof creation date and expiration

2. **Credential Structure Validation**
   - Validate W3C Verifiable Credentials Data Model 2.0 compliance
   - Verify Open Badges 3.0 schema compliance
   - Check required fields and data types
   - Validate credential expiration dates

#### Status Verification Steps

1. **Status List Checking**
   - Retrieve current status list from issuer
   - Check credential status using Bitstring Status List
   - Verify status list signature and freshness
   - Handle status service unavailability

#### Trust Registry Integration

- MUST query trust registries for issuer authorization
- MUST validate issuer credentials and accreditation
- MUST check for issuer revocation or suspension
- MUST maintain current trust registry data

---

## Component Specifications

### Credential Schema

#### Open Badges 3.0 Requirements

All profiles MUST use Open Badges 3.0 as the primary credential schema with the following requirements:

**Mandatory Fields:**
- `@context`: MUST include Open Badges 3.0 context
- `type`: MUST include "AchievementCredential" and "OpenBadgeCredential"
- `issuer`: MUST include issuer DID and name
- `credentialSubject`: MUST include achievement details and recipient information
- `proof`: MUST include Data Integrity proof with profile-specific cryptographic suite

**Optional Extensions:**
- Evidence artifacts and URLs
- Alignment to standards and frameworks
- Endorsements and recommendations
- Additional metadata for display and verification

### Decentralized Identifiers (DIDs)

#### Supported DID Methods

Both profiles support the following DID methods:

**did:web**
- MUST resolve to HTTPS URLs
- MUST serve DID documents with proper content-type headers
- MUST include verification methods for profile-specific key types

**did:key**
- MUST use profile-specific key types (Ed25519 for Profile 1, P-256 for Profile 2)
- MUST follow did:key specification for key encoding
- MUST include verification methods in DID document

#### Key Types

**Profile 1 (VCALM-EdDSA):**
- MUST use Ed25519 keys for EdDSA signatures
- MUST support key rotation and revocation
- MUST implement secure key storage and management

**Profile 2 (OID4-ECDSA):**
- MUST use P-256 keys for ECDSA signatures
- MUST support key rotation and revocation
- MUST implement secure key storage and management

### Cryptographic Proofs

#### Data Integrity Proof Requirements

Both profiles use W3C Data Integrity proofs with different cryptographic suites:

**Profile 1 (VCALM-EdDSA):**
- MUST use `eddsa-rdfc-2022` cryptographic suite
- MUST include proof creation date
- MUST include verification method reference
- MUST use Ed25519 signature algorithm

**Profile 2 (OID4-ECDSA):**
- MUST use `ecdsa-rdfc-2019` cryptographic suite
- MUST include proof creation date
- MUST include verification method reference
- MUST use P-256 signature algorithm

### Status Methods

#### Bitstring Status List Requirements

Both profiles MUST implement Bitstring Status List for credential status management:

**Issuer Requirements:**
- MUST maintain current status list
- MUST sign status list with issuer key
- MUST provide status list endpoint
- MUST update status list when credentials are revoked

**Verifier Requirements:**
- MUST check credential status before acceptance
- MUST validate status list signature
- MUST handle status service unavailability
- MUST cache status information appropriately

### Trust Infrastructure

#### Trust Registry Integration

Both profiles require trust registry integration for issuer validation:

**Required Capabilities:**
- Query issuer authorization status
- Validate issuer credentials and accreditation
- Check for issuer revocation or suspension
- Maintain current trust registry data

**Implementation Requirements:**
- MUST implement trust registry query protocols
- MUST cache trust registry data for performance
- MUST handle trust registry unavailability
- MUST provide audit logging for trust decisions

---

## Interoperability Profiles

### Profile 1: VCALM-EdDSA Profile

**Profile Identifier:** `vcalm-eddsa-v1`

**Description:** This profile uses VCALM Exchanges for credential issuance and presentation with EdDSA cryptographic signatures.

**Key Components:**
- **Exchange Protocol:** VCALM Exchanges
- **Cryptographic Suite:** eddsa-rdfc-2022 (EdDSA with RDF Dataset Canonicalization)
- **Credential Format:** W3C Verifiable Credentials Data Model 2.0
- **Credential Schema:** Open Badges 3.0
- **Status Method:** Bitstring Status List
- **DID Methods:** did:web, did:key

**Use Cases:**
- Browser-based credential exchange
- Educational credential issuance and verification
- Skills-based hiring workflows
- Cross-institutional credential transfer

### Profile 2: OID4-ECDSA Profile

**Profile Identifier:** `oid4-ecdsa-v1`

**Description:** This profile uses OpenID for Verifiable Credentials (OID4VCI/OID4VP) for credential exchange with ECDSA cryptographic signatures.

**Key Components:**
- **Exchange Protocols:** OID4VCI v1.0 (issuance), OID4VP v1.0 (presentation)
- **Cryptographic Suite:** ecdsa-rdfc-2019 (ECDSA with RDF Dataset Canonicalization)
- **Credential Format:** W3C Verifiable Credentials Data Model 2.0
- **Credential Schema:** Open Badges 3.0
- **Status Method:** Bitstring Status List
- **DID Methods:** did:web, did:key

**Use Cases:**
- OAuth 2.0-based credential exchange
- Enterprise credential management systems
- Mobile wallet applications
- Government-issued credentials

### Profile Selection Guidance

**Choose Profile 1 (VCALM-EdDSA) when:**
- Browser-based credential exchange is preferred
- EdDSA signatures provide sufficient security
- Integration with existing web applications is required
- Educational institutions are primary issuers

**Choose Profile 2 (OID4-ECDSA) when:**
- OAuth 2.0 integration is required
- ECDSA signatures are mandated by policy
- Enterprise identity systems are in use
- Government or regulated industry compliance is required

### Profile Compatibility Matrix

| Component | Profile 1 (VCALM-EdDSA) | Profile 2 (OID4-ECDSA) |
|-----------|-------------------------|------------------------|
| Exchange Protocol | VCALM Exchanges | OID4VCI/OID4VP |
| Cryptographic Suite | eddsa-rdfc-2022 | ecdsa-rdfc-2019 |
| Credential Format | VC Data Model 2.0 | VC Data Model 2.0 |
| Credential Schema | Open Badges 3.0 | Open Badges 3.0 |
| Status Method | Bitstring Status List | Bitstring Status List |
| DID Methods | did:web, did:key | did:web, did:key |

**Note:** While both profiles use the same credential format and schema, they are not directly interoperable due to different exchange protocols and cryptographic suites.

---

## Implementation Guidance

### Using Profiles in RFPs

When incorporating this guide into procurement documents:

1. **Specify Profile Requirements**
   - Clearly state which interoperability profile(s) must be supported
   - Include all mandatory requirements from the chosen profile
   - Specify optional extensions that are desired

2. **Define Conformance Criteria**
   - Require vendors to demonstrate conformance with chosen profile
   - Specify testing and validation requirements
   - Include interoperability testing with other profile-conformant systems

3. **Include Implementation Timeline**
   - Specify when profile conformance must be achieved
   - Include milestones for testing and validation
   - Define acceptance criteria for profile implementation

### Assessing Vendor Capabilities

Use the provided vendor checklists to evaluate vendor capabilities:

1. **Self-Assessment**
   - Provide vendors with profile-specific checklists
   - Require detailed responses for each capability
   - Request evidence of existing implementations

2. **Technical Validation**
   - Conduct technical interviews on profile requirements
   - Review vendor architecture and implementation plans
   - Validate understanding of mandatory vs. optional requirements

3. **Interoperability Testing**
   - Test vendor systems with other profile-conformant systems
   - Validate end-to-end credential workflows
   - Verify compliance with all profile requirements

### Documenting Your System's Supported Profiles

To enable organic network growth:

1. **Profile Documentation**
   - Document which profiles your system supports
   - Specify any optional extensions implemented
   - Provide technical contact information for integration

2. **Public Registry**
   - Register your system in relevant trust registries
   - Provide clear technical specifications
   - Maintain current contact and support information

3. **Integration Support**
   - Provide integration documentation and examples
   - Offer technical support for partner integrations
   - Participate in interoperability testing events

### Growing Networks Organically

With clear profile requirements, networks can grow organically:

1. **New Entrant Onboarding**
   - New participants can see exact technical requirements
   - Clear conformance criteria enable self-assessment
   - Standardized profiles reduce integration complexity

2. **Partner Discovery**
   - Profile compatibility enables automatic partner discovery
   - Trust registries provide authoritative partner information
   - Standardized protocols enable seamless integration

3. **Ecosystem Expansion**
   - Profile-based requirements scale across organizations
   - Standardized testing enables quality assurance
   - Clear specifications enable vendor competition and innovation

---

## Conclusion

This LER Ecosystem Implementation Coordination Guide provides the technical foundation for interoperable Learning and Employment Records systems. By defining specific interoperability profiles with mandatory requirements, this guide enables reliable credential exchange across different vendors and platforms.

The two defined profiles (VCALM-EdDSA and OID4-ECDSA) cover the most common use cases in the LER ecosystem, providing clear technical specifications that can be directly incorporated into procurement documents and implementation plans.

Organizations using this guide can confidently specify technical requirements that ensure interoperability, assess vendor capabilities against clear criteria, and build networks that grow organically with new participants able to understand exactly what technical requirements they must meet to participate.

The foundation established by this guide enables the future development of automated testing tools and conformance validation systems that will further reduce the complexity of achieving and maintaining interoperability across the LER ecosystem.
