export const DEFAULT_PRODUCT_NAME = 'HeyCRM';

export const getProductName = (productName?: string): string =>
  productName?.trim() || DEFAULT_PRODUCT_NAME;
