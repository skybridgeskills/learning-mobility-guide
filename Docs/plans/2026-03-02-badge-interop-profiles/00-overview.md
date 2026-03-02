# Plan Overview: Badge Interoperability Profiles — CTDL Alignment & TCP/LER-RS

**Date:** 2026-03-02
**Branch:** `claude/plan-badge-interop-profiles-0ajzu`

---

## Request Summary

Add two new interoperability profiles to the guide. Both are additive to the existing three core exchange profiles (OID4-ECDSA, VCALM-EdDSA, OB3-Direct-Delivery). They address distinct layers of the credentialing stack:

1. **CTDL Alignment Content Profile** — Requirements for embedding Credential Transparency Description Language (CTDL) alignment data inside an Open Badge credential, linking it to a record published in the Credential Engine Registry.

2. **TCP/LER-RS Packaging Profile** — Requirements for packaging Open Badge credentials inside a Learning and Employment Record – Résumé Standard (LER-RS) document (also known as the Trusted Career Profile / TCP), including optional wrapping as a platform-signed Verifiable Credential. Uses a résumé builder app as the reference scenario.

---

## Planning Q&A

**Q1: What is the Trusted Career Profile (TCP) / what spec does it reference?**

The TCP is the LER-RS (Learning and Employment Record – Résumé Standard), defined by the HR Open Standards Consortium (version 4.5). The JSON schema is published at `https://schema.hropenstandards.org/4.5/recruiting/json/VerifiableCredentialLER-RSType.json`. It describes structured résumé data: subject profile/contact information, objective, skills, work experience, and educational experience. Skills and educational experiences can reference credentials (like Open Badges) as verification. The full document can optionally be wrapped as a Verifiable Credential, signed by the learner or by a platform. LER-RS is a collaboration between HR Open Standards and 1EdTech, combining Open Badges 3.0 / CLR Standard 2.0 with HR Open's résumé/CV data structures.

**Q2: What does "including CTDL data in an Open Badge" mean concretely?**

Option A: The badge's `achievement.alignment` field references a credential published in the Credential Engine Registry. The workflow is:
1. Issuer publishes their credential to Credential Engine Registry → receives a CTID (Credential Transparency Identifier)
2. Issuer adds an `alignment` object to the Open Badge `achievement` pointing to `https://credentialfinder.org/resources/<CTID>`

The alignment block uses: `targetName`, `targetUrl` (credentialfinder.org CTID URL), `targetDescription` ("Additional information powered by the Credential Registry."), `targetFramework` ("Credential Transparency Description Language"), `targetCode` (the CTID).

**Q3: How do the new profiles relate structurally to the existing three?**

- **CTDL Alignment** is a *content profile* — it describes what goes inside a credential. It is additive to any of the three core exchange profiles; any issuer using any exchange profile may also apply the CTDL content profile.
- **TCP/LER-RS** is a *packaging/delivery profile* — similar in character to OB3-Direct-Delivery. It describes how Open Badges (obtained via any exchange method) are assembled into an LER-RS document and delivered (download then upload pattern). It does not prescribe a new exchange protocol.

**Q4: What is the scope of the TCP/LER-RS workflow?**

Both of the following:
- **(A) Packaging only** — how a résumé builder app assembles Open Badges into a valid LER-RS JSON document, and how a receiving system ingests it.
- **(B) Packaging + platform-signed VC** — the LER-RS document is wrapped as a Verifiable Credential signed by the platform (résumé builder), providing downstream verifiability of the assembled package.

**Q5: Should the profiles include inline JSON examples?**

Yes — a small, purposeful number of examples per profile, not exhaustive.
