

class LRUCache {
  constructor(capacity) {
    this.capacity = capacity;
    this.cache = new Map();
    this.pageFaults = 0;
  }

  get(key) {
    if (!this.cache.has(key)) {
      this.pageFaults++;
      console.log(`Page fault for key ${key}`);
      return -1;
    }

    const value = this.cache.get(key);
    // Update usage frequency
    this.cache.delete(key);
    this.cache.set(key, value);

    return value;
  }

  put(key, value) {
    if (this.cache.has(key)) {
      // Update usage frequency
      this.cache.delete(key);
    } else if (this.cache.size === this.capacity) {
      // Evict the least recently used key
      const leastUsed = this.cache.keys().next().value;
      console.log(`Evicting key ${leastUsed}`);
      this.cache.delete(leastUsed);
    }
    this.cache.set(key, value);
  }

  getPageFaults() {
    return this.pageFaults;
  }
}

// Example usage
const lruCache = new LRUCache(2); // Capacity is 2

lruCache.put(1, 1);
lruCache.put(2, 2);
console.log(lruCache.get(1)); // Output: 1
lruCache.put(3, 3); // Evicts key 2
console.log(lruCache.get(2)); // Output: -1
lruCache.put(4, 4); // Evicts key 1
console.log(lruCache.get(1)); // Output: -1
console.log(lruCache.get(3)); // Output: 3
console.log(lruCache.get(4)); // Output: 4

console.log("Total Page Faults:", lruCache.getPageFaults());
