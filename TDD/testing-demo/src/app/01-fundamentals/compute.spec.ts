import { compute } from './compute';

describe('compute', () => { // suite (group of related tests)
  it('should return 0 if input is negative', () => { // spec (a test)
    const result = compute(-1);
    expect(result).toBe(0);
  });
  it('should increment the input if it is positive', () => { // spec (a test)
    const result = compute(1);
    expect(result).toBe(2);
  });
});