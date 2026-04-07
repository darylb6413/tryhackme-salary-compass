export interface CompensationEntry {
  p25: number;
  p50: number;
  p75: number;
  currency: string;
  currencySymbol: string;
}

export interface Country {
  code: string;
  name: string;
  currency: string;
  currencySymbol: string;
  costMultiplier: number; // relative to UK baseline
}

export interface Role {
  id: string;
  title: string;
  department: string;
  baseP25: number; // GBP baseline
  baseP50: number;
  baseP75: number;
}

export const countries: Country[] = [
  { code: "GB", name: "United Kingdom", currency: "GBP", currencySymbol: "£", costMultiplier: 1.0 },
  { code: "US", name: "United States", currency: "USD", currencySymbol: "$", costMultiplier: 1.25 },
  { code: "CA", name: "Canada", currency: "CAD", currencySymbol: "C$", costMultiplier: 1.05 },
  { code: "DE", name: "Germany", currency: "EUR", currencySymbol: "€", costMultiplier: 1.05 },
  { code: "FR", name: "France", currency: "EUR", currencySymbol: "€", costMultiplier: 0.95 },
  { code: "NL", name: "Netherlands", currency: "EUR", currencySymbol: "€", costMultiplier: 1.02 },
  { code: "IE", name: "Ireland", currency: "EUR", currencySymbol: "€", costMultiplier: 1.08 },
  { code: "ES", name: "Spain", currency: "EUR", currencySymbol: "€", costMultiplier: 0.78 },
  { code: "PT", name: "Portugal", currency: "EUR", currencySymbol: "€", costMultiplier: 0.68 },
  { code: "IT", name: "Italy", currency: "EUR", currencySymbol: "€", costMultiplier: 0.82 },
  { code: "SE", name: "Sweden", currency: "SEK", currencySymbol: "kr", costMultiplier: 1.0 },
  { code: "NO", name: "Norway", currency: "NOK", currencySymbol: "kr", costMultiplier: 1.1 },
  { code: "DK", name: "Denmark", currency: "DKK", currencySymbol: "kr", costMultiplier: 1.08 },
  { code: "FI", name: "Finland", currency: "EUR", currencySymbol: "€", costMultiplier: 0.92 },
  { code: "PL", name: "Poland", currency: "PLN", currencySymbol: "zł", costMultiplier: 0.55 },
  { code: "CZ", name: "Czech Republic", currency: "CZK", currencySymbol: "Kč", costMultiplier: 0.52 },
  { code: "RO", name: "Romania", currency: "RON", currencySymbol: "lei", costMultiplier: 0.45 },
  { code: "HU", name: "Hungary", currency: "HUF", currencySymbol: "Ft", costMultiplier: 0.48 },
  { code: "AT", name: "Austria", currency: "EUR", currencySymbol: "€", costMultiplier: 1.0 },
  { code: "CH", name: "Switzerland", currency: "CHF", currencySymbol: "CHF", costMultiplier: 1.35 },
  { code: "BE", name: "Belgium", currency: "EUR", currencySymbol: "€", costMultiplier: 0.98 },
  { code: "AU", name: "Australia", currency: "AUD", currencySymbol: "A$", costMultiplier: 1.1 },
  { code: "NZ", name: "New Zealand", currency: "NZD", currencySymbol: "NZ$", costMultiplier: 0.88 },
  { code: "SG", name: "Singapore", currency: "SGD", currencySymbol: "S$", costMultiplier: 1.15 },
  { code: "JP", name: "Japan", currency: "JPY", currencySymbol: "¥", costMultiplier: 0.85 },
  { code: "KR", name: "South Korea", currency: "KRW", currencySymbol: "₩", costMultiplier: 0.72 },
  { code: "IN", name: "India", currency: "INR", currencySymbol: "₹", costMultiplier: 0.35 },
  { code: "AE", name: "United Arab Emirates", currency: "AED", currencySymbol: "د.إ", costMultiplier: 1.05 },
  { code: "IL", name: "Israel", currency: "ILS", currencySymbol: "₪", costMultiplier: 1.1 },
  { code: "BR", name: "Brazil", currency: "BRL", currencySymbol: "R$", costMultiplier: 0.42 },
  { code: "MX", name: "Mexico", currency: "MXN", currencySymbol: "MX$", costMultiplier: 0.38 },
  { code: "ZA", name: "South Africa", currency: "ZAR", currencySymbol: "R", costMultiplier: 0.4 },
  { code: "NG", name: "Nigeria", currency: "NGN", currencySymbol: "₦", costMultiplier: 0.25 },
  { code: "KE", name: "Kenya", currency: "KES", currencySymbol: "KSh", costMultiplier: 0.28 },
  { code: "EG", name: "Egypt", currency: "EGP", currencySymbol: "E£", costMultiplier: 0.22 },
];

