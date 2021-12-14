export interface Rule {
  source: string;
  target: string;
}

export interface Input {
  polymers: string;
  rules: Rule[];
}
