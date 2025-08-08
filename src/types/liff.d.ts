declare module 'liff' {
  export interface LiffProfile {
    userId: string;
    displayName: string;
    pictureUrl?: string;
    statusMessage?: string;
  }

  export interface LiffInitConfig {
    liffId: string;
  }

  export interface LiffInstance {
    init(config: LiffInitConfig): Promise<void>;
    isInClient(): boolean;
    isLoggedIn(): boolean;
    login(): void;
    logout(): void;
    getProfile(): Promise<LiffProfile>;
  }

  const liff: LiffInstance;
  export default liff;
}

interface LiffInstance {
  init(config: { liffId: string }): Promise<void>;
  isInClient(): boolean;
  isLoggedIn(): boolean;
  login(): void;
  logout(): void;
  getProfile(): Promise<{
    userId: string;
    displayName: string;
    pictureUrl?: string;
    statusMessage?: string;
  }>;
}

declare global {
  interface Window {
    liff: LiffInstance;
  }
} 