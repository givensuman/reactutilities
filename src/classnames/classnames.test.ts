import cx from '.'

describe('cx', () => {
    it('returns an empty string for no arguments', () => {
      expect(cx()).toBe('');
    });
  
    it('returns a single class name for one string argument', () => {
      expect(cx('foo')).toBe('foo');
    });
  
    it('returns multiple space-separated class names for multiple string arguments', () => {
      expect(cx('foo', 'bar', 'baz')).toBe('foo bar baz');
    });
  
    it('ignores falsy values', () => {
      expect(cx('foo', null, undefined, '', 0, false, 'bar')).toBe('foo bar');
    });
  
    it('flattens and merges arrays of class names', () => {
      expect(cx('foo', ['bar', 'baz'], 'qux')).toBe('foo bar baz qux');
      expect(cx(['foo', ['bar', 'baz']], [['qux'], 'quux'])).toBe('foo bar baz qux quux');
    });
  
    it('includes keys of truthy values in objects as class names', () => {
      expect(cx({ foo: true, bar: false, baz: true })).toBe('foo baz');
    });
  
    it('supports nested arrays and objects', () => {
      expect(cx('foo', ['bar', ['baz', { qux: true }]], { 'quux-quuz': true })).toBe('foo bar baz qux quux-quuz');
      expect(cx([{ foo: true }, [{ bar: true }, { baz: false }]], ['qux', { quux: true }])).toBe('foo bar qux quux');
    });
  
    it('returns an empty string for no truthy values', () => {
      expect(cx(null, undefined, false, 0, '', [], {})).toBe('');
    });
  });
  