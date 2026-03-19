/**
 * OB 3.0 Direct Delivery Issuer interoperability tests (scaffolded).
 * Tests issuers that deliver credentials via file download or copy-paste.
 */

import {filterByTag} from '../../../implementations/index.ts';

const tag = 'ob3-direct-delivery';
const {match} = filterByTag({property: 'issuers', tags: [tag]});

describe('OB 3.0 Direct Delivery Issuer', function () {
  (this as Mocha.Suite & {matrix: boolean; report: boolean; implemented: string[]; rowLabel: string; columnLabel: string}).matrix = true;
  (this as Mocha.Suite & {report: boolean}).report = true;
  (this as Mocha.Suite & {implemented: string[]}).implemented = [...match.keys()];
  (this as Mocha.Suite & {rowLabel: string}).rowLabel = 'Test Name';
  (this as Mocha.Suite & {columnLabel: string}).columnLabel = 'Issuer';

  for (const [name] of match) {
    describe(name, function () {
      it('MUST deliver a valid Open Badges 3.0 credential');
      it('MUST use eddsa-rdfc-2022 cryptosuite');
    });
  }
});
