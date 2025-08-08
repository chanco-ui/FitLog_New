// CDNを使用してLIFFを読み込む
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

let liff: LiffInstance | null = null;

// windowオブジェクトにLIFFを追加
declare global {
  interface Window {
    liff: LiffInstance;
  }
}

const getLiff = async (): Promise<LiffInstance | null> => {
  if (typeof window === 'undefined') return null;
  
  if (!liff) {
    try {
      // CDNからLIFFを読み込む
      const script = document.createElement('script');
      script.src = 'https://static.line-scdn.net/liff/edge/2/sdk.js';
      script.async = true;
      
      await new Promise((resolve, reject) => {
        script.onload = resolve;
        script.onerror = reject;
        document.head.appendChild(script);
      });
      
      liff = window.liff;
    } catch (error) {
      console.error('Failed to load LIFF from CDN:', error);
      return null;
    }
  }
  
  return liff;
};

export const initializeLiff = async () => {
  // クライアントサイドでのみ実行
  if (typeof window === 'undefined') {
    return false;
  }

  try {
    const liffInstance = await getLiff();
    if (!liffInstance) return false;
    
    await liffInstance.init({ liffId: process.env.NEXT_PUBLIC_LINE_LIFF_ID! });
    return true;
  } catch (error) {
    console.error('LIFF initialization failed', error);
    return false;
  }
};

export const isInClient = async () => {
  if (typeof window === 'undefined') return false;
  const liffInstance = await getLiff();
  return liffInstance ? liffInstance.isInClient() : false;
};

export const isLoggedIn = async () => {
  if (typeof window === 'undefined') return false;
  const liffInstance = await getLiff();
  return liffInstance ? liffInstance.isLoggedIn() : false;
};

export const login = async () => {
  if (typeof window === 'undefined') return;
  const liffInstance = await getLiff();
  if (liffInstance) {
    liffInstance.login();
  }
};

export const logout = async () => {
  if (typeof window === 'undefined') return;
  const liffInstance = await getLiff();
  if (liffInstance) {
    liffInstance.logout();
  }
};

export const getProfile = async () => {
  if (typeof window === 'undefined') return null;
  
  try {
    const liffInstance = await getLiff();
    if (!liffInstance) return null;
    
    return await liffInstance.getProfile();
  } catch (error) {
    console.error('Failed to get profile:', error);
    return null;
  }
}; 