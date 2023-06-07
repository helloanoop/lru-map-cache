class LruMapCache {
  constructor(capacity) {
    this.capacity = capacity;
    this.cache = new Map();
  }

  get(key) {
    if (!this.cache.has(key)) {
      return null;
    }
    
    const value = this.cache.get(key);
    this.cache.delete(key);
    this.cache.set(key, value);
    
    return value;
  }

  set(key, value) {
    if (this.cache.has(key)) {
      this.cache.delete(key);
    }
      
    this.cache.set(key, value);
      
    if (this.cache.size > this.capacity) {
      this.cache.delete(this.cache.keys().next().value);
    }
  }

  delete(key) {
    return this.cache.delete(key);
  }

  clear() {
    return this.cache.clear();
  }

  size() {
    return this.cache.size;
  }

  capacity() {
    return this.capacity;
  }

  has(key) {
    return this.cache.has(key);
  }

  keys() {
    return this.cache.keys();
  }

  values() {
    return this.cache.values();
  }
}

module.exports = LruMapCache;
