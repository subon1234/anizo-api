class MemoryCache {
  constructor() {
    this.cache = new Map();
  }

  set(key, value, ttl = 300) {
    this.cache.set(key, {
      value,
      expires: Date.now() + ttl * 1000
    });
  }

  get(key) {
    const data = this.cache.get(key);

    if (!data) return null;

    if (Date.now() > data.expires) {
      this.cache.delete(key);
      return null;
    }

    return data.value;
  }

  has(key) {
    return this.get(key) !== null;
  }

  delete(key) {
    this.cache.delete(key);
  }

  clear() {
    this.cache.clear();
  }

  size() {
    return this.cache.size;
  }
}

module.exports = new MemoryCache();
