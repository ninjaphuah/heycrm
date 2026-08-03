/**
 * HeyCRM product branding.
 *
 * Resolution order for the display name:
 * 1. Runtime client-config (PRODUCT_NAME from server env)
 * 2. window._env_.PRODUCT_NAME (docker-injected)
 * 3. import.meta.env.VITE_PRODUCT_NAME (build-time)
 * 4. Default "HeyCRM"
 */

export const DEFAULT_PRODUCT_NAME = 'HeyCRM';

export const DEFAULT_PRODUCT_LOGO_PATH = '/images/heycrm/logo.svg';

type EnvBag = {
  PRODUCT_NAME?: string;
  PRODUCT_LOGO_URL?: string;
  PRODUCT_FAVICON_URL?: string;
};

declare global {
  interface Window {
    _env_?: EnvBag;
  }
}

const readWindowEnv = (key: keyof EnvBag): string | undefined => {
  if (typeof window === 'undefined') {
    return undefined;
  }
  const value = window._env_?.[key];
  return typeof value === 'string' && value.trim().length > 0
    ? value.trim()
    : undefined;
};

const readViteEnv = (key: string): string | undefined => {
  try {
    const env = import.meta.env as Record<string, string | undefined>;
    const value = env[key];
    return typeof value === 'string' && value.trim().length > 0
      ? value.trim()
      : undefined;
  } catch {
    return undefined;
  }
};

export type ProductBranding = {
  productName: string;
  productLogoUrl: string;
  productFaviconUrl?: string;
};

export const getDefaultProductBranding = (): ProductBranding => ({
  productName:
    readWindowEnv('PRODUCT_NAME') ??
    readViteEnv('VITE_PRODUCT_NAME') ??
    DEFAULT_PRODUCT_NAME,
  productLogoUrl:
    readWindowEnv('PRODUCT_LOGO_URL') ??
    readViteEnv('VITE_PRODUCT_LOGO_URL') ??
    DEFAULT_PRODUCT_LOGO_PATH,
  productFaviconUrl:
    readWindowEnv('PRODUCT_FAVICON_URL') ??
    readViteEnv('VITE_PRODUCT_FAVICON_URL'),
});

export const getProductName = (
  clientConfigProductName?: string | null,
): string => {
  if (
    typeof clientConfigProductName === 'string' &&
    clientConfigProductName.trim().length > 0
  ) {
    return clientConfigProductName.trim();
  }
  return getDefaultProductBranding().productName;
};

export const getProductLogoUrl = (
  clientConfigProductLogoUrl?: string | null,
): string => {
  if (
    typeof clientConfigProductLogoUrl === 'string' &&
    clientConfigProductLogoUrl.trim().length > 0
  ) {
    return clientConfigProductLogoUrl.trim();
  }
  return getDefaultProductBranding().productLogoUrl;
};
