const LruMapCache = require('../src/index');

describe('LruMapCache', () => {
  it('should be a class', () => {
    expect(typeof LruMapCache).toBe('function');
  });

  it('should have a constructor', () => {
    expect(LruMapCache.prototype.constructor).toBeDefined();
  });

  it('should have a get method', () => {
    expect(LruMapCache.prototype.get).toBeDefined();
  });

  it('should have a set method', () => {
    expect(LruMapCache.prototype.set).toBeDefined();
  });

  it('should have a delete method', () => {
    expect(LruMapCache.prototype.delete).toBeDefined();
  });

  it('should have a clear method', () => {
    expect(LruMapCache.prototype.clear).toBeDefined();
  });

  it('should have a size method', () => {
    expect(LruMapCache.prototype.size).toBeDefined();
  });

  it('should have a keys method', () => {
    expect(LruMapCache.prototype.keys).toBeDefined();
  });

  it('should have a values method', () => {
    expect(LruMapCache.prototype.values).toBeDefined();
  });

  describe('constructor', () => {
    it('should set the capacity', () => {
      const cache = new LruMapCache(10);
      expect(cache.capacity).toBe(10);
    });
  });

  describe('get', () => {
    it('should return null if the key is not in the cache', () => {
      const cache = new LruMapCache(10);
      expect(cache.get('foo')).toBe(null);
    });

    it('should return the value if the key is in the cache', () => {
      const cache = new LruMapCache(10);
      cache.set('foo', 'bar');
      expect(cache.get('foo')).toBe('bar');
    });

    it('should move the key to the end of the cache', () => {
      const cache = new LruMapCache(10);
      cache.set('foo', 'bar');
      cache.set('baz', 'qux');
      cache.get('foo');
      expect(cache.keys().next().value).toBe('baz');
    });
  });

  describe('set', () => {
    it('should add the key to the cache', () => {
      const cache = new LruMapCache(10);
      cache.set('foo', 'bar');
      expect(cache.get('foo')).toBe('bar');
    });

    it('should update the value if the key is already in the cache', () => {
      const cache = new LruMapCache(10);
      cache.set('foo', 'bar');
      cache.set('foo', 'baz');
      expect(cache.get('foo')).toBe('baz');
    });

    it('should remove the least recently used key if the cache is full', () => {
      const cache = new LruMapCache(2);
      cache.set('foo', 'bar');
      cache.set('baz', 'qux');
      cache.set('quux', 'corge');
      expect(cache.get('foo')).toBe(null);
    });
  });

  describe('delete', () => {
    it('should remove the key from the cache', () => {
      const cache = new LruMapCache(10);
      cache.set('foo', 'bar');
      cache.delete('foo');
      expect(cache.get('foo')).toBe(null);
    });
  });

  describe('clear', () => {
    it('should remove all keys from the cache', () => {
      const cache = new LruMapCache(10);
      cache.set('foo', 'bar');
      cache.set('baz', 'qux');
      cache.clear();
      expect(cache.get('foo')).toBe(null);
      expect(cache.get('baz')).toBe(null);
    });
  });

  describe('size', () => {
    it('should return the number of keys in the cache', () => {
      const cache = new LruMapCache(10);
      cache.set('foo', 'bar');
      cache.set('baz', 'qux');
      expect(cache.size()).toBe(2);
    });
  });

  describe('capacity', () => {
    it('should return the capacity of the cache', () => {
      const cache = new LruMapCache(10);
      expect(cache.capacity).toBe(10);
    });
  });

  describe('has', () => {
    it('should return true if the key is in the cache', () => {
      const cache = new LruMapCache(10);
      cache.set('foo', 'bar');
      expect(cache.has('foo')).toBe(true);
    });

    it('should return false if the key is not in the cache', () => {
      const cache = new LruMapCache(10);
      expect(cache.has('foo')).toBe(false);
    });
  });

  describe('keys', () => {
    it('should return an iterator of keys in the cache', () => {
      const cache = new LruMapCache(10);
      cache.set('foo', 'bar');
      cache.set('baz', 'qux');
      const iterator = cache.keys();
      expect(iterator.next().value).toBe('foo');
      expect(iterator.next().value).toBe('baz');
      expect(iterator.next().done).toBe(true);
    });
  });

  describe('values', () => {
    it('should return an iterator of values in the cache', () => {
      const cache = new LruMapCache(10);
      cache.set('foo', 'bar');
      cache.set('baz', 'qux');
      const iterator = cache.values();
      expect(iterator.next().value).toBe('bar');
      expect(iterator.next().value).toBe('qux');
      expect(iterator.next().done).toBe(true);
    });
  });
});
