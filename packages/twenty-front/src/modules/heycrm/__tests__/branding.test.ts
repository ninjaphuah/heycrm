import {
  DEFAULT_PRODUCT_NAME,
  getProductLogoUrl,
  getProductName,
} from '@/heycrm/branding';

describe('heycrm branding', () => {
  it('defaults product name to HeyCRM', () => {
    expect(getProductName()).toBe(DEFAULT_PRODUCT_NAME);
    expect(getProductName(null)).toBe('HeyCRM');
    expect(getProductName('')).toBe('HeyCRM');
  });

  it('prefers client-config product name when provided', () => {
    expect(getProductName('AcmeCRM')).toBe('AcmeCRM');
  });

  it('defaults logo path to HeyCRM asset', () => {
    expect(getProductLogoUrl()).toBe('/images/heycrm/logo.svg');
    expect(getProductLogoUrl('https://cdn.example/logo.png')).toBe(
      'https://cdn.example/logo.png',
    );
  });
});
