function isNumeric(str) {
  if (typeof str != "string") return false // we only process strings!  
  return !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
         !isNaN(parseFloat(str)) // ...and ensure strings of whitespace fail
}

function numberParts(num) {
  let [intPart, fracPart] = (num.startsWith('.') ? '0' + num : num).split('.');
  if (!fracPart) {
    fracPart = '';
  }
  intPart = intPart.replace(/^0+$/, '');
  if (!intPart) {
    intPart = '0';
  }
  fracPart = fracPart.replace(/0+$/, '');
  return [intPart, fracPart];
}

function normalizeDivNums(aInt, aFrac, bInt, bFrac) {
  let a = 0;
  let b = 0;
  let exp = 0;
  let aNewInt = '';
  let aNewFrac = '';
  if (bFrac) {
    b = parseInt(bInt + bFrac, 10);
    exp = bFrac.length;
    if (bFrac.length > aFrac.length) {
      const pad = bFrac.length - (aFrac.length ?? 0);
      aNewInt = aInt + aFrac + '0'.repeat(pad);
      aNewFrac = '';
    } else {
      aNewInt = aInt + aFrac.substr(0, bFrac.length);
      aNewFrac = aFrac.substr(bFrac.length);
    }
  } else {
    b = parseInt(bInt, 10);
    aNewInt = aInt;
    aNewFrac = aFrac;
  }
  a = parseInt(aNewFrac ? aNewInt + aNewFrac : aNewInt, 10);
  b *= Math.pow(10, aNewFrac.length);
  exp += aNewFrac.length;
  return [a, b, Math.pow(10, exp)];
}

function addSpaces(lines) {
  return lines.map(line => line.split('').join(' '));
}

function computeLines(a, b, quot, rem) {
  const [ax, qx, rx] = [a, quot, rem].map(n => n.toString());
  const lines = [];
  lines.push(qx.padStart(ax.length));
  lines.push(ax);
  let first = parseInt(ax.substring(0, ax.length - qx.length + 1));
  for (let i = 0; i < qx.length; i++) {
    const d = parseInt(qx[i]);
    const second = d * b;
    if (i > 0) {
      lines.push((first.toString() + ' '.repeat(qx.length - 1 - i)).padStart(ax.length));
    }
    lines.push((second.toString() + ' '.repeat(qx.length - 1 - i)).padStart(ax.length));
    const nextDigit = parseInt(ax[ax.length - qx.length + 1 + i]);
    first = 10 * (first - second) + nextDigit;
  }
  lines.push(rx.padStart(ax.length));
  return lines;
}

export function division(dividend, divisor, dp) {
  if (!isNumeric(dividend)) {
    throw new Error('"dividend" must be a number');
  }
  if (!isNumeric(divisor)) {
    throw new Error('"divisor" must be a number');
  }
  if (!Number.isInteger(dp) || dp < 0) {
    throw new Error('"dp" must be a non-negative integer');
  }
  const [aInt, aFrac] = numberParts(dividend);
  const [bInt, bFrac] = numberParts(divisor);
  let [a, b, exp] = normalizeDivNums(aInt, aFrac, bInt, bFrac);
  if (a < 0) {
    throw new Error('"dividend" must be non-negative');
  }
  if (b <= 0) {
    throw new Error('"divisor" must be positive');
  }
  if (dp > 0) {
    a *= Math.pow(10, dp);
  }
  const quot = parseInt((a / b).toString());
  const rem = a % b;
  console.log({ a, b, quot, rem, exp });
  const lines = computeLines(a, b, quot, rem);
  console.log(lines);
  return '';
}

export function multiplication(n1, n2) {
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
  const answer = (s => {
    if (n1DecLen + n2DecLen === 0) {
      return s;
    }
    if (s.length > n1DecLen + n2DecLen) {
      const ls = s.split('');
      ls.splice(s.length - n1DecLen - n2DecLen, 0, '.');
      return ls.join('');
    }
    return '0.' + '0'.repeat(n1DecLen + n2DecLen - s.length) + s;
  })(px);
  const len = 2 + Math.max(an, bn, answer.length);
  const lines = [n1.padStart(len), 'x' + n2.padStart(len - 1)];
  if (bn > 1) {
    for (let i = 0; i < bn; i++) {
      const p = Math.pow(10, bn - i - 1) * parseInt(op2[i]) * a;
      if (i === bn - 1) {
        lines.push('+' + p.toString().padStart(len - 1));
      } else {
        lines.push(p.toString().padStart(len));
      }
    }
  }
  lines.push(answer.padStart(len));
  //console.log(lines);
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
}

export default { division, multiplication };