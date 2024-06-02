export const isProd = process.env.NODE_ENV === 'production';
export const isLocal = process.env.NODE_ENV === 'development';

export const showLogger = isLocal
  ? true
  : process.env.NEXT_PUBLIC_SHOW_LOGGER === 'true' ?? false;

export const BASE_API_URL = process.env.NEXT_PUBLIC_BASE_API_URL || 'https://localhost:5000';
export const FACEBOOK_APP_ID = process.env.NEXT_PUBLIC_FB_SDK_APP_ID || '';
export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_TRACKING_ID || '';
export const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'