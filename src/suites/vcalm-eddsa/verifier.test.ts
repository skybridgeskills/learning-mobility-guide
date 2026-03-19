/**
 * VCALM-EdDSA Verifier interoperability tests.
 * Tests verifiers implementing the VCALM Exchanges protocol with eddsa-rdfc-2022.
 */

import {filterByTag} from '../../../implementations/index.ts';
import {HttpExchangeClient} from '../../lib/exchange.ts';
import {runVerifierFlow} from '../../lib/profiles/vcalm-eddsa.ts';
import {generateOb3Credential} from '../../lib/credentials.ts';

const tag = 'vcalm-eddsa';
const {match} = filterByTag({property: 'verifiers', tags: [tag]});

const VC_CONTEXT = 'https://www.w3.org/ns/credentials/v2';
const OB_CONTEXT = 'https://purl.imsglobal.org/spec/ob/v3p0/context-3.0.3.jsonld';

function buildVerifierVariables(baseUrl: string): Record<string, unknown> {
  return {
    tenantName: 'test',
    exchangeHost: baseUrl,
    vprContext: [VC_CONTEXT, OB_CONTEXT],
    vprCredentialType: ['VerifiableCredential', 'OpenBadgeCredential'],
  };
}

describe('VCALM-EdDSA Verifier', function () {
  (this as Mocha.Suite & {matrix: boolean; report: boolean; implemented: string[]; rowLabel: string; columnLabel: string}).matrix = true;
  (this as Mocha.Suite & {report: boolean}).report = true;
  (this as Mocha.Suite & {implemented: string[]}).implemented = [...match.keys()];
  (this as Mocha.Suite & {rowLabel: string}).rowLabel = 'Test Name';
  (this as Mocha.Suite & {columnLabel: string}).columnLabel = 'Verifier';

  for (const [name, implementation] of match) {
    const verifierEndpoint = (implementation.verifiers as Array<{tags: Set<string>; endpoint: string; workflowId?: string}>).find(
      (v) => v.tags.has(tag)
    );
    if (!verifierEndpoint) continue;

    const baseUrl = verifierEndpoint.endpoint;
    const workflowId = verifierEndpoint.workflowId ?? 'verify';
    const client = new HttpExchangeClient(baseUrl);

    describe(name, function () {
      it('MUST successfully create a verification exchange', async function () {
        (this as Mocha.Context & {test: {cell: object}}).test.cell = {
          columnId: name,
          rowId: (this as Mocha.Context).test!.title,
        };
        const variables = buildVerifierVariables(baseUrl);
        const protocols = await client.createExchange(workflowId, variables);
        if (!protocols.iu && !protocols.vcapi) throw new Error('Expected iu or vcapi in protocols');
      });

      it('MUST accept a valid Verifiable Presentation', async function () {
        (this as Mocha.Context & {test: {cell: object}}).test.cell = {
          columnId: name,
          rowId: (this as Mocha.Context).test!.title,
        };
        const credential = await generateOb3Credential({});
        const variables = buildVerifierVariables(baseUrl);
        const result = await runVerifierFlow(
          client,
          verifierEndpoint as Parameters<typeof runVerifierFlow>[1],
          variables,
          credential
        );
        if (result.error) throw new Error(result.error);
        if (!result.accepted) throw new Error('Expected presentation to be accepted');
      });

      it('MUST correctly verify a valid credential', async function () {
        (this as Mocha.Context & {test: {cell: object}}).test.cell = {
          columnId: name,
          rowId: (this as Mocha.Context).test!.title,
        };
        const credential = await generateOb3Credential({});
        const variables = buildVerifierVariables(baseUrl);
        const result = await runVerifierFlow(
          client,
          verifierEndpoint as Parameters<typeof runVerifierFlow>[1],
          variables,
          credential
        );
        if (result.error) throw new Error(result.error);
        if (!result.accepted) throw new Error('Verifier should accept valid credential');
      });

      it('SHOULD reject an invalid credential', async function () {
        (this as Mocha.Context & {test: {cell: object}}).test.cell = {
          columnId: name,
          rowId: (this as Mocha.Context).test!.title,
        };
        const invalidCredential = {type: ['VerifiableCredential'], issuer: 'did:example:invalid'};
        const variables = buildVerifierVariables(baseUrl);
        const result = await runVerifierFlow(
          client,
          verifierEndpoint as Parameters<typeof runVerifierFlow>[1],
          variables,
          invalidCredential
        );
        if (result.accepted) throw new Error('Verifier should reject invalid credential');
      });
    });
  }
});
