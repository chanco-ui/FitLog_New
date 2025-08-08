declare module 'liff' {
  interface LiffProfile {
    userId: string;
    displayName: string;
    pictureUrl?: string;
    statusMessage?: string;
  }

  interface LiffInitConfig {
    liffId: string;
  }

  interface Liff {
    init(config: LiffInitConfig): Promise<void>;
    isInClient(): boolean;
    isLoggedIn(): boolean;
    login(): void;
    logout(): void;
    getProfile(): Promise<LiffProfile>;
  }

  const liff: Liff;
  export default liff;
} 