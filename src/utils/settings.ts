import { Context } from 'hono'
import { getCookie } from 'hono/cookie'

export interface UserSettings {
  userAgent: string;
  disableJs: boolean;
}

export const DEFAULT_USER_AGENT = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36';

export function getSettings(c: Context): UserSettings {
  const settingsCookie = getCookie(c, 'bf_settings');
  try {
    if (settingsCookie) {
      const parsed = JSON.parse(decodeURIComponent(settingsCookie));
      return {
        userAgent: parsed.userAgent || DEFAULT_USER_AGENT,
        disableJs: !!parsed.disableJs,
      };
    }
  } catch (e) {
    // Ignore parse error
  }
  return {
    userAgent: DEFAULT_USER_AGENT,
    disableJs: false,
  };
}
