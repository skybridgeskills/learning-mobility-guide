/**
 * Exchange client for VCALM exchange flows.
 * Matches the interface from dcc-transaction-service for future compatibility.
 */

export type ExchangeState = "pending" | "active" | "complete" | "invalid";

export interface ExchangeStatusResponse {
  state: ExchangeState;
  [key: string]: unknown;
}

export interface ExchangeProtocols {
  iu: string;
  vcapi: string;
  [key: string]: unknown;
}

export interface ExchangeClient {
  createExchange(
    workflowId: string,
    variables: Record<string, unknown>,
  ): Promise<ExchangeProtocols>;
  fetchProtocols(exchangeId: string): Promise<Record<string, string>>;
  fetchExchangeStatus(vcapiUrl: string): Promise<ExchangeStatusResponse>;
}

export class HttpExchangeClient implements ExchangeClient {
  private readonly baseUrl: string;
  private readonly authToken: string | undefined;

  constructor(baseUrl = "", authToken?: string) {
    this.baseUrl = baseUrl.replace(/\/$/, "");
    this.authToken = authToken;
  }

  private buildHeaders(
    extra: Record<string, string> = {},
  ): Record<string, string> {
    const headers: Record<string, string> = { ...extra };
    if (this.authToken) {
      headers["Authorization"] = `Bearer ${this.authToken}`;
    }
    return headers;
  }

  private fetchOptions(headers: Record<string, string>): RequestInit {
    const opts: RequestInit = { headers };
    if (!this.authToken) {
      opts.credentials = "include";
    }
    return opts;
  }

  async createExchange(
    workflowId: string,
    variables: Record<string, unknown>,
  ): Promise<ExchangeProtocols> {
    const url = `${this.baseUrl}/workflows/${workflowId}/exchanges`;
    const headers = this.buildHeaders({ "Content-Type": "application/json" });
    const res = await fetch(url, {
      method: "POST",
      ...this.fetchOptions(headers),
      body: JSON.stringify({ variables }),
    });
    if (!res.ok) {
      const text = await res.text().catch(() => "");
      throw new Error(`HTTP ${res.status}${text ? `: ${text}` : ""}`);
    }
    return res.json();
  }

  async fetchProtocols(exchangeId: string): Promise<Record<string, string>> {
    // TODO: this interactions URL pattern is not locked. We may need to be
    // provided an interaction URL directly rather than just an exchange ID.
    const url = `${this.baseUrl}/interactions/${exchangeId}?iuv=1`;
    const headers = this.buildHeaders({ Accept: "application/json" });
    const res = await fetch(url, this.fetchOptions(headers));
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = (await res.json()) as { protocols?: Record<string, unknown> };
    const protoMap: Record<string, string> = {};
    for (const [k, v] of Object.entries(data.protocols ?? {})) {
      if (typeof v === "string") protoMap[k] = v;
    }
    return protoMap;
  }

  async fetchExchangeStatus(vcapiUrl: string): Promise<ExchangeStatusResponse> {
    const headers = this.buildHeaders({ Accept: "application/json" });
    const res = await fetch(vcapiUrl, this.fetchOptions(headers));
    if (!res.ok) throw new Error(`Status ${res.status}`);
    return res.json();
  }
}
