declare module '@digitalbazaar/vc' {
  export function issue(options: unknown): Promise<unknown>;
  export function verifyCredential(options: unknown): Promise<{verified: boolean}>;
  export function createPresentation(options?: {
    holder?: string;
    verifiableCredential?: unknown[];
  }): unknown;
  export function signPresentation(options: unknown): Promise<unknown>;
}

declare module '@digitalbazaar/data-integrity' {
  export class DataIntegrityProof {
    constructor(options: {cryptosuite?: unknown; signer?: unknown});
  }
}

declare module '@digitalbazaar/eddsa-rdfc-2022-cryptosuite' {
  export const cryptosuite: unknown;
}

declare module '@digitalbazaar/ed25519-multikey' {
  export function generate(): Promise<{
    controller: string;
    signer(): () => {sign: (args: unknown) => Promise<unknown>};
  }>;
}

declare module '@digitalbazaar/ed25519-verification-key-2020' {
  export class Ed25519VerificationKey2020 {
    static generate(): Promise<Ed25519VerificationKey2020>;
    controller: string;
  }
}

declare module '@digitalbazaar/ed25519-signature-2020' {
  import type {Ed25519VerificationKey2020} from '@digitalbazaar/ed25519-verification-key-2020';
  export class Ed25519Signature2020 {
    constructor(options: {key: Ed25519VerificationKey2020});
  }
}

declare module '@digitalcredentials/security-document-loader' {
  export function securityLoader(): {
    build(): (url: string) => Promise<{document: unknown}>;
  };
}
