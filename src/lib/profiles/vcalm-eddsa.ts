/**
 * VCALM-EdDSA profile exchange flow helpers.
 * Orchestrates issuer and verifier exchange flows for interoperability testing.
 */

import type {ExchangeClient, ExchangeProtocols} from '../exchange.ts';
import {generateKeyPair, createDidAuthPresentation} from '../did.ts';
import {validateCredential} from '../credentials.ts';
import type {Endpoint} from '../types.ts';

export interface IssuerFlowResult {
  protocols: ExchangeProtocols;
  credential?: unknown;
  error?: string;
}

/**
 * Run the full issuer exchange flow: create exchange → DID Auth → receive credential.
 * The test suite acts as the wallet (holder).
 */
export async function runIssuerFlow(
  client: ExchangeClient,
  endpoint: Endpoint,
  variables: Record<string, unknown>
): Promise<IssuerFlowResult> {
  const workflowId = endpoint.workflowId ?? 'claim';

  const protocols = await client.createExchange(workflowId, variables);

  const {key, suite, did} = await generateKeyPair();

  const vcapiUrl = protocols.vcapi;
  if (!vcapiUrl) {
    return {protocols, error: 'No vcapi URL in protocols'};
  }

  const initRes = await fetch(vcapiUrl, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({}),
  });
  if (!initRes.ok) {
    return {protocols, error: `Init failed: HTTP ${initRes.status}`};
  }
  const initResult = (await initRes.json()) as Record<string, unknown>;
  const challenge = extractChallengeFromVprResponse(initResult);
  if (!challenge) {
    return {protocols, error: 'No challenge in VPR response'};
  }

  const presentation = await createDidAuthPresentation(did, challenge, suite);

  const res = await fetch(vcapiUrl, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(presentation),
  });

  if (!res.ok) {
    return {
      protocols,
      error: `Participation failed: HTTP ${res.status}`,
    };
  }

  const result = await res.json();
  const credential = extractCredentialFromResult(result);

  return {protocols, credential};
}

/**
 * Validate a credential received from an issuer.
 */
export async function validateIssuedCredential(credential: unknown): Promise<{
  valid: boolean;
  errors?: string[];
}> {
  return validateCredential(credential);
}

export interface VerifierFlowResult {
  protocols: ExchangeProtocols;
  accepted?: boolean;
  error?: string;
}

/**
 * Run the verifier exchange flow: create exchange → present credential → confirm acceptance.
 */
export async function runVerifierFlow(
  client: ExchangeClient,
  endpoint: Endpoint,
  variables: Record<string, unknown>,
  presentation: unknown
): Promise<VerifierFlowResult> {
  const workflowId = endpoint.workflowId ?? 'verify';

  const protocols = await client.createExchange(workflowId, variables);

  const vcapiUrl = protocols.vcapi;
  if (!vcapiUrl) {
    return {protocols, error: 'No vcapi URL in protocols'};
  }

  const res = await fetch(vcapiUrl, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(presentation),
  });

  if (!res.ok) {
    return {
      protocols,
      accepted: false,
      error: `Presentation rejected: HTTP ${res.status}`,
    };
  }

  return {protocols, accepted: true};
}

function extractChallengeFromVprResponse(response: Record<string, unknown>): string | null {
  const vpr = response.verifiablePresentationRequest as Record<string, unknown> | undefined;
  if (vpr) return extractChallengeFromVpr(vpr);
  return extractChallengeFromVpr(response);
}

function extractChallengeFromVpr(vpr: Record<string, unknown>): string | null {
  if (vpr.challenge && typeof vpr.challenge === 'string') {
    return vpr.challenge;
  }
  const query = vpr.query as Record<string, unknown> | undefined;
  if (query?.challenge && typeof query.challenge === 'string') {
    return query.challenge;
  }
  const interact = vpr.interact as Record<string, unknown> | undefined;
  const service = Array.isArray(interact?.service) ? interact.service[0] : undefined;
  const svc = service as Record<string, unknown> | undefined;
  if (svc?.serviceEndpoint && typeof svc.serviceEndpoint === 'string') {
    const match = svc.serviceEndpoint.match(/[?&]challenge=([^&]+)/);
    return match ? decodeURIComponent(match[1]) : null;
  }
  return null;
}

function extractCredentialFromResult(result: unknown): unknown {
  if (!result || typeof result !== 'object') return undefined;
  const obj = result as Record<string, unknown>;
  if (Array.isArray(obj.verifiableCredential) && obj.verifiableCredential.length > 0) {
    return obj.verifiableCredential[0];
  }
  if (obj.verifiableCredential && typeof obj.verifiableCredential === 'object') {
    return obj.verifiableCredential;
  }
  const vp = obj.verifiablePresentation as Record<string, unknown> | undefined;
  if (vp && Array.isArray(vp.verifiableCredential) && vp.verifiableCredential.length > 0) {
    return vp.verifiableCredential[0];
  }
  return undefined;
}
