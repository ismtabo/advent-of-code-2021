export interface Rule {
  source: string;
  target: string;
}

export interface Input {
  protein: string;
  rules: Rule[];
}
