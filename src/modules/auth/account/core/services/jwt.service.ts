export interface JwtService {
  createShortLiveToken(email: string, id: string, type: string): Promise<string>;
  createLongLiveToken(email: string): Promise<string>;
}
