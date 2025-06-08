
// lib/tokenStore.ts - Shared token store
const tokenStore: Record<string, { email: string; createdAt: number }> = {};

export function saveToken(token: string, email: string) {
  tokenStore[token] = { 
    email, 
    createdAt: Date.now() 
  };
}

export function getEmailByToken(token: string): string | undefined {
  const tokenData = tokenStore[token];
  if (!tokenData) return undefined;
  
  // Optional: Check if token is expired (e.g., 24 hours)
  const isExpired = Date.now() - tokenData.createdAt > 24 * 60 * 60 * 1000;
  if (isExpired) {
    delete tokenStore[token];
    return undefined;
  }
  
  return tokenData.email;
}

export function deleteToken(token: string) {
  delete tokenStore[token];
}