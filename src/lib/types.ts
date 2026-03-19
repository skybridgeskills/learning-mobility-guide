export interface EndpointConfig {
  id?: string;
  endpoint: string;
  tags: string[];
  /** VCALM workflow ID for exchange-based testing */
  workflowId?: string;
  /** ZCAP authorization */
  zcap?: {
    capability: string;
    keySeed: string;
  };
  /** OAuth2 scopes for this endpoint */
  scopes?: string[];
  [key: string]: unknown;
}

export interface ImplementationConfig {
  name: string;
  implementation: string;
  oauth2?: {
    clientId: string;
    clientSecret: string;
    tokenEndpoint: string;
    [key: string]: unknown;
  };
  issuers?: EndpointConfig[];
  verifiers?: EndpointConfig[];
  [key: string]: unknown;
}

export interface LocalConfig {
  implementations?: ImplementationConfig | ImplementationConfig[];
  settings?: {
    enableInteropTests?: boolean;
    testAllImplementations?: boolean;
  };
}

export interface FilterByTagOptions {
  implementations?: Map<string, Implementation>;
  tags?: string[];
  property?: string;
}

export interface FilterResult {
  match: Map<string, Implementation>;
  nonMatch: Map<string, Implementation>;
}

export class Endpoint {
  settings: EndpointConfig & { oauth2?: ImplementationConfig['oauth2'] };

  constructor({settings, oauth2}: {
    settings: EndpointConfig;
    oauth2?: ImplementationConfig['oauth2'];
  }) {
    this.settings = {...settings};
    if(oauth2) {
      this.settings.oauth2 = {...oauth2};
      if(Array.isArray(this.settings.scopes)) {
        this.settings.oauth2.scopes = [...this.settings.scopes];
      }
    }
  }

  get tags(): Set<string> {
    return new Set(this.settings.tags);
  }

  get endpoint(): string {
    return this.settings.endpoint;
  }

  get workflowId(): string | undefined {
    return this.settings.workflowId;
  }
}

export class Implementation {
  settings: ImplementationConfig;
  [key: string]: unknown;

  constructor(settings: ImplementationConfig) {
    this.settings = settings;
    const {oauth2} = settings;
    const skip = ['oauth2', 'name', 'implementation'];
    for(const key in settings) {
      if(skip.includes(key)) {
        continue;
      }
      const settingProperty = settings[key as keyof ImplementationConfig];
      if(!Array.isArray(settingProperty)) {
        continue;
      }
      Object.defineProperty(this, key, {
        get: () => {
          return (settingProperty as EndpointConfig[]).map(
            setting => new Endpoint({settings: setting, oauth2})
          );
        }
      });
    }
  }

  get name(): string {
    return this.settings.name;
  }
}
