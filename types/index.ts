export interface Chain {
  name: string;
  icon: string;
  color: string;
}

export interface Chains {
  [key: string]: Chain;
} 