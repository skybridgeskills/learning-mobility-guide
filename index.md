---
title: Digital Credentialing Issuance, Interoperability, and Verification Guide for Learning Mobility
description: Guide to organizing interoperable digital credentialing systems that power learning mobility. Defines standardized interoperability profiles for seamless credential exchange across vendors and platforms.
layout: default
permalink: /
---

## Table of Contents

1. [Introduction and Purpose](#introduction-and-purpose)
2. [Core Concepts](#core-concepts)
3. [Workflows](#workflows)
   - [Credential Issuance Workflow](#credential-issuance-workflow)
   - [Credential Storage and Management Workflow](#credential-storage-and-management-workflow)
   - [Credential Presentation Workflow](#credential-presentation-workflow)
   - [Credential Verification Workflow](#credential-verification-workflow)
4. [Component Specifications](#component-specifications)
5. [Interoperability Profiles](#interoperability-profiles)
6. [Implementation Guidance](#implementation-guidance)
   - [Using Profiles in RFPs](#using-profiles-in-rfps)
   - [Assessing Your Capabilities](#assessing-your-capabilities)
   - [Organizing Vendor Development Work](#organizing-vendor-development-work)
   - [Documenting Your System's Supported Profiles](#documenting-your-systems-supported-profiles)
   - [Growing Networks Organically](#growing-networks-organically)
7. [Conclusion](#conclusion)

---

## Introduction and Purpose

Learning mobility is the ability for people to carry, build, and articulate their learning—knowledge, skills, competencies, and credentials—across fragmented education and employment systems and throughout their lives. Achieving that vision requires digital credentialing infrastructure that keeps data flowing across the Learning Mobility Framework's institutional verticals: Skills/Competency Articulation, Micro-Credentialing, Credit for Prior Learning (CPL), Transfer & Credit Mobility, and Workforce Alignment.

Digital credentials are foundational infrastructure for both learning mobility and skills-based hiring systems. They enable learners to carry verified achievements across institutions and employers, while simultaneously enabling employers to identify qualified candidates based on verified competencies rather than traditional proxies like degrees or resumes. This dual function—supporting learner agency while enabling skills-based hiring—makes interoperable digital credentials critical infrastructure for modern education and workforce systems.

The Digital Credentialing Issuance, Interoperability, and Verification Guide for Learning Mobility translates that framework into procurement-ready specifications for interoperable digital credentialing systems. It defines standardized interoperability profiles that ensure seamless credential exchange across different vendors and platforms so learners can confidently move their verified achievements wherever opportunity takes them—whether to transfer institutions, employers, or other verifiers.

Digital credentials act as vehicles that make learning mobility real. When issuers, holders, and verifiers all implement a common interoperability profile, credentials can move from learning environments to transfer evaluators and hiring systems without friction. The guidance in this document helps state, regional, and institutional leaders align their procurement, integration, and implementation activities with the Learning Mobility Framework so every workflow reinforces learner agency and enables skills-based hiring practices.

This guide builds on iterative development work in the digital credentials ecosystem, including interoperability assessments performed as part of the [SkillsFWD](https://skillsfwd.org) program. These assessments confirmed that projects were able to successfully move credentials through end-to-end workflows by implementing interoperability profiles. The SkillsFWD assessments demonstrated a flexible approach that allowed each project to choose its own interoperability profile while ensuring that essential workflows were complete and that the rights and responsibilities defined by the program were fulfilled. This guide codifies those lessons learned into standardized profiles and assessment processes that enable implementers to self-assess and report their readiness to participate in all necessary workflows for their role.

### Purpose

This guide serves to organize technical requirements that can be directly incorporated into Request for Proposals (RFPs) and procurement documents. It enables funders and implementing organizations to specify exact technical requirements that ensure interoperability across the entire learning mobility ecosystem. By ensuring credentials can be reliably verified across systems, this guide enables skills-based hiring practices that match candidates to opportunities based on verified competencies rather than traditional credentials alone.

### Interoperability Profiles for Digital Credentials

An interoperability profile defines a specific combination of standards-based technology choices that work together to provide complete end-to-end learning mobility workflows. Each profile specifies:

- Credential formats and schemas
- Cryptographic proof mechanisms
- Exchange protocols for issuance and presentation
- Status verification methods
- Trust infrastructure requirements

**How Profiles Enable Digital Credential Exchange**

Interoperability profiles ensure seamless credential exchange across vendors and platforms by standardizing the technical choices that systems must implement. When different vendors' systems—whether issuer platforms, holder wallets, or verifier systems—all conform to the same interoperability profile, they can exchange credentials without requiring custom integrations or bilateral agreements. This standardization eliminates the friction that would otherwise exist when credentials need to move between different technology providers.

**The Power of Community Alignment**

When a community like a state system, regional consortium, or institutional network consistently adopts a particular interoperability profile, digital credentials can be moved effectively between institutions, learners, and employers to support learning mobility workflows. For example, when all institutions in a transfer network implement the same profile, learners can seamlessly carry their verified achievements from one institution to another. When employers in a region adopt the same profile used by local educational institutions, they can confidently verify and accept credentials from any participating issuer. This community-wide alignment transforms digital credentials from isolated technical achievements into infrastructure that powers learning mobility and skills-based hiring.

When a solution or product is compatible with a particular profile, it means that for the roles it occupies (e.g., holder credential management/wallet, issuer system, verifier system), it supports all required operations defined in the interoperability profile for that role.

### Using This Guide

1. **For Procurement**: Copy relevant sections directly into RFPs to specify exact technical requirements
2. **For Vendor Assessment**: Use the provided checklists to evaluate vendor capabilities
3. **For Network Growth**: Document your system's supported profiles to enable organic, permissionless network expansion
4. **For Implementation**: Follow the detailed specifications to ensure conformance with chosen profiles

---

## Core Concepts

### Digital Credentials for Learning Mobility

The digital credentials ecosystem consists of three primary roles:

- **Issuers**: Organizations that create and issue verifiable credentials (educational institutions, certification bodies, employers)
- **Holders**: Individuals who receive, store, and present their credentials (learners, workers, job seekers)
- **Verifiers**: Organizations that request and verify credentials (employers, educational institutions, licensing boards)

### Skills-Based Hiring and Advancement with Digital Credentials

Digital credentials enable skills-based hiring by providing verifiable, machine-readable evidence of competencies that can be matched to job requirements. Unlike traditional resumes or degree requirements, verifiable credentials:

- Provide cryptographic proof of authenticity and current status
- Enable automated skills matching between candidate credentials and job requirements
- Support selective disclosure, allowing candidates to share relevant credentials while maintaining privacy
- Maintain integrity across different hiring platforms and applicant tracking systems

When hiring systems implement interoperability profiles, they can confidently accept and verify credentials from diverse issuers—educational institutions, training providers, certification bodies—enabling a shift from degree-based to skills-based hiring practices. This transformation requires the same interoperable infrastructure that supports learning mobility, making digital credentials critical infrastructure for both educational and workforce systems.

### Interoperability Profiles

Interoperability profiles solve the challenge of ensuring that different systems can work together seamlessly. Rather than requiring all systems to support every possible standard and protocol combination, profiles define specific, tested combinations that are known to work together. The two initial profiles included in this guide are based on patterns seen in the real world among leading implementers of the W3C Verifiable Credentials and Open Badges standards for learning mobility purposes.

**How Profiles Emerge**

Interoperability profiles emerge from real-world implementation patterns. When multiple organizations implement digital credentials using similar combinations of standards and protocols, and those implementations successfully enable credential exchange, a pattern emerges that can be codified into an interoperability profile. New profiles are typically proposed and documented by communities of implementers who have successfully demonstrated interoperability using a particular combination of standards. These profiles are then validated through real-world testing and may be incorporated into guides like this one to enable broader adoption.

Each profile includes:
- **Mandatory requirements**: Features that MUST be implemented for conformance
- **Optional extensions**: Features that MAY be implemented for enhanced functionality
- **Deprecated features**: Features that SHOULD NOT be used in new implementations

As the ecosystem matures, more interoperability profiles will be created to cover specific use cases and requirements as well as to take advantage of new standards and protocols that are developed, such as cryptographic signatures with more advanced protections against quantum computing attacks. 

### Conformance vs. Compatibility

- **Conformance**: A system that implements all mandatory requirements of a profile
- **Compatibility**: A system that can interoperate with conformant systems but may not implement all profile requirements itself

This guide focuses on role-based conformance requirements to ensure reliable interoperability. Conformance is sometimes relative to a specific specification and is sometimes measured by an official body related to that standard. For example, the 1EdTech Consortium provides a conformance certification program for Open Badges 3.0 and CLR 2.0. The interoperability profiles here build on these certification programs by going deeper into the combinations of specifications that may be chosen for the various implementation options within OB and CLR to better ensure end-to-end interoperability across all the implementation roles necessary within learning mobility ecosystems that implement one of the included profiles.

---

## Workflows

### Workflow-to-Role Mapping

This table provides a quick reference for learning mobility coordinators to identify which workflows are relevant to their projects, which roles participate in each workflow, and where to find the corresponding checklists.

| Workflow | Participating Roles | Primary Use Cases | Checklist References | Example Verticals |
|----------|-------------------|-------------------|---------------------|------------------|
| Credential Issuance | Issuer, Holder | Issuing credentials to learners | Issuer: [VCALM-EdDSA](checklists/vcalm-eddsa-checklist.md#issuer-system-requirements), [OID4-ECDSA](checklists/oid4-ecdsa-checklist.md#issuer-system-requirements)<br>Holder: [VCALM-EdDSA](checklists/vcalm-eddsa-checklist.md#holder-wallet-requirements), [OID4-ECDSA](checklists/oid4-ecdsa-checklist.md#holder-wallet-requirements) | Micro-Credentialing, Workforce Alignment |
| Credential Storage & Management | Holder | Storing and organizing credentials | Holder: [VCALM-EdDSA](checklists/vcalm-eddsa-checklist.md#holder-wallet-requirements), [OID4-ECDSA](checklists/oid4-ecdsa-checklist.md#holder-wallet-requirements) | Transfer & Credit Mobility, Credit for Prior Learning |
| Credential Presentation | Holder, Verifier | Sharing credentials with verifiers | Holder: [VCALM-EdDSA](checklists/vcalm-eddsa-checklist.md#holder-wallet-requirements), [OID4-ECDSA](checklists/oid4-ecdsa-checklist.md#holder-wallet-requirements)<br>Verifier: [VCALM-EdDSA](checklists/vcalm-eddsa-checklist.md#verifier-system-requirements), [OID4-ECDSA](checklists/oid4-ecdsa-checklist.md#verifier-system-requirements) | Workforce Alignment, Transfer & Credit Mobility |
| Credential Verification | Verifier | Validating received credentials | Verifier: [VCALM-EdDSA](checklists/vcalm-eddsa-checklist.md#verifier-system-requirements), [OID4-ECDSA](checklists/oid4-ecdsa-checklist.md#verifier-system-requirements) | Skills/Competency Articulation, All verticals |

### Credential Issuance Workflow

The credential issuance workflow defines how credentials are created and delivered to holders.

#### Example Scenario: Micro-Credentialing

A community college offers a series of stackable micro-credentials in cybersecurity. When a student completes a course module demonstrating proficiency in network security, the college's learning management system automatically issues a digital micro-credential. The student receives the credential in their digital wallet, where it's cryptographically signed and verifiable. This micro-credential can later be stacked with others to demonstrate a complete cybersecurity pathway, enabling the student to showcase their progressive learning to employers or transfer institutions. Successful interoperability ensures that regardless of which wallet the student uses or which employer platform reviews the credential, the micro-credential maintains its integrity and can be verified across different systems.

#### Participating Roles

This workflow involves two primary roles:
- **Issuer**: The organization or system that creates and delivers credentials (e.g., educational institutions, certification bodies, employers)
- **Holder**: The individual or system that receives and stores credentials (e.g., learners, workers using digital wallets or persistence applications)

#### Issuer Role Requirements

**Universal Requirements (Both Profiles):**
- MUST generate W3C Verifiable Credentials Data Model 2.0 compliant credentials
- MUST use Open Badges 3.0 credential schema
- MUST implement Bitstring Status List for credential status management
- MUST support did:web or did:key DID methods for issuer identification

**VCALM-EdDSA Profile Requirements:**
- MUST implement VCALM Exchanges protocol for credential delivery
- MUST support EdDSA cryptographic signatures (eddsa-rdfc-2022)

**OID4-ECDSA Profile Requirements:**
- MUST implement OID4VCI v1.0 for credential issuance
- MUST support ECDSA cryptographic signatures (ecdsa-rdfc-2019)

#### Holder Role Requirements

**Universal Requirements (Both Profiles):**
- MUST store W3C Verifiable Credentials Data Model 2.0 credentials
- MUST support Open Badges 3.0 credential display and management
- MUST implement Bitstring Status List checking for credential status
- MUST support did:web or did:key DID methods for holder identification

**VCALM-EdDSA Requirements:**
- MUST implement VCALM Exchanges protocol for credential reception
- MUST support EdDSA signature verification (eddsa-rdfc-2022)

**OID4-ECDSA Requirements:**
- MUST implement OID4VCI v1.0 for credential reception
- MUST support ECDSA signature verification (ecdsa-rdfc-2019)

#### Quick Checklist Guide

**For Issuer Systems:**
- VCALM-EdDSA Profile: See [Issuer System Requirements](checklists/vcalm-eddsa-checklist.md#issuer-system-requirements) in VCALM-EdDSA checklist, specifically:
  - [Credential Creation](checklists/vcalm-eddsa-checklist.md#credential-creation)
  - [Cryptographic Signing](checklists/vcalm-eddsa-checklist.md#cryptographic-signing)
  - [VCALM Exchanges](checklists/vcalm-eddsa-checklist.md#vcalm-exchanges)
  - [Status Management](checklists/vcalm-eddsa-checklist.md#status-management)
  - [DID Management](checklists/vcalm-eddsa-checklist.md#did-management)
- OID4-ECDSA Profile: See [Issuer System Requirements](checklists/oid4-ecdsa-checklist.md#issuer-system-requirements) in OID4-ECDSA checklist, specifically:
  - [Credential Creation](checklists/oid4-ecdsa-checklist.md#credential-creation)
  - [Cryptographic Signing](checklists/oid4-ecdsa-checklist.md#cryptographic-signing)
  - [OID4VCI](checklists/oid4-ecdsa-checklist.md#oid4vci)
  - [Status Management](checklists/oid4-ecdsa-checklist.md#status-management)
  - [DID Management](checklists/oid4-ecdsa-checklist.md#did-management)

**For Holder Wallets:**
- VCALM-EdDSA Profile: See [Holder Wallet Requirements](checklists/vcalm-eddsa-checklist.md#holder-wallet-requirements) in VCALM-EdDSA checklist, specifically:
  - [VCALM Exchanges](checklists/vcalm-eddsa-checklist.md#vcalm-exchanges-1)
  - [Signature Verification](checklists/vcalm-eddsa-checklist.md#signature-verification)
  - [Credential Storage](checklists/vcalm-eddsa-checklist.md#credential-storage)
- OID4-ECDSA Profile: See [Holder Wallet Requirements](checklists/oid4-ecdsa-checklist.md#holder-wallet-requirements) in OID4-ECDSA checklist, specifically:
  - [OID4VCI](checklists/oid4-ecdsa-checklist.md#oid4vci-1)
  - [Signature Verification](checklists/oid4-ecdsa-checklist.md#signature-verification-1)
  - [Credential Storage](checklists/oid4-ecdsa-checklist.md#credential-storage-1)

#### Step-by-Step Process Flow

1. **Credential Request Initiation**
   - Holder initiates credential request through wallet interface OR through SSO login to issuer platform (e.g., SIS interface)
   - Wallet or issuer system establishes connection using profile-specific protocol

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

#### Example Scenario: Transfer & Credit Mobility / Credit for Prior Learning

A student has earned credentials from multiple institutions: an associate degree from a community college, industry certifications from professional training programs, and micro-credentials from online learning platforms. All of these credentials are stored in the student's digital wallet, organized by institution, credential type, and skills demonstrated. When the student applies to transfer to a four-year university, they can easily compile and share their complete learning portfolio. The receiving institution's transfer evaluation system can verify each credential's authenticity and status, enabling accurate credit articulation. Similarly, when applying for Credit for Prior Learning (CPL), the student can organize and present credentials from across their experiences to demonstrate competencies for academic credit. The student's ability to maintain a comprehensive, portable record of many of their learning achievements across institutions demonstrates how effective credential storage and management enables seamless transfer, credit mobility, and CPL evaluation.

#### Participating Roles

This workflow involves one primary role:
- **Holder**: The individual or system that stores and manages credentials (e.g., learners using digital wallets, persistence applications, or integrated credential management systems)

#### Holder Role Requirements

**Universal Requirements (Both Profiles):**
- MUST provide secure storage for verifiable credentials
- MUST support credential organization and categorization
- MUST implement credential backup and recovery mechanisms
- MUST provide credential sharing controls and privacy settings
- MUST support credential expiration monitoring and notifications
- MUST store credentials in W3C Verifiable Credentials Data Model 2.0 format
- MUST preserve original credential proofs and signatures
- MUST maintain credential metadata for display and management
- MUST support credential versioning and updates
- MUST implement Bitstring Status List checking
- MUST provide real-time status verification capabilities
- MUST cache status information appropriately for performance
- MUST handle status service unavailability gracefully

#### Quick Checklist Guide

**For Holder Wallets:**
- Profile 1 (VCALM-EdDSA): See [Holder Wallet Requirements](checklists/vcalm-eddsa-checklist.md#holder-wallet-requirements) in VCALM-EdDSA checklist, specifically:
  - [Credential Storage](checklists/vcalm-eddsa-checklist.md#credential-storage)
  - [Credential Display](checklists/vcalm-eddsa-checklist.md#credential-display)
  - [Status Checking](checklists/vcalm-eddsa-checklist.md#status-checking)
  - [DID Management](checklists/vcalm-eddsa-checklist.md#did-management-1)
- Profile 2 (OID4-ECDSA): See [Holder Wallet Requirements](checklists/oid4-ecdsa-checklist.md#holder-wallet-requirements) in OID4-ECDSA checklist, specifically:
  - [Credential Storage](checklists/oid4-ecdsa-checklist.md#credential-storage-1)
  - [Credential Display](checklists/oid4-ecdsa-checklist.md#credential-display-1)
  - [Status Checking](checklists/oid4-ecdsa-checklist.md#status-checking-1)
  - [DID Management](checklists/oid4-ecdsa-checklist.md#did-management-1)

### Credential Presentation Workflow

The credential presentation workflow defines how holders share credentials with verifiers.

#### Example Scenario: Workforce Alignment

A job seeker has completed a series of industry-recognized micro-credentials in data analytics through a workforce development program. When applying for a data analyst position, the employer's applicant tracking system requests verification of relevant skills and credentials. The job seeker uses their digital wallet to selectively share only the data analytics credentials that match the job requirements, maintaining privacy over other credentials. The employer's system receives the verifiable credentials and can immediately verify their authenticity and current status. This streamlined presentation process enables skills-based hiring, allowing employers to quickly identify qualified candidates based on verified competencies rather than relying solely on traditional resumes. Successful interoperability ensures that credentials issued by different training providers can be presented and verified consistently across various employer platforms.

#### Participating Roles

This workflow involves two primary roles:
- **Holder**: The individual or system that presents credentials (e.g., learners, workers using digital wallets or persistence applications)
- **Verifier**: The organization or system that requests and receives credentials (e.g., employers, educational institutions, licensing boards)

#### Holder Role Requirements

**Universal Requirements (Both Profiles):**
- MUST support selective disclosure of credential information
- MUST provide user consent mechanisms for credential sharing

**VCALM-EdDSA Profile Requirements:**
- MUST implement VCALM Exchanges protocol for credential presentation
- MUST support EdDSA-signed presentations

**OID4-ECDSA Profile Requirements:**
- MUST implement OID4VP v1.0 for credential presentation
- MUST support ECDSA-signed presentation

#### Verifier Role Requirements

**Universal Requirements (Both Profiles):**
- MUST validate W3C Verifiable Credentials Data Model 2.0 credentials
- MUST support Open Badges 3.0 credential schema validation
- MUST implement Bitstring Status List verification

**Profile 1 (VCALM-EdDSA) Requirements:**
- MUST implement VCALM Exchanges protocol for credential reception
- MUST support EdDSA signature verification (eddsa-rdfc-2022)

**Profile 2 (OID4-ECDSA) Requirements:**
- MUST implement OID4VP v1.0 for credential reception
- MUST support ECDSA signature verification (ecdsa-rdfc-2019)

#### Quick Checklist Guide

**For Holder Wallets:**
- Profile 1 (VCALM-EdDSA): See [Holder Wallet Requirements](checklists/vcalm-eddsa-checklist.md#holder-wallet-requirements) in VCALM-EdDSA checklist, specifically:
  - [VCALM Exchanges](checklists/vcalm-eddsa-checklist.md#vcalm-exchanges-1) (presentation capabilities)
- Profile 2 (OID4-ECDSA): See [Holder Wallet Requirements](checklists/oid4-ecdsa-checklist.md#holder-wallet-requirements) in OID4-ECDSA checklist, specifically:
  - [OID4VP](checklists/oid4-ecdsa-checklist.md#oid4vp) (presentation capabilities)

**For Verifier Systems:**
- Profile 1 (VCALM-EdDSA): See [Verifier System Requirements](checklists/vcalm-eddsa-checklist.md#verifier-system-requirements) in VCALM-EdDSA checklist, specifically:
  - [VCALM Exchanges](checklists/vcalm-eddsa-checklist.md#vcalm-exchanges-2) (credential reception)
  - [Credential Validation](checklists/vcalm-eddsa-checklist.md#credential-validation)
  - [Signature Verification](checklists/vcalm-eddsa-checklist.md#signature-verification-1)
- Profile 2 (OID4-ECDSA): See [Verifier System Requirements](checklists/oid4-ecdsa-checklist.md#verifier-system-requirements) in OID4-ECDSA checklist, specifically:
  - [OID4VP](checklists/oid4-ecdsa-checklist.md#oid4vp-1) (credential reception)
  - [Credential Validation](checklists/oid4-ecdsa-checklist.md#credential-validation-1)
  - [Signature Verification](checklists/oid4-ecdsa-checklist.md#signature-verification-2)

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

The credential verification workflow is a sub-process of credential presentation that defines how verifiers validate received credentials. This workflow occurs after a credential has been presented to a verifier.

#### Example Scenario: Skills/Competency Articulation

An employer or talent platform receives credentials from job applicants that reference institutional learning outcomes and competencies. The verifier's system needs to validate that these credentials are authentic, current, and issued by authorized institutions. The system verifies the cryptographic signatures, checks credential status, and validates the issuer's authorization through trust registries. Once verified, the platform may use AI models to crosswalk the institutional skills documented in the credentials to the skills identified in job roles, enabling accurate skills matching. This verification process ensures that the skills and competencies articulated in credentials maintain their integrity and meaning across different systems, supporting reliable skills-based hiring decisions. Successful interoperability enables verifiers to confidently accept credentials from diverse issuers while maintaining trust in the credential's validity and the skills it represents.

#### Participating Roles

This workflow involves one primary role:
- **Verifier**: The organization or system that validates received credentials (e.g., employers, educational institutions, licensing boards, talent platforms)

**Note:** This workflow occurs after credential presentation has been completed. The verifier receives credentials through the Credential Presentation Workflow and then performs verification.

#### Verifier Role Requirements

**Universal Requirements (Both Profiles):**
- MUST implement cryptographic signature verification
- MUST validate credential schema compliance
- MUST check credential status using Bitstring Status List
- MUST verify issuer identity and authorization
- MUST implement trust registry integration
- MUST provide audit logging for verification activities

**Profile-Specific Requirements:**

The verification process uses profile-specific cryptographic suites, but the overall verification steps are universal:
- **Profile 1 (VCALM-EdDSA)**: Verifies EdDSA signatures (eddsa-rdfc-2022)
- **Profile 2 (OID4-ECDSA)**: Verifies ECDSA signatures (ecdsa-rdfc-2019)

#### Verification Process Steps

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

3. **Status Verification**
   - Retrieve current status list from issuer
   - Check credential status using Bitstring Status List
   - Verify status list signature and freshness
   - Handle status service unavailability

4. **Trust Registry Integration**
   - Query trust registries for issuer authorization
   - Validate issuer credentials and accreditation
   - Check for issuer revocation or suspension
   - Maintain current trust registry data

#### Quick Checklist Guide

**For Verifier Systems:**
- Profile 1 (VCALM-EdDSA): See [Verifier System Requirements](checklists/vcalm-eddsa-checklist.md#verifier-system-requirements) in VCALM-EdDSA checklist, specifically:
  - [Credential Validation](checklists/vcalm-eddsa-checklist.md#credential-validation)
  - [Signature Verification](checklists/vcalm-eddsa-checklist.md#signature-verification-1)
  - [Status Verification](checklists/vcalm-eddsa-checklist.md#status-verification)
  - [Trust Registry Integration](checklists/vcalm-eddsa-checklist.md#trust-registry-integration)
  - [Audit Logging](checklists/vcalm-eddsa-checklist.md#audit-logging)
- Profile 2 (OID4-ECDSA): See [Verifier System Requirements](checklists/oid4-ecdsa-checklist.md#verifier-system-requirements) in OID4-ECDSA checklist, specifically:
  - [Credential Validation](checklists/oid4-ecdsa-checklist.md#credential-validation-1)
  - [Signature Verification](checklists/oid4-ecdsa-checklist.md#signature-verification-2)
  - [Status Verification](checklists/oid4-ecdsa-checklist.md#status-verification-1)
  - [Trust Registry Integration](checklists/oid4-ecdsa-checklist.md#trust-registry-integration-1)
  - [Audit Logging](checklists/oid4-ecdsa-checklist.md#audit-logging-1)

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

### Selecting an Interoperability Profile for Your Community

When coordinating a learning mobility ecosystem, selecting the right interoperability profile is critical for minimizing implementation effort while maximizing interoperability. Follow this process:

**Step 1: Identify Community Participants and Their Roles**

- List all organizations participating in your learning mobility initiative
- For each organization, identify:
  - Which workflows they need to participate in (Issuance, Storage/Management, Presentation, Verification)
  - What roles they will play in each workflow (Issuer, Holder/Wallet, Verifier)
  - Whether they will use integrated systems (e.g., issuer + wallet in one platform) or separate systems

**Step 2: Inventory Existing Technology Platforms**

- Survey participating organizations to identify:
  - What credentialing platforms they currently use
  - What digital credential capabilities they already have implemented
  - What standards and protocols their existing systems support
  - Whether they have any vendor relationships or contracts that influence technology choices

**Step 3: Assess Profile Support Across Existing Systems**

- For each candidate interoperability profile, evaluate:
  - How many existing platforms already support the profile (or key components of it)
  - What implementation effort would be required for platforms that don't currently support it
  - Whether any existing systems have dependencies (e.g., specific trust registries, identity providers) that favor one profile over another

**Step 4: Evaluate Implementation Effort**

- For each candidate profile, estimate the total implementation effort across all participants:
  - Count how many systems would need new implementations vs. configuration changes
  - Identify which vendors/platforms would require the most development work
  - Consider whether any participants have constraints (budget, timeline, technical capacity) that limit their ability to implement certain profiles

**Step 5: Select the Best Fit Profile**

- Choose the profile that:
  - Has the widest support across existing platforms (minimizing new development)
  - Requires the least total implementation effort across all participants
  - Meets the technical requirements of your learning mobility goals
  - Aligns with any policy or compliance requirements

**Technical Considerations:**

- The **VCALM-EdDSA Profile** may be preferable when:
  - Integration with existing Open Badges tools is desired, as EdDSA is the most widely adopted securing mechanism in the Open Badges ecosystem.
  - Educational institutions are primary issuers

- The **OID4-ECDSA Profile** may be preferable when:
  - ECDSA signatures are mandated by policy
  - Enterprise identity systems are in use
  - Government or regulated industry compliance on cryptographic sigantures is required
  - HSM (Hardware Security Module) is required for key storage and management

**Step 6: Document Profile Selection Decision**

- Document which profile was selected and why
- Record which vendors/platforms already support it and which need to implement it
- Establish implementation timelines and milestones for systems that need to add support

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

### Assessing Your Capabilities

This section describes how to assess vendor capabilities using workflow-by-role checklists. Often each technology provider will self-assess, but the same items could be documented by  learning mobility coordinator through an interview process. Interoperability profiles are organized into workflows (such as Credential Issuance, Credential Presentation, Credential Verification) and for each workflow, there are role-specific checklists that define the requirements for each system participating in that workflow.

#### Understanding Workflow-by-Role Checklists

Each interoperability profile includes checklists organized by workflow and role. To determine which checklists apply to a vendor's system:

1. **Identify Workflows**: Determine which workflows are needed for the overall learning mobility strategy and which workflows the vendor's system participates in. For example, in a project to implement credit mobility using digital credentials, the players are educational institutions and learner wallets or persistence applications. The institutions fulfill roles of both issuer and verifier, and a participating wallet integrates with them to complete credential issuance and presentation workflows.
2. **Identify Roles**: For each workflow, identify the role(s) the system plays:
   - **Issuer**: Creates and issues credentials
   - **Holder Wallet or Persistence Application**: Receives, stores, and manages credentials
   - **Verifier**: Requests and verifies credentials
3. **Select Checklists**: Use the checklists that correspond to the system's role(s) in each relevant workflow

For example, a wallet system that participates in both Credential Issuance (as holder) and Credential Presentation (as holder) would need to complete the holder checklists for both workflows.

#### Documenting Profile Support Across a Network

When coordinating multiple vendors and platforms in a learning mobility network, you need to document profile support both for individual vendors and across the entire network.

**For Individual Vendors:**

1. Identify the vendor's system roles across all workflows
2. For each role, determine which checklists apply
3. Complete or request vendor self-assessment for each relevant checklist
4. Document:
   - Which profile(s) the vendor supports
   - Which workflows and roles are supported
   - Implementation status (Fully Implemented / Partially Implemented / Planned / Not Supported)
   - Any limitations or constraints

**Across Multiple Vendors in a Network:**

1. Create a network-wide profile support matrix:
   - List all vendors/platforms in the network
   - For each vendor, document their supported profiles and roles
   - Identify gaps where no vendor supports a required role for a workflow
   - Highlight vendors that support multiple roles (e.g., issuer + wallet)

2. Assess network completeness:
   - Verify that all required workflows have at least one vendor supporting each necessary role
   - Identify if multiple vendors support the same role (providing redundancy and choice)
   - Document any dependencies between vendors (e.g., wallet must work with specific issuer platforms)

3. Plan network growth:
   - Identify which additional vendors or capabilities would strengthen the network
   - Document which profiles new vendors should support to maximize interoperability
   - Create a roadmap for expanding network coverage

**Example Network Documentation:**

| Vendor | Profile Support | Issuer Role | Holder Role | Verifier Role | Notes |
|--------|----------------|-------------|-------------|--------------|-------|
| Platform A | VCALM-EdDSA | ✓ Full | ✓ Full | - | Primary issuer platform |
| Platform B | VCALM-EdDSA | - | ✓ Full | ✓ Full | Wallet + verifier |
| Platform C | OID4-ECDSA | ✓ Partial | - | - | Needs wallet integration |

#### Self-Testing Conformance

Vendors can self-test their conformance with a profile by following these steps:

1. **Select the Appropriate Checklist**

   - Choose the interoperability profile your system needs to support or the profiles that the learning mobility coordinator is considering for the project
   - Map the learning mobility vertical to digital credentials workflows described in the profile. For example, recognizing that a Credit for Prior Leearning (CPL) project may involve an institution issuing fresh credentials to learners based on documentation of their past experience and it may also involve that institution verifying previously issued credentials held by the learner. 
   - Identify which workflows and which roles in those workflows your system participates in
   - Select the role-specific checklists for your system's role(s) in each workflow

2. **Complete the Self-Assessment**

For each requirement in the selected checklists, document:
   - Implementation status (Implemented/Planned/Not Supported)
   - Any relevant notes or technical details of your implementation or plan; keep it brief to ensure it is quick to complete and review
   - Timeline for planned implementations
   - Any limitations or constraints

3. **Test End-to-End Workflows**

   - Demonstrate each workflow your system participates in:
     - **For Issuers**: Show credential creation and delivery to a holder
     - **For Holders**: Show credential reception, storage, and presentation to a verifier
     - **For Verifiers**: Show credential request, reception, and verification
   - Document the workflow with screenshots or video walkthroughs
   - Provide example credentials in the standardized format

4. **Assess Workflow Completeness Against Project Goals**

   Assessment ensures that implementations support the learning mobility goals of your project. The SkillsFWD program provides a useful example of how workflow-by-role assessment validates that essential workflows are complete and that project goals can be accomplished. Rather than prescribing specific rights and responsibilities, SkillsFWD created modular checklists for each workflow role, allowing each project to choose its own interoperability profile while ensuring that learners can effectively use their credentials.

#### Example: Learner Control Over Credential Sharing

   To illustrate how this works, consider the principle of learner control over credential sharing. SkillsFWD assessment items verify that learners can share credentials in VC format without substantial restrictions, which supports this principle. The assessment plan includes specific items such as:
   - Assessing whether learners can share credentials in VC format
   - Assessing whether learners can export credentials in VC format
   - Verifying that learners can share credentials in VC format without substantial restrictions

   These assessment items are organized into modular checklists for each workflow role. For example, in the Credential Presentation workflow, holder systems are assessed on their ability to share credentials, while in the Credential Storage and Management workflow, holder systems are assessed on their ability to export credentials. This modular approach allows projects to demonstrate compliance even when credential persistence platforms are integrated into the same software as issuer systems—the assessment verifies that workflows involving learners exporting credentials in interoperable formats can still occur, regardless of system architecture.

   The SkillsFWD program accommodated various workflow configurations, including fully integrated systems where issuer, holder, and verifier roles all exist within a single platform. Even in these cases, the assessment ensured that learners could still export credentials in standardized formats (such as JSON or baked PNG/SVG images) so they could share credentials with verifiers beyond the original project ecosystem. For detailed information on the SkillsFWD assessment methodology and modular checklist approach, see the [SkillsFWD Interoperability Assessment Guide](https://docs.google.com/document/d/1MQ5RNTsOqmrkExzbRIK_nLmI-LVIzN8asYcOO3wFgys/edit?tab=t.0) and [SkillsFWD Technical Interoperability Assessment Plan](https://docs.google.com/document/d/1QvCWeleKYGUtVl5vE-4Qw-fNiwXuyk7_ecFjS1M_ScM/edit?tab=t.0#heading=h.2ilmtyerr4i).

#### Example: State Workforce Agency Micro-Credentialing Initiative

   Consider a state workforce agency planning to execute a learning mobility strategy focused on micro-credentialing for employment. The agency is gathering both higher education institutions and professional continuing learning organizations to offer skills-based micro-credentials that will be consumed within employer and applicant-facing talent marketplace tools.

   **Step 1: Identify Project Goals and Required Workflows**
   The agency identifies that their micro-credentialing initiative requires:
   - Credential Issuance workflow (institutions issue micro-credentials to learners)
   - Credential Presentation workflow (learners present credentials to talent marketplace tools)
   - Credential Verification workflow (talent marketplace tools verify credentials)

   **Step 2: Map Participants to Workflow Roles**
   The agency identifies:
   - **Issuers**: Higher education institutions and professional continuing learning organizations
   - **Holders**: Learners/workers who earn micro-credentials
   - **Verifiers**: Talent marketplace platforms used by employers and applicants

   **Step 3: Inventory Existing Technology Platforms**
   The agency surveys participating institutions and organizations to identify:
   - Which technology platforms they already use for credential issuance
   - Whether any platforms integrate multiple roles (e.g., issuer + wallet in same system)
   - What capabilities existing platforms already support

   **Step 4: Vet and Recommend Technology Partners**
   The agency identifies two candidate interoperability profiles that could work for their ecosystem. They vet several interested vendors that might be recommended to organizations needing a technology partner. For each vendor, the agency:
   - Identifies which workflows the vendor's platform participates in
   - Maps each platform to the roles it needs to fill in the identified workflows
   - Invites vendors to self-assess against the role-specific checklists for both candidate profiles

   **Step 5: Select Profile and Establish Commitments**
   After reviewing vendor self-assessments, the agency finds that one interoperability profile has wider support across existing platforms and candidate vendors. This reduces implementation effort and increases the likelihood of successful adoption. The agency then drafts memoranda of understanding (MOUs) with participating institutions, specifying that they must support all requirements of the relevant role-specific checklists by the program launch date.

   This approach ensures that the agency's learning mobility goal—enabling learners to share skills-based micro-credentials with talent marketplace tools—can be accomplished through interoperable credential exchange, while accommodating the diverse technology platforms already in use across participating organizations.

#### Vendor Evaluation Process

When evaluating vendors, use a three-stage process:

1. **Self-Assessment**
   - Provide vendors with profile-specific, workflow-by-role checklists
   - Require detailed responses for each capability
   - Review self-assessment documentation for completeness

2. **Technical Validation**
   - Conduct technical interviews on profile requirements
   - Review vendor architecture and implementation plans
   - Validate understanding of mandatory vs. optional requirements
   - Verify that workflow-by-role checklists have been correctly applied

3. **Interoperability Testing**
   - Test vendor systems with other profile-conformant systems
   - Validate end-to-end credential workflows
   - Verify compliance with all profile requirements for the vendor's roles
   - Confirm that rights and responsibilities are fulfilled

### Organizing Vendor Development Work

Vendors can use this guide to organize their product development and engineering work as they implement support for an interoperability profile. The workflow-by-role checklists provide a structured way to break down implementation work, track progress, and ensure conformance before release.

- **Identify target profile and roles**: Determine which interoperability profile your product needs to support and which roles your system will play in which workflows
- **Map requirements to development sprints**: Use the role-specific checklists to group related requirements into logical development units, prioritizing mandatory requirements before optional extensions
- **Track implementation progress**: Use checklists to track which requirements are implemented, in development, or planned, and identify any blockers
- **Validate conformance before release**: Complete self-assessment against all relevant checklists, conduct end-to-end workflow testing with other profile-conformant systems, and prepare conformance documentation

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

This guide provides the technical foundation for interoperable digital credentialing systems that power learning mobility and enable skills-based hiring and advancement. By defining specific interoperability profiles with mandatory requirements, this guide enables reliable credential exchange across different vendors and platforms, supporting both learner agency and employer access to verified competency data.

The two defined profiles (VCALM-EdDSA and OID4-ECDSA) cover most common use cases in learning mobility ecosystems, providing clear technical specifications that can be directly incorporated into procurement documents and implementation plans. These profiles enable credentials to flow seamlessly from educational institutions to hiring systems, supporting the transition to skills-based hiring and advancement practices that match candidates to opportunities based on verified competencies.

Organizations using this guide can confidently select technical requirements that ensure interoperability, assess vendor capabilities against clear criteria, and build networks that grow organically with new participants able to understand exactly what technical requirements they must meet to participate. Whether supporting learning mobility across institutions or enabling skills-based hiring in workforce systems, interoperable digital credentials provide the infrastructure needed for modern education and employment ecosystems.

The foundation established by this guide enables the future development of automated testing tools and conformance validation systems that will further reduce the complexity of achieving and maintaining interoperability across learning mobility ecosystems and skills-based hiring systems.
