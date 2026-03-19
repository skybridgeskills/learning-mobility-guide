/**
 * DID key generation and DID Auth utilities.
 * Uses Ed25519 keys for did:key (VCALM-EdDSA profile).
 */

import {Ed25519VerificationKey2020} from '@digitalbazaar/ed25519-verification-key-2020';
import {Ed25519Signature2020} from '@digitalbazaar/ed25519-signature-2020';
import {createPresentation, signPresentation} from '@digitalbazaar/vc';
import {securityLoader} from '@digitalcredentials/security-document-loader';

const documentLoader = securityLoader().build();

export interface KeyPair {
  key: Ed25519VerificationKey2020;
  suite: Ed25519Signature2020;
  did: string;
}

/**
 * Generate an ephemeral Ed25519 keypair and did:key identifier.
 */
export async function generateKeyPair(): Promise<KeyPair> {
  const key = await Ed25519VerificationKey2020.generate();
  const suite = new Ed25519Signature2020({key});
  const did = key.controller;
  return {key, suite, did};
}

/**
 * Build a DID Auth Verifiable Presentation (proof of DID control).
 * Used when participating in a VCALM exchange as the holder.
 */
export async function createDidAuthPresentation(
  holderDid: string,
  challenge: string,
  suite: Ed25519Signature2020
): Promise<unknown> {
  const presentation = createPresentation({holder: holderDid});
  return signPresentation({
    presentation,
    suite,
    challenge,
    documentLoader,
  });
}

export {documentLoader};
