export enum Operator {
  Semicolon,
  Ampersand,
  And,
  Or
}

const mapping: { [key: string]: Operator } = {
  "&&": Operator.And,
  "||": Operator.Or,
  ";": Operator.Semicolon,
  "&": Operator.Ampersand
};

export function toOperator(type: string): Operator | undefined {
  return mapping[type];
}

export function listOperators() {
  return Object.keys(mapping);
}
