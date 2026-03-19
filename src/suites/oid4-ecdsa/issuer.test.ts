/**
 * OID4-ECDSA Issuer interoperability tests (scaffolded).
 * Tests issuers implementing OID4VCI with ecdsa-rdfc-2019.
 */

import {filterByTag} from '../../../implementations/index.ts';

const tag = 'oid4-ecdsa';
const {match} = filterByTag({property: 'issuers', tags: [tag]});

describe('OID4-ECDSA Issuer', function () {
  (this as Mocha.Suite & {matrix: boolean; report: boolean; implemented: string[]; rowLabel: string; columnLabel: string}).matrix = true;
  (this as Mocha.Suite & {report: boolean}).report = true;
  (this as Mocha.Suite & {implemented: string[]}).implemented = [...match.keys()];
  (this as Mocha.Suite & {rowLabel: string}).rowLabel = 'Test Name';
  (this as Mocha.Suite & {columnLabel: string}).columnLabel = 'Issuer';

  for (const [name] of match) {
    describe(name, function () {
      it('MUST successfully issue a credential via OID4VCI');
      it('MUST use ecdsa-rdfc-2019 cryptosuite');
    });
  }
});
