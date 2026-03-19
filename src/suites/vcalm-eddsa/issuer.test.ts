/**
 * VCALM-EdDSA Issuer interoperability tests.
 * Tests issuers implementing the VCALM Exchanges protocol with eddsa-rdfc-2022.
 */

import {expect} from 'chai';
import {filterByTag} from '../../../implementations/index.ts';
import {HttpExchangeClient} from '../../lib/exchange.ts';
import {runIssuerFlow, validateIssuedCredential} from '../../lib/profiles/vcalm-eddsa.ts';
import {createBaseOb3Template} from '../../lib/credentials.ts';

const tag = 'vcalm-eddsa';
const {match} = filterByTag({property: 'issuers', tags: [tag]});

function buildExchangeVariables(endpoint: string): Record<string, unknown> {
  const vcTemplate = createBaseOb3Template('did:key:z6MkTest');
  return {
    tenantName: 'test',
    exchangeHost: endpoint,
    vc: JSON.stringify(vcTemplate),
  };
}

describe('VCALM-EdDSA Issuer', function () {
  (this as Mocha.Suite & {matrix: boolean; report: boolean; implemented: string[]; rowLabel: string; columnLabel: string}).matrix = true;
  (this as Mocha.Suite & {report: boolean}).report = true;
  (this as Mocha.Suite & {implemented: string[]}).implemented = [...match.keys()];
  (this as Mocha.Suite & {rowLabel: string}).rowLabel = 'Test Name';
  (this as Mocha.Suite & {columnLabel: string}).columnLabel = 'Issuer';

  for (const [name, implementation] of match) {
    const issuerEndpoint = (implementation.issuers as Array<{tags: Set<string>; endpoint: string; workflowId?: string}>).find(
      (i) => i.tags.has(tag)
    );
    if (!issuerEndpoint) continue;

    const baseUrl = issuerEndpoint.endpoint;
    const workflowId = issuerEndpoint.workflowId ?? 'claim';
    const client = new HttpExchangeClient(baseUrl);

    describe(name, function () {
      it('MUST successfully create an exchange', async function () {
        (this as Mocha.Context & {test: {cell: object}}).test.cell = {
          columnId: name,
          rowId: (this as Mocha.Context).test!.title,
        };
        const variables = buildExchangeVariables(baseUrl);
        const protocols = await client.createExchange(workflowId, variables);
        expect(protocols.iu || protocols.vcapi, 'Expected iu or vcapi in protocols').to.be.ok;
      });

      it('MUST return a valid interaction URL', async function () {
        (this as Mocha.Context & {test: {cell: object}}).test.cell = {
          columnId: name,
          rowId: (this as Mocha.Context).test!.title,
        };
        const variables = buildExchangeVariables(baseUrl);
        const protocols = await client.createExchange(workflowId, variables);
        const iu = protocols.iu;
        if (!iu) throw new Error('No interaction URL (iu) in protocols');
        if (!iu.startsWith('http')) throw new Error('Interaction URL must be HTTP(S)');
      });

      it('MUST accept a DID Auth presentation', async function () {
        (this as Mocha.Context & {test: {cell: object}}).test.cell = {
          columnId: name,
          rowId: (this as Mocha.Context).test!.title,
        };
        const variables = buildExchangeVariables(baseUrl);
        const result = await runIssuerFlow(client, issuerEndpoint as Parameters<typeof runIssuerFlow>[1], variables);
        if (result.error) throw new Error(result.error);
        if (!result.credential) throw new Error('Expected credential in response');
      });

      it('MUST issue a valid Verifiable Credential', async function () {
        (this as Mocha.Context & {test: {cell: object}}).test.cell = {
          columnId: name,
          rowId: (this as Mocha.Context).test!.title,
        };
        const variables = buildExchangeVariables(baseUrl);
        const result = await runIssuerFlow(client, issuerEndpoint as Parameters<typeof runIssuerFlow>[1], variables);
        if (result.error) throw new Error(result.error);
        if (!result.credential) throw new Error('Expected credential');
        const validation = await validateIssuedCredential(result.credential);
        if (!validation.valid) throw new Error(validation.errors?.join('; ') ?? 'Invalid credential');
      });

      it('Issued credential MUST conform to Open Badges 3.0', async function () {
        (this as Mocha.Context & {test: {cell: object}}).test.cell = {
          columnId: name,
          rowId: (this as Mocha.Context).test!.title,
        };
        const variables = buildExchangeVariables(baseUrl);
        const result = await runIssuerFlow(client, issuerEndpoint as Parameters<typeof runIssuerFlow>[1], variables);
        if (result.error) throw new Error(result.error);
        if (!result.credential) throw new Error('Expected credential');
        const cred = result.credential as Record<string, unknown>;
        const types = cred.type as string[] | undefined;
        if (!Array.isArray(types) || !types.includes('OpenBadgeCredential')) {
          throw new Error('Credential must have type OpenBadgeCredential');
        }
      });

      it('Issued credential MUST use eddsa-rdfc-2022 cryptosuite', async function () {
        (this as Mocha.Context & {test: {cell: object}}).test.cell = {
          columnId: name,
          rowId: (this as Mocha.Context).test!.title,
        };
        const variables = buildExchangeVariables(baseUrl);
        const result = await runIssuerFlow(client, issuerEndpoint as Parameters<typeof runIssuerFlow>[1], variables);
        if (result.error) throw new Error(result.error);
        if (!result.credential) throw new Error('Expected credential');
        const cred = result.credential as Record<string, unknown>;
        const proof = cred.proof as Record<string, unknown> | undefined;
        const cryptosuite = proof?.cryptosuite as string | undefined;
        if (cryptosuite !== 'eddsa-rdfc-2022') {
          throw new Error(`Expected cryptosuite eddsa-rdfc-2022, got ${cryptosuite ?? 'none'}`);
        }
      });
    });
  }
});
