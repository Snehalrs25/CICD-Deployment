export function classifyNumber(n: number): string {
  if (n === 0) return 'zero';
  if (n > 0) {
    if (n % 2 === 0) return 'positive-even';
    return 'positive-odd';
  }

  // n < 0
  if (Math.abs(n) % 2 === 0) return 'negative-even';
  return 'negative-odd';
}

export function labelMatcher(s: string | null | undefined): string {
  if (!s) return 'empty';
  const lower = s.toLowerCase();
  if (lower.includes('gender')) return 'gender';
  if (lower.includes('employment')) return 'employment';
  return 'other';
}

export function chooseOption(flag?: boolean): string {
  if (flag === true) return 'yes';
  if (flag === false) return 'no';
  return 'unknown';
}

export default { classifyNumber, labelMatcher, chooseOption };