export const roles: Role[] = [
  // Engineering
  { id: "swe", title: "Software Engineer", department: "Engineering", baseP25: 55000, baseP50: 70000, baseP75: 88000 },
  { id: "sr-swe", title: "Senior Software Engineer", department: "Engineering", baseP25: 75000, baseP50: 92000, baseP75: 115000 },
  { id: "staff-swe", title: "Staff Engineer", department: "Engineering", baseP25: 95000, baseP50: 120000, baseP75: 150000 },
  { id: "eng-mgr", title: "Engineering Manager", department: "Engineering", baseP25: 85000, baseP50: 105000, baseP75: 130000 },
  { id: "ai-eng", title: "AI Engineer", department: "Engineering", baseP25: 70000, baseP50: 90000, baseP75: 115000 },
  { id: "devops", title: "DevOps / Platform Engineer", department: "Engineering", baseP25: 60000, baseP50: 78000, baseP75: 98000 },
  { id: "qa", title: "QA Engineer", department: "Engineering", baseP25: 42000, baseP50: 55000, baseP75: 70000 },
  // Cyber Security / Content
  { id: "sec-content", title: "Cyber Security Content Engineer", department: "Content Engineering", baseP25: 50000, baseP50: 65000, baseP75: 82000 },
  { id: "sr-sec-content", title: "Sr. Cyber Security Content Engineer", department: "Content Engineering", baseP25: 65000, baseP50: 82000, baseP75: 100000 },
  { id: "content-mgr", title: "Content Engineering Manager", department: "Content Engineering", baseP25: 75000, baseP50: 92000, baseP75: 112000 },
  // Data
  { id: "data-analyst", title: "Data Analyst", department: "Data & Innovation", baseP25: 40000, baseP50: 52000, baseP75: 68000 },
  { id: "data-eng", title: "Data Engineer", department: "Data & Innovation", baseP25: 55000, baseP50: 72000, baseP75: 90000 },
  { id: "data-sci", title: "Data Scientist", department: "Data & Innovation", baseP25: 58000, baseP50: 75000, baseP75: 95000 },
  // Product & Design
  { id: "pm", title: "Product Manager", department: "Product", baseP25: 60000, baseP50: 78000, baseP75: 98000 },
  { id: "sr-pm", title: "Senior Product Manager", department: "Product", baseP25: 78000, baseP50: 95000, baseP75: 118000 },
  { id: "designer", title: "Product Designer", department: "Design", baseP25: 48000, baseP50: 62000, baseP75: 78000 },
  { id: "sr-designer", title: "Senior Product Designer", department: "Design", baseP25: 62000, baseP50: 78000, baseP75: 95000 },
  // Marketing
  { id: "growth", title: "Growth Marketer", department: "Marketing", baseP25: 42000, baseP50: 55000, baseP75: 72000 },
  { id: "content-mktg", title: "Content Marketer", department: "Marketing", baseP25: 35000, baseP50: 45000, baseP75: 58000 },
  { id: "mktg-mgr", title: "Marketing Manager", department: "Marketing", baseP25: 55000, baseP50: 70000, baseP75: 88000 },
  // Sales
  { id: "ae", title: "Account Executive", department: "Sales", baseP25: 45000, baseP50: 58000, baseP75: 75000 },
  { id: "am", title: "Account Manager", department: "Sales", baseP25: 42000, baseP50: 55000, baseP75: 70000 },
  { id: "sales-mgr", title: "Sales Manager", department: "Sales", baseP25: 60000, baseP50: 78000, baseP75: 98000 },
  // People & Operations
  { id: "recruiter", title: "Recruiter", department: "People", baseP25: 35000, baseP50: 45000, baseP75: 58000 },
  { id: "people-mgr", title: "People Manager", department: "People", baseP25: 52000, baseP50: 65000, baseP75: 82000 },
  { id: "ops-mgr", title: "Operations Manager", department: "Operations", baseP25: 48000, baseP50: 60000, baseP75: 75000 },
  // Finance
  { id: "finance-mgr", title: "Finance Manager", department: "Finance", baseP25: 55000, baseP50: 70000, baseP75: 88000 },
  { id: "fp-analyst", title: "FP&A Analyst", department: "Finance", baseP25: 42000, baseP50: 55000, baseP75: 70000 },
  // Customer Success
  { id: "cs", title: "Customer Success Manager", department: "Customer Success", baseP25: 38000, baseP50: 48000, baseP75: 62000 },
  { id: "support", title: "Technical Support Engineer", department: "Customer Success", baseP25: 32000, baseP50: 42000, baseP75: 55000 },
];

// Exchange rates from GBP (approximate)
const exchangeRates: Record<string, number> = {
  GBP: 1,
  USD: 1.27,
  EUR: 1.17,
  CAD: 1.72,
  AUD: 1.93,
  NZD: 2.1,
  SEK: 13.2,
  NOK: 13.5,
  DKK: 8.7,
  CHF: 1.12,
  PLN: 5.1,
  CZK: 29.0,
  RON: 5.8,
  HUF: 460,
  SGD: 1.7,
  JPY: 192,
  KRW: 1700,
  INR: 106,
  AED: 4.67,
  ILS: 4.7,
  BRL: 6.4,
  MXN: 21.8,
  ZAR: 23.5,
  NGN: 1950,
  KES: 165,
  EGP: 62,
};

export function getCompensation(role: Role, country: Country): CompensationEntry {
  const rate = exchangeRates[country.currency] || 1;
  const mult = country.costMultiplier;

  const round = (v: number) => {
    const converted = v * mult * rate;
    if (converted > 100000) return Math.round(converted / 1000) * 1000;
    if (converted > 10000) return Math.round(converted / 500) * 500;
    return Math.round(converted / 100) * 100;
  };

  return {
    p25: round(role.baseP25),
    p50: round(role.baseP50),
    p75: round(role.baseP75),
    currency: country.currency,
    currencySymbol: country.currencySymbol,
  };
}

export function formatSalary(amount: number, symbol: string): string {
  return `${symbol}${amount.toLocaleString()}`;
}

export const departments = [...new Set(roles.map((r) => r.department))];
