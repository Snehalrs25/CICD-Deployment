import { classifyNumber, labelMatcher, chooseOption } from './branch-helper';

describe('branch-helper', () => {
  describe('classifyNumber', () => {
    it('classifies zero', () => expect(classifyNumber(0)).toBe('zero'));
    it('classifies positive even', () => expect(classifyNumber(4)).toBe('positive-even'));
    it('classifies positive odd', () => expect(classifyNumber(3)).toBe('positive-odd'));
    it('classifies negative even', () => expect(classifyNumber(-2)).toBe('negative-even'));
    it('classifies negative odd', () => expect(classifyNumber(-3)).toBe('negative-odd'));
  });

  describe('labelMatcher', () => {
    it('handles empty', () => expect(labelMatcher('')).toBe('empty'));
    it('matches gender', () => expect(labelMatcher('User Gender Info')).toBe('gender'));
    it('matches employment', () => expect(labelMatcher('Employment Type List')).toBe('employment'));
    it('returns other otherwise', () => expect(labelMatcher('Something else')).toBe('other'));
  });

  describe('chooseOption', () => {
    it('returns yes for true', () => expect(chooseOption(true)).toBe('yes'));
    it('returns no for false', () => expect(chooseOption(false)).toBe('no'));
    it('returns unknown for undefined', () => expect(chooseOption(undefined)).toBe('unknown'));
  });
});
