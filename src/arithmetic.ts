function normalize(num: string, zeroCount: number): [number, number] {
  const dp = (num.split('.'))[1]?.length ?? 0;
  return [parseInt(num.split('.').join('') + '0'.repeat(zeroCount)), dp];
}

function insertCol(sq: string[][], symbol: string, colIndex: number): void {
  for (let i = 0; i < sq.length; i++) {
    sq[i].splice(colIndex, 0, symbol);
  }
}

export function division(dividend: string, divisor: string): string {
  if (isNaN(parseFloat(dividend))) {
    throw new Error('"dividend" must be a number');
  }
  if (isNaN(parseFloat(divisor))) {
    throw new Error('"divisor" must be a number');
  }
  const dividendDecPartLen = (dividend.split('.'))[1]?.length ?? 0;
  const divisorDecPartLen = (divisor.split('.'))[1]?.length ?? 0;
  const a0Pad = dividendDecPartLen > divisorDecPartLen ? 0 : divisorDecPartLen - dividendDecPartLen;
  const b0Pad = divisorDecPartLen > dividendDecPartLen ? 0 : dividendDecPartLen - divisorDecPartLen;
  const [a, aDp] = normalize(dividend, a0Pad);
  const [b, bDp] = normalize(divisor, b0Pad);
  const normalizedDividend = a.toString();
  const normalizedDivisor = b.toString();
  // console.log({ a, a0Pad, aDp, b, b0Pad, bDp });
  if (!Number.isInteger(a) || a <= 0) {
    throw new Error('"dividend" must be a non-negative integer');
  }
  if (!Number.isInteger(b) || b <= 0) {
    throw new Error('"divisor" must be a non-negative integer');
  }
  if (a < b) {
    throw new Error('"dividend" must be at least as large as "divisor"');
  }
  const quot = parseInt((a / b).toString());
  const rem = a % b;
  const an = normalizedDividend.length;
  const bn = normalizedDivisor.length;
  const qx = quot.toString();
  const qn = qx.length;
  const prefix = '|'.padStart(bn + 1);
  const prefixL = '('.padStart(bn + 1);
  const put = (num: number, space: number, underline = false) => ((underline ? prefixL : prefix) + (num.toString() + ' '.repeat(space)).padStart(an)).split('');
  let sq: string[][] = [[], []];
  sq[0] = (prefix + qx.padStart(an)).split('');
  sq[1] = (normalizedDivisor + ')' + normalizedDividend).split('');
  let prod = b * parseInt(qx[0]);
  let prev = parseInt(normalizedDividend.substring(0, an - qn + 1));
  sq.push(put(prod, qn - 1, true));
  for (let i = 1; i < qn; i++) {
    // console.log({ prev, prod });
    const qi = parseInt(qx[i]);
    const ai = parseInt(normalizedDividend[an - qn + i]);
    prev = 10 * (prev - prod) + ai;
    prod = b * qi;
    sq.push(put(prev, qn - 1 - i));
    sq.push(put(prod, qn - 1 - i, true));
  }
  if (rem !== 0) {
    sq.push(put(rem, 0));
  }
  // console.log('Before');
  // console.table(sq);
  const bPos = bn - bDp - b0Pad;
  if (bPos > 0) {
    insertCol(sq, '.', bPos);
  } else {
    for (let i = bPos; i < 0; i++) {
      insertCol(sq, 'z', 0);
    }
    insertCol(sq, '.', 0);
    insertCol(sq, 'z', 0);
  }
  const aPos = 1 + sq[1].indexOf(')') + an - aDp - a0Pad;
  if (aPos > 1 + sq[1].indexOf(')')) {
    insertCol(sq, '.', aPos);
  } else {
    for (let i = bPos; i < 0; i++) {
      insertCol(sq, 'z', 0);
    }
    insertCol(sq, '.', 0);
    insertCol(sq, 'z', 0);
  }
  // console.log('After');
  // console.table(sq);
  const separatorPos = sq[1].indexOf(')');
  // console.log({ separatorPos });
  return sq.map((row, i) => {
    const type = row[separatorPos];
    let s = '';
    let digitPos = -1;
    if (type === '(') {
      let j = separatorPos + 1;
      while ([' ', 'z', '.'].includes(sq[i - 1][j])) {
        j += 1;
      }
      digitPos = j;
    }
    for (const [j, c] of row.entries()) {
      switch (c) {
        case '|':
        case '(':
          s += '\\phantom{)}';
          break;
        case ')':
          s += ')\\overline{';
          break;
        case '.':
          s += i === 1 ? '.' : '\\phantom{.}';
          break;
        case 'z':
          s += i === 1 ? '0' : '\\phantom{0}';
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

export function multiplication(n1: string, n2: string): string {
  if (isNaN(parseFloat(n1))) {
    throw new Error('"n1" must be a number');
  }
  if (isNaN(parseFloat(n2))) {
    throw new Error('"n2" must be a number');
  }
  const a = parseInt(n1.split('.').join(''));
  const b = parseInt(n2.split('.').join(''));
  const op1 = a.toString();
  const op2 = b.toString();
  console.log({a, b});
  if (!Number.isInteger(a) || b < 0) {
    throw new Error('"a" must be a non-negative integer');
  }
  if (!Number.isInteger(b) || b < 0) {
    throw new Error('"b" must be a non-negative integer');
  }
  const an = op1.length;
  const bn = op2.length;
  const n1DecLen = n1.split('.')[1]?.length ?? 0;
  const n2DecLen = n2.split('.')[1]?.length ?? 0;
  const px = (a * b).toString();
  const pn = px.length;
  const pxDecLen = n1DecLen + n2DecLen;
  const dpPadTotal = new Set([n1DecLen, n2DecLen, pxDecLen]).size;
  const dpPos = Array.from(new Set([n1DecLen, n2DecLen, pxDecLen]));
  dpPos.sort();
  const len = dpPadTotal + 1 + Math.max(an, bn, pn);
  const lines = [];
  for (let i = -2; i <= bn; i++) {
    let l: string;
    const p = Math.pow(10, bn - i - 1) * parseInt(op2[i]) * a;
    if (i === -2) {
      l = op1.padStart(len);
    } else if (i === -1) {
      l = 'x' + op2.padStart(len);
    } else if (i === bn - 1) {
      l = '+' + p.toString().padStart(len - 1);
    } else if (i === bn) {
      l = px.padStart(len);
    } else {
      l = p.toString().padStart(len);
    }
    const ls = l.split('');
    for (const pos of dpPos) {
      ls.splice(l.length - pos, 0, '.');
    }
    l = ls.join('');
    if (i === -2 || i === -1 || i === bn || bn > 1) {
      lines.push(l);
    }
  }
  return lines.map((row, index) => {
    let s = '';
    if (row[0] === 'x') {
      s += '\\underline{\\times';
    } else if (row[0] === '+') {
      s += '\\underline{\\phantom{\\times}';
    } else {
      s += '\\phantom{\\times}';
    }
    for (let i = 1; i < row.length; i++) {
      const c = row[i];
      switch (c) {
        case ' ':
          s += '\\phantom{0}';
          break;
        case '.':
          if (row[0] === 'x') {
            s += row.length - i === n2DecLen ? '.' : '\\phantom{.}';
          } else if (index === 0) {
            s += row.length - i === n1DecLen ? '.' : '\\phantom{.}';
          } else if (index === lines.length - 1) {
            s += row.length - i === pxDecLen ? '.' : '\\phantom{.}';
          } else {
            s += '\\phantom{.}';
          }
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
}

export default { division, multiplication };