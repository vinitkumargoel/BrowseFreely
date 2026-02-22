import { FiltersEngine, Request } from '@ghostery/adblocker'

let engine: FiltersEngine | null = null;

// Initialize the adblocker asynchronously
export async function getAdblocker() {
  if (!engine) {
    console.log('[ADBLOCK] Downloading blocklists...');
    try {
      // Using fetch with prebuilt ads and tracking list
      engine = await FiltersEngine.fromPrebuiltAdsAndTracking(fetch);
      console.log('[ADBLOCK] Blocklists loaded and engine ready');
    } catch (e) {
      console.error('[ADBLOCK] Failed to load from prebuilt, falling back to empty engine', e);
      engine = FiltersEngine.empty();
    }
  }
  return engine;
}

export function isAd(url: string, sourceUrl: string): boolean {
  if (!engine) return false;
  
  try {
    const req = Request.fromRawDetails({
      url: url,
      sourceUrl: sourceUrl,
      type: "script" // Default guess to match most things, or could be empty
    });
    const result = engine.match(req);
    return result.match;
  } catch (e) {
    return false;
  }
}
