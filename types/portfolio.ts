export interface Position {
  ticker: string;
  name: string;
  shares: number;
  value: string;
  change: string;
  up: boolean;
}

export interface PortfolioPoint {
  t: string;
  v: number;
}
