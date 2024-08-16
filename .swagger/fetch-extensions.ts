
export class AuthClient {
  constructor(
    private baseApiUrl: string,
    private headers: Headers,
  ) {}

  getBaseUrl(requestedUrl?: string) {
    return requestedUrl ? requestedUrl : this.baseApiUrl;
  }

  transformHttpRequestOptions(options: RequestInit): Promise<RequestInit> {
    if (!!options?.headers) {
      this.headers?.forEach((value, key) => {
        (options.headers as any)[key] = value;
      });
    }

    return Promise.resolve(options);
  }
}

export class AccessTokenAuthClient {
  constructor(private authClient: AuthClient) {}

  getBaseUrl(defaultUrl: string, baseUrl?: string) {
    return this.authClient.getBaseUrl(baseUrl);
  }

  transformOptions(options: RequestInit): Promise<RequestInit> {
    return this.authClient.transformHttpRequestOptions(options);
  }
}
