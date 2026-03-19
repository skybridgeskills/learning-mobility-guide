/**
 * JSON-LD context URLs and credential type constants.
 * Used by credential generators and validators.
 */

export const CONTEXTS = {
  VC_2_0: 'https://www.w3.org/ns/credentials/v2',
  OB_3_0: 'https://purl.imsglobal.org/spec/ob/v3p0/context-3.0.3.jsonld',
  DATA_INTEGRITY: 'https://w3id.org/security/data-integrity/v2',
  ED25519_2020: 'https://w3id.org/security/suites/ed25519-2020/v1',
} as const;

export const CREDENTIAL_TYPES = {
  VERIFIABLE_CREDENTIAL: 'VerifiableCredential',
  OPEN_BADGE_CREDENTIAL: 'OpenBadgeCredential',
} as const;
