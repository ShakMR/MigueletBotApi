import { ResolvedStrategy } from '../types/resolved-strategy';

export interface ClientInterface {
  resolveQuery(params: any): ResolvedStrategy;
  sendAudio(url: string): void;
}
