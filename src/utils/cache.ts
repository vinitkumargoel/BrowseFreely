import { LRUCache } from 'lru-cache';

interface CacheEntry {
  buffer: ArrayBuffer;
  contentType: string;
}

// 50MB max cache size for assets
export const assetCache = new LRUCache<string, CacheEntry>({
  maxSize: 50 * 1024 * 1024,
  sizeCalculation: (value) => value.buffer.byteLength,
  ttl: 1000 * 60 * 60, // 1 hour
});
