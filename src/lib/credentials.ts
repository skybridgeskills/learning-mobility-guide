/**
 * Credential generation and validation utilities.
 * Produces Open Badges 3.0 Verifiable Credentials with eddsa-rdfc-2022.
 */

import {issue, verifyCredential} from '@digitalbazaar/vc';
import {DataIntegrityProof} from '@digitalbazaar/data-integrity';
import {cryptosuite as eddsaRdfc2022Cryptosuite} from '@digitalbazaar/eddsa-rdfc-2022-cryptosuite';
import * as Ed25519Multikey from '@digitalbazaar/ed25519-multikey';
import {CONTEXTS, CREDENTIAL_TYPES} from '../fixtures/contexts.ts';
import {documentLoader} from './did.ts';

export interface BaseCredentialTemplate {
  '@context': string[];
  type: string[];
  issuer: string;
  credentialSubject: Record<string, unknown>;
  issuanceDate?: string;
  expirationDate?: string;
}

export function createBaseOb3Template(issuer: string): BaseCredentialTemplate {
  return {
    '@context': [CONTEXTS.VC_2_0, CONTEXTS.OB_3_0],
    type: [CREDENTIAL_TYPES.VERIFIABLE_CREDENTIAL, CREDENTIAL_TYPES.OPEN_BADGE_CREDENTIAL],
    issuer,
    credentialSubject: {
      type: ['AchievementSubject'],
      achievement: {
        type: ['Achievement'],
        name: 'Test Badge',
        description: 'A test badge for interoperability testing',
        criteria: {narrative: 'Test criteria'},
      },
    },
    issuanceDate: new Date().toISOString(),
    expirationDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(),
  };
}

export interface CredentialInput {
  issuer: string;
  subjectDid?: string;
  achievementName?: string;
  achievementDescription?: string;
}

/**
 * Generate a valid Open Badges 3.0 Verifiable Credential signed with eddsa-rdfc-2022.
 */
export async function generateOb3Credential(input: CredentialInput): Promise<unknown> {
  const keyPair = await Ed25519Multikey.generate();
  const issuer = input.issuer ?? keyPair.controller;
  const template = createBaseOb3Template(issuer);
  if (input.subjectDid) {
    (template.credentialSubject as Record<string, unknown>).id = input.subjectDid;
  }
  if (input.achievementName) {
    ((template.credentialSubject as Record<string, unknown>).achievement as Record<string, unknown>).name =
      input.achievementName;
  }
  if (input.achievementDescription) {
    ((template.credentialSubject as Record<string, unknown>).achievement as Record<string, unknown>).description =
      input.achievementDescription;
  }

  const suite = new DataIntegrityProof({
    signer: keyPair.signer(),
    cryptosuite: eddsaRdfc2022Cryptosuite,
  });

  const credential = await issue({
    credential: template,
    suite,
    documentLoader,
  });

  return credential;
}

/**
 * Validate a received credential: structure, signature, and basic schema.
 */
export async function validateCredential(credential: unknown): Promise<{
  valid: boolean;
  errors?: string[];
}> {
  const errors: string[] = [];

  if (!credential || typeof credential !== 'object') {
    return {valid: false, errors: ['Credential must be an object']};
  }

  const cred = credential as Record<string, unknown>;
  if (!Array.isArray(cred['@context']) || !cred['@context'].length) {
    errors.push('Credential must have @context');
  }
  if (!Array.isArray(cred.type) || !cred.type.includes('VerifiableCredential')) {
    errors.push('Credential must have type including VerifiableCredential');
  }
  if (!cred.issuer) {
    errors.push('Credential must have issuer');
  }
  if (!cred.credentialSubject) {
    errors.push('Credential must have credentialSubject');
  }
  if (!cred.proof) {
    errors.push('Credential must have proof');
  }

  if (errors.length > 0) {
    return {valid: false, errors};
  }

  try {
    const result = await verifyCredential({
      credential: cred,
      suite: [new DataIntegrityProof({cryptosuite: eddsaRdfc2022Cryptosuite})],
      documentLoader,
    });
    return {valid: result.verified};
  } catch (e) {
    return {
      valid: false,
      errors: [e instanceof Error ? e.message : String(e)],
    };
  }
}
