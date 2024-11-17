// utils/urlValidator.ts
export const isValidTwitterUrl = (url: string): boolean => {
    try {
      const urlObj = new URL(url);
      // Check if the domain is twitter.com or x.com
      const validDomains = ['twitter.com', 'x.com'];
      const isDomainValid = validDomains.some(domain => urlObj.hostname === domain);
      
      // Check if it's a tweet URL (contains /status/)
      const isTweetPath = urlObj.pathname.includes('/status/');
      
      return isDomainValid && isTweetPath;
    } catch {
      return false;
    }
  };
  