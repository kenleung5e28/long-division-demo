const division(a: number, b: number): string => {
  if (!Number.isInteger(a) || b <= 0 || b > 999) {
    throw new Error('"a" must be an integer between 1 and 999');
  }
  if (!Number.isInteger(b) || b <= 0 || b > 99) {
    throw new Error('"b" must be an integer between 1 and 99');
  }
  if (a < b) {
    throw new Error('"a" must be at least as large as "b"');
  }
  
};

export default { division };