export const division = (a: number, b: number): string => {
  if (!Number.isInteger(a) || b <= 0 || b > 999) {
    throw new Error('"a" must be an integer between 1 and 999');
  }
  if (!Number.isInteger(b) || b <= 0 || b > 99) {
    throw new Error('"b" must be an integer between 1 and 99');
  }
  if (a < b) {
    throw new Error('"a" must be at least as large as "b"');
  }
  const quot = parseInt((a / b).toString());
  const rem = a % b;
  const ax = a.toString();
  const an = ax.length;
  const bx = b.toString();
  const bn = bx.length;
  const qx = quot.toString();
  const qn = qx.length;
  const prefix = '|'.padStart(bn + 1);
  const prefixL = '('.padStart(bn + 1);
  const put = (num: number, space: number, underline = false) => ((underline ? prefixL: prefix) + (num.toString() + ' '.repeat(space)).padStart(an)).split('');
  let sq: string[][] = [[], []];
  sq[0] = (prefix + qx.padStart(an)).split('');
  sq[1] = (bx + ')' + ax).split('')
  let prod = b * parseInt(qx[0]);
  let prev = parseInt(ax.substr(0, prod.toString().length));
  sq.push(put(prod, qn - 1, true));
  for (let i = 1; i < qn; i++) {
    const qi = parseInt(qx[i]);
    const ai = parseInt(ax[i + bn - 1]);
    prev = 10 * (prev - prod) + ai;
    prod = b * qi;
    sq.push(put(prev, qn - 1 - i));
    sq.push(put(prod, qn - 1 - i, true));
  }
  if (rem !== 0) {
    sq.push(put(rem, 0));
  }
  return sq.map((row, i) => {
    const type = row[bn];
    let s = '';
    let digitPos = -1;
    if (type === '(') {
      let j = bn + 1;
      while (sq[i - 1][j] === ' ') {
        j += 1;
      }
      digitPos = j;
    }
    for (const [j ,c] of row.entries()) {
      switch (c) {
        case '|':
        case '(':
          s += '\\phantom{)}';
          break;
        case ')':
          s += ')\\overline{';
          break;
        case ' ':
        default:
          if (j === digitPos && type === '(') {
            s += '\\underline{';
          }
          s += c === ' ' ? '\\phantom{0}' : c;
      }
    }
    if (type === '(' || type === ')') {
      s += '}';
    }
    return s;
  }).join('\\\\\n');
}

export const multiplication = (a: number, b: number): string => {
  if (!Number.isInteger(a) || b < 0) {
    throw new Error('"a" must be a non-negative integer');
  }
  if (!Number.isInteger(b) || b < 0) {
    throw new Error('"b" must be a non-negative integer');
  }
  const ax = a.toString();
  const an = ax.length;
  const bx = b.toString();
  const bn = bx.length;
  const px = (a * b).toString();
  const len = 1 + Math.max(an, bn, px.length);
  const lines = [ax.padStart(len), 'x' + bx.padStart(len - 1)];
  if (bn > 1) {
    for (let i = 0; i < bn; i++) {
      const p = Math.pow(10, bn - i - 1) * parseInt(bx[i]) * a;
      if (i === bn - 1) {
        lines.push('+' + p.toString().padStart(len - 1));
      } else {
        lines.push(p.toString().padStart(len));
      }
    }
  }
  lines.push(px.padStart(len));
  return lines.map(row => {
    let s = '';
    if (row[0] === 'x') {
      s += '\\underline{\\times';
    } else if (row[0] === '+') {
      s += '\\underline{\\phantom{\\times}';
    } else {
      s += '\\phantom{\\times}';
    }
    for (const c of row.substring(1)) {
      switch (c) {
        case ' ':
          s += '\\phantom{0}';
          break;
        default:
          s += c;
      }
    }
    if (row[0] === '+' || row[0] === 'x') {
      s += '}';
    }
    return s;
  }).join('\\\\\n');
};

export default { division, multiplication };