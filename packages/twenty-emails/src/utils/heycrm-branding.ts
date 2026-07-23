/**
 * Server/email-side product branding for HeyCRM.
 * Prefer PRODUCT_NAME from the process environment (set in Docker / server).
 */

export const DEFAULT_PRODUCT_NAME = 'HeyCRM';

export const getEmailProductName = (): string => {
  const fromEnv = process.env.PRODUCT_NAME?.trim();
  return fromEnv && fromEnv.length > 0 ? fromEnv : DEFAULT_PRODUCT_NAME;
};

export const getEmailProductLogoUrl = (): string | undefined => {
  const fromEnv = process.env.PRODUCT_LOGO_URL?.trim();
  return fromEnv && fromEnv.length > 0 ? fromEnv : undefined;
};
